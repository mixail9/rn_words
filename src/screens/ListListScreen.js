import React, {Component} from 'react';
import {View, Text, ActivityIndicator, FlatList, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import { NavigationActions } from 'react-navigation';

import {mapStateToProps, mapDispatchToProps} from '../dispatch';
import {common} from '../styles';
import Wrap from '../components/Wrap';
import ScreenComponent from '../components/ScreenComponent';
import ListWithLoading from '../components/ListWithLoading';
import DB from '../api/DB';
import Cache from '../api/Cache';
import InterfacePhrases from '../api/InterfacePhrases';


class ListListScreen extends ScreenComponent {

	static navigationOptions = ({ navigation }) => {
	      return {
	        title: InterfacePhrases.translate('title_groupsscreen')
	      };
	};

	constructor(props) {
		super(props);
		this.prefix = 'group';
	};

	render() {
		if(!this.isDisplayed)
			return false;

		console.log('---------------------' , this.prefix, '---------------------');
		return (<ListWithLoading prefix={this.prefix} renderItem={(item) => this.renderItem(item)} loadData={() => {this.loadData();}} />);
	}

	loadData() {
		const {page} = this.props.list;
		const cachedData = Cache.getData(this.prefix)
		if(cachedData && cachedData.length) {
			this.props.loadListData(this.prefix, Cache.getData(this.prefix));
			return true;
		}

		DB.getList(this.prefix).then((newData) => {
			if(page == 0)
				Cache.setData(this.prefix, newData);
			this.props.loadListData(this.prefix, newData);
		}).catch(err => console.log('catched err = ', err));
	}

	renderItem(item) {
		return (
			<Text style={{fontSize: 24}} onPress={() => {console.log('item.press', this.props.navigation); this.props.navigation.navigate('Details', {name: 'Jane'}); }}>{item.name}</Text>
		);
	}

}


export default connect(mapStateToProps, mapDispatchToProps)(ListListScreen);
