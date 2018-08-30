const fs = require('fs');
const path = require('path');

const createType = (dir, file, name, map) => {
  const type = { name, values: [] };
  const list = JSON.parse(fs.readFileSync(path.join(dir, file)));
  const m = map || (obj => ({ name: { value: obj.name } }));
  type.values = list.map(m);
  return type;
};

module.exports = {
  createSpell: dir => createType(dir, 'spells.json', 'Spell')
};