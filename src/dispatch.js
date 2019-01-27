import {ACTION_START_APPLICATION, ACTION_SET_GLOBAL_VALUE, ACTION_SET_SCREEN, ACTION_LOAD_LIST_LIST, ACTION_LOAD_DATA, ACTION_SET_SELECTION, ACTION_ADD_WORD} from './const';

const mapStateToProps = (state) => {
	//console.log('state', state);
	return {
		screenName: state.screenReducer.screenName,
		list: state.listReducer,
		selectedValues: state.addReducer.selectedValue,
		groupList: state.cacheReducer.groupList || {}
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		reload: (value) => dispatch({type: 'asfrtu65567'}),     //  just resload page
		loadApplication: (data) => dispatch({type: ACTION_START_APPLICATION, data}),
		setGlobalVariable: (key, value) => dispatch({type: ACTION_SET_GLOBAL_VALUE, key, value}),
		setScreen: (screen) => dispatch({type: ACTION_SET_SCREEN, screen}),
		loadListList: (data) => dispatch({type: ACTION_LOAD_DATA, data}),
		loadListData: (listName, data) => dispatch({type: ACTION_LOAD_DATA, data, listName}),
		selectBoxUpdate: (key, value) => dispatch({type: ACTION_SET_SELECTION, selectedValue: value, selectedKey: key}),
		addWord: (value) => dispatch({type: ACTION_ADD_WORD}),     //  clear inserted values
	};
}

export {mapStateToProps, mapDispatchToProps};
