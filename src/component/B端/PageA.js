import React from 'react';
import '../../App.css';
import { Form, Input, Button ,Table} from 'antd';
import axios from 'axios';
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class PageA extends React.Component {
	constructor(props) {
		super(props)
	}

	state={
		list:[]
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
        var _this=this;

		this.returnData('/get_search_new',searchword1,searchword2,9)
		this.setState({
			list:[]
		})
    };
	returnData(url,searchword1,searchword2,index){
        var _this=this;
		for(let i=1;i<=index;i++){
            axios.get(url,{
                params:{
                    "searchword1":searchword1,
                    "searchword2":searchword2,
                    "page":1,
                    "selectClassEntityId": i
                }
            }).then(function (resopnse) {
            	console.log(resopnse)
                _this.setState((prevState)=>({
                    list:prevState.list.concat(resopnse.data.dataList)
                }))
            })
		}

	}
	//渲染
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const usernameError = isFieldTouched('searchword1') && getFieldError('searchword1');
        const passwordError = isFieldTouched('searchword2') && getFieldError('searchword2');
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                /*render: text => <a>{text}</a>,*/
            },
            {
                title: 'entityId',
                dataIndex: 'entityId',
                key: 'entityId',
            },
            {
                title: 'className',
                dataIndex: 'className',
                key: 'className',
            }
		]
        return (
        	<div style={{marginTop:"20px"}}>
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
				<Table style={{marginTop:"20px",marginBottom:"80px"}} title={() => 'Debug model'} bordered columns={columns} dataSource={this.state.list} pagination={false}/>
			</div>
        );
    }

	// 组件被卸载
	componentWillUnmount() {

	}
}

export default Form.create()(PageA);
