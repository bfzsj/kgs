import React from 'react';
import '../../App.css';
import '../../css/lib/reset.css'
import { Form, Input, Button ,Table,List,Card} from 'antd';
import axios from 'axios';
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class job extends React.Component {
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
        let val={}
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            val=values;
        });
        let {searchword1}=val;
        console.log(searchword1)
        let that=this;
        let listData=[]
        this.getJson((data)=>{
            for(let i=0;i<data.length;i++){
                if(data[i]["subtype_code"]==searchword1||data[i]["subtype_name"].indexOf(searchword1)>-1){
                    listData.push(data[i]);
                    break;
                }
            }

            that.setState({
                list:listData
            })
        })

    };

    getJson(callback){
        axios.get("./view_file.json")
            .then(function (res) {
                let data=res.data;
                callback(data)
            })

    }
    //渲染
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const usernameError = isFieldTouched('searchword1') && getFieldError('searchword1');
        const columns = [
            {
                title: '职类ID',
                dataIndex: 'subtype_code',
                key: 'subtype_code',
				/*render: text => <a>{text}</a>,*/
            },
            {
                title: '职类名称',
                dataIndex: 'subtype_name',
                key: 'subtype_name',
            },
            {
                title: '关键词  >>  chi',
                dataIndex: 'keywords',
                key: 'keywords',
                render:(text,row)=>{
                    return <div>
                        <List
                            dataSource={text}
                            renderItem={item => (
                                <List.Item style={{marginBottom:0}}>
                                    {item.keyword}  >>  {item.chi}
                                </List.Item>
                            )}
                        />
                    </div>
                }
            }
        ]
        return (
			<div style={{marginTop:"20px"}}>
				<Form layout="inline" style={{textAlign:'center'}} onSubmit={this.handleSubmit}>
					<Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                        {getFieldDecorator('searchword1', {
                            rules: [{ required: true, message: '请输入id或者name' }],
                        })(
							<Input
								style={{width:'255px'}}
								placeholder="请输入id或者name"
							/>,
                        )}
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" icon="search" disabled={hasErrors(getFieldsError())}>
							Search
						</Button>

					</Form.Item>
				</Form>
				<Table style={{marginTop:"20px",marginBottom:"80px"}} title={() => '职类查询'} bordered columns={columns} dataSource={this.state.list} pagination={false}/>
			</div>
        );
    }

    // 组件被卸载
    componentWillUnmount() {

    }
}

export default Form.create()(job);
