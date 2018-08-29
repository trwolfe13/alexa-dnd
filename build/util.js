const fs = require('fs');
const path = require('path');

const hasExt = ext => source => source.toLowerCase().endsWith('.' + ext);

const loadPartials = (dir, region, type) => {
  const partials = [];
  const partialsDir = path.join(dir, region, type);
  fs.readdirSync(partialsDir).filter(hasExt('json')).forEach(file => {
    const fileJson = JSON.parse(fs.readFileSync(path.join(partialsDir, file)));
    partials.push(...fileJson);
  });
  return partials;
};

module.exports = {
  hasExt,
  isDirectory: source => fs.lstatSync(source.path).isDirectory(),
  mkdirIfNotExist: dir => fs.existsSync(dir) || fs.mkdirSync(dir),
  region: root => dir => ({ name: dir, path: path.join(root, dir) }),
  loadIntents: (dir, region) => loadPartials(dir, region, 'intents'),
  loadTypes: (dir, region) => loadPartials(dir, region, 'types')
};