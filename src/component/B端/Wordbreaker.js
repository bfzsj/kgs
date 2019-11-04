import React, {Component} from 'react';
import PageHeader from '../lib/PageHeader';
import {NavLink} from 'react-router-dom'
import '../../App.css';
import { Form, Icon,Avatar,List, Input, Button,Row, Col } from 'antd';
import axios from 'axios';
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class Wordbreaker extends React.Component {
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
        let {searchword1}=val;
        var _this=this;
        console.log(searchword1)
        axios.get("http://172.30.25.201:8888/KgApi/nlp",{
            params:{
                "content":searchword1 == undefined? "跟单教管照护吧员java开发工程师":searchword1
            }
        }).then(function (resopnse) {
            console.log(resopnse)
            let data=[]
            let keys = Object.keys(resopnse.data);
            keys.forEach((item)=>{
                data.push({
                    title:item,
                    content:resopnse.data[item]
                })
            });
            _this.setState({
                list:data
            })
        })
       // http://industryjobclassify.zpidc.com/KgApi/nlp?content=%E8%B7%9F%E5%8D%95%E6%95%99%E7%AE%A1%E7%85%A7%E6%8A%A4%E5%90%A7%E5%91%98java%E5%BC%80%E5%8F%91%E5%B7%A5%E7%A8%8B%E5%B8%88
    };


    //渲染
    render() {

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const usernameError = isFieldTouched('searchword1') && getFieldError('searchword1');
        const sxd={
            href: 'http://ant.design',
            title: `ant design part `,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description:
                'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure)',
        };
        const data=[];
        data.push(sxd);
        return (
            <div>
                <Row>
                    <Col span={4}></Col>
                    <Col span={16}>
                        <Form layout="inline" style={{textAlign:'center'}} onSubmit={this.handleSubmit}>
                            <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                                {getFieldDecorator('searchword1', {
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
                                            title={<a >{item.title}</a>}
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
    }

    // 组件被卸载
    componentWillUnmount() {

    }
}

export default Form.create()(Wordbreaker);
