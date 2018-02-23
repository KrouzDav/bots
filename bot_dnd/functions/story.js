setStory = function (story) {
    var json = getFileJson('./bot_dnd/story/story.json'),
        str = json.story + story;
    json.story = str;
    setFileJson('./bot_dnd/story/story.json', json)
};