type ElementName = string;
type ElementId = string;

class DomUtils {
	private document = document;
	private element?: Element;
	private elementId?: string;
	private elementName?: string;

	getDefaultState() {
		return {
			element: this.getElementById("root"),
			elementId: "",
			elementName: "",
		};
	}

	getElementsByName(elementName: string) {
		return this.document.getElementsByName(elementName);
	}
	getFirstElementByName(elementName: string) {
		return this.getElementsByName(elementName)[0];
	}

	getElement() {
		return this.element;
	}
	setElement(element: Element) {
		this.element = element;
		return this;
	}

	getElementId() {
		return this.elementId;
	}
	setElementId(elementId: string) {
		this.elementId = elementId;
		return this;
	}
	getElementName() {
		return this.elementName;
	}
	setElementName(elementName: string) {
		this.elementName = elementName;
		return this;
	}

	setElementById(elementId: ElementName) {
		const element = this.getElementById(elementId)!;
		this.setElement(element);

		this.setElementId(elementId);

		return this;
	}

	focusElement() {
		const el = this.getElement();

		if (el && "focus" in el && typeof el.focus === "function") el.focus();

		return this;
	}

	selectAllValue() {
		const el = this.getElement();
		if (el && "select" in el && typeof el.select === "function") el.select();

		return this;
	}

	setElementByName(elementName: ElementName) {
		const element = this.getFirstElementByName(elementName);
		if (element) this.setElement(element);
		this.setElementName(elementName);

		return this;
	}

	getElementById(elementId: ElementId): HTMLElement | null {
		return this.document.getElementById(elementId);
	}
}

const domUtils = () => new DomUtils();

export { domUtils, DomUtils };
