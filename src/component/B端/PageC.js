import React, {Component} from 'react';
import PageHeader from '../lib/PageHeader';
import {NavLink} from 'react-router-dom'
import '../../App.css';
import { Form, Icon, Input, Button ,Table,List, Avatar,Layout,Tooltip} from 'antd';
import axios from 'axios';
const { Header, Content, Footer,Sider } = Layout;
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class PageC extends React.Component {
    constructor(props) {
        super(props)
        this.addButton = this.addButton.bind(this);
        this.deleteInput=this.deleteInput.bind(this);
        this.normAlization=this.normAlization.bind(this)
    }

    state={
        list:[],
		formItems:[]
    }
    // 组件装载之后调用
    componentDidMount() {
        this.props.form.validateFields();
        let newArray=this.state.formItems;
        newArray.push({
			id:"searchword1",
            placeholder:"请输入关键词1"}
		)
        this.setState({
			formItems:newArray
		})
        this.returnData("xshellcmd",1)

    }
    deleteInput(){
        let newArray=this.state.formItems;
        newArray.length--;
        this.setState({
            formItems:newArray
        })
	}
    addButton(){

        let newArray=this.state.formItems;
        newArray.push({
            id:"searchword"+(newArray.length+1),
            placeholder:"请输入关键词"+(newArray.length+1)
        })
        this.setState({
            formItems:newArray
        })
	}
    normAlization(value){
        this.returnData("xshellcmd",value)
    }
    handleSubmit = e => {
        e.preventDefault();

        /*let {searchword1,searchword2,topK}=val;
        var _this=this;*/
        /*axios.get("get_cvjdsim",{
            params:{
                "searchword1":searchword1,
                "searchword2":searchword2,
                "page":1,
                "selectClassEntityId": "1",
                "topK":topK
            }
        }).then(function (resopnse) {
            console.log(resopnse)
            _this.setState({
                list:(resopnse.data.dataList)
            })
        })*/
        this.returnData("xshellcmd",1)

    };
    syntaxHighlight(json) {
        if (typeof json == 'string') {
            json = JSON.parse(json);
        }

        json = JSON.stringify(json, undefined, 2);

        json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            console.log(match)
            return '' + match + '';
        });
    };
    returnData(url,index){
        var val={}
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            val=values;
        });
        let searchword='';
        Object.keys(val).forEach(function (item,index) {
            if(index==Object.keys(val).length-1){
                searchword=searchword+val[item];
            }else{
                searchword=searchword+val[item]+'&;&';
            }

        })
        var _this=this;
        console.log(searchword)
        axios.get(url,{
            params:{
                "searchword":searchword,
                "page":1,
                "selectClassEntityId": index
            }
        }).then(function (resopnse) {

            let data=[{}]
           /* data.push({
                entityId:'0',
                name:'',
                table:[]
            })*/
            for(let i=0;i<resopnse.data.dataList.length;i++) {
                data[i].className = resopnse.data.dataList[i].className;
                data[i].table=[];
                data[i].entityId=resopnse.data.dataList[i].entityId;
                //data[i].name = 'jdInput:result_$date.txt<br>filterDictFile:StopWords.txt<br>frontDoor:frontdoor.txt<br>jdTitleFile:jdTitleFile.txt<br>inputFile:cv_jd_name_count_over_1_list.txt<br>jdtitle_length_cut:2<br>filterRegDict:StopReg.txt<br>synonymBlackList:rewrite_black_list.txt<br>synonymWhiteList:rewrite_white_list.txt<br>cvJobNameCountList:cv_jd_name_count_over_1_list.checked.unique<br>redis_port:6379<br>redis_auth:""<br>editorialBlackList:editorialBlackList.txt<br>redis_host:172.30.29.10<br>redis_hosts:172.30.29.10,172.30.29.11,172.30.29.12,172.30.29.13,172.30.29.14,172.30.29.15<br>prefix:Normalized_jd_title_V2_<br>titleBlackList:title_black_list.txt<br>outputFile:jdtitleWithTag_$date.txt<br>synonymList:click_pair_190906.tsv<br>php研发工程师&=&Normalized_jd_title_V6_cGhw56CU5Y+R5bel56iL5biI&=&{"results":[{"normResult":"php","rewriteVersion":"v0","score":10000}],"srcTitle":"php研发工程师"}<br>';
                data[i].name=resopnse.data.dataList[i].name;
                let names = data[i].name.split("<br>");
                names.forEach(function (item, p2, p3) {
                    if (item.indexOf(":") > -1 && item.indexOf("=") == -1) {
                        var temp = item.split(":");
                        data[i].table.push({
                            keys: temp[0],
                            value: temp[1]
                        })
                    } else if (item.indexOf("=") > -1) {

                        temp = item.split("&=&");
                        var tempjson = "";
                        if (temp.length == 3) {
                            //tempjson=temp[2].replace(/\{/g,"<tr ><td>").replace(/\:/g,": </td><td>").replace(/\,/g,"</td></tr><tr><td>").replace(/\[/g,"<table class='table table-bordered'>").replace(/\}/g,"</td></tr>").replace(/\]/g,"</table>");
                            tempjson = _this.syntaxHighlight("" + temp[2] + "");
                            data[i].table.push({
                                keys: temp[1],
                                value: null
                            })
                            data[i].table.push({
                                keys: <pre>{tempjson}</pre>,
                                value: null
                            })

                        } else {
                            data[i].table.push({
                                keys: temp[0],
                                value: temp[1]
                            })
                        }


                    }
                })
            }

            _this.setState({
                list:data
            })
        })
    }

    //渲染
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        const columns = [
            {
                title: 'keys',
                dataIndex: 'keys',
                key: 'keys',
                render:(text,row,index)=>{
                    if(row.value==null){
                        return {
                            children:text,
                            props:{
                                colSpan:2
                            }
                        }

                    }
                    return text
                }
            },
            {
                title: 'value',
                dataIndex: 'value',
                key: 'value',
                render:(text,row,index)=>{
                    if(row.value==null){
                        return {
                            children:text,
                            props:{
                                colSpan:0
                            }
                        }

                    }
                    return text
                }
            }
        ]
        const back={
            background: 'rgb(240, 242, 245)'
        }
        return (
			<div style={{marginTop:"20px"}}>
                <Layout>
                    <Sider style={{backgroundColor: 'rgb(240, 242, 245)'}}>
                        <Form layout="horizontal"  >
                            {
                                this.state.formItems.map(function (val) {
                                    return <Form.Item >
                                        {getFieldDecorator(val.id, {
                                            rules: [{ required: true, message:val.placeholder }],
                                        })(
                                            <Input
                                                style={{}}
                                                placeholder={val.placeholder}
                                            />,
                                        )}

                                    </Form.Item>

                                })

                            }
                        </Form>
                    </Sider>
                    <Layout>
                        <Header style={back}>
                            <Form layout="inline" style={{textAlign:'left'}} onSubmit={this.handleSubmit} >
                                {
                                    this.state.formItems.length!=0?
                                        <Form.Item>
                                            <Tooltip placement="bottom" title={"删除数据框" }>
                                            <Button type="danger" htmlType="button"  onClick={this.deleteInput} >
                                                ×
                                            </Button>
                                            </Tooltip>
                                        </Form.Item> :null
                                }

                                <Form.Item>
                                    <Tooltip placement="bottom" title={"添加NormAlization输入数据框" }>
                                    <Button type="primary" htmlType="button"  onClick={this.addButton} >
                                        +
                                    </Button>
                                    </Tooltip>
                                </Form.Item>

                                <Form.Item>
                                    <Tooltip placement="bottom" title={"获取输入框在NormAlization中的key" }>
                                        <Button type="primary" htmlType="button" onClick={this.normAlization.bind(this,2)} >
                                            获取NormAlization
                                        </Button>
                                    </Tooltip>
                                </Form.Item>
                                <Form.Item>
                                    <Tooltip placement="bottom" title={"获取输入框在NormAlization中的key(Base64)" }>
                                    <Button type="primary" htmlType="button"  onClick={this.normAlization.bind(this,3)} >
                                        获取NormAlization-Base64
                                    </Button>
                                    </Tooltip>
                                </Form.Item>
                                <Form.Item>
                                    <Tooltip placement="bottom" title={"更新输入框在NormAlization中的key" }>
                                    <Button type="primary" htmlType="button" onClick={this.normAlization.bind(this,4)} >
                                        更新NormAlization
                                    </Button>
                                    </Tooltip>
                                </Form.Item>
                                <Form.Item>
                                    <Tooltip placement="bottom" title={"删除输入框在NormAlization中的key" }>
                                    <Button type="primary" htmlType="button"  onClick={this.normAlization.bind(this,5)} >
                                        删除NormAlization
                                    </Button>
                                    </Tooltip>
                                </Form.Item>
                                <Form.Item>
                                    <Tooltip placement="bottom" title={"增加输入框在NormAliaztion中的值" }>
                                        <Button type="primary" htmlType="button"  onClick={this.normAlization.bind(this,6)} >
                                            增加rewrite黑名单
                                        </Button>
                                    </Tooltip>
                                </Form.Item>
                            </Form>
                        </Header>
                        <Content>
                            <div style={{margin:'auto'}}>
                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    dataSource={this.state.list}

                                    renderItem={item => (
                                        <List.Item
                                            key={item.entityId}
                                            extra={
                                                item.className
                                            }
                                        >
                                            <Table style={{marginTop:"20px",marginBottom:"80px"}} bordered columns={columns} dataSource={item.table} pagination={false}/>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </Content>
                    </Layout>
                </Layout>

			</div>
        );
    }

    // 组件被卸载
    componentWillUnmount() {

    }
}

export default Form.create()(PageC);
