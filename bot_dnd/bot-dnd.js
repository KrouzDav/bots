require('./functions/functions.js');
var telegramBot = require('node-telegram-bot-api'),
    config = require('./config/config.json'),
    bot = new telegramBot(config.bot_token, {polling: true});

bot.onText(/echo (.+)/, function (msg, match) {
    var fromId = msg.from.id;
    var resp = match[1];
    bot.sendMessage(fromId, resp);
});

bot.onText(/start/, function (msg, match) {
    var text = '/roll<число>:  кидает кубик  с максимальным значением -  <число>\n' +
            '/roll20 /roll4 /roll6 /roll8 /roll10 \n' +
            '/stat: показывает накинутые статы для персонажа первого уровня (модификаторы)\n' +
            '/gen <Имя>: генерирует персонажа Имя\n' +
            '/attack <Имя> <оружие>: отображает вероятность попадания и урон\n';

    bot.sendMessage(msg.chat.id, text);
});

bot.onText(/stat/, function (msg, match) {
    var str = setModificator('Сила') + setModificator('Ловкость') + setModificator('Харизма') +
    setModificator('Телосложение') + setModificator('Интеллект') + setModificator('Мудрость');
    bot.sendMessage(msg.chat.id, str);
});

bot.onText(/roll(.+)/, function (msg, match) {
    bot.sendMessage(msg.chat.id, rollDice(parseInt(match[1])));
});

bot.onText(/countRoll(.+) (.+)/, function (msg, match) {
    bot.sendMessage(msg.chat.id, rollDiceCount(parseInt(match[1]), parseInt(match[2])));
});

bot.onText(/gen (.+)/, function (msg, match) {
    bot.sendMessage(msg.chat.id, generateHero(match[1]));
});

bot.onText(/gennpc (.+)/, function (msg, match) {
    bot.sendMessage(msg.chat.id, generateNpc(match[1]));
});

bot.onText(/edithero (.+) (.+) (.+)/, function (msg, match) {
    bot.sendMessage(msg.chat.id, dataProcessing(match[1], match[2], match[3]));
});

bot.onText(/hero (.+)/, function (msg, match) {
    bot.sendMessage(msg.chat.id, getHero(match[1]));
});

bot.onText(/attack (.+) (.+)/, function (msg, match) {
    var res = attackHero(match[1], match[2]);
    bot.sendMessage(msg.chat.id, 'Атака (попадание): ' + res.attack + '\nУрон: ' + res.damage);
});

bot.onText(/menu/, function (msg, match) {
    var text =
        '/gen <Имя>: генерирует персонажа Имя\n' +
        '/edithero <Имя> <характеристика> <число>: увеличивает характеристику на указанное значение\n' +
        '/hero <Имя>: показывает характеристики персонажа\n';

    bot.sendMessage(msg.chat.id, text);
});



