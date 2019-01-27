import React, {Component} from 'react';
import {View, Text, TextInput, Picker, Button, Alert, Keyboard} from 'react-native';
import {connect} from 'react-redux';

import {mapStateToProps, mapDispatchToProps} from '../dispatch';
import DB from '../api/DB';
import {common} from '../styles';
import Wrap from '../components/Wrap';
import ScreenComponent from '../components/ScreenComponent';
import InterfacePhrases from '../api/InterfacePhrases';


class SettingsScreen extends ScreenComponent {
	constructor(props) {
		super(props);
		//DB.deleteAll();
		this.loadGroups();
	}

	render() {
		if(!this.isDisplayed)
			return false;
		console.log('SettingsScreen', this.props);
		return (
			<Wrap pageTitle={'Settings'}>
				<TextInput placeholder={InterfacePhrases.translate('placeholderAddWord')} onChangeText={input => this.onChangeText(input)} ref={node => {this.word2 = node}} />
				<TextInput placeholder={InterfacePhrases.translate('placeholderAddTranslate')} onChangeText={input => this.onChangeTextTranslation(input)} ref={node => {this.translate2 = node}} />

				<Text>Choose a language</Text>
				<Picker selectedValue={this.props.selectedValues.lang} onValueChange={(itemValue, itemIndex) => this.onChangeSelect('lang', itemValue, itemIndex)}>
					<Picker.Item label={'English'} value={'en'} />
					<Picker.Item label={'France'} value={'fr'} />
					<Picker.Item label={'Espaniol'} value={'es'} />
				</Picker>

				<Text>Choose a group</Text>
				<Picker selectedValue={this.props.selectedValues.group} onValueChange={(itemValue, itemIndex) => this.onChangeSelect('group', itemValue, itemIndex)}>
					<Picker.Item label={InterfacePhrases.translate('otherGroup')} value='0' key='0' />
					{this.props.groupList.map((val) => (
						<Picker.Item label={val.name} value={val.id} key={val.id} />
					))}
				</Picker>

				<Button title={InterfacePhrases.translate('btnAddWord')} onPress={() => this.onBtnAddWord()} />

				<TextInput placeholder={InterfacePhrases.translate('placeholderAddGroup')} onChangeText={input => this.onChangeTextGroup(input)} ref={node => {this.group2 = node}} />
				<Button title={InterfacePhrases.translate('btnAddGroup')} onPress={() => this.onBtnAddGroup()} />

				<Button title={InterfacePhrases.translate('btnClearAll')} onPress={() => this.onBtnClearAll()} style={{marginTop: 100}} />

			</Wrap>
		);
	}

	onChangeTextTranslation(word) {
		this.newTranslation = word;
	}
	onChangeText(word) {
		this.newWord = word;
	}
	onChangeTextGroup(word) {
		this.newGroup = word;
	}
	onChangeSelect(key, value, index) {
		this.props.selectBoxUpdate(key, value);
	}

	onBtnAddWord() {
		if(!this.props.selectedValues.lang)
			this.props.selectedValues.lang = 'en';
		if(!this.props.selectedValues.group)
			this.props.selectedValues.group = 0;
		if(!this.newWord || !this.newTranslation)
			return Alert.alert(InterfacePhrases.translate('someFieldsAreEmpty'));
		DB.add('word', JSON.stringify({l:this.props.selectedValues.lang, w: this.newWord, t: this.newTranslation, k: this.props.selectedValues.group}));
		this.word2.clear();
		this.translate2.clear();
		Keyboard.dismiss();
		this.props.addWord();
	}

	onBtnAddGroup() {
		if(!this.newGroup)
			return Alert.alert(InterfacePhrases.translate('someFieldsAreEmpty'));
		DB.add('group', JSON.stringify({name: this.newGroup}));
		this.group2.clear();
		Keyboard.dismiss();
		this.props.addWord();

		this.loadGroups();
	}

	onBtnClearAll() {
		return Alert.alert(
			InterfacePhrases.translate('attention'),
			InterfacePhrases.translate('allDataWillBeDeleted'),
			[
				{text: 'OK', onPress: () => this.clearAllData()},
				{text: 'Cancel', type: 'cancel'}
			],
			{cancelable: false}
		);
	}


	clearAllData() {
		DB.deleteAll().then(() => {
			this.props.addWord();
		});
	}

	loadGroups() {
		DB.getList('group').then((data) => {
			this.props.setGlobalVariable('groupList', data);
		}).catch(err => console.log('catched err = ', err));
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
