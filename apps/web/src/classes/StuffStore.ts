import { stuff } from "~/data/stuff";
import { Stuff } from "~/types";

class StuffStore {
  errors = stuff.errors;
  events = stuff.events;
  models = stuff.models;
  validationModels = stuff.validationModels;

  getStore() {
    return {
      errors: this.errors,
      models: this.models,
      events: this.events,
      validationModels: this.validationModels,
    };
  }

  updateModels(models: Stuff["models"]) {
    this.models = models;
    return this;
  }
  updateErrors(errors: Stuff["errors"]) {
    this.errors = errors;
    return this;
  }
  updateEvents(events: Stuff["events"]) {
    this.events = events;
    return this;
  }
  updateValidationModels(validationModels: Stuff["validationModels"]) {
    this.validationModels = validationModels;
    return this;
  }

  updateStore(data: typeof stuff) {
    this.errors = data.errors;
    this.models = data.models;
    this.validationModels = data.validationModels;
    this.events = data.events;
  }
}

export const stuffStore = new StuffStore();
