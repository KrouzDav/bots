attackHero = function (name, weapon) {
    var json = getFileJson('./bot_dnd/heroes/' + name + '.json'),
        weaponLeft = getWeapon(json.weapon.weapon_left),
        weaponRight = getWeapon(json.weapon.weapon_right),
        weaponRange = getWeapon(json.weapon.weapon_range);
    // попадание - владение оружием и кд врага

    //учет модификатора - ловкость или сила - выбираем по оружию
    //расчет урона
    //rollDice(weaponRight)+modificator(сила ловкость)

};

getWeapon = function (weapon) {
    var json = getFileJson('./bot_dnd/things/weapons.json');
    return json[weapon] || {};
};