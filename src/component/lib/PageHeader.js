import React, {Component} from 'react';
import {withRouter,NavLink} from 'react-router-dom'

import leftArrow from '../../images/larrow.png';
import {Tooltip, Menu, Icon,Layout } from 'antd';

const { SubMenu } = Menu;
class PageHeader extends Component {
	constructor(props) {
		super(props)
		this.handlePageBack = this.handlePageBack.bind(this);
	}

	// 组件装载之后调用
	componentDidMount() {
		console.log(window.innerHeight)
	}
    state = {
        current: 'ZTC',
    };

    handleClick = e => {
        console.log('click ', e);
        document.title=e.key;
        this.setState({
            current: e.key,
        });
        this.props.pfn({
			title:e.key,
			group:e.keyPath[1]
		})
    };
	handlePageBack() {
		this.props.history.goBack();
	}

	//渲染
	render() {
		return (
			<Menu onClick={this.handleClick} defaultOpenKeys={['B端','NLP']} selectedKeys={[this.state.current]} mode="inline" theme="dark" style={{ lineHeight: '64px' }}>
				<Menu.Item key="ZTC">
					<Icon type="mail" />
					<NavLink to="" style={{display:'inline'}}>ZTC</NavLink>
				</Menu.Item>
                {/*<Menu.Item key="index">

					<NavLink to="/"><Icon type="appstore" />首页</NavLink>
				</Menu.Item>
				<Menu.Item key="Debug">
					<NavLink to="/page-a">Debug model</NavLink>
				</Menu.Item>
				<Menu.Item key="CV_JD">
					<NavLink to="/page-b">CV_JD相似度</NavLink>
				</Menu.Item>
				<Menu.Item key="QueryNorm">
					<NavLink to="/page-c">QueryNorm白名单</NavLink>
				</Menu.Item>
				<Menu.Item key="JD_CV Embedding">
					<NavLink to="/page-d">JD_CV Embedding</NavLink>
				</Menu.Item>
				<Menu.Item key="JD_CV Graph">
					<NavLink to="/page-e">JD_CV Graph Embedding</NavLink>
				</Menu.Item>
				<Menu.Item key="related_search">
					<NavLink to="/page-f">related_search</NavLink>
				</Menu.Item>*/}
				<SubMenu
					key="B端"
					title={
						<span>
						  <Icon type="mail" />
						  <span>B端</span>
						</span>
								}
							>

						<Menu.Item key="Debug model" >
								<NavLink to="/page-a">Debug model</NavLink>
						</Menu.Item>


						<Menu.Item key="QueryNorm白名单">
							<NavLink to="/page-c">QueryNorm白名单</NavLink>
						</Menu.Item>


						<Menu.Item key="related_search">
							<NavLink to="/page-f">related_search</NavLink>
						</Menu.Item>


				</SubMenu>
				<SubMenu
					key="C端"
					title={
						<span>
						  <Icon type="appstore" />
						  <span>C端</span>
						</span>
								}
							>
					<Menu.Item key="5">abc</Menu.Item>
					<Menu.Item key="6">abc</Menu.Item>

					<Menu.Item key="7">abc</Menu.Item>
					<Menu.Item key="8">abc</Menu.Item>
				</SubMenu>
				<SubMenu
					key="NLP"
					title={
						<span>
						  <Icon type="setting" />
						  <span>NLP</span>
						</span>
								}
							>
					<Menu.Item key="CV_JD相似度">
						<NavLink to="/page-b">CV_JD相似度</NavLink>
					</Menu.Item>
					<Menu.Item key="JD_CV Embedding">
						<NavLink to="/page-d">JD_CV Embedding</NavLink>
					</Menu.Item>
					<Menu.Item key="JD_CV Graph Embedding">
						<NavLink to="/page-e">JD_CV Graph Embedding</NavLink>
					</Menu.Item>
					<Menu.Item key="CvList">
						<NavLink to="/Cv-List">CvList</NavLink>
					</Menu.Item>
					<Menu.Item key="Wordbreaker">
						<NavLink to="/Wordbreaker">Wordbreaker</NavLink>
					</Menu.Item>
				</SubMenu>
			</Menu>
		);
	}

	// 组件被卸载
	componentWillUnmount() {

	}
}

export default withRouter(PageHeader);
/*<div className="list">
	<div className="list-row box box-pack-center">
		<NavLink to="/page-a">Link-To-PageA</NavLink>
	</div>
	<div className="list-row box box-pack-center">
		<NavLink to="/page-b">Link-To-PageB</NavLink>
	</div>
	<div className="list-row box box-pack-center">
		<NavLink to="/page-c">Link-To-PageC</NavLink>
	</div>
</div>*/