import React from 'react';
import { AsyncStorage } from "react-native";

class DBClass {

    #prefix = 'w_';

    getItemName(table, id) {
        return this.prefix + table + (id ? id : this.getLastId(table));
    }

    getLastId(table = 'common') {
        return AsyncStorage.getAllKeys().then( (keys) => {
            let maxId = 1;
            keys = keys.filter(item => !table || item.indexOf(table + '_') === 0);
            keys.sort((a, b) => {
                return parseInt(b.match(/_([\d]+)/)[1]) - parseInt(a.match(/_([\d]+)/)[1]);
            });
            //keys.map((key) => {AsyncStorage.removeItem(key); console.log('removeItem=', key);});
            return (keys.length) ? parseInt(keys[0].match(/_([\d]+)/)[1])+1 : 1;
        });
    }

    getListKeys(table = 'common', filter = {}) {
        return AsyncStorage.getAllKeys().then( (keys) => {
            let ids = {};
            keys = keys.filter(item => !table || item.indexOf(table + '_') === 0);
            keys.map(key => {
                ids[key] = parseInt(key.match(/_([\d]+)/)[1]);
            });
            return ids;
        }).catch(err => {console.log('getListKeys exception', err)});
    }

    getListValues(keys) {
        return AsyncStorage.multiGet(keys).then(data => {
            //console.log('getListValues data ', data);
            return data;
        }).catch(err => {console.log('getListValues exception', err)});
    }

    getList(table = 'common', filter = {}) {
        let keysWithIdLocal = null;
        return this.getListKeys(table, filter).then(keysWithId => {
                keysWithIdLocal = keysWithId;
                //console.log('keysWithId', keysWithId);
                return this.getListValues(Object.keys(keysWithId));
            }).then(data => {
                let parsedData = [];
                let json = null;
                data.forEach(item => {
                    json = JSON.parse(item[1]);
                    json.id = keysWithIdLocal[ item[0] ];
                    json.dbId = item[0];
                    parsedData.push(json);
                });
                return parsedData;
            }).catch(err => {console.log('getList exception', err)});
    }

    add(table = 'common', data) {
        this.getLastId(table).then((id) => {
            //console.log('getLastId table=', table, ' / id=', id, ' / data = ', data);
            AsyncStorage.setItem(table + '_' + id, data);
        }).catch(e => {
            console.log('add exception=', e);
        });
    }

    update(table = 'common', id, data) {

    }

    delete(table = 'common', id) {

    }

    deleteAll(table = '') {
        return AsyncStorage.getAllKeys().then( (keys) => {
            keys.map((key) => {
                if(!table || key.indexOf(table + '_') === 0) {
                    AsyncStorage.removeItem(key);
                    console.log('removeItem=', key);
                }
            });
            return (keys.length) ? parseInt(keys[0].match(/_([\d]+)/)[1])+1 : 1;
        }).catch(err => {});
    }
}

const DB = new DBClass();
Object.freeze(DB);
export default DB;
