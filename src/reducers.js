import {createStore, combineReducers} from 'redux';
import {createBottomTabNavigator, addNavigationHelpers, NavigationActions, createStackNavigator} from 'react-navigation';
import {connect} from 'react-redux';

import {mapStateToProps, mapDispatchToProps} from './dispatch';
import Cache from './api/Cache';
import MainScreen from './screens/MainScreen';
import SettingsScreen from './screens/SettingsScreen';
import ListListScreen from './screens/ListListScreen';
import ListWordsScreen from './screens/ListWordsScreen';
import DetailWordScreen from './screens/DetailWordScreen';

import {ACTION_START_APPLICATION, ACTION_SET_GLOBAL_VALUE, ACTION_SET_SCREEN, ACTION_LOAD_LIST_LIST, ACTION_LOAD_DATA, ACTION_SET_SELECTION, ACTION_ADD_WORD} from './const';



const SecondNavigator = createStackNavigator({
    MainList: ListListScreen,
    Details: DetailWordScreen,
});



/*
toolbar not show
const MainNavigator = createBottomTabNavigator({
	First: {screen: MainScreen},
	SettingsScreen: {screen: SettingsScreen},
	ListWordsScreen: {screen: ListWordsScreen},
	Second: {screen: SecondNavigator}
}, {backBehavior:'none', lazy: true});
*/

const MainNavigator = createBottomTabNavigator({
	First: {screen: createStackNavigator({MainScreen})},
	SettingsScreen: {screen: createStackNavigator({SettingsScreen})},
	ListWordsScreen: {screen: createStackNavigator({ListWordsScreen})},
	Second: {screen: SecondNavigator}
}, {backBehavior:'none', lazy: true});




const screenReducer = (state = MainNavigator.router.getStateForAction(NavigationActions.init), action) => {
    console.log('screenReducer', action, ' / ', state);
	let newState = MainNavigator.router.getStateForAction(action, state) || state;
	if(!newState.screenName)
		newState.screenName = action.screen;
	//if(action.type == ACTION_SET_SCREEN)
	//	console.log('screenReducer', action);
	return newState;
};

const listReducer = (state = {page: 0, loading: true, data: []}, action) => {

	//console.log('action', action);

	if(action.type == ACTION_ADD_WORD) {
		console.log('addReducer state ', state);
		return {...state, selectedValue: 0}
	}

	if(action.type == ACTION_SET_SCREEN) {
		//if(Cache.getData(action.listName).length)
		//	return {...state, page: 0, loading: false, data: Cache.getData(action.listName)};
		//else
			return {...state, page: 0, loading: true, data: []};
	}

	if(action.type == ACTION_LOAD_DATA)
		return {...state, page: state.page+1, loading: false, data: action.data};
	if(action.type == ACTION_LOAD_LIST_LIST)
		return {...state, page: state.page+1, loading: false, data: action.data};

	return {...state};
};


const addReducer = (state = {selectedValue:{}}, action) => {
	if(action.type == ACTION_SET_SELECTION) {
		let selectedValue = state.selectedValue;
		selectedValue[action.selectedKey] = action.selectedValue;
		return {...state, selectedValue: selectedValue};
	}
	if(action.type == ACTION_ADD_WORD) {
		console.log('addReducer state ', state);
		return {...state, selectedValue: {}}
	}

	return {...state};
}

const cacheReducer = (state = {}, action) => {
	if(action.type == ACTION_START_APPLICATION)
		return {...state};
	if(action.type == ACTION_SET_GLOBAL_VALUE) {
		state[ action.key ] = action.value;
		return {...state};
	}

	return {...state};
}


const rootReducer = combineReducers({
	screenReducer,
	listReducer,
	addReducer,
	cacheReducer
});

const configureStore = () => {
	return createStore(rootReducer);
};

export default connect(mapStateToProps, mapDispatchToProps)(MainNavigator);
export {configureStore};
