import React from 'react';
import '../../App.css';
import { Form, Avatar,List, Input, Button,Row, Col ,Tag,Table} from 'antd';
import {NavLink} from 'react-router-dom'
import axios from 'axios';
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class JDContent extends React.Component {
    constructor(props) {
        super(props)

    }

    state={
        list:[],
    }

    // 组件装载之后调用
    componentDidMount() {
        this.returnData("/JDContent",(response) => {
            let array=response.data;
			for(let i=0;i<5;i++){
				array[i].content=this.light(array[i].content,array[i].search,"hightyellow");
			}
            this.setState({
                list:array
            })
        })
    }
    light(contents, key, color){
        let content = contents || "";
        let keyWord = key || "";
        let keyColor = color || "red";
        if (content != "" && keyWord != "") {
            let pattern = new RegExp("."+keyWord);
            let html = content; //可使用innerHTML替换
            html = html.replace(pattern, "<font color='" + keyColor + "'>" + keyWord + "</font>");
            return html;//可使用innerHTML替换
        }
        return "";
    }
    returnData(url,callback){
        let _this=this;
        axios.get(url,{

        }).then(function (response) {
            callback(response);
        })
    }

	onClick(current, pageSize) {
		let arr=this.state.list;
		let length=current*pageSize>arr.length?arr.length:current*pageSize;
	
		for(let i=(length-pageSize);i<length;i++){
			arr[i].content=this.light(arr[i].content,arr[i].search,"hightyellow");
		}
		this.setState({
                list:arr
            })
		console.log(current,pageSize)
	}
    //渲染
    render() {
		let pagination = {
			pageSize:5 ,
			position:"top",
			onChange:(current,pageSize) => {
				
				 this.onClick(current, pageSize)
			}
		}
		const columns = [
		  {
			title: 'JDNumber',
			dataIndex: 'JDNumber',
			key: 'JDNumber',
		  },
		  {
			title: '内容',
			dataIndex: 'content',
			key: 'content',
			render:(text)=>{
                    
                    return <div dangerouslySetInnerHTML={{__html:text}}></div>
                }
			
		  },
		];
        return (
            <div>
                <Row>
                    <Col span={4}></Col>
                    <Col span={16}>
                        <Table dataSource={this.state.list} columns={columns} pagination={pagination} />
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
export default Form.create()(JDContent);
