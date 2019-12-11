import React from 'react';
import '../../App.css';
import { Form,Row, Col ,Table} from 'antd';
import axios from 'axios';

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
		
            this.setState({
                list:array
            })
        })
        this.returnData("http://zpsearch.zhaopin.com/mg/job/list?access_token=551c619ef13c45debe92a64880f5e1cdlzJv&orgId=12001997&jobState=publish&page=1",(response) => {
            console.log(response)
        })
    }
    
    returnData(url,callback){
        let _this=this;
        axios.get(url,{

        }).then(function (response) {
            callback(response);
        })
    }

	
    //渲染
    render() {
		let pagination = {
			pageSize:5 ,
			position:"top",
			
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
			render: (text) => {
				return <div  dangerouslySetInnerHTML={{__html: text}}></div>
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
