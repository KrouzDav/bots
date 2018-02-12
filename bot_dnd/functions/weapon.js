require('./dice.js');
attackHero = function (hero, weapon) {
    var jsonHero = getFileJson('./bot_dnd/heroes/' + hero + '.json'),
        _weapon = {},
        result = {},
        weapon_en = 'chort_sword',
        modAttack = 0;
    switch (weapon) {
        case 'кинжал' : {
            weapon_en = 'dirk';
            break;
        }
    }
    _weapon = getWeapon(weapon_en);

    if (typeof jsonHero.possession[weapon_en] !== 'undefined') { // Если есть владение оружием - добавляем его модификатор
        modAttack = parseInt(jsonHero.possession[weapon_en]);
    }
    result.attack = rollDice(20) + modAttack;
    if (weapon_en == 'dirk' || weapon_en == 'rapier') {
        result.damage = rollDice(parseInt(_weapon.roll_damage)) + parseInt(_weapon.add_damage) +
            parseInt(jsonHero.characteristics.mod_dexterity);
    } else {
        result.damage = rollDice(parseInt(_weapon.roll_damage)) + parseInt(_weapon.add_damage) +
            parseInt(jsonHero.characteristics.mod_strenght);
    }

    return result;
};

getWeapon = function (weapon) {
    var json = getFileJson('./bot_dnd/things/weapons.json');
    return json[weapon] || {};
};