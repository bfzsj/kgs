import React, {Component} from 'react';
import {Route, Switch, NavLink, Redirect, withRouter, Link} from 'react-router-dom'
import Loadable from 'react-loadable';
import PageA from './component/PageA';
import PageB from './component/PageB';
import PageC from './component/PageC';
import PageD from './component/PageD';
import PageE from './component/PageE';
import PageF from './component/PageF';
import PageHeader from './component/lib/PageHeader';

import './css/lib/reset.css';
import './css/lib/common.css';
import './css/lib/pageheader.css';
import './App.css';
import { Menu, Icon,Layout } from 'antd';
const { Header, Content, Footer } = Layout;
const PageAComponent = Loadable({
	loader: () => import('./component/PageA'),
	loading: PageA,
});
const PageBComponent = Loadable({
	loader: () => import('./component/PageB'),
	loading: PageB,
});
const PageCComponent = Loadable({
	loader: () => import('./component/PageC'),
	loading: PageC,
});
const PageDComponent = Loadable({
    loader: () => import('./component/PageD'),
    loading: PageD,
});
const PageEComponent = Loadable({
    loader: () => import('./component/PageE'),
    loading: PageE,
});
const PageFComponent = Loadable({
    loader: () => import('./component/PageF'),
    loading: PageF,
});
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
	render() {
		return (
			<div>
				<Layout>
					<Header className="header">
						<PageHeader closeBrowser={true} title={'首页'}></PageHeader>
					</Header>
					<Content style={{ padding: '0 50px' }}>
						<Switch>
							<Route path='/' exact component={HomeComponent}></Route>
							<Route path='/page-a' component={PageAComponent}></Route>
							<Route path='/page-b' component={PageBComponent}></Route>
							<Route path='/page-c' component={PageCComponent}></Route>
							<Route path='/page-d' component={PageDComponent}></Route>
							<Route path='/page-e' component={PageEComponent}></Route>
							<Route path='/page-f' component={PageFComponent}></Route>
							<Redirect to={{
								pathname: '/',
								search: '?utm=your+face'
							}}/>
						</Switch>
					</Content>
					<Footer style={{ textAlign: 'center',position: 'fixed', zIndex: 1, bottom:0,width:'100%' }}>ZhiLian Technology Center ©2018 Created by Sxd</Footer>
				</Layout>
			</div>
		);
	}
}

export default withRouter(App);
