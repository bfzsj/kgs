import React from 'react';
import '../../App.css';
import { AutoComplete ,message,Form, Avatar,List, Input, Button,Row, Col ,Tag} from 'antd';
import {NavLink} from 'react-router-dom'
import axios from 'axios';
import {ParamUtil} from '../../utils/ParamUtil'
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class CVSearch extends React.Component {
    constructor(props) {
        super(props)
        this.get_cv_list=this.get_cv_list.bind(this)
    }

    state={
        search:'',
        title:{
            jobName:'',
            content:''
        },
        list:[],
        ClassList:[],
        displayName:'none',
		JDLight:[]
    }

    // 组件装载之后调用
    componentDidMount() {
		axios.get("http://zpsearch.zhaopin.com/profilecenter/resumeServiceSvc/GetResumeByExtId?access_token=551c619ef13c45debe92a64880f5e1cdlzJv&versionNo=1&language=1",{
			params:{
			    "resumeNo":"JI119191358R90500000000"
            }
		}).then(function (response) {
                console.log(JSON.parse(response.data.data))
            })

    }
	returnCaption(url,searchword1,callback){
        axios.get(url,{
            params:{
                "id":searchword1,
            }
        }).then(function (response) {
            callback(response);
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            displayName:'none'
        })
        var val={}
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            val=values;
        });
        let {searchword1}=val;
        var _this=this;
        this.setState({
            search:searchword1
        })
        this.returnCaption("http://zpsearch.zhaopin.com/caption/captionService/get?type=jobsCampuslist&",searchword1,(response)=>{
            _this.setState({
						title:{
							jobName:response.data.data.value.jobName,
							content:response.data.data.value.jobDescription
						},
						displayName:'block'
					})
					axios.post("http://zhiliankg-schema.zhaopin.com/termWeight",{
						"title":_this.state.title.jobName,"desc":_this.state.title.content
					}).then((responses)=>{
						console.log(responses)
					})
			axios.post("http://zhiliankg-schema.zhaopin.com/getKw",{
				"title":_this.state.title.jobName,"desc":_this.state.title.content
			}).then(function (responses) {

                if(responses.data!==''){
				    let data=JSON.parse(responses.data);
				    let tempTitle=_this.state.title.jobName;
                    let tempContent=_this.state.title.content;
                    data.title.forEach((item)=>{
                        tempTitle = _this.light(tempTitle, item.word, 'hightyellow');
                    })

                    /*data.desc.forEach((item)=>{
                        tempContent=_this.light(tempContent,item.word,'hightyellow');
                    })*/
                    for(let i=0;i<data.desc.length-1;i++){
                        if(data.desc[i].end>data.desc[i+1].start){
                            data.desc[i+1].start=data.desc[i].start;
                            data.desc[i+1].word=tempContent.substr(data.desc[i+1].start,(data.desc[i+1].end-data.desc[i+1].start))
                            delete data.desc[i]
                        }
                    }
                    for(let i=data.desc.length-1;i>=0;i--){
                        let curr=data.desc[i]
                        if(curr!=undefined)
                        tempContent=_this.replacePos(tempContent,curr.start,curr.end,'<font color="hightyellow">'+curr.word+'</font>')
                    }

                    _this.setState({
                        title: {
                            jobName: tempTitle,
                            content: tempContent
                        }
                    })
                }
			}).then(()=> {
                axios.post("http://zhiliankg-schema.zhaopin.com/getJDLight",{
                    "content":_this.state.title.content
                }).then(function (responses) {
					console.log(responses)
                    let age=responses.data['age'];
					let JDLight=[];
                    if(age!=undefined) {
						
                        Object.keys(age).forEach((item) => {
							JDLight.push({
								"title":"年龄",
								"key":item,
					            "value":age[item]
							});
							let av=item.trim();
                            let temp = _this.light(_this.state.title.content, av, 'red', age[item]);
							console.log(temp)
                            _this.setState({
                                title: {
                                    jobName: _this.state.title.jobName,
                                    content: temp
                                }
                            })
                        })
                    }else{
                        message.error("没有提取年龄");
                    }
                    let exp=responses.data['exp']
                    if(exp!=undefined){
                        Object.keys(exp).forEach((item) => {
							JDLight.push({
								"title":"经验",
								"key":item,
					            "value":exp[item]
							});
                            //CC357960812J00349003502
                            let temp = _this.light(item, exp[item], 'yellow');

                            let tempTwo=_this.relight(_this.state.title.content,item,temp);

                            _this.setState({
                                title: {
                                    jobName: _this.state.title.jobName,
                                    content: tempTwo
                                }
                            })
                        })
                    }else{
                        message.error("没有提取经验");
                    }
					_this.setState({
						JDLight:JDLight
					})
                })
            })

            axios.post("http://zhiliankg-schema.zhaopin.com/JobTypeClassifier",{
                "title":_this.state.title.jobName,"desc":_this.state.title.content
            }).then(function (responses) {
                if(responses.data!=undefined&&responses.data!=='') {
                    let data = JSON.parse(responses.data)
                    _this.setState({
                        ClassList: data
                    })
                }
            })
        })
        this.get_cv_list(searchword1)
       // http://industryjobclassify.zpidc.com/KgApi/nlp?content=%E8%B7%9F%E5%8D%95%E6%95%99%E7%AE%A1%E7%85%A7%E6%8A%A4%E5%90%A7%E5%91%98java%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88
    };

    replacePos(strObj, start,end, replacetext) {
        var str = strObj.substr(0, start) + replacetext + strObj.substring(end, strObj.length);
        return str;
    }
    light(contents, key, color,add=''){
        let content = contents || "";
        let keyWord = key || "";
        let keyColor = color || "red";
        let adds=( add===''? '':'('+add+')')
        if (content != "" && keyWord != "") {
            let pattern = new RegExp(keyWord);
            let html = content; //可使用innerHTML替换
            html = html.replace(pattern, "<font color='" + keyColor + "'>" + keyWord + "</font><font color='blue'>"+adds+"</font>");
            return html;//可使用innerHTML替换
        }
        return "";
    }
    relight(contents, key,recontent){
        let content = contents || "";
        let keyWord = key || "";
        if (content != "" && keyWord != "") {
            let pattern = new RegExp("."+keyWord);
            let html = content; //可使用innerHTML替换
            html = html.replace(pattern, recontent);
            return html;//可使用innerHTML替换
        }
        return "";
    }
    returnData(url,searchword1,callback){
        axios.get(url,{
            params:{
                "jdNumber":searchword1,
            }
        }).then(function (response) {
            callback(response);
        })
    }

    get_cv_list(searchword1){
        let _this=this;
        console.log(searchword1)
        this.returnData("http://zhiliankg-schema.zhaopin.com/get_CVList",searchword1,(response)=>{
           /* _this.setState({
                list:response.data
            })*/
            let data=response.data;
            let listData=[]
            data.forEach((item)=>{
                let keys = Object.keys(item);
                let temp=[];
                item[keys[0]].forEach((tesxd)=>{
                    temp.push(<Tag color="magenta">{tesxd}</Tag>)
                })
                listData.push({
                    title:keys[0],
                    content: <pre>{temp}</pre>,
                })
            });
            _this.setState({
                list:listData
            })

        })
    }
    //渲染
    render() {

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
		const dataSource = ParamUtil.JDkeyword
        // Only show error after a field is touched.
        const usernameError = isFieldTouched('searchword1') && getFieldError('searchword1');
        return (
            <div>
                <Row>
                    <Col span={16}>
                        <Row>
                            <Col span={2}></Col>
                            <Col span={20}>
                                <Form layout="inline" style={{textAlign:'center'}} onSubmit={this.handleSubmit}>
                                    <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                                        {getFieldDecorator('searchword1', {
                                            initialValue:"CC201426236J90250807000",
                                            rules: [{ required: true, message: '请输入CV' }],
                                        })(
										<AutoComplete
										  style={{ width: 255 }}
										  dataSource={dataSource}
										  placeholder="请输入CV"
										  >
                                            <Input
                                                style={{width:'255px'}}
                                               
                                            />
										</AutoComplete>
                                        )}
                                    </Form.Item>
                                    <Form.Item >
                                        <Button type="primary" htmlType="submit" icon="search" disabled={hasErrors(getFieldsError())}>
                                            Search
                                        </Button>

                                    </Form.Item>
                                </Form>
                            </Col>
                            <Col span={2}></Col>
                        </Row>
                        <Row>
                            <Col span={2}></Col>
                            <Col span={20}>
                                <div className="cvList-page-header" style={{display:this.state.displayName}}>
                                    <h1 style={{fontSize:'36px'}}><span dangerouslySetInnerHTML={{__html:this.state.title.jobName}}></span>
                                        <small style={{float: 'right',marginRight: '1em'}}><Button type="primary" htmlType="button" onClick={this.get_cv_list.bind(this,this.state.search)}>推荐</Button></small>
                                    </h1>
                                </div>
                                <p style={{display:this.state.displayName}} dangerouslySetInnerHTML={{__html:( this.state.title.content+'   <span style="color: black">(绿色是关键字，红色是年龄，黄色是经验)</span>')}}></p>
                            </Col>
                            <Col span={2}></Col>
                        </Row>
                        <Row>
                            <Col span={2}></Col>
                            <Col span={20}>
                                <div style={{backgroundColor:'white',display:this.state.displayName}}>
                                    <List
                                        itemLayout="vertical"
                                        size="large"
                                        dataSource={this.state.list}
                                        footer={
                                            <div>
                                                <b>ant design</b> footer part
                                            </div>
                                        }
                                        renderItem={item => (
                                            <List.Item
                                                key={item.title}

                                            >
                                                <List.Item.Meta
                                                    title={<NavLink to={'/caption/'+item.title} target="_blank">{item.title}</NavLink>}
                                                    description={item.description}
                                                />
                                                {item.content}
                                            </List.Item>
                                        )}
                                    />
                                </div>
                            </Col>
                            <Col span={2}></Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <div style={{backgroundColor:'white',marginTop:120,display:this.state.displayName}}>
                            <List
                                itemLayout="vertical"
                                size="large"
                                dataSource={this.state.ClassList}
                                header={
                                    <div>
                                        <b>分类器</b>
                                    </div>
                                }
                                renderItem={item => (
                                    <List.Item
                                        key={item.jobId1}

                                    >
                                        <List.Item.Meta

                                        />{item.jobName1}  >>  {item.jobName2}  >>  {item.jobName3} >>  {item.score}
                                    </List.Item>
                                )}
                            />
                        </div>
						<div style={{backgroundColor:'white',marginTop:120,display:this.state.displayName}}>
                            <List
                                itemLayout="vertical"
                                size="large"
                                dataSource={this.state.JDLight}
                                header={
                                    <div>
                                        <b>提取内容</b>
                                    </div>
                                }
                                renderItem={item => (
                                    <List.Item
                                        key={item.key}

                                    >
                                        <List.Item.Meta
											title={item.title}
                                        />{item.key}  >>  {item.value}  
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Col>
                </Row>

            </div>
        );
    }//<NavLink to="" style={{display:'inline'}}>ZTC</NavLink>

    // 组件被卸载
    componentWillUnmount() {

    }
}
/*<List.Item.Meta
    avatar={<Avatar src={item.avatar} style={{minWidth:'50px',minHeight:'50px'}}/>}
    title={<a href={item.href}>{item.title}</a>}
    description={item.description}
/>*/
export default Form.create()(CVSearch);
