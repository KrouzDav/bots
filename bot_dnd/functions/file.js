var fs = require('fs'),
    intel = require('intel');

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