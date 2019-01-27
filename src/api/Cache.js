import React from 'react';

import DB from './DB';

class CacheClass {

	#_data;

	getData(type) {
		//console.log('CacheClass::getData', type, this.#_data);
		if(!type)
			type = 'common';
		if(!this.#_data)
			this.#_data = {};
		if(!this.#_data[type])
			this.#_data[type] = [];
		return this.#_data[type];
	}


	setData(type, value) {
		//console.log('CacheClass::setData', type, value);
		if(!type)
			type = 'common';
		if(!this.#_data)
			this.#_data = {};
		if(!this.#_data[type])
			this.#_data[type] = [];
		this.#_data[type].concat(value);
	}

	loadFromCache() {
		return [{id: 1, name: 'Harry'}, {id: 1, name: 'Susin'}, {id: 1, name: 'Alex'}];
	}

	loadFromWeb() {

	}
}



const Cache = new CacheClass();
Object.freeze(DB);
export default Cache;
