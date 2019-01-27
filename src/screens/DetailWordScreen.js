import React, {Component} from 'react';
import {View, Text, ActivityIndicator, FlatList, ScrollView} from 'react-native';
import {connect} from 'react-redux';

import {mapStateToProps, mapDispatchToProps} from '../dispatch';
import {common} from '../styles';
import Wrap from '../components/Wrap';
import ScreenComponent from '../components/ScreenComponent';
import ListWithLoading from '../components/ListWithLoading';
import DB from '../api/DB';
import InterfacePhrases from '../api/InterfacePhrases';


class DetailWordScreen extends ScreenComponent {


	render() {
		if(!this.isDisplayed)
			return false;
		console.log('---------------------DetailWordScreen---------------------');
		return (<Text>detaildetaildetaildetaildetaildetaildetaildetail</Text>);
	}

}


export default connect(mapStateToProps, mapDispatchToProps)(DetailWordScreen);
