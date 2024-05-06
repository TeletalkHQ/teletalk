import { stuff } from "~/data/stuff";

//TODO: move to pkg
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

	updateModels(models: typeof stuff.models) {
		this.models = models;
		return this;
	}
	updateErrors(errors: typeof stuff.errors) {
		this.errors = errors;
		return this;
	}
	updateEvents(events: typeof stuff.events) {
		this.events = events;
		return this;
	}
	updateValidationModels(validationModels: typeof stuff.validationModels) {
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
