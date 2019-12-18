import React from 'react';
import '../../App.css';
import { message,Form,List, Card,Select,Input , Button,Row, Col ,Tag,Table} from 'antd';
import {ParamUtil} from '../../utils/ParamUtil'
import axios from 'axios';
const {Option} =Select
const {TextArea}=Input
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class CVJD extends React.Component {
    constructor(props) {
        super(props)

    }

    state={
        CVList:[],
        JDList:[],

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
        let {CVJDList}=val;
        CVJDList=CVJDList!==undefined?CVJDList:''
        console.log(CVJDList)
        let list=CVJDList.split("\n");
        let [CV,JD,CVRequest,JDRequest]=[[],[],[],[]]
        list.forEach((item)=>{
            let temp=item.split(" ")
            JD.push(temp[0]);
            CV.push(temp[1]);
        })
        JD.forEach((item,index)=>{
            JDRequest.push(new Promise((resolve,reject)=>{
                axios.get("http://zpsearch.zhaopin.com/caption/captionService/get?type=jobs&format=list&",{
                    params:{"id":item}
                }).then(function (response) {
                    resolve(response.data.data.value);
                })
            }))
            CVRequest.push(new Promise((resolve,reject)=>{
                axios.post("http://zhiliankg-schema.zhaopin.com/getJDCV",{
                    'type':'resume','format':'list','ids':[CV[index]].toString()
                }).then(function (response) {
                    if(response.data!="")
                    resolve(JSON.parse(response.data).data[0].value);
                })
            }))
        })
        let that=this
        let temp=[]
        Promise.all(CVRequest).then((values)=>{

            if(values[0]!=null) {
                values.forEach((item) => {
                    temp.push(this.returnCv(item))
                })
            }
            console.log(1)
        }).then(function (response) {
            Promise.all(JDRequest).then((values)=>{
                if(values[0]!=null) {
                    values.forEach((item,index) => {
                        let v=that.returnJD(item);
                        Object.keys(v).forEach((items)=>{
                            temp[index][items]=v[items]
                        })

                    })
                }
                console.log(2)
                console.log(temp)
                that.setState({
                    JDList:temp
                })
            })
        })


        console.log(JD,CV)

    };

    returnCv(data) {
        console.log(data.id)
        let tempData = ParamUtil.resume(data);
        tempData['CvSolrUrl'] = '#/main/detailPage?indexRid=' + data.id;
        tempData['CvAliSolrUrl'] = '#/main/detailPage?indexAliRid=' + data.id;
        tempData['CvCaptionUrl'] = '#/main/detailPage?captionRid=' + data.id;
        return tempData
    }

    returnJD(data){
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
        positionInfo.jobNumber = data['number'];
        positionInfo.jobTitle = data['jobName'];
        positionInfo.educationId = data['eduLevel'].code;

        positionInfo.jobLevelCode1 = data['superJobType']['firstLevel'].id;
        positionInfo.jobLevelName1 = data['superJobType']['firstLevel'].name;
        if (data['superJobType']['secondLevel'] !== undefined &&
            data['superJobType']['secondLevel'] !== null) {
            positionInfo.jobLevelCode2 = data['superJobType']['secondLevel'].id;
            positionInfo.jobLevelName2 = data['superJobType']['secondLevel'].name;
        }
        if (data['superJobType']['thirdLevel'] !== undefined &&
            data['superJobType']['thirdLevel'] !== null) {
            positionInfo.jobLevelCode3 = data['superJobType']['thirdLevel'].id;
            positionInfo.jobLevelName3 = data['superJobType']['thirdLevel'].name;
            positionInfo.newJobSubTypeId = data['superJobType']['thirdLevel'].id;
            positionInfo.newJobSubTypeName = data['superJobType']['thirdLevel'].name;
        }
        positionInfo.cityId = data['city']['items'][0].code;
        positionInfo.workYear = data['workingExp'].name;
        positionInfo.salary = data['salary'].min + ' ~ ' + data['salary'].max;
        positionInfo.minSalary = data['salary'].min;
        positionInfo.maxSalary = data['salary'].max;
        positionInfo.educationName = data['eduLevel'].name;
        positionInfo.cityName = data['city']['items'][0].name;
        positionInfo.workYearId = data['workingExp'].code;
        positionInfo.JDsolrUrl = '#/main/detailPage?indexPid=' + data['number'];
        positionInfo.JDaliSolrUrl = '#/main/detailPage?aliSolrPid=' + data['number'];
        positionInfo.JDcaptionUrl = '#/main/detailPage?captionPid=' + data['number'];
        positionInfo.JDpositionURL = 'http://jobs.zhaopin.com/' + data['number'] + '.htm'
        positionInfo.companyId=data.company.id;
        positionInfo.orgName = data.company.name;

        return positionInfo
    }
    //渲染
    render() {
        const JDColumn=[
            /*{dataIndex: 'JDsolrUrl', title: 'JDsolr',key: 'JDsolrUrl',fixed:'right',width:"100px",
                render:(text)=>{
                    return <a href={"http://zpsearch.zhaopin.com"+text} target="_blank">JDsolr</a>
                }
            },
            {dataIndex: 'JDaliSolrUrl', title: 'JDali-solr',key: 'JDaliSolrUrl',fixed:'right',width:"100px",
                render:(text)=>{
                    return <a href={"http://zpsearch.zhaopin.com"+text} target="_blank">JDali-solr</a>
                }
            },*/
            ...ParamUtil.JDColumn,
            {dataIndex: 'fen', title: '分割',key: 'fen',width:"50px",

            },

        ]
        JDColumn.splice(8,1)
        JDColumn.splice(0,1)
        const CVColumn=[
            /*{dataIndex: 'CvSolrUrl', title: 'CVsolr',key: 'CvSolrUrl',fixed:'right',width:"100px",
                render:(text)=>{
                    return <a href={"http://zpsearch.zhaopin.com"+text} target="_blank">CVsolr</a>
                }
            },
            {dataIndex: 'CvAliSolrUrl', title: 'CVali-solr',key: 'CvAliSolrUrl',fixed:'right',width:"100px",
                render:(text)=>{
                    return <a href={"http://zpsearch.zhaopin.com"+text} target="_blank">CVali-solr</a>
                }
            },*/

            ...ParamUtil.ResumeSelectColumns,
            {dataIndex: 'JDcaptionUrl', title: 'JD',key: 'JDcaptionUrl',fixed:'right',width:"100px",
                render:(text,row)=>{
                    return <div>
                        <a href={"http://zpsearch.zhaopin.com"+text} target="_blank">JDcaption</a><br/>
                        <a href={"http://zpsearch.zhaopin.com"+row.JDaliSolrUrl} target="_blank">JDali-solr</a><br/>
                        <a href={"http://zpsearch.zhaopin.com"+row.JDsolrUrl} target="_blank">JDsolr</a>
                    </div>
                }
            },
            {dataIndex: 'CvCaptionUrl', title: 'CV',key: 'CvCaptionUrl',fixed:'right',width:"100px",
                render:(text,row)=>{
                    return <div>
                        <a href={"http://zpsearch.zhaopin.com"+text} target="_blank">CVcaption</a><br/>
                        <a href={"http://zpsearch.zhaopin.com"+row.CvAliSolrUrl} target="_blank">CVali-solr</a><br/>
                        <a href={"http://zpsearch.zhaopin.com"+row.CvSolrUrl} target="_blank">CVsolr</a>
                    </div>
                }
            },

        ]
        CVColumn.splice(16,1);
        CVColumn.splice(15,1);
        CVColumn.splice(14,1);
        CVColumn.splice(12,1);
        CVColumn.splice(11,1);
        CVColumn.splice(9,1);
        CVColumn.splice(7,1);
        CVColumn.splice(1,1);
        CVColumn.splice(0,1);
        const Column=[
            ...JDColumn,...CVColumn,
        ]
        console.log(Column)
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const usernameError = isFieldTouched('CVJDList') && getFieldError('CVJDList');
        return (
            <div>
                <Row>
                    <Col span={5}></Col>
                    <Col span={14}>
                        <Form layout="inline" style={{textAlign:'center'}} onSubmit={this.handleSubmit}>
                            <Form.Item label="CVJD列表" validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                                {getFieldDecorator('CVJDList', {
                                    rules: [{ required: true, message: '请输入CVJD内容' }],
                                })(
                                    <TextArea
                                        defaultValue=""
                                        cols="60"
                                        placeholder="请输入CVJD内容"
                                        autoSize={{minRows:5}}
                                        style={{overflow:"hidden"}}
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
                    <Col span={5}></Col>
                </Row>
                <Row style={{marginBottom:70}}>

                    <Col span={24}>
                        <Table dataSource={this.state.JDList}  bordered columns={Column} pagination={{pageSize:30 }} scroll={{ x: 1500}}
                        />
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
export default Form.create()(CVJD);
