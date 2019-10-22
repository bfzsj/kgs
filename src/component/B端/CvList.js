import React, {Component} from 'react';
import PageHeader from '../lib/PageHeader';
import {NavLink} from 'react-router-dom'
import '../../App.css';
import { Form, Icon,Avatar,List} from 'antd';
import axios from 'axios';
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class CvList extends React.Component {
    constructor(props) {
        super(props)
    }


    // 组件装载之后调用
    componentDidMount() {

    }

    //渲染
    render() {
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
                <div style={{width:'810px',margin:'auto',backgroundColor:'white'}}>
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={data}
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
                                    avatar={<Avatar src={item.avatar} />}
                                    title={<a href={item.href}>{item.title}</a>}
                                    description={item.description}
                                />
                                {item.content}
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        );
    }

    // 组件被卸载
    componentWillUnmount() {

    }
}

export default Form.create()(CvList);
