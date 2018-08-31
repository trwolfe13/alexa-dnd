const fs = require('fs');
const path = require('path');
const util = require('./util');
const types = require('./types');
const validateModels = require('./models.validation');

// Config

const config = {
  output: './dist/models',
  input: './models',
  data: './src/data'
};

// Build

const regions = fs.readdirSync(config.input).map(util.region(config.input)).filter(util.isDirectory);
util.mkdirIfNotExist(config.output);
regions.forEach(region => {
  const models = JSON.parse(fs.readFileSync(path.join(region.path, 'models.json')));

  // Load JSON files.
  models.interactionModel.languageModel.intents = util.loadIntents(config.input, region.name);
  models.interactionModel.languageModel.types = util.loadTypes(config.input, region.name);
  models.interactionModel.dialog.intents = util.loadDialogIntents(config.input, region.name);
  models.interactionModel.prompts = util.loadDialogPrompts(config.input, region.name);

  // Create dynamic types.
  models.interactionModel.languageModel.types.push(types.createSpell(config.data));

  validateModels(models);

  const modelsDir = path.join(config.output, region.name);
  const modelsPath = path.join(modelsDir, 'models.json');
  const modelsJson = JSON.stringify(models, null, 2);
  util.mkdirIfNotExist(modelsDir);
  fs.writeFileSync(modelsPath, modelsJson);
});