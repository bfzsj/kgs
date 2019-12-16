import React from 'react';
import '../../App.css';
import { Form, Avatar,List, Input, Button,Row, Col ,Tag} from 'antd';
import {NavLink} from 'react-router-dom'
import axios from 'axios';
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class JobTypeClassifier extends React.Component {
    constructor(props) {
        super(props)
    }

    state={
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
        let {title,desc}=val;
        var _this=this;
        axios.post("/JobTypeClassifier",{
            "title":title,"desc":desc
        }).then(function (response) {
            let data=JSON.parse(response.data)
            _this.setState({
                list:data
            })
        })
        //let data= JSON.parse("[{\"jobId3\":\"9000300230000\",\"jobId2\":\"9000300000000\",\"score\":0.31591657,\"jobId1\":\"9000000000000\",\"jobName1\":\"互联网|通信及硬件\",\"jobName2\":\"软件研发\",\"jobName3\":\"软件工程师\"},{\"jobId3\":\"9000300220000\",\"jobId2\":\"9000300000000\",\"score\":0.0854516,\"jobId1\":\"9000000000000\",\"jobName1\":\"互联网|通信及硬件\",\"jobName2\":\"软件研发\",\"jobName3\":\"嵌入式软件开发\"},{\"jobId3\":\"9000300020000\",\"jobId2\":\"9000300000000\",\"score\":0.0137648005,\"jobId1\":\"9000000000000\",\"jobName1\":\"互联网|通信及硬件\",\"jobName2\":\"软件研发\",\"jobName3\":\"C\"}]");

    };


    //渲染
    render() {

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const usernameError = isFieldTouched('title') && getFieldError('title');
        return (
            <div>
                <Row>
                    <Col span={4}></Col>
                    <Col span={16}>
                        <Form layout="inline" style={{textAlign:'center'}} onSubmit={this.handleSubmit}>
                            <Form.Item label="标题" validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                                {getFieldDecorator('title', {
                                    rules: [{ required: true, message: '请输入title' }],
                                })(
                                    <Input
                                        style={{width:'255px'}}
                                        placeholder="请输入title"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item label="描述" >
                                {getFieldDecorator('desc', {
                                    rules: [{  message: '请输入desc' }],
                                })(
                                    <Input
                                        style={{width:'355px'}}
                                        placeholder="请输入desc"
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
                                        key={item.jobId1}

                                    >
                                        <List.Item.Meta

                                        />{item.jobName1}  >>  {item.jobName2}  >>  {item.jobName3} >>  {item.score}
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
export default Form.create()(JobTypeClassifier);
