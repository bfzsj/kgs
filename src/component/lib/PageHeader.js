import React, {Component} from 'react';
import {withRouter,NavLink} from 'react-router-dom'

import leftArrow from '../../images/larrow.png';
import { Menu, Icon,Layout } from 'antd';

const { SubMenu } = Menu;
class PageHeader extends Component {
	constructor(props) {
		super(props)
		this.handlePageBack = this.handlePageBack.bind(this);
	}

	// 组件装载之后调用
	componentDidMount() {

	}
    state = {
        current: 'mail',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };
	handlePageBack() {
		this.props.history.goBack();
	}

	//渲染
	render() {
		return (
			<Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" theme="dark">
				<Menu.Item key="mail">
					<Icon type="mail" />
					ZTC
				</Menu.Item>
				<Menu.Item key="index">
					<Icon type="appstore" />
					首页
				</Menu.Item>
				<Menu.Item key="Debug">
					<NavLink to="/page-a">Debug model</NavLink>
				</Menu.Item>
				<Menu.Item key="CV_JD">
					<NavLink to="/page-b">CV_JD相似度</NavLink>
				</Menu.Item>
				<Menu.Item key="QueryNorm">
					<NavLink to="/page-b">QueryNorm白名单</NavLink>
				</Menu.Item>
				<Menu.Item key="JD_CV Embedding">
					<NavLink to="/page-d">JD_CV Embedding</NavLink>
				</Menu.Item>
				<Menu.Item key="JD_CV Graph">
					<NavLink to="/page-e">JD_CV Graph Embedding</NavLink>
				</Menu.Item>
				<Menu.Item key="related_search">
					<NavLink to="/page-f">related_search</NavLink>
				</Menu.Item>
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