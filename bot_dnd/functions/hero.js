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
    var json = getFileJson('./bot_dnd/heroes/' + name + '.json');
    switch (essence) {
        case 'сила' : {
            json.characteristics.mod_strenght = parseInt(json.characteristics.mod_strenght) + parseInt(number);
            break;
        }
        case 'ловкость' : {
            json.characteristics.mod_dexterity = parseInt(json.characteristics.mod_dexterity) + parseInt(number);
            break;
        }
        case 'харизма' : {
            json.characteristics.mod_charisma = parseInt(json.characteristics.mod_charisma) + parseInt(number);
            break;
        }
        case 'мудрость' : {
            json.characteristics.mod_sapience = parseInt(json.characteristics.mod_sapience) + parseInt(number);
            break;
        }
        case 'интеллект' : {
            json.characteristics.mod_intelligence = parseInt(json.characteristics.mod_intelligence) + parseInt(number);
            break;
        }
        case 'телосложение' : {
            json.characteristics.mod_physique = parseInt(json.characteristics.mod_physique) + parseInt(number);
            break;
        }
        case 'опыт' : {
            json.exp = parseInt(json.exp) + parseInt(number);
            break;
        }
        case 'уровень' : {
            json.level = parseInt(json.level) + parseInt(number);
            break;
        }
        case 'хп' : {
            json.fight_characteristics.hp = parseInt(json.fight_characteristics.hp) + parseInt(number);
            break;
        }
        case 'максхп' : {
            json.fight_characteristics.max_hp = parseInt(json.fight_characteristics.max_hp) + parseInt(number);
            break;
        }
        case 'кд' : {
            json.fight_characteristics.ca = parseInt(json.fight_characteristics.ca) + parseInt(number);
            break;
        }
        case 'золото' : {
            json.gold = parseInt(json.gold) + parseInt(number);
            break;
        }
    }
    setFileJson('./bot_dnd/heroes/' + name + '.json', json);

    return name + '\n' + essence + ': ' + number;
};

getHero = function (name) {
    var json = getFileJson('./bot_dnd/heroes/' + name + '.json');

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

generateNpc = function (nameHero, classHero, levelHero) {
    var json = {};
    nameHero = nameHero || generateName();
    classHero = classHero || 'warrior';
    levelHero = levelHero || 1;
    // Устаналиваем данные на случай, если они не указаны в предусловии
    // Читаем default_hero
    json = getFileJson('./bot_dnd/npc/default_npc.json');
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

    setFileJson('./bot_dnd/npc/' + json.name + '.json', json);
    // создаем nameNpc.json

    // Выводим информацию о созданном персонаже
    return 'Создан персонаж ' + json.name + '\n' +
        'Сила: ' + json.characteristics.mod_strenght + '\n' +
        'Ловкость: ' + json.characteristics.mod_dexterity + '\n' +
        'Телосложение: ' + json.characteristics.mod_physique + '\n' +
        'Интеллект: ' + json.characteristics.mod_intelligence + '\n' +
        'Мудрость: ' + json.characteristics.mod_sapience + '\n' +
        'Харизма: ' + json.characteristics.mod_charisma;

};