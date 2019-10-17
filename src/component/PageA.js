import React, {Component} from 'react';
import PageHeader from './lib/PageHeader';
import {NavLink} from 'react-router-dom'
import '../App.css';
import { Form, Icon, Input, Button } from 'antd';
import axios from 'axios'
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class PageA extends React.Component {
	constructor(props) {
		super(props)
	}

	// 组件装载之后调用
	componentDidMount() {
		this.props.form.validateFields();
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
        let {searchword1,searchword2}=val;
		console.log(searchword2)
        /*axios.get({
			url:'get_search_new',
			data:{
				"searchword1":searchword1,
				"searchword2":searchword2,
                "page":8,
			},
            contentType: 'application/json;charset=UTF-8',

            dataType: "json",
            async: true,
		}).then(function (resopnse) {
			console.log(resopnse)
        })*/
        axios.get('/get_search_new',{
        	params:{
                "searchword1":searchword1,
                "searchword2":searchword2,
                "page":1,
                "selectClassEntityId": "8"
			}
		}).then(function (resopnse) {
            console.log(resopnse)
        })

    };
	//渲染
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const usernameError = isFieldTouched('searchword1') && getFieldError('searchword1');
        const passwordError = isFieldTouched('searchword2') && getFieldError('searchword2');
        return (
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
				<Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                    {getFieldDecorator('searchword2', {
                        rules: [{ required: true, message: '请输入关键词2' }],
                    })(
						<Input
							style={{width:'255px'}}

							placeholder="请输入关键词2"
						/>,
                    )}
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" icon="search" disabled={hasErrors(getFieldsError())}>
						Search
					</Button>

				</Form.Item>
			</Form>
        );
    }

	// 组件被卸载
	componentWillUnmount() {

	}
}

export default Form.create()(PageA);
