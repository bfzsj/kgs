import React, {Component} from 'react';
import {Route, Switch, NavLink, Redirect, withRouter, Link} from 'react-router-dom'
import Loadable from 'react-loadable';
import PageA from './component/B端/PageA';
import PageB from './component/NLP/PageB';
import PageC from './component/B端/PageC';
import PageD from './component/NLP/PageD';
import PageE from './component/NLP/PageE';
import PageF from './component/B端/PageF';
import CvList from  './component/NLP/CvList'
import JobTypeClassifier from './component/NLP/JobTypeClassifier';
import JDContent from  './component/NLP/JDContent'
import Wordbreaker from './component/NLP/Wordbreaker'
import PageHeader from './component/lib/PageHeader';
import Caption from './component/lib/Caption'
import captionRatio from './component/B端/captionRatio';
import JDSearch from './component/NLP/JDSearch'
import CVSearch from './component/NLP/CVSearch'
import job from './component/NLP/job'
import CVJD from './component/B端/CVJD'
import industry from './component/NLP/industry'
import './css/lib/reset.css';
import './css/lib/common.css';
import './css/lib/pageheader.css';
import './App.css';
import { Menu, Icon,Layout,Breadcrumb } from 'antd';
const { Header, Content, Footer,Sider } = Layout;
const loadingComponent =()=>{
    return (
		<div>loading</div>
    )
}
const PageAComponent = Loadable({
	loader: () => import('./component/B端/PageA'),
	loading: loadingComponent,
});
const PageBComponent = Loadable({
	loader: () => import('./component/NLP/PageB'),
	loading: loadingComponent,
});
const PageCComponent = Loadable({
	loader: () => import('./component/B端/PageC'),
	loading: loadingComponent,
});
const PageDComponent = Loadable({
    loader: () => import('./component/NLP/PageD'),
    loading: loadingComponent,
});
const PageEComponent = Loadable({
    loader: () => import('./component/NLP/PageE'),
    loading: loadingComponent,
});
const PageFComponent = Loadable({
    loader: () => import('./component/B端/PageF'),
    loading: loadingComponent,
});
const CvListComponent = Loadable({
    loader: () => import('./component/NLP/CvList'),
    loading: loadingComponent,
});
const WordbreakerComponent=Loadable({
	loader:()=> import('./component/NLP/Wordbreaker'),
	loading:loadingComponent
})
const CaptionComponent=Loadable({
    loader:()=> import('./component/lib/Caption'),
    loading:loadingComponent
})
const JDContentComponent=Loadable({
    loader:()=> import('./component/NLP/JDContent'),
    loading:loadingComponent
})
const captionRatioComponent=Loadable({
    loader:()=> import('./component/B端/captionRatio'),
    loading:loadingComponent
})
const JobTypeClassifierComponent=Loadable({
	loader:()=> import('./component/NLP/JobTypeClassifier'),
	loading:loadingComponent
})
const JDSearchComponent=Loadable({
    loader:()=> import('./component/NLP/JDSearch'),
    loading:loadingComponent
})
const CVJDComponent=Loadable({
    loader:()=> import('./component/B端/CVJD'),
    loading: loadingComponent
})
const CVSearchComponent=Loadable({
    loader:()=> import('./component/NLP/CVSearch'),
    loading: loadingComponent
})
const JobComponent=Loadable({
    loader:()=> import('./component/NLP/job'),
    loading: loadingComponent
})
const industryComponent=Loadable({
    loader:()=> import('./component/NLP/industry'),
    loading: loadingComponent
})


const HomeComponent = () => {
	return (
		<div>
			{/*<PageHeader closeBrowser={true} title={'首页'}></PageHeader>*/}

		<div className="App">
			Hi React
		</div>

		</div>);
}


class App extends Component {

	state={
		sHeight:window.innerHeight,
		height:window.innerHeight,
		title:document.title,
		group:null
	}
    componentDidMount() {
		window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变
    }

    componentWillUnmount() { //一定要最后移除监听器，以防多个组件之间导致this的指向紊乱
        window.removeEventListener('resize', this.handleResize.bind(this))
    }

    handleResize = e => {
		this.setState({
            sHeight:window.innerHeight,
            height:window.innerHeight
		})
    }

    fn(data){
		this.setState({
            title:data.title,
            group:data.group
		})
	}
	render() {
		return (
			<div>
				<Layout style={{
                    minHeight:this.state.sHeight,
                    height:this.state.height
                }}>
					<Sider>
						<PageHeader closeBrowser={true} title={'首页'} pfn={this.fn.bind(this)}></PageHeader>
					</Sider>
					<Layout>
					<Header className="header" style={{ position: 'fixed', zIndex: 11, width: '100%',backgroundColor:'#ced0d3' }}>
						<Breadcrumb style={{ margin: '16px 0',lineHeight:"32px" ,fontSize:"16px"}} separator=">">
							<Breadcrumb.Item>ZTC</Breadcrumb.Item>
							<Breadcrumb.Item>{this.state.group}</Breadcrumb.Item>
							<Breadcrumb.Item>{this.state.title}</Breadcrumb.Item>
						</Breadcrumb>
					</Header>
					<Content style={{ padding: '0 30px' , marginTop: 64 }}>
						<Switch>
							<Route path='/' exact component={HomeComponent}></Route>
							<Route path='/page-a' component={PageAComponent}></Route>
							<Route path='/page-b' component={PageBComponent}></Route>
							<Route path='/page-c' component={PageCComponent}></Route>
							<Route path='/page-d' component={PageDComponent}></Route>
							<Route path='/page-e' component={PageEComponent}></Route>
							<Route path='/page-f' component={PageFComponent}></Route>
							<Route path='/Cv-List' component={CvListComponent}></Route>
							<Route path='/Wordbreaker' component={WordbreakerComponent}></Route>
							<Route path='/caption/:id' component={CaptionComponent}></Route>
							<Route path='/JDContent' component={JDContentComponent}></Route>
							<Route path='/captionRatio' component={captionRatioComponent}></Route>
							<Route path='/JobTypeClassifier' component={JobTypeClassifierComponent}></Route>
							<Route path='/JDSearch' component={JDSearchComponent}></Route>
							<Route path='/CVJD' component={CVJDComponent}></Route>
							<Route path='/CVSearch' component={CVSearchComponent}></Route>
							<Route path='/Job' component={JobComponent}></Route>
							<Route path='/industry' component={industryComponent}></Route>

							<Redirect to={{
								pathname: '/',
								search: '?utm=your+face'
							}}/>
						</Switch>
					</Content>
					<Footer style={{background: '#ced0d3', textAlign: 'center',position: 'fixed', zIndex: 11, bottom:0,width:'100%' }}>ZhiLian Technology Center ©2018 Created by Sxd</Footer>
					</Layout>
				</Layout>
			</div>
		);
	}
}

export default withRouter(App);
