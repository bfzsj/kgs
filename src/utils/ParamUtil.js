
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
        {title: '简历ID', dataIndex: 'id',key: 'id',width:"100px",fixed:true},//0
        {title: '工作开始时间', dataIndex: 'workYears',key: 'workYears',width:"100px"},//1
        {title: '工作经历1', dataIndex: 'workExp0',key: 'workExp0',width:"100px"},
        {title: '工作经历2', dataIndex: 'workExp1',key: 'workExp1',width:"100px"},
        {title: '学习经历1', dataIndex: 'eduExp0',key: 'eduExp0',width:"100px"},
        {title: '期望薪资', dataIndex: 'desiredSalary',key: 'desiredSalary',width:"100px"},
        {title: '期望城市', dataIndex: 'desireCityName',key: 'desireCityName',width:"100px"},
        {title: '最后更新', dataIndex: 'lastUpdateTime',key: 'lastUpdateTime',width:"100px"},//7
        {title: '最后活跃时间', dataIndex: 'logTime', key: 'logTime',width:"100px"},
        {title: '期望一级行业', dataIndex: 'desireIndustryTypeOne',key: 'desireIndustryTypeOne',width:"100px"},//9
        {title: '期望二级行业', dataIndex: 'desireIndustryTypeTwo',key: 'desireIndustryTypeTwo',width:"100px"},
        {title: '期望一级职类', dataIndex: 'desireJobTypeOne',key: 'desireJobTypeOne',width:"100px"},//11
        {title: '期望二级职类', dataIndex: 'desireJobTypeTwo',key: 'desireJobTypeTwo',width:"100px"},//12
        {title: '期望三级职类', dataIndex: 'desireJobTypeThree',key: 'desireJobTypeThree',width:"100px"},
        {title: '召回渠道', dataIndex: 'g_query',key: 'g_query',width:"100px"},
        {title: '二排得分', dataIndex: 'score',key: 'score',width:"100px"},
        {title: '三排得分', dataIndex: 'ctr_score',key: 'ctr_score',width:"100px"}
    ],
    JDColumn:[
        {dataIndex: 'jobNumber', title: '职位ID',key: 'jobNumber',width:"100px" },
        {dataIndex: 'jobTitle', title: '职位名称',key: 'jobTitle',width:"70px"},
        {dataIndex: 'cityId', title: '发布地Id',key: 'cityId',width:"60px"},
        {dataIndex: 'cityName', title: '职位发布地', key: 'cityName',width:"60px"},
        {dataIndex: 'jobLevelCode2', title: '二级职类', key: 'jobLevelCode2',width:"100px"},
        {dataIndex: 'jobLevelName2', title: '二级职类', key: 'jobLevelName2',width:"70px"},
        {dataIndex: 'jobLevelCode3', title: '三级职类', key: 'jobLevelCode3',width:"100px"},
        {dataIndex: 'jobLevelName3', title: '三级职类', key: 'jobLevelName3',width:"100px"},
        {dataIndex: 'educationId', title: '学历要求', key: 'educationId',width:"70px"},
        {dataIndex: 'educationName', title: '学历要求', key: 'educationName',width:"70px"},
        {dataIndex: 'salary', title: '薪资范围', key: 'salary',width:"60px"},
        {dataIndex: 'workYearId', title: '年限', key: 'workYearId',width:"60px"}
    ],
	JDkeyword:[
		"CC357960812J00349003502",
		"CC326159618J00289059302",
		"CC338679481J90250431000",
		"CC469217519J00225623311",
		"CC826648250J00320592502",
		"CC428011313J00177778811",
		"CC270176580J00421874703",
		"CZ679945980J00329115607",
		"CC394952685J00304650205",
		"CC149367413J00235787606",
		"CZ623165680J00294355601",
		"CZ719857280J00064751601",
		"CC884142290J00309930606",
		"CC208292810J00170437213",
		"CC552604123J90250209000",
		"CC137439337J00187143806",
		"CZ526117420J00139022107",
		"CC200893189J00186538807",
		"CC403854718J00301217408",
		"CC644930480J00160533813",
		"CC120778848J00404831605",
		"CC142979852J90250367000",
		"CC133216775J00122162614",
		"CC334040116J90285320000",
		"CC377959287J00457669201",
		"CC579839431J00316056505",
		"CZ692455420J00173345811",
		"CC620130335J00352243602",
		"CC571373285J00411083101",
		"CC355171317J00328046404",
		"CC120917163J00311913805",
		"CC406266280J00423980205",
		"CC437311111J00042403108",
		"CC297821318J90250649000",
		"CC481734530J00279348306",
		"CC814047170J00168833811",
		"CC158066710J00157014215",
		"CC179100025J00425307403",
		"CZ528010320J00145365813",
		"CC599122920J00319288705",
		"CC339379611J90250102000",
		"CC171834629J00235799707",
		"CC156905120J00170582514",
		"CZ519205680J00434919101",
		"CC512205124J00382496501",
		"CC599715283J00124430101",
		"CC465733739J00259332706",
		"CZ480908630J00129191908",
		"CC000059283J00443856601",
		"CC633142422J00300817703",
		"CZ601542880J00023767114",
		"CC000584094J90250676000",
		"CC541945638J00316239806",
		"CC443895436J00112047911",
		"CC629131030J00178205008",
		"CC226989130J00341316102",
		"CC404165813J00255590306",
		"CC848277470J00294166304",
		"CC135816983J00163539313",
		"CC331984431J00184217215",
		"CC543845980J00043398511",
		"CC245943582J90250478000",
		"CC661671829J90250019000",
		"CZ606674430J00175917804",
		"CC490128029J00372637803",
		"CC265620380J00185413812",
		"CC847822580J00198134510",
		"CZ814026780J00080607109",
		"CC531902836J00154277304",
		"CC277686189J90250002000",
		"CC450921626J90250018000",
		"CC544764129J90250019000",
		"CC849368380J00358838507",
		"CC139260276J00149971912",
		"CC402884616J90250006000",
		"CC121098980J00392133003",
		"CC156276829J90251017000",
		"CZ202777530J00305533502",
		"CC201426236J90250807000",
		"CC241418614J00213034206",
		"CC424415987J00383214507",
		"CC215198115J00327025004",
		"CC144837638J00175002804",
		"CC397825687J00183003501",
		"CC687375839J00078098814"
	],
    CVkeyword:[
       "jI215531599R90500000000",
       "JI268470736R90500000000",
       "jI405813706R90500000000",
       "jI581896252R90500000000",
       "jI581911193R90500000000",
       "jL041506834R90500000000",
       "jM241397180R90250000000",
       "jR156809171R90000000000",
       "jI359023765R90500000000",
       "jI437120056R90500000000",
       "jI529254965R90500000000",
       "jL121730821R90500001000",
       "jM003699785R90250001000",
       "jM613625230R90250001000",
       "jM746798054R90250000000",
       "jI161888138R90500001000",
       "jM645632889R90250001000",
       "jR022192374R90250004000",
       "jR178892445R90000000000",
       "jI284658212R90500000000",
       "jI293004473R90500000000",
       "jI473917313R90500000000",
       "jI088429150R90500000000",
       "jI581914637R90500000000",
       "jI566194513R90500000000",
       "jM540244524R90250000000",
       "jI286531719R90500000000",
       "jM734706054R90250002000",
       "jM863151071R90250000000",
       "jI272688466R90500000000",
       "jI091495716R90500000000",
       "jI581910690R90500000000",
       "jM939212568R90250000000",
       "jR281202850R90250009000",
       "jI581910056R90500000000",
       "jR088563199R90000000000",
       "jI117455050R90500000000",
       "jI558790231R90500000000",
       "jI567202537R90500000000",
       "jR093834583R90000001000",
       "jI174331129R90500000000",
       "jL187710418R90500000000",
       "jM561887326R90250001000",
       "jR184811218R90250000000",
       "jR260407892R90250000000",
       "jR345858386R90250000000",
       "jM738526512R90250000000",
       "jM885265494R90250001000",
       "jM995324036R90250000000",
       "jI049568675R90500000000",
       "jI581905386R90500000000",
       "jI581911454R90500000000",
       "jL041116701R90500000000",
       "jM564011260R90250000000",
       "jI539757710R90500000000",
       "jI581912696R90500000000",
       "jI032491684R90500000000",
       "jI436982449R90500000000",
       "jI581908676R90500000000",
       "jI581913783R90500000000",
       "jL062421450R90500000000",
       "jM354476840R90250000000",
       "jR038818898R90000000000",
       "jR144377678R90000002000",
       "jI366778427R90500000000",
       "jI473106805R90500000000",
       "jM211658099R90250000000",
       "jM544618969R90250000000",
       "jM668330081R90500000000",
       "jM697394247R90500000000",
       "jM986697306R90250000000",
       "jR374083498R90250002000",
       "jM998282122R90500002000",
       "jI226171134R90500000000",
       "jI578138906R90500000000",
       "jL087743385R90500000000",
       "jM550944683R90250000000",
       "jI486137066R90500000000",
       "jI534382747R90500000000",
       "jL062727225R90500000000",
       "jL126860624R90500000000",
       "jM523513621R90250001000",
       "jL084138560R90500001000",
    ]
}
export  {ParamUtil}
