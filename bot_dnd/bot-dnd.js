require('./functions.js');
var telegramBot = require('node-telegram-bot-api'),
    config = require('../config/config.json'),
    bot = new telegramBot(config.botToken, {polling: true});

bot.onText(/echo (.+)/, function (msg, match) {
    var fromId = msg.from.id;
    var resp = match[1];
    bot.sendMessage(fromId, resp);
});

bot.onText(/start/, function (msg, match) {
    var fromId = msg.chat.id,
        text = '/roll <число>:  кидает кубик  с максимальным значением -  <число>\n' +
            '/stat: показывает накинутые статы для персонажа первого уровня (модификаторы)\n' +
            '/gen Имя: генерирует персонажа Имя';

    bot.sendMessage(msg.chat.id, text);
});

bot.onText(/stat/, function (msg, match) {
    var str = getModificator('Сила') + getModificator('Ловкость') + getModificator('Харизма') +
    getModificator('Телосложение') + getModificator('Интеллект') + getModificator('Мудрость');
    bot.sendMessage(msg.chat.id, str);
});

bot.onText(/roll(.+)/, function (msg, match) {
    bot.sendMessage(msg.chat.id, rollDice(parseInt(match[1])));
});

bot.onText(/gen (.+)/, function (msg, match) {
    bot.sendMessage(msg.chat.id, generateHero(match[1]));
});