const fs = require('fs');
const path = require('path');

const defaultMap = obj => {
  const value = {
    name: {
      value: obj.name,
    }
  };
  if (obj.synonyms) { value.synonyms = obj.synonyms; }
  return value;
}

const createType = (dir, file, name, map) => {
  const type = { name, values: [] };
  const list = JSON.parse(fs.readFileSync(path.join(dir, file)));
  type.values = list.map(map || defaultMap);
  return type;
};

const createSubclass = dir => {
  const type = { name: 'Subclass', values: [] };
  const list = JSON.parse(fs.readFileSync(path.join(dir, 'classes.json')));
  list.forEach(characterClass => {
    type.values.push(...characterClass.subclasses.map(defaultMap));
  });
  return type;
};

module.exports = {
  createSpell: dir => createType(dir, 'spells.json', 'Spell'),
  createClass: dir => createType(dir, 'classes.json', 'Class'),
  createSubclass
};