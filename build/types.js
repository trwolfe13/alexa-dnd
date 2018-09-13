const fs = require('fs');
const path = require('path');

const defaultMap = obj => {
  const value = {
    name: {
      value: obj.name,
    }
  };
  if (obj.synonyms) { value.name.synonyms = obj.synonyms; }
  return value;
}

const addSynonyms = synonyms => obj => {
  if (!synonyms || synonyms.length === 0) { return obj; }
  if (!obj.synonyms) { obj.synonyms = []; }
  obj.synonyms.push(...synonyms.map(s => s.replace('{0}', obj.name.toLowerCase())));
  return obj;
}

const createType = (dir, file, name, synonyms) => {
  const type = { name, values: [] };
  const list = JSON.parse(fs.readFileSync(path.join(dir, file)));
  type.values = list.map(addSynonyms(synonyms)).map(defaultMap);
  return type;
};

const createSubclass = dir => {
  const type = { name: 'Subclass', values: [] };
  const list = JSON.parse(fs.readFileSync(path.join(dir, 'classes.json')));
  const synonyms = addSynonyms([
    'the {0}',
    'the {0} subclass',
  ]);
  list.forEach(characterClass => {
    type.values.push(...characterClass.subclasses.map(synonyms).map(defaultMap));
  });
  return type;
};

const createSubrace = dir => {
  const type = { name: 'Subrace', values: [] };
  const list = JSON.parse(fs.readFileSync(path.join(dir, 'races.json')));
  const synonyms = addSynonyms([
    'the {0}',
    'the {0} race',
    'the {0} subrace',
  ]);
  list.forEach(race => {
    type.values.push(...race.subraces.map(synonyms).map(defaultMap));
  });
  return type;
};

module.exports = {
  createSpell: dir => createType(dir, 'spells.json', 'Spell', ['{0} spell', 'the {0} spell']),
  createClass: dir => createType(dir, 'classes.json', 'Class', ['{0} class', 'the {0} class']),
  createRace: dir => createType(dir, 'races.json', 'Race', ['{0} race', 'the {0} race']),
  createMagicItem: dir => createType(dir, 'magic-items.json', 'MagicItem', ['the {0}']),
  createEquipment: dir => createType(dir, 'equipment.json', 'Equipment', ['the {0}']),
  createBackground: dir => createType(dir, 'backgrounds.json', 'Background', ['{0} background', 'the {0} background']),
  createFeat: dir => createType(dir, 'feats.json', 'Feat', ['the {0} feat', '{0} feat']),
  createSubclass,
  createSubrace
};