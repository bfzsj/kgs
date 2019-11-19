import React from 'react';
import '../../App.css';
import { Form, Input, Button ,Table} from 'antd';
import axios from 'axios';

class Caption extends React.Component {
	constructor(props) {
		super(props);
		let _this=this;
		let id=window.location.hash.split("/").pop();
        axios.get("CaptionDetails",{
            params:{
                "resumeNumber":id,
            }
        }).then(function (response) {
            let data=(JSON.parse(response.data.data));
            let listData=[];
            Object.keys(data).forEach((item)=>{
                listData.push({
                    keys:item,
                    value:data[item]
                })
            })
            console.log(listData);
            _this.setState({
                list:listData,
            })
            console.log(_this.state.list)
        })

		//{"WorkExperience":[{"endDate":0,"companyName":"武汉辉佳商贸有限公司","jobTitle":"会计助理/文员","industry":"300700","salary":"0200104000","workDesc":"协助公司会计　　一、办理银行存款和现金领取。\n\n　　                      二、负责支票、汇票、发票、收据管理。\n\n　　                      三、做银行账和现金账，并负责保管财务章。\n\n　　                      四、负责报销差旅费的工作。\n                              \n                             五、发放员工工资","workRefRelation":"","path":"Resume[8].WorkExperience[1]","realSalary":3000,"jobType":"2060000","department":"","newIndustry":"800130000","workRefCompany":"","oldJobTypeTagType":1,"workRefPosition":"","newJobType":"14000100000000","index":1,"oldJobSubTypeTagType":1,"version":81,"newJobSubTypeTagType":2,"workRefName":"","workRefContact":"","newJobSubType":"14000100150000","newIndustryTagType":2,"workYear":0,"jobSubType":"713","oldIndustryTagType":1,"newJobTypeTagType":2,"startDate":1509465600000},{"newIndustry":"500110000","workRefCompany":"","endDate":1506787200000,"workRefPosition":"","companyName":"武汉华汽汽车维修服务有限公司","jobTitle":"出纳","index":0,"industry":"121000","salary":"0200104000","version":81,"workDesc":"协助公司会计　　一、办理银行存款和现金领取。\n\n　　                      二、负责支票、汇票、发票、收据管理。\n\n　　                      三、做银行账和现金账，并负责保管财务章。\n\n　　                      四、负责报销差旅费的工作。\n                              \n                             五、发放员工工资","workRefRelation":"","path":"Resume[8].WorkExperience[0]","workRefName":"","workRefContact":"","newIndustryTagType":2,"realSalary":3000,"workYear":0,"department":"","oldIndustryTagType":1,"startDate":1485878400000}],"resumeUserMasterAccount":"JL061556631","EducationExperience":[{"eduBackground":"4","eduSpecialty":"","eduSchoolName":"武汉工商学院","eduStartDate":1441036800000,"index":1,"eduResearchArea":"","eduMajorT":"4","version":81,"eduMajorV":"会计学","eduEndDate":1504195200000,"path":"Resume[8].EducationExperience[1]","eduDepartment":"","eduSpecializedCourses":"","eduMinorName":"","eduMajorSmallType":"114"},{"eduBackground":"5","eduSpecialty":"","eduSchoolName":"武汉工商学院","eduStartDate":1346428800000,"index":0,"eduResearchArea":"","eduMajorT":"4","version":81,"eduMajorV":"会计学","eduEndDate":1435680000000,"path":"Resume[8].EducationExperience[0]","eduDepartment":"","eduSpecializedCourses":"","eduMinorName":"","eduMajorSmallType":"114"}],"ComPletionDegree":[{"path":"Resume[8].ComPletionDegree[0]","itemsCompletion":"1|2|1|1|1|2|2|2|2|2|2|2|2|2|2","languageId":1,"index":0,"completionStatus":"1","totalScore":70,"version":81,"itemsScore":"20|0|14|22|14|0|0|0|0|0|0|0|0|0|0"},{"path":"Resume[8].ComPletionDegree[1]","itemsCompletion":"2|2|2|2|2|2|2|2|2|2|2|2|2|2|2","languageId":2,"index":1,"completionStatus":0,"totalScore":0,"version":81,"itemsScore":"0|0|0|0|0|0|0|0|0|0|0|0|0|0|0"}],"index":8,"Purpose":[{"preferredJobType":"713","preferredIndustry":"990000","newPreferredJobType":"14000100150000","newPreferredJobTypeTagType":2,"currentStatus":"1","preferredJobNature":"2","preferredCityDistrict":"736:2063","index":0,"newPreferredIndustry":"100030000","oldPreferredIndustryTagType":1,"version":81,"preferredLocation":"736","path":"Resume[8].Purpose[0]","preferredIsShowSalary":"false","oldPreferredJobTypeTagType":1,"preferredSalary":"0200104000","newPreferredIndustryTagType":2}],"resumeType":0,"resumeSource":5002001,"version":81,"resumeUserMasterId":706155663,"tags":"智联白领","resumeName":"未命名简历","path":"Resume[8]","resumeId":304689442,"tagsForSearch":"13560761 13560518 13560586 13560522 13560792 13560591 13560555 13560536 13560527","resumeNumber":"JL061556631R90500000000","Business":{"autoRefreshDate":1568718633000,"cnCompleted":"11070","cnFirstCompletedDate":1539142487863,"createdDate":1512277854567,"createdType":0,"createdUserId":706155663,"currentEducation":"4","currentIndustry":"300700","currentJobType":"2060000","currentSalary":"200104000","defaultLang":1,"defaultLangDate":1539142933662,"disclosureLevel":2,"enCompleted":"1000","highpin_resume_id":0,"isEditable":"y","isRefresh":"y","modifiedDate":1568718633374,"modifiedUserId":706155663,"newCurrentIndustry":"800130000","newCurrentJobType":"14000100000000","refreshDate":1568718633000,"resumeId":304689442,"resumeName":"未命名简历","resumeNumber":"JL061556631R90500000000","resumeSourceId":5002001,"resumeType":0,"resumeZpSourceId":0,"treePath":"Resume[8]","usermasterId":706155663,"workyears":"201612"}}
       // http://api.open.zhaopin.com/profilecenter/resumeService/getResumeByResumeNumber?path=&productId=2&lang=1&version=1&access_token=06241e4a115d41bba8a3d97742443377Do37&resumeNumber=JI111190891R90500000000
	}

	state={
		list:[]
	}
	// 组件装载之后调用
	componentDidMount() {
        console.log(this.props)
		this.props.form.validateFields();

	}

	getKeys(text){
	    let temp=[];
        temp.push(<tr style={{borderBottom:"1px solid #e8e8e8"}}><td style={{borderRight:"1px solid #e8e8e8",width:250}}>key</td><td>value</td></tr>)
	    Object.keys(text).forEach(function (item) {
            temp.push(<tr style={{borderBottom:"1px solid #e8e8e8"}}><td style={{borderRight:"1px solid #e8e8e8"}}>{item}</td><td>{text[item]}</td></tr>)
        })
        return <table style={{borderCollapse:"collapse"}}>{temp}</table>;
    }
	//渲染
    render() {
        const columns = [
            {
                title: '字段',
                dataIndex: 'keys',
                key: 'keys',
            },
            {
                title: 'caption数据',
                dataIndex: 'value',
                key: 'value',
                render:(text,row,index)=>{
                    if(text.constructor==Array){
                        let temp=[]
                        for(let i=0;i<text.length;i++){
                            temp.push(this.getKeys(text[i]))
                        }
                        return temp;
                    }
                    else if(text.constructor==Object){
                        return this.getKeys(text)
                    }else {
                        return text
                    }
                }
            }
        ]
        return (
        	<div style={{marginTop:"20px"}}>
                <Table style={{marginTop:"20px",marginBottom:"80px"}} bordered columns={columns} dataSource={this.state.list} pagination={false}/>
            </div>
        );
    }

	// 组件被卸载
	componentWillUnmount() {

	}
}

export default Form.create()(Caption);
