import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {connect} from 'react-redux';

import {mapStateToProps, mapDispatchToProps} from '../dispatch';
import {common} from '../styles';

import MainNavigator from '../reducers';



class Wrap extends Component {

	render() {
		//console.log('Wrap render', this.props);
		return (
			<View>
				<NavigationEvents
					onDidBlur={payload => { this.props.setScreen(payload.action.routeName); }}
				/>

				<View style={common.wrap}>
					{this.props.children}
				</View>
			</View>
		);
	}
}

/*
<View style={common.bar}>
	<Text style={common.title}>{this.props.screenName ? this.props.screenName : 'Home'}</Text>
</View>
*/

export default connect(mapStateToProps, mapDispatchToProps)(Wrap);
