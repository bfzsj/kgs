import React, {Component} from 'react';
import PageHeader from './lib/PageHeader';
import {NavLink} from 'react-router-dom'
import '../App.css';
import { Form, Icon, Input, Button ,Table} from 'antd';
import axios from 'axios';
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class PageC extends React.Component {
    constructor(props) {
        super(props)
        this.addButton = this.addButton.bind(this);
        this.deleteInput=this.deleteInput.bind(this)
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
        console.log(searchword)
        axios.get(url,{
            params:{
                "searchword":searchword,
                "page":1,
                "selectClassEntityId": index
            }
        }).then(function (resopnse) {
            console.log(resopnse)
           /* _this.setState((prevState)=>({
                list:prevState.list.concat(resopnse.data.dataList)
            }))*/
        })
    }

    //渲染
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

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
					{
						this.state.formItems.map(function (val) {
							return <Form.Item >
                                {getFieldDecorator(val.id, {
                                    rules: [{ required: true, message:val.placeholder }],
                                })(
									<Input
										style={{width:'255px'}}
										placeholder={val.placeholder}
									/>,
                                )}

							</Form.Item>

                        })

					}

                    {
                        this.state.formItems.length!=0?
							<Form.Item>
								<Button type="danger" htmlType="button"  onClick={this.deleteInput} >
									×
								</Button>
							</Form.Item> :null
					}

					<Form.Item>
							<Button type="primary" htmlType="button"  onClick={this.addButton} >
								+
							</Button>
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" icon="search" disabled={hasErrors(getFieldsError())}>
							Search
						</Button>
					</Form.Item>
				</Form>

			</div>
        );
    }

    // 组件被卸载
    componentWillUnmount() {

    }
}

export default Form.create()(PageC);
