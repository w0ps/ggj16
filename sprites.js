var fs = require('fs'),
    toConvert = {
        light: 'characters-light.png',
        dark: 'characters-dark.png',
        fieldResources: 'field-resources.png',
        treeDark: 'tree-of-death.png',
        treeLight: 'tree-of-life.png',
        background: 'background.jpg'
    };

function base64Encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

function loadBase64() {
    // convert image to base64 encoded string
    var sprites = {};

    Object.keys( toConvert ).forEach(function( key ) {
        var base64Sprite = base64Encode('public/sprites/' + toConvert[key]);
        sprites[key] = base64Sprite;
    });

    return sprites;
}

module.exports = {
  loadBase64: loadBase64,
};

