function findSlots(sample) {
  const slots = [];
  let slot;
  const regex = /\{(.+?)\}/g;
  while (slot = regex.exec(sample)) {
    slots.push(slot[1]);
  }
  return slots;
}

function findAllSlots(samples) {
  if (!samples) { return []; }
  return samples.map(findSlots).reduce((a, c) => [...a, ...c], [])
}

function checkCustomTypesHaveValues(models) {
  models.interactionModel.languageModel.types.forEach(type => {
    if (!type.values) {
      throw new Error(`The type ${type.name} has no values array.`);
    }
    if (type.values.length === 0) {
      throw new Error(`The type ${type.name} has no values defined.`);
    }
  });
}

function checkCustomTypeNamesAreCapitalized(models) {
  models.interactionModel.languageModel.types.forEach(type => {
    if (/^[a-z].+$/.test(type.name)) {
      throw new Error(`The type ${type.name} must start with a capital letter.`)
    }
  });
}

function checkAllSlotTypesExist(models) {
  const types = models.interactionModel.languageModel.types.map(t => t.name);
  models.interactionModel.languageModel.intents.forEach(intent => {
    if (!intent.slots) { return; }
    intent.slots.forEach(slot => {
      if (!slot.type.startsWith('AMAZON') && !types.includes(slot.type)) {
        throw new Error(`The slot ${intent.name}.${slot.name} is defined as ${slot.type} which does not exist.`);
      }
    });
  });
}

function checkAllSlotsDeclared(models) {
  models.interactionModel.languageModel.intents.forEach(intent => {
    if (!intent.slots) { return; }
    const slots = intent.slots.map(s => s.name);
    intent.samples.forEach(sample => {
      findSlots(sample).forEach(slot => {
        if (!slots.includes(slot)) {
          throw new Error(`The intent ${intent.name} doesn't declare the slot '${slot}' used in sample '${sample}'`);
        }
      });
    });
  });
}

function checkAllSlotsAreUsed(models) {
  models.interactionModel.languageModel.intents.filter(i => i.slots).forEach(intent => {
    const slots = [], usedSlots = [];
    intent.slots.forEach(slot => {
      slots.push(slot.name);
      usedSlots.push(...findAllSlots(slot.samples));
    });
    usedSlots.push(...findAllSlots(intent.samples));

    const unusedSlots = slots.filter(s => !usedSlots.includes(s));
    if (unusedSlots.length > 0) {
      throw new Error(`The intent ${intent.name} declares the following slots that aren't used: ${unusedSlots.join(', ')}.`);
    }
  });
}

function checkAllTypesAreUsed(models) {
  const types = models.interactionModel.languageModel.types.map(t => t.name);
  const usedTypes = [];

  models.interactionModel.languageModel.intents.filter(i => i.slots).forEach(intent => {
    usedTypes.push(...intent.slots.map(s => s.type));
  });

  const unusedTypes = types.filter(t => !usedTypes.includes(t));
  if (unusedTypes.length > 0) {
    throw new Error(`The following custom types aren't used: ${unusedTypes.join(', ')}.`);
  }
}

function validateModels(models) {
  checkCustomTypesHaveValues(models);
  checkCustomTypeNamesAreCapitalized(models);
  checkAllSlotTypesExist(models)
  checkAllSlotsDeclared(models);
  checkAllSlotsAreUsed(models);
  checkAllTypesAreUsed(models);
}

module.exports = validateModels;