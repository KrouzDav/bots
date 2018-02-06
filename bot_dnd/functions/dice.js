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
 * Кидаем кубик
 * @param {Number} dice
 * @returns {*}
 */
rollDiceCount = function (dice, count) {
    dice = dice || 20;
    count = count || 1;
    var result = 0;
    while (count > 1) {
        count--;
        result = result + Math.floor(Math.random() * dice) + 1
    }
    return result;
};
