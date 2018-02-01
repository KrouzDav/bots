/**
 * Кидаем кубик
 * @param {Number} dice
 * @returns {*}
 */
rollDice = function (dice) {
    dice = dice || 20;
    return Math.floor(Math.random() * dice) + 1;
};

getModificator = function (statName) {
    var numb = rollDice(20);
    return statName + ': ' + ((numb-10.1)/2).toFixed() + '\n';
};