/**
 * Получает модификатор для харатеристики
 * @param statName Характеристика
 * @returns {string}
 */
setModificator = function (statName) {
    var numb = rollDice(20);
    return statName + ': ' + ((numb-10.1)/2).toFixed() + '\n';
};

generateHero = function (nameHero, classHero, levelHero) {
    var json = {};
    nameHero = nameHero || generateName();
    classHero = classHero || 'warrior';
    levelHero = levelHero || 1;
    // Устаналиваем данные на случай, если они не указаны в предусловии
    // Читаем default_hero
    json = getFileJson('../bot_dnd/heroes/default_hero.json');
    json.name = nameHero;
    json.class = classHero;
    json.level = levelHero;

    // Меняем данные на свои
    json.characteristics.strenght = rollDice(20)+1;
    json.characteristics.mod_strenght = ((json.characteristics.strenght-10.1)/2).toFixed();
    json.characteristics.dexterity = rollDice(20)+1;
    json.characteristics.mod_dexterity = ((json.characteristics.dexterity-10.1)/2).toFixed();
    json.characteristics.physique = rollDice(20)+1;
    json.characteristics.mod_physique = ((json.characteristics.physique-10.1)/2).toFixed();
    json.characteristics.intelligence = rollDice(20)+1;
    json.characteristics.mod_intelligence = ((json.characteristics.intelligence-10.1)/2).toFixed();
    json.characteristics.sapience = rollDice(20)+1;
    json.characteristics.mod_sapience = ((json.characteristics.sapience-10.1)/2).toFixed();
    json.characteristics.charisma = rollDice(20)+1;
    json.characteristics.mod_charisma = ((json.characteristics.charisma-10.1)/2).toFixed();
    // вычисляем другие данные
    json.fight_characteristics.ca = 10 + parseInt(json.characteristics.mod_dexterity);
    json.fight_characteristics.hp = 10 + parseInt(json.characteristics.mod_physique);
    json.fight_characteristics.max_hp = 10 + parseInt(json.characteristics.mod_physique);

    setFileJson('../bot_dnd/heroes/' + json.name + '.json', json);
    // создаем nameHero.json

    // Выводим информацию о созданном персонаже
    return 'Создан персонаж ' + json.name + '\n' +
        'Сила: ' + json.characteristics.mod_strenght + '\n' +
        'Ловкость: ' + json.characteristics.mod_dexterity + '\n' +
        'Телосложение: ' + json.characteristics.mod_physique + '\n' +
        'Интеллект: ' + json.characteristics.mod_intelligence + '\n' +
        'Мудрость: ' + json.characteristics.mod_sapience + '\n' +
        'Харизма: ' + json.characteristics.mod_charisma;

};

// TODO Заглушка
generateName = function () {
    return 'Классное имя';
};

getDict = function (name) {
    var dict = require('../config/dict.json');
    return dict[name] || name;
};

dataProcessing = function (name, essence, number) {
    var json = getFileJson('../bot_dnd/heroes/' + name + '.json');
    switch (getDict(essence)) {
        case 'strenght' : {
            json.characteristics.strenght = parseInt(json.characteristics.strenght) + parseInt(number*2);
            json.characteristics.mod_strenght = parseInt(json.characteristics.mod_strenght) + parseInt(number);
            break;
        }
        case 'dexterity' : {
            json.characteristics.dexterity = parseInt(json.characteristics.dexterity) + parseInt(number*2);
            json.characteristics.mod_dexterity = parseInt(json.characteristics.mod_dexterity) + parseInt(number);
            break;
        }
        case 'charisma' : {
            json.characteristics.charisma = parseInt(json.characteristics.charisma) + parseInt(number*2);
            json.characteristics.mod_charisma = parseInt(json.characteristics.mod_charisma) + parseInt(number);
            break;
        }
        case 'sapience' : {
            json.characteristics.mod_sapience = parseInt(json.characteristics.mod_sapience) + parseInt(number);
            break;
        }
        case 'intelligence' : {
            json.characteristics.intelligence = parseInt(json.characteristics.intelligence) + parseInt(number*2);
            json.characteristics.mod_intelligence = parseInt(json.characteristics.mod_intelligence) + parseInt(number);
            break;
        }
        case 'physique' : {
            json.characteristics.physique = parseInt(json.characteristics.physique) + parseInt(number*2);
            json.characteristics.mod_physique = parseInt(json.characteristics.mod_physique) + parseInt(number);
            break;
        }
        case 'exp' : {
            json.exp = parseInt(json.exp) + parseInt(number);
            break;
        }
        case 'level' : {
            json.level = parseInt(json.level) + parseInt(number);
            break;
        }
        case 'hp' : {
            json.fight_characteristics.hp = parseInt(json.fight_characteristics.hp) + parseInt(number);
            break;
        }
        case 'maxhp' : {
            json.fight_characteristics.max_hp = parseInt(json.fight_characteristics.max_hp) + parseInt(number);
            break;
        }
        case 'ca' : {
            json.fight_characteristics.ca = parseInt(json.fight_characteristics.ca) + parseInt(number);
            break;
        }
        case 'gold' : {
            json.gold = parseInt(json.gold) + parseInt(number);
            break;
        }
        default : {
            json[getDict(essence)] = parseInt(json[getDict(essence)]) + parseInt(number);
            break;
        }
    }
    setFileJson('../bot_dnd/heroes/' + name + '.json', json);

    return name + '\n' + getDict(essence) + ': ' + number;
};

getHero = function (name) {
    var json = getFileJson('../bot_dnd/heroes/' + name + '.json');

    return 'Персонаж: ' + json.name + '\n\n' +
        'Класс: ' + json.class + '\n' +
        'Уровень: ' + json.level + '\n' +
        'Опыт: ' + json.exp + '\n\n' +
        'Сила: ' + json.characteristics.mod_strenght + '\n' +
        'Ловкость: ' + json.characteristics.mod_dexterity + '\n' +
        'Телосложение: ' + json.characteristics.mod_physique + '\n' +
        'Интеллект: ' + json.characteristics.mod_intelligence + '\n' +
        'Мудрость: ' + json.characteristics.mod_sapience + '\n' +
        'Харизма: ' + json.characteristics.mod_charisma + '\n' +
        'КД: ' + json.fight_characteristics.ca + '\n' +
        'Максимальное ХП: ' + json.fight_characteristics.max_hp + '\n\n' +
        'Текущее ХП: ' + json.fight_characteristics.hp + '\n\n' +
        'Золото: ' + json.gold + '\n\n';
};

show = function (type1, type2, type3) {
    var str = '';
    if (type1 === 'command') {
        // Показывает команды
        if (typeof type2 !== 'undefined') {
            switch (type2) {
                case 'hero' : {
                    // Если задан герой, то Показывает команды для героя type3
                    var hero = type3;
                    str = '/show_hero_' + hero + ' \n\n' +
                        'Сила +1: /edit_hero_' + hero + '_strenght_1\n\n' +
                        'Ловкость +1: /edit_hero_' + hero + '_dexterity_1\n\n' +
                        'Телосложение +1: /edit_hero_' + hero + '_physique_1\n\n' +
                        'Интеллект +1: /edit_hero_' + hero + '_intelligence_1\n\n' +
                        'Мудрость +1: /edit_hero_' + hero + '_sapience_1\n\n' +
                        'Харизма +1: /edit_hero_' + hero + '_charisma_1\n\n' +
                        'хп +1: /edit_hero_' + hero + '_hp_1\n\n' +
                        'максимальное хп +1: /edit_hero_' + hero + '_maxhp_1\n\n' +
                        'кд +1: /edit_hero_' + hero + '_ca_1\n\n' +
                        'опыт +50: /edit_hero_' + hero + '_exp_50\n\n' +
                        'золото +10: /edit_hero_' + hero + '_gold_10\n\n';
                    break;
                }
                default : {

                }
            }

        } else {
            // Показывает общие команды
        }
    } else {
        // Показывает информацию о герое type1
        str = getHero(type2);
    }
    return str;
};