import React from 'react';
import '../../App.css';
import '../../css/lib/reset.css'
import {AutoComplete , Form, Input, Button ,Table,List,Card} from 'antd';
import axios from 'axios';
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class industry extends React.Component {
    constructor(props) {
        super(props)
    }

    state={
        list:[],
        dataSource:[],
        displayName:false,
        search:"",
        HashMap:new Map()
    }
    // 组件装载之后调用
    componentDidMount() {
        this.props.form.validateFields();
        let dataSource=[]
        let that=this;
        let map=new Map();
        this.getJson((data)=>{
            for(let i=0;i<data.length;i++){
                console.log(data[i])
                dataSource.push(""+data[i]["industry_code"]+"");
                dataSource.push(data[i]["industry_name"]);
                map.set(""+data[i]["industry_code"]+"",[data[i]]);
                map.set(data[i]["industry_name"],[data[i]])
            }
            that.setState({
                dataSource:dataSource,
                HashMap:map
            })
        })
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
        if(this.state.HashMap.has(searchword1)){
            listData=this.state.HashMap.get(searchword1)
        }
        /*for(let i=0;i<this.state.searchData.length;i++){
            if(this.state.searchData[i]["industry_code"]==searchword1||this.state.searchData[i]["industry_name"].indexOf(searchword1)>-1){
                listData.push(this.state.searchData[i]);
                break;
            }
        }*/
        that.setState({
            list:listData
        })

    };

    getJson(callback){
        axios.get("./industries_kw.json")
            .then(function (res) {
                let data=res.data;
                callback(data)
            })

    }
    //渲染
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const dataSource=this.state.dataSource;
        // Only show error after a field is touched.
        let search=""
        const usernameError = isFieldTouched('searchword1') && getFieldError('searchword1');
        const columns = [
            {
                title: '行业ID',
                dataIndex: 'industry_code',
                key: 'industry_code',
				/*render: text => <a>{text}</a>,*/
            },
            {
                title: '行业名称',
                dataIndex: 'industry_name',
                key: 'industry_name',
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
                            <AutoComplete
                                style={{ width: 255 }}
                                dataSource={dataSource}
                                placeholder="请输入id或者name"
                                open={this.state.displayName}
                                filterOption={(inputValue, option) =>
                                option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                                onSearch={(value)=>{
                                    let bool= value !== "" ? true:false
                                    this.setState({
                                        displayName:bool,
                                        search:value
                                    })
                                }}
                                onChange={(value)=>{
                                    let bool= value !== "" ? true:false
                                    this.setState({
                                        displayName:bool,
                                        search:value
                                    })
                                }}
                                onBlur={()=>{
                                    this.setState({
                                        displayName:false,
                                    })
                                }}
                                onFocus={()=>{
                                    let bool=this.state.search!==""?true:false
                                    this.setState({
                                        displayName:bool
                                    })
                                }}
                                onSelect={(value)=>{
                                    console.log(value)
                                    let listData=this.state.HashMap.get(value)
                                    this.setState({
                                        list:listData,
                                        displayName:false
                                    })
                                }}
                            />
                        )}
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" icon="search" disabled={hasErrors(getFieldsError())}>
							Search
						</Button>

					</Form.Item>
				</Form>
				<Table style={{marginTop:"20px",marginBottom:"80px"}} title={() => '行业查询'} bordered columns={columns} dataSource={this.state.list} pagination={false}/>
			</div>
        );
    }

    // 组件被卸载
    componentWillUnmount() {

    }
}

export default Form.create()(industry);
