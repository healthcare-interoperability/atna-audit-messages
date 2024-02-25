import { XMLElement } from "./XMLElement.js";

/**
 * Represents a text element that extends XMLElement.
 */
export class TextElement extends XMLElement {
    /**
     * @param {string} text - The text content of the element.
     */
    constructor(text) {
        super('text');
        this.setText(text);
    }
}
