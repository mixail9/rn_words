
const phrases = {
    ru: {
        btnAddWord: 'Добавить',
        btnAddGroup: 'Добавить группу',
        placeholderAddWord: 'Введите слово',
        placeholderAddTranslate: 'Введите перевод',
        title_mainscreen: 'Главная',
        title_groupsscreen: 'Темы'
    },
    en: {
        btnAddWord: 'add word',
        placeholderAddWord: 'put a word',
        placeholderAddTranslate: 'put a translate'
    }
};


class InterfacePhrasesClass {
    constructor(lang = 'ru') {
        this.defaultLang = 'ru';
        this.lang = lang;
    }
    translate(phrase) {
        return phrases[this.lang][phrase] || phrases[this.defaultLang][phrase] || phrase
    }
}


const InterfacePhrases = new InterfacePhrasesClass();
Object.freeze(InterfacePhrases);
export default InterfacePhrases;
