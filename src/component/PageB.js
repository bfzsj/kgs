import React, {Component} from 'react';
import PageHeader from './lib/PageHeader';
import '../App.css';


class PageB extends Component {
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
				<PageHeader  title={'Page B'}></PageHeader>

				<div className="test">
					React Page B
				</div>
			</div>);
	}

	// 组件被卸载
	componentWillUnmount() {

	}
}

export default PageB;
