import React, {Component} from 'react';
import PageHeader from './lib/PageHeader';
import {NavLink} from 'react-router-dom'
import '../App.css';

class PageA extends Component {
	constructor(props) {
		super(props)
	}

	// 组件装载之后调用
	componentDidMount() {

	}
	//渲染
	render() {
		return (
			<div>
				<PageHeader  title={'Page A'}></PageHeader>

				<div className="test">
					React Page A
				</div>
			</div>);
	}

	// 组件被卸载
	componentWillUnmount() {

	}
}

export default PageA;
