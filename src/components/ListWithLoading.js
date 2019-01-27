import React, {Component} from 'react';
import {View, Text, ActivityIndicator, FlatList, ScrollView} from 'react-native';
import {connect} from 'react-redux';

import {mapStateToProps, mapDispatchToProps} from '../dispatch';
import Cache from '../api/Cache';
import {common} from '../styles';
import Wrap from './Wrap';
import InterfacePhrases from '../api/InterfacePhrases';


class ListWithLoading extends Component {

	componentDidMount() {
		this.props.list.loading = true;
	}

	render() {
		//console.log('render this', this);
		const {loading, data} = this.props.list;
		//console.log('ListWithLoading', loading, data);
		if(loading) {
			console.log('ListWithLoading render ', loading, ' / ', data);
			this.loadData();
		}
		return (
			<Wrap pageTitle={'List of lists'}>
				<ScrollView onScroll={event => this.onScroll(event.nativeEvent)} scrollEventThrottle={16}>
					<FlatList data={data} renderItem={item => this.renderItem(item.item)} />
				</ScrollView>
				{this.props && this.props.list && this.props.list.loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
			</Wrap>
		);
	}

	onScroll(event) {
		if(event.contentOffset.y > event.contentSize.height - event.layoutMeasurement.height - 10) {
			this.loadData();
			// TODO: data loaded several times, neet timeot for scroll event (because - 10 in if)
		}
	}

	renderItem(item) {
		if(this.props.renderItem)
			return this.props.renderItem(item);
		return (
			<Text style={{fontSize: 24}}>{this.props.prefix}--{item.name}</Text>
		);
	}

	loadData() {
		if(this.props.loadData)
			return this.props.loadData();
		console.log('loadData', this);
		const {prefix} = this.props;
		const {page} = this.props.list;
		let newData = [];
		for(let i = 0; i < 20; i++)
			newData.push({key: (i + this.props.list.page*20).toString(), name: (i + this.props.list.page*20).toString()});

		newData = (!this.props.list || !this.props.list.data || !this.props.list.data.length) ? newData : this.props.list.data.concat(newData);
		setTimeout(() => {
			if(page == 0)
				Cache.setData(prefix, newData);
			this.props.loadListData(prefix, newData);
		}, 500);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListWithLoading);
