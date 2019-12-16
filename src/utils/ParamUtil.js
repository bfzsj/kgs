
const ParamUtil = {
    getWorkTimeInfo(data){
        console.log('获取工作时间：' + data);
        let d = new Date();
        let a = new Date();
        let c = new Date();
        let now = new Date(d.getTime());
        if (!data) {
            return null;
        } else if (data === 103) {
            a = new Date(d.setFullYear(d.getFullYear() - 1));
            c = new Date(now.setFullYear(now.getFullYear() - 3));
        } else if (data === 510) {
            a = new Date(d.setFullYear(d.getFullYear() - 5));
            c = new Date(now.setFullYear(now.getFullYear() - 10));

        } else if (data === 305) {
            a = new Date(d.setFullYear(d.getFullYear() - 3));
            c = new Date(now.setFullYear(now.getFullYear() - 5));

        } else if (data === 1099) {
            a = new Date(d.setFullYear(d.getFullYear() - 10));
            c = new Date(now.setFullYear(now.getFullYear() - 99));
        } else {
            return null;
        }

        let firstDate = this.dateFormate('yyyyMM', c);
        let endDate = this.dateFormate('yyyyMM', a);
        return firstDate + ',' + endDate;
    },
    dateFormate(fmt, date) {
        const o = {
            'M+': date.getMonth() + 1,               // 月份
            'd+': date.getDate(),                    // 日
            'h+': date.getHours(),                   // 小时
            'm+': date.getMinutes(),                 // 分
            's+': date.getSeconds(),                 // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            'S': date.getMilliseconds()                  // 毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (const k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    },
    getSort(){
        let arr=[
            {"key":"gray_router_rdsearch_talents_segment_intern_ab_20191206","value":"qrc-segment-intern-baseline"},
            {"key":"gray_router_rdsearch_talents_segment_intern_ab_20191206","value":"qrc-segment-intern_qzb"},
            {"key":"gray_router_rdsearch_talents_baseline_abcd_20191209","value":"qrc-baseline"},
            {"key":"gray_router_rdsearch_talents_segment_salesman_ab_20191206","value":"qrc-segment-salesman-qzb"},
            {"key":"gray_router_rdsearch_talents_segment_salesman_ab_20191206","value":"qrc-segment-salesman-baseline"},
            {"key":"gray_router_rdsearch_talents_segment_salesman_ab_20191206","value":"qrc-segment-salesman_joblevel_match"},
            {"key":"gray_router_rdsearch_talents_segment_account_ab_20191206","value":"qrc-segment-account-baseline"},
            {"key":"gray_router_rdsearch_talents_segment_account_ab_20191206","value":"qrc-segment-account_joblevel_match"},
            {"key":"gray_router_rdsearch_talents_segment_account_ab_20191206","value":"qrc-segment-account-qzb"},
            {"key":"gray_router_rdsearch_talents_segment_salesman_ab_20191206","value":"qrc-segment-salesman-newjobtype"},
            {"key":"gray_router_rdsearch_talents_baseline_abcd_20191209","value":"qrc-baseline-termweight"},
            {"key":"gray_router_rdsearch_talents_baseline_abcd_20191209","value":"qrc_joblevel_match"},
            {"key":"gray_router_rdsearch_talents_baseline_abcd_20191209","value":"qrc-baseline-rerank-boosting"},
            {"key":"gray_router_rdsearch_talents_baseline_abcd_20191209","value":"qrc-baseline-ltr"},
            {"key":"gray_router_rdsearch_talents_baseline_abcd_20191209","value":"b_all_r_t_jobtypecontrol_baseline_jobtype_lowerweight"},
            {"key":"gray_router_rdsearch_talents_segment_it_ab_20191206","value":"qrc-segment-it-baseline"},
            {"key":"gray_router_rdsearch_talents_segment_it_ab_20191206","value":"qrc-segment-it_joblevel_match"},
            {"key":"gray_router_rdsearch_talents_segment_it_ab_20191206","value":"qrc-segment-it_qzb"},
            {"key":"gray_router_rdsearch_talents_segment_it_ab_20191206","value":"qrc-segment-it-baseline_companyschool_rank"},
            {"key":"gray_router_rdsearch_talents_segment_it_ab_20191206","value":"qrc-segment-it_title_weight"},
            {"key":"gray_router_rdsearch_talents_baseline_abcd_20191209","value":"qrc-baseline-qzb"},
            {"key":"gray_router_rdsearch_talents_baseline_abcd_20191209","value":"qrc-baseline-joblevel_termweight_title_supplement2"},
            {"key":"gray_router_rdsearch_talents_baseline_abcd_20191209","value":"qrc-baseline-joblevel_termweight_title_supplement"},
            {"key":"gray_router_rdsearch_talents_baseline_abcd_20191209","value":"qrc-talents_joblevel_match_2sort"},
            {"key":"gray_router_rdsearch_talents_baseline_abcd_20191209","value":"qrc-baseline-rerank-merge"},
            {"key":"gray_router_rdsearch_talents_baseline_abcd_20191209","value":"qrc-baseline-rerank-multiboost"},
            {"key":"gray_router_rdsearch_talents_baseline_abcd_20191209","value":"qrc-baseline-termweight_qzb"},
            {"key":"gray_router_rdsearch_talents_baseline_abcd_20191209","value":"qrc-talents_joblevel_match_2sort_qzb"},
            {"key":"gray_router_rdsearch_talents_baseline_abcd_20191209","value":"qrc-baseline-rerank-boosting_qzb"}]
        return arr;
    },
    getLogTimeInfo: function (data) {
        console.log('getLogTimeInfo: ' + data);
        if (data === '0') {
            return null;
        }
        let d = new Date();
        let now = new Date(d.getTime());

        if (data === '4h') {/*抢人才中 刚刚活跃：最近4小时*/
            d = new Date(d.getTime() - 4 * 60 * 60 * 1000);
        } else {
            const dayInt = parseInt(data);
            d = new Date(d.getTime() - dayInt * 24 * 60 * 60 * 1000);
        }
        console.log(d);
        console.log(now);
        return (d.getTime() / 1000).toFixed(0) + ',' + (now.getTime() / 1000).toFixed(0);
    },
    resume:function (data) {
        let ResumeType = {
            s_1: '1-普通简历',
            s_2: '2-置顶简历'
        }
        const descObj = JSON.parse(data.description);
        // 图片
        if (typeof (descObj.image) != 'undefined' && descObj.image != '*') {
            data.image = 'http://mypics.zhaopin.cn' + descObj.image;
        } else {
            if (typeof (data.gender.code) != 'undefined' && data.gender.code == 1) {
                data.image = 'http://rd-bucket.zhaopin.cn/pre/assets/portrait-boy.705548.jpg';
            } else {
                data.image = 'http://rd-bucket.zhaopin.cn/pre/assets/portrait-girl.bb3b74.jpg';
            }
        }

        data.resumeType = ResumeType['s_' + data.resumeType] != null ? ResumeType['s_' + data.resumeType] : (data.resumeType + ' 未知');
        // 学校
        if (data.educationExperience[0]) {
            data.eduExp0 = this.getEducationName()[data.educationExperience[0].EducationLevel] + ' - ' + data.educationExperience[0].SchoolName;
        }
        if (data.educationExperience[1]) {
            data.eduExp1 = this.getEducationName()[data.educationExperience[1].EducationLevel] + ' - ' + data.educationExperience[1].SchoolName;
        }
        if (data.educationExperience[2]) {
            data.eduExp2 = this.getEducationName()[data.educationExperience[2].EducationLevel] + ' - ' + data.educationExperience[2].SchoolName;
        }

        //最后工作
        if (data.workExperience[0]) {
            data.workExp0 = data.workExperience[0].JobTitle + '-' + data.workExperience[0].CompanyName;
        }
        if (data.workExperience[1]) {
            data.workExp1 = data.workExperience[1].JobTitle + '-' + data.workExperience[1].CompanyName;
        }
        if (data.workExperience[2]) {
            data.workExp2 = data.workExperience[2].JobTitle + '-' + data.workExperience[2].CompanyName;
        }
        // 期望行业职类
        if (data.superDesiredType && data.superDesiredType.desireJobTypeList) {
            let desireJobTypeList = data.superDesiredType.desireJobTypeList;
            data.desireJobTypeOne = '';
            data.desireJobTypeTwo = '';
            data.desireJobTypeThree = '';
            for (let i = 0; i < desireJobTypeList.length; i++) {
                if (desireJobTypeList[i].level == 1) {
                    data.desireJobTypeOne += desireJobTypeList[i].id + '-' + desireJobTypeList[i].name;
                } else if (desireJobTypeList[i].level == 2) {
                    data.desireJobTypeTwo += desireJobTypeList[i].id + '-' + desireJobTypeList[i].name;
                } else if (desireJobTypeList[i].level == 3) {
                    data.desireJobTypeThree += desireJobTypeList[i].id + '-' + desireJobTypeList[i].name;
                }
            }
        }

        if (data.superDesiredType && data.superDesiredType.desireIndustryTypeList) {
            let desireIndustryTypeList = data.superDesiredType.desireIndustryTypeList;
            data.desireIndustryTypeOne = '';
            data.desireIndustryTypeTwo = '';
            data.desireIndustryTypeThree = '';
            for (let i = 0; i < desireIndustryTypeList.length; i++) {
                if (desireIndustryTypeList[i].level == 1) {
                    data.desireIndustryTypeOne += desireIndustryTypeList[i].id + '-' + desireIndustryTypeList[i].name;
                } else if (desireIndustryTypeList[i].level == 2) {
                    data.desireIndustryTypeTwo += desireIndustryTypeList[i].id + '-' + desireIndustryTypeList[i].name;
                } else if (desireIndustryTypeList[i].level == 3) {
                    data.desireIndustryTypeThree += desireIndustryTypeList[i].id + '-' + desireIndustryTypeList[i].name;
                }
            }
        }

        data.age = this.getYear(Date.now()) - data.birthYear;
        data.userName = data.userName + '|' + data.age + '|' + data.city.display + '|' + data.eduLevel.name;
        if (data.desireCity) {
            data.desireCityName = data.desireCity.display;
        } else {
            data.desireCityName = '';
        }
        // console.info(data.desireCityName + '' + data.city.display + '' + data.userName);
        return data;
    },
    getYear(timestamp) {
        const date = new Date(parseInt(timestamp, 0) - 8 * 60 * 60 * 1000);
        return this.dateFormate('yyyy', date);

    },
    getEducationName: function () {
        var eduObj = {};
        eduObj["8"] = "其它";
        eduObj["9"] = "初中";
        eduObj["13"] = "中技";
        eduObj["7"] = "高中";
        eduObj["12"] = "中专";
        eduObj["5"] = "大专";
        eduObj["4"] = "本科";
        eduObj["3"] = "硕士";
        eduObj["10"] = "MBA";
        eduObj["11"] = "EMBA";
        eduObj["1"] = "博士";
        return eduObj;
    },
    ResumeSelectColumns: [
        {title: 'ID', dataIndex: 'id',key: 'id',width:"200px"},
        {title: '工作开始时间', dataIndex: 'workYears',key: 'workYears',width:"200px"},
        {title: '工作经历1', dataIndex: 'workExp0',key: 'workExp0',width:"200px"},
        {title: '工作经历2', dataIndex: 'workExp1',key: 'workExp1',width:"200px"},
        {title: '学习经历1', dataIndex: 'eduExp0',key: 'eduExp0',width:"200px"},
        {title: '期望薪资', dataIndex: 'desiredSalary',key: 'desiredSalary',width:"200px"},
        {title: '期望城市', dataIndex: 'desireCityName',key: 'desireCityName',width:"200px"},
        {title: '最后更新', dataIndex: 'lastUpdateTime',key: 'lastUpdateTime',width:"200px"},
        {title: '最后活跃时间', dataIndex: 'logTime', key: 'logTime',width:"200px"},
        {title: '期望一级行业', dataIndex: 'desireIndustryTypeOne',key: 'desireIndustryTypeOne',width:"200px"},
        {title: '期望二级行业', dataIndex: 'desireIndustryTypeTwo',key: 'desireIndustryTypeTwo',width:"200px"},
        {title: '期望一级职类', dataIndex: 'desireJobTypeOne',key: 'desireJobTypeOne',width:"200px"},
        {title: '期望二级职类', dataIndex: 'desireJobTypeTwo',key: 'desireJobTypeTwo',width:"200px"},
        {title: '期望三级职类', dataIndex: 'desireJobTypeThree',key: 'desireJobTypeThree',width:"200px"},
        {title: '召回渠道', dataIndex: 'g_query',key: 'g_query',width:"200px"},
        {title: '二排得分', dataIndex: 'score',key: 'score',width:"200px"},
        {title: '三排得分', dataIndex: 'ctr_score',key: 'ctr_score',width:"200px"},
    ],
}
export  {ParamUtil}
