import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import { Header } from 'react-navigation';

import {mapStateToProps, mapDispatchToProps} from '../dispatch';
import {common} from '../styles';
import Wrap from '../components/Wrap';
import ScreenComponent from '../components/ScreenComponent';
import DB from '../api/DB';
import InterfacePhrases from '../api/InterfacePhrases';


class MainScreen extends ScreenComponent {

	static navigationOptions = ({ navigation }) => {
      	return {
        	title: InterfacePhrases.translate('title_mainscreen')
      	};
    };

	constructor(props) {
		super(props);
		DB.getList('group').then((data) => {
			this.props.setGlobalVariable('groupList', data);
		}).catch(err => console.log('catched err = ', err));
	}


	render() {
		if(!this.isDisplayed)
			return false;
		console.log('---------------------MainScreen---------------------');
		return (
			<Wrap pageTitle={'Home'}>
				<Text>999999999999</Text>
			</Wrap>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
