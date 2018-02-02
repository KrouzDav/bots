var fs = require('fs'),
    path = require('path'),
    intel = require('intel');

/**
 * Кидаем кубик
 * @param {Number} dice
 * @returns {*}
 */
rollDice = function (dice) {
    dice = dice || 20;
    return Math.floor(Math.random() * dice) + 1;
};

/**
 * Получает модификатор для харатеристики
 * @param statName Характеристика
 * @returns {string}
 */
getModificator = function (statName) {
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
    json = getFileJson('./bot_dnd/heroes/default_hero.json');
    json.name = nameHero;
    json.class = classHero;
    json.level = levelHero;

    // Меняем данные на свои
    json.characteristics.strenght = rollDice(20);
    json.characteristics.mod_strenght = ((json.characteristics.strenght-10.1)/2).toFixed();
    json.characteristics.dexterity = rollDice(20);
    json.characteristics.mod_dexterity = ((json.characteristics.dexterity-10.1)/2).toFixed();
    json.characteristics.physique = rollDice(20);
    json.characteristics.mod_physique = ((json.characteristics.physique-10.1)/2).toFixed();
    json.characteristics.intelligence = rollDice(20);
    json.characteristics.mod_intelligence = ((json.characteristics.intelligence-10.1)/2).toFixed();
    json.characteristics.sapience = rollDice(20);
    json.characteristics.mod_sapience = ((json.characteristics.sapience-10.1)/2).toFixed();
    json.characteristics.charisma = rollDice(20);
    json.characteristics.mod_charisma = ((json.characteristics.charisma-10.1)/2).toFixed();

    setFileJson('./bot_dnd/heroes/' + json.name + '.json', json);
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

dataProcessing = function (name, essence, number) {
    return 'name: ' + name + ' essence: ' + essence + ' number: ' + number;
};

setFileJson = function (file, json) {
    json = json || {};
    try {
        nullFileToJson(file);
        fs.writeFileSync(file, JSON.stringify(json), 'utf8');
    } catch (e) {
        intel.error(e);
    }
};

/**
 * Превращаем пустой файл в файл, который можно распарсить JSON
 * @param {String} file путь до файла
 */
nullFileToJson = function (file) {
    var str = '';
    try {
        str = fs.readFileSync(file);
        if (str.length === 0) {
            str = '{}';
        }
        try {
            fs.writeFileSync(file, str, 'utf8');
        } catch (err) {
            intel.error('Ошибка записи в файл:\n' + err)
        }
    } catch (e) {
        intel.error('Ошибка чтения файла:\n' + e)
    }
};

/**
 * Читает данные из json
 * @param {String} file.json
 * @returns {*} json
 */
getFileJson = function (file) {
    try {
        nullFileToJson(file);
        return JSON.parse(fs.readFileSync(file));
    } catch (e) {
        return {};
    };
};