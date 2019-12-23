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
        title:[],
        list:[],
        ClassList:[],
        displayName:'none',
		JDLight:[],
        termWeight:[],
        CommentContent:'',
        EducationExperience:[],
        ProjectExperience:[]
    }

    // 组件装载之后调用
    componentDidMount() {
        axios.get("http://zpsearch.zhaopin.com/profilecenter/resumeServiceSvc/GetResumeByExtId?access_token=551c619ef13c45debe92a64880f5e1cdlzJv&versionNo=1&language=1&resumeNo=JI465130935R90500000000")
            .then(function (response) {
                console.log(JSON.parse(response.data.data))
            })
    }
	returnCaption(url,searchword1,callback){
        axios.get(url,{
            params:{
                "resumeNo":searchword1,
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
        this.returnCaption("http://zpsearch.zhaopin.com/profilecenter/resumeServiceSvc/GetResumeByExtId?access_token=551c619ef13c45debe92a64880f5e1cdlzJv&versionNo=1&language=1",searchword1,(response)=>{
            let resData=JSON.parse(response.data.data)
            let title=[]
            console.log(resData)
            resData["WorkExperience"].forEach((item)=>{
                title.push({
                    jobName:item.JobTitle,
                    content:item.WorkDescription
                })
            })
            _this.setState({
                        CommentContent:resData["CommentContent"],
						title:title,
						displayName:'block',
                        EducationExperience:resData["EducationExperience"],
                        ProjectExperience:resData["ProjectExperience"]
					})
            let termWeightRequest=[]

            axios.post("http://zhiliankg-schema.zhaopin.com/getKw",{
                "title":"自我评价","desc":_this.state.CommentContent
            }).then(function (responses) {
                if(responses.data!==''){
                    let data=JSON.parse(responses.data);
                    console.log(data);
                    let tempContent=_this.state.CommentContent;

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
                        CommentContent: tempContent,
                    })
                }
            })
            _this.state.title.forEach((item)=>{
                termWeightRequest.push(new Promise((resolve,reject)=>{
                    axios.post("http://zhiliankg-schema.zhaopin.com/termWeight",{
                        "title":item.jobName,"desc":item.content
                    }).then((responses)=>{
                        let term=JSON.parse(responses.data);
                        resolve(term);
                    })
                }))
            })
            Promise.all(termWeightRequest).then((values,err)=>{
                let data=[]
                values.forEach((itemss,index)=>{
                    let temp={
                        titleTerm:[],
                        skillTerm:[],
                        kwTerm:[]
                    }
                    Object.keys(itemss).forEach((items)=>{
                        Object.keys(itemss[items]).forEach((item)=>{
                            temp[items].push({
                                title:item,
                                value:itemss[items][item]
                            })
                        })
                    })
                    data.push(temp)
                });
                _this.setState({
                    termWeight:data
                })
            })
            let JDLight=[];
            let getKw=[];
            let getKwTitle=_this.state.title;
            _this.state.title.forEach((p1)=>{
                getKw.push(new Promise((resolve,reject)=>{
                    axios.post("http://zhiliankg-schema.zhaopin.com/getKw",{
                        "title":p1.jobName,"desc":p1.content
                    }).then(function (responses) {
                        if(responses.data!==''){
                            let data=JSON.parse(responses.data);
                            resolve(data);
                        }
                    }).then(()=>{
                        let getCert=[];
                        _this.state.title.forEach((item,index)=>{
                            getCert.push(new Promise((resolves,reject)=>{
                                axios.post("http://zhiliankg-schema.zhaopin.com/getCertAndMajor",{
                                    "title":item.jobName,"desc":item.content
                                }).then(function (responses) {
                                    resolves(responses.data);
                                })
                            }))
                        })
                        return Promise.all(getCert).then((values)=>{
                            values.forEach((item)=>{
                                let major=JSON.parse(item)["major"];
                                let cert=JSON.parse(item)["cert"];
                                if(major.length!=0){
                                    JDLight.push({
                                        "title":"专业用语",
                                        "key":"专业",
                                        "value":major.toString()
                                    });
                                }
                                if(cert!=undefined&&cert.length!=0){
                                    JDLight.push({
                                        "title":"证书",
                                        "key":"证书",
                                        "value":cert.toString()
                                    });
                                }
                            })
                        })
                    }).then(()=> {
                        //getCertAndMajor
                        let getJD=[]
                        _this.state.title.forEach((item,index)=>{
                            getJD.push(new Promise((resolves,reject)=>{
                                axios.post("http://zhiliankg-schema.zhaopin.com/getJDLight",{
                                    "content":item.content
                                }).then(function (responses) {
                                    resolves(responses.data);
                                })
                            }))
                        })
                        return Promise.all(getJD).then((values)=>{
                            let title=_this.state.title;
                            values.forEach((items,index)=>{
                                let age=items['age'];
                                let exp=items['exp']
                                if(age!=undefined) {
                                    Object.keys(age).forEach((item) => {
                                        JDLight.push({
                                            "title":"年龄",
                                            "key":item,
                                            "value":age[item]
                                        });
                                        let av=item.trim();
                                        title[index].content = _this.light(title[index].content, av, 'red', age[item]);
                                    })
                                }else{
                                    message.error("没有提取年龄");
                                }

                                if(exp!=undefined){
                                    let [key,value]=["",""]
                                    Object.keys(exp).forEach((item) => {
                                        key+=(item+",")
                                        value+=(exp[item]+",")

                                        //CC357960812J00349003502
                                        let temp = _this.light(item, exp[item], 'yellow');

                                        title[index].content=_this.relight(title[index].content,item,temp);
                                    })
                                    if(key!="") {
                                        JDLight.push({
                                            "title": "经验",
                                            "key": key,
                                            "value": value
                                        });
                                    }
                                }else{
                                    message.error("没有提取经验");
                                }
                            })
                            _this.setState({
                                title:title,
                                JDLight:JDLight
                            })
                        })

                    })
                }))
            })
            Promise.all(getKw).then((values)=>{
                values.forEach((data,index)=>{
                    data.title.forEach((item)=>{
                        getKwTitle[index].jobName = _this.light(getKwTitle[index].jobName, item.word, 'hightyellow');
                    })

                    for(let i=0;i<data.desc.length-1;i++){
                        if(data.desc[i].end>data.desc[i+1].start){
                            data.desc[i+1].start=data.desc[i].start;
                            data.desc[i+1].word=getKwTitle[index].content.substr(data.desc[i+1].start,(data.desc[i+1].end-data.desc[i+1].start))
                            delete data.desc[i]
                        }
                    }
                    for(let i=data.desc.length-1;i>=0;i--){
                        let curr=data.desc[i]
                        if(curr!=undefined)
                            getKwTitle[index].content=_this.replacePos(getKwTitle[index].content,curr.start,curr.end,'<font color="hightyellow">'+curr.word+'</font>')
                    }
                })
                _this.setState({
                    title: getKwTitle
                })
            })

            let JobType=[];
            _this.state.title.forEach((item)=>{
                JobType.push(new Promise((reslove,reject)=>{
                    axios.post("http://zhiliankg-schema.zhaopin.com/JobTypeClassifier",{
                        "title":item.jobName,"desc":item.content
                    }).then(function (responses) {
                        if(responses.data!=undefined&&responses.data!=='') {
                            let data = JSON.parse(responses.data)
                            reslove(data);
                        }
                    })
                }))
            })
            Promise.all(JobType).then((values)=>{
                _this.setState({
                    ClassList: values
                })
            })
        })
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
		const dataSource = ParamUtil.CVkeyword;
		const that=this;
		let Weight=["Title Term Weight","Skill Term Weight","Keyword Term Weight"]
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
                                            initialValue:"JI465130935R90500000000",
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

                                <div>
                                    <div className="cvList-page-header" style={{display:that.state.displayName}}>
                                        <h1 style={{fontSize:'36px'}}><span dangerouslySetInnerHTML={{__html:"教育经历"}}></span>

                                        </h1>
                                    </div>
                                    {
                                        that.state.EducationExperience.map((item,index)=>{
                                            return <p style={{display:that.state.displayName}} dangerouslySetInnerHTML={{__html:item.SchoolName+"-"+item.MajorName+"专业"}}></p>
                                        })
                                    }
                                </div>
                                <div>
                                    <div className="cvList-page-header" style={{display:that.state.displayName}}>
                                        <h1 style={{fontSize:'36px'}}><span dangerouslySetInnerHTML={{__html:"项目经验"}}></span>
                                        </h1>
                                    </div>
                                    {
                                        that.state.ProjectExperience.map((item,index)=>{
                                            return <div>
                                                <h3 ><span>项目名称： </span>
                                                    {item.ProjectName}
                                                </h3>
                                                <p style={{display:that.state.displayName}} dangerouslySetInnerHTML={{__html:item.ProjectDescription+""}}></p>
                                            </div>
                                        })
                                    }
                                </div>
                                <div>
                                    <div className="cvList-page-header" style={{display:that.state.displayName}}>
                                        <h1 style={{fontSize:'36px'}}><span dangerouslySetInnerHTML={{__html:"自我评价"}}></span>

                                        </h1>
                                    </div>
                                    <p style={{display:that.state.displayName}} dangerouslySetInnerHTML={{__html:that.state.CommentContent}}></p>
                                </div>
                            </Col>
                            <Col span={2}></Col>

                        </Row>
                        {
                            this.state.title.map((item,index)=>{
                                return <div style={{borderTop:index!=0?"1px solid black":0,marginBottom:20}}>
                                    <Row>
                                        <Col span={2}></Col>
                                        <Col span={8}>
                                            <div>
                                                <div className="cvList-page-header" style={{display:that.state.displayName}}>
                                                    <h1 style={{fontSize:'36px'}}><span dangerouslySetInnerHTML={{__html:item.jobName}}></span>

                                                    </h1>
                                                </div>
                                                <p style={{display:that.state.displayName}} dangerouslySetInnerHTML={{__html:(item.content+'   <span style="color: black">(绿色是关键字，红色是年龄，黄色是经验)</span>')}}></p>
                                            </div>
                                        </Col>
                                        <Col span={2}></Col>
                                        <Col span={10}>
                                            <div style={{backgroundColor:'white',marginTop:75,marginBottom:20,display:that.state.displayName}}>
                                                <List
                                                    itemLayout="vertical"
                                                    size="large"
                                                    dataSource={that.state.ClassList[index]}
                                                    header={
                                                        <div>
                                                            <b>分类器</b>
                                                        </div>
                                                    }
                                                    renderItem={classItem => (
                                                        <List.Item
                                                            key={classItem.jobId1}

                                                        >
                                                            <List.Item.Meta

                                                            />{classItem.jobName1}  >>  {classItem.jobName2}  >>  {classItem.jobName3} >>  {classItem.score}
                                                        </List.Item>
                                                    )}
                                                />
                                            </div>
                                        </Col>
                                        <Col span={2}></Col>
                                    </Row>
                                    <Row>
                                        <Col span={2}></Col>
                                        <Col span={20}>
                                            <div>
                                                {
                                                    that.state.termWeight[index]!=undefined?Object.keys(that.state.termWeight[index]).map((term,number)=>{
                                                        let curr=that.state.termWeight[index];
                                                        return <div>
                                                            <div style={{backgroundColor:'white',display:that.state.displayName}}>
                                                                <List
                                                                    grid={{ gutter: 16, column: 4 }}
                                                                    itemLayout="vertical"
                                                                    size="large"
                                                                    dataSource={curr[term]}
                                                                    header={
                                                                        <div>
                                                                            <b>{Weight[number]}</b>
                                                                        </div>
                                                                    }
                                                                    renderItem={termItem => (
                                                                        <List.Item
                                                                            key={termItem.title}

                                                                        >
                                                                            <List.Item.Meta
                                                                            />
                                                                            {termItem.title}  >>  {termItem.value}
                                                                        </List.Item>
                                                                    )}
                                                                />
                                                            </div>
                                                        </div>
                                                    }):null
                                                }
                                            </div>
                                        </Col>
                                        <Col span={2}></Col>
                                    </Row>
                                </div>
                            })
                        }

                    </Col>
                    <Col span={8}>

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
