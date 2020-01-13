import React from 'react';
import '../../App.css';
import { message,Form, Select,Input , Button,Row, Col ,Tag,Table} from 'antd';
import {ParamUtil} from '../../utils/ParamUtil'
import axios from 'axios';
const {Option} =Select
const {TextArea}=Input

class captionRatio extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange.bind(this)
    }

    state={
        list:[],
        sortItems:ParamUtil.getSort(),
        first:ParamUtil.getSort()[0].value,
        second:ParamUtil.getSort()[1].value,
        firstData:[],
        secondData:[],
        tempObj:{},
        firstUrl:'',
        secondUrl:'',
    }

    // 组件装载之后调用
    componentDidMount() {
        this.returnData("http://zhiliankg-schema.zhaopin.com/commonGet",{url:"http://zpsearch.zhaopin.com/mg/job/list?access_token=551c619ef13c45debe92a64880f5e1cdlzJv&orgId=12001997&jobState=publish&page=1"},(response) => {
            console.log(response.data.data.dataList)
            this.getPositionIDsList(response.data.data.dataList)
        })
        axios.post("http://zhiliankg-schema.zhaopin.com/getJDCV",{
        'type':'resume','format':'list','ids':['JI268470736R90500000000_1'].toString()
        }).then(function (response) {
            console.log(JSON.parse(response.data));
        })
    }

    returnData(url,obj,callback){
        axios.get(url,{
            params:obj
        }).then(function (response) {
            callback(response);
        })
    }

    getURLParamsObj(positionInfo,gray) {
        // 入参
        let paramsObj={}
        paramsObj.S_EXCLUSIVE_COMPANY =this.UrlEncode( positionInfo.orgName!==undefined ?positionInfo.orgName:'智联招聘');
        paramsObj.UserId = '1024416334';
        paramsObj.CompanyId = positionInfo.companyId!==undefined?positionInfo.companyId:'12001997';
        paramsObj.DepartmentId = '12001997';
        paramsObj.S_DISCLOSURE_LEVEL = '2';
        paramsObj.S_KEYWORD = this.UrlEncode(positionInfo.jobTitle.replace('-', '').replace('/', ''));
        paramsObj.jobNumber = positionInfo.jobNumber;
        paramsObj.rows = 30;
        paramsObj.solrDebug = false;
        paramsObj.debug = true;
        paramsObj.ip = 'zpsearch.zhaopin.com';
        paramsObj.S_CV_ACTIVE_TIME_LAST = ParamUtil.getLogTimeInfo(7);
        paramsObj.sort = 'complex_v173';
        paramsObj.S_CURRENT_CITY = positionInfo.cityId;
        paramsObj.R_EDUCATION = positionInfo.educationId;
        paramsObj.R_WORK_YEARS = ParamUtil.getWorkTimeInfo(positionInfo.workYearId);
        paramsObj.client = 'zpsearch';
        paramsObj.gray_router = gray;
        paramsObj.useCtr = 1;
        /*let str=""
        Object.keys(paramsObj).forEach((item,index)=>{
            str=str+item+"="+paramsObj[item]+"&"
        })*/
        return this.getUrl("",paramsObj);
    }

    UrlEncode(str)
    {
        return this.transform(str);
    }
    transform(s)
    {
        var hex=''
        var i,j,t

        j=0
        for (i=0; i<s.length; i++)
        {
            t = this.hexfromdec( s.charCodeAt(i) );
            if (t=='25')
            {
                t='';
            }
            hex += '%' + t;
        }
        return hex;
    }

    hexfromdec(num) {
        if (num > 65535) { return ("err!") }
        let first = Math.round(num/4096 - .5);
        let temp1 = num - first * 4096;
        let second = Math.round(temp1/256 -.5);
        let temp2 = temp1 - second * 256;
        let third = Math.round(temp2/16 - .5);
        let fourth = temp2 - third * 16;
        return (""+this.getletter(third)+this.getletter(fourth));
    }

    getletter(num) {
        if (num < 10) {
            return num;
        }
        else {
            if (num == 10) { return "A" }
            if (num == 11) { return "B" }
            if (num == 12) { return "C" }
            if (num == 13) { return "D" }
            if (num == 14) { return "E" }
            if (num == 15) { return "F" }
        }
    }

    getPositionIDsList(positionList) {
        // 区分是否是通过职位id进行的精确查询
        this.setState({
            list:[]
        })
        let positionLists = [];
        for (let i = 0; i < positionList.length; i++) {
            const positionInfo = {
                jobNumber: positionList[i]['jobNumber'],
                jobTitle: positionList[i]['jobTitle'],
                educationId: positionList[i]['educationId'],
                jobLevelCode2: positionList[i]['newJobType'].id,
                jobLevelName2: positionList[i]['newJobType'].name,
                jobLevelCode3: positionList[i]['newJobSubType'].id,
                jobLevelName3: positionList[i]['newJobSubType'].name,
                cityId: positionList[i]['cityId'],
                workYear: positionList[i]['workAgeId'],
                salary: positionList[i]['minSalary'] + ' ~ ' + positionList[i]['maxSalary'],
                minSalary: positionList[i]['minSalary'],
                maxSalary: positionList[i]['maxSalary'],
                workYearName: positionList[i]['workAge'],
                workYearId: positionList[i]['workAgeId'],
                educationName: positionList[i]['education'],
                cityName: positionList[i]['cityName'],
                solrUrl: '#/main/detailPage?indexPid=' + positionList[i]['jobNumber'],
                aliSolrUrl: '#/main/detailPage?aliSolrPid=' + positionList[i]['jobNumber'],
                captionUrl: '#/main/detailPage?captionPid=' + positionList[i]['jobNumber'],
                positionURL: 'http://jobs.zhaopin.com/' + positionList[i]['jobNumber'] + '.htm'
            };
            if (positionList[i].cityList) {
                const citySize = positionList[i].cityList.length;
                positionInfo.cityId = positionList[i].cityList[citySize - 1].cityId;
                positionInfo.cityName = positionList[i].cityList[citySize - 1].cityName;
            }
            positionLists.push(positionInfo);
        }

        this.setState({
            list:positionLists
        })
    }

    getUrl(url,param){
        let str=''
        Object.keys(param).forEach((item)=>{
            str+= (item+'='+param[item]+'&')
        })
        return url+str;
    }
    onPositionSelectHandler(data){
        this.setState({
            tempObj:data
        })
        let firstDataObj=this.getURLParamsObj(data,this.state.first)
        this.returnData("http://zhiliankg-schema.zhaopin.com/commonGet?",{url:"http://zpsearch.zhaopin.com/talents?"+firstDataObj},(response) => {
            console.log(response)
            let temp=[]
            for (let i = 0; i < response.data.results.length; i++) {
                let dataObj = ParamUtil.resume(response.data.results[i]);
                temp.push(dataObj);
            }
            document.querySelector("#first").value=this.getUrl(response.config.url,response.config.params)
            this.setState({
                firstUrl:this.getUrl(response.config.url,response.config.params),
                firstData:temp
            })
        })
        let secondDataObj=this.getURLParamsObj(data,this.state.second)
        this.returnData("http://zhiliankg-schema.zhaopin.com/commonGet?",{url:"http://zpsearch.zhaopin.com/talents?"+secondDataObj},(response) => {
            let temp=[]
            for (let i = 0; i < response.data.results.length; i++) {
                let dataObj = ParamUtil.resume(response.data.results[i]);
                temp.push(dataObj);
            }
            document.querySelector("#second").value=this.getUrl(response.config.url,response.config.params)
            this.setState({
                secondUrl:this.getUrl(response.config.url,response.config.params),
                secondData:temp
            })
        })
    }

    handleChange(num,value) {
        let DataObj=this.getURLParamsObj(this.state.tempObj,value);
        this.returnData("http://zhiliankg-schema.zhaopin.com/commonGet?",{url:"http://zpsearch.zhaopin.com/talents?"+DataObj},(response) => {
            if(num==="first"){
                this.setState({
                    first:value,
                })
            }else if(num==="second"){
                this.setState({
                    second:value,
                })
            }
        })


    }

    handleSubmit = e => {
        let jobName=(e.target[0].value)
        let arr=[]
        this.returnData("http://zhiliankg-schema.zhaopin.com/commonGet",{"url":"http://s-dp-caption.zpidc.com/caption/captionService/get?type=jobs&format=list&id="+jobName},(response) => {
            let data=response.data;
            if (data.code === 200) {
                if (data.data.status === 'NOT_FOUND') {
                    message.info(data.data.status + ',未查询到该职位');
                    return;
                }
                console.info(data.data);
                let positionInfo = {
                    jobNumber: '',
                    jobTitle: '',
                    educationId: '',
                    newJobSubTypeId: '',
                    newJobSubTypeName: '',
                    jobLevelCode1: '',
                    jobLevelName1: '',
                    jobLevelCode2: '',
                    jobLevelName2: '',
                    jobLevelCode3: '',
                    jobLevelName3: '',
                    cityId: '',
                    workYear: '',
                    salary: '',
                    minSalary: '',
                    maxSalary: '',
                    educationName: '',
                    cityName: '',
                    workYearId: '',
                    solrUrl: '',
                    aliSolrUrl: '',
                    captionUrl: '',
                    positionURL: ''
                };
                positionInfo.jobNumber = data.data['id'];
                positionInfo.jobTitle = data.data.value['jobName'];
                positionInfo.educationId = data.data.value['eduLevel'].code;

                positionInfo.jobLevelCode1 = data.data.value['superJobType']['firstLevel'].id;
                positionInfo.jobLevelName1 = data.data.value['superJobType']['firstLevel'].name;
                if (data.data.value['superJobType']['secondLevel'] !== undefined &&
                    data.data.value['superJobType']['secondLevel'] !== null) {
                    positionInfo.jobLevelCode2 = data.data.value['superJobType']['secondLevel'].id;
                    positionInfo.jobLevelName2 = data.data.value['superJobType']['secondLevel'].name;
                }
                if (data.data.value['superJobType']['thirdLevel'] !== undefined &&
                    data.data.value['superJobType']['thirdLevel'] !== null) {
                    positionInfo.jobLevelCode3 = data.data.value['superJobType']['thirdLevel'].id;
                    positionInfo.jobLevelName3 = data.data.value['superJobType']['thirdLevel'].name;
                    positionInfo.newJobSubTypeId = data.data.value['superJobType']['thirdLevel'].id;
                    positionInfo.newJobSubTypeName = data.data.value['superJobType']['thirdLevel'].name;
                }
                positionInfo.cityId = data.data.value['city']['items'][0].code;
                positionInfo.workYear = data.data.value['workingExp'].name;
                positionInfo.salary = data.data.value['salary'].min + ' ~ ' + data.data.value['salary'].max;
                positionInfo.minSalary = data.data.value['salary'].min;
                positionInfo.maxSalary = data.data.value['salary'].max;
                positionInfo.educationName = data.data.value['eduLevel'].name;
                positionInfo.cityName = data.data.value['city']['items'][0].name;
                positionInfo.workYearId = data.data.value['workingExp'].code;
                positionInfo.solrUrl = '#/main/detailPage?indexPid=' + data.data['id'];
                positionInfo.aliSolrUrl = '#/main/detailPage?aliSolrPid=' + data.data['id'];
                positionInfo.captionUrl = '#/main/detailPage?captionPid=' + data.data['id'];
                positionInfo.positionURL = 'http://jobs.zhaopin.com/' + data.data['id'] + '.htm'
                positionInfo.companyId=data.data.value.company.id;
                positionInfo.orgName = data.data.value.company.name;
                arr.push(positionInfo);
                this.setState({
                    list:arr,
                })
                this.onPositionSelectHandler(positionInfo)
            }
        })
        //http://zpsearch.zhaopin.com/caption/captionService/get?type=jobs&format=list&id=CC120019970J00221672411
    }

    handleUrl(num,e){
        let str=e.target[0].value
        str=str.replace("http://zhiliankg-schema.zhaopin.com/commonGet?url=http://zpsearch.zhaopin.com/talents?","")
        console.log(str)
        this.returnData("http://zhiliankg-schema.zhaopin.com/commonGet?",{url:"http://zpsearch.zhaopin.com/talents?"+str},(response) => {
            let temp=[]
            for (let i = 0; i < response.data.results.length; i++) {
                let dataObj = ParamUtil.resume(response.data.results[i]);
                temp.push(dataObj);
            }
            if(num===1){
                this.setState({
                    firstUrl:this.getUrl(response.config.url,response.config.params),
                    firstData:temp
                })
            }else if(num===2){
                this.setState({
                    secondUrl:this.getUrl(response.config.url,response.config.params),
                    secondData:temp
                })
            }
        })
    }
    //渲染
    render() {
		let pagination = {
			pageSize:5 ,
			
		}
		const columns = [
            {dataIndex: 'jobNumber', title: '职位ID',key: 'jobNumber' },
            {dataIndex: 'jobTitle', title: '职位名称',key: 'jobTitle'},
            {dataIndex: 'cityId', title: '发布地Id',key: 'cityId'},
            {dataIndex: 'cityName', title: '职位发布地', key: 'cityName'},
            {dataIndex: 'jobLevelCode2', title: '二级职类', key: 'jobLevelCode2'},
            {dataIndex: 'jobLevelName2', title: '二级职类', key: 'jobLevelName2'},
            {dataIndex: 'jobLevelCode3', title: '三级职类', key: 'jobLevelCode3'},
            {dataIndex: 'jobLevelName3', title: '三级职类', key: 'jobLevelName3'},
            {dataIndex: 'educationId', title: '学历要求', key: 'educationId'},
            {dataIndex: 'educationName', title: '学历要求', key: 'educationName'},
            {dataIndex: 'salary', title: '薪资范围', key: 'salary'},
            {dataIndex: 'workYearId', title: '年限', key: 'workYearId'},
		];
		let columsSelect = ParamUtil.ResumeSelectColumns;
        return (
            <div>
                <Form layout="inline" style={{textAlign:'center'}} onSubmit={this.handleSubmit}>
                    <Form.Item >
                            <Input
                                defaultValue={"CC120019970J00221672411"}
                                style={{width:'255px'}}
                                placeholder="请输入关键词1"
                            />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" icon="search" >
                            Search
                        </Button>
                    </Form.Item>
                </Form>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <Table dataSource={this.state.list} columns={columns} pagination={pagination}
                               onRow={record => {
                                   return {
                                       onClick: event => {
                                           this.onPositionSelectHandler(record)
                                       },
                                   };
                               }}
                        />
                    </Col>
                    <Col span={1}></Col>
                </Row>
                <Row>
                    <Col span={1}></Col>
                    <Col span={7}>
                        <Form layout="inline" style={{textAlign:'center'}} onSubmit={this.handleUrl.bind(this,1)}>
                            <Form.Item >
                                <TextArea
                                    id="first"
                                    style={{width:'300px'}}
                                    placeholder="生成url"
                                    autoSize={{minRows:17}}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" icon="search" >
                                    请求
                                </Button>

                            </Form.Item>
                        </Form>
                        <Select
                            defaultValue={this.state.first}
                            style={{ width: '100%' }}
                            onChange={this.handleChange.bind(this,"first")}
                            size="large"
                        >
                            {this.state.sortItems.map((item,index) => (
                                <Option key={item.value} >{item.value}</Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={8}>
                    </Col>
                    <Col span={7}>
                        <Form layout="inline" style={{textAlign:'center'}} onSubmit={this.handleUrl.bind(this,2)}>
                            <Form.Item >
                                <TextArea
                                    id="second"
                                    style={{width:'300px'}}
                                    placeholder="生成url"
                                    autoSize={{minRows:17}}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" icon="search" >
                                    请求
                                </Button>

                            </Form.Item>
                        </Form>
                        <Select
                            defaultValue={this.state.second}
                            style={{ width: '100%' }}
                            onChange={this.handleChange.bind(this,"second")}
                            size="large"
                        >
                            {this.state.sortItems.map((item,index) => (
                                <Option key={item.value} >{item.value}</Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={1}></Col>
                </Row>
                <Row style={{marginBottom:70}}>
                    <Col span={11}>
                        <Table dataSource={this.state.firstData}  bordered columns={columsSelect} pagination={{pageSize:30 ,position:"top"}} scroll={{ x: 1500}}/>
                    </Col>
                    <Col span={2}>

                    </Col>
                    <Col span={11}>
                        <Table dataSource={this.state.secondData}  bordered columns={columsSelect} pagination={{pageSize:30 ,position:"top"}} scroll={{ x: 1500}}/>

                    </Col>
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
export default Form.create()(captionRatio);
