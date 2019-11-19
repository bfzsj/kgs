import React from 'react';
import '../../App.css';
import { Form, Avatar,List, Input, Button,Row, Col ,Tag} from 'antd';
import {NavLink} from 'react-router-dom'
import axios from 'axios';
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class CvList extends React.Component {
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
    }

    // 组件装载之后调用
    componentDidMount() {

    }

    handleSubmit = e => {
        e.preventDefault();
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
        this.returnData("get_JdInList",searchword1,(response)=>{
            _this.setState({
                title:response.data
            })
        })
        this.get_cv_list(searchword1)
       // http://industryjobclassify.zpidc.com/KgApi/nlp?content=%E8%B7%9F%E5%8D%95%E6%95%99%E7%AE%A1%E7%85%A7%E6%8A%A4%E5%90%A7%E5%91%98java%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88
    };

    returnData(url,searchword1,callback){
        var _this=this;
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
        this.returnData("get_CVList",searchword1,(response)=>{
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

        // Only show error after a field is touched.
        const usernameError = isFieldTouched('searchword1') && getFieldError('searchword1');
        return (
            <div>
                <Row>
                    <Col span={4}></Col>
                    <Col span={16}>
                        <Form layout="inline" style={{textAlign:'center'}} onSubmit={this.handleSubmit}>
                            <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                                {getFieldDecorator('searchword1', {
                                    initialValue:"CC201426236J90250807000",
                                    rules: [{ required: true, message: '请输入关键词1' }],
                                })(
                                    <Input
                                        style={{width:'255px'}}
                                        placeholder="请输入关键词1"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" icon="search" disabled={hasErrors(getFieldsError())}>
                                    Search
                                </Button>

                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={4}></Col>
                </Row>
                <Row>
                    <Col span={4}></Col>
                    <Col span={16}>
                        <div className="cvList-page-header">
                            <h1 style={{fontSize:'36px'}}>{this.state.title.jobName}
                                <small style={{float: 'right',marginRight: '1em'}}><Button type="primary" htmlType="button" onClick={this.get_cv_list.bind(this,this.state.search)}>推荐</Button></small>
                            </h1>
                        </div>
                        <p>{this.state.title.content}</p>
                    </Col>
                    <Col span={4}></Col>
                </Row>
                <Row>
                    <Col span={4}></Col>
                    <Col span={16}>
                        <div style={{backgroundColor:'white'}}>
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
                                            avatar={<Avatar src={item.avatar} style={{minWidth:'50px',minHeight:'50px'}}/>}
                                            title={<NavLink to={'/caption/'+item.title}>{item.title}</NavLink>}
                                            description={item.description}
                                        />
                                        {item.content}
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Col>
                    <Col span={4}></Col>
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
export default Form.create()(CvList);
