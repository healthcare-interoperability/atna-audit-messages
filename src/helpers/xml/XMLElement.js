/**
 * Represents a generic XML element.
 */
export class XMLElement {
    /**
     * @param {string} [type='element'] - The type of the element.
     */
    constructor(type = 'element') {
        this.element = {
            type: type
        };
        this.attributes = {};
        this.children = [];
    }

    /**
     * Sets the name of the element.
     * @param {string} name - The name to set.
     * @returns {XMLElement} - Returns the current instance for chaining.
     */
    setName(name) {
        this.element.name = name;
        return this;
    }

    /**
     * Sets the text content of the element.
     * @param {string} text - The text to set.
     * @returns {XMLElement} - Returns the current instance for chaining.
     */
    setText(text) {
        this.element.text = text;
        return this;
    }

    /**
     * Adds a child element to the current element.
     * @param {XMLElement} child - The child element to add.
     * @returns {XMLElement} - Returns the current instance for chaining.
     */
    addChild(child) {
        this.children.push(child);
        return this;
    }

    /**
     * Sets an attribute for the element.
     * @param {string} key - The attribute key.
     * @param {any} value - The attribute value.
     * @returns {XMLElement} - Returns the current instance for chaining.
     */
    setAttribute(key, value) {
        this.attributes[key] = value;
        return this;
    }

    /**
     * Sets multiple attributes for the element.
     * @param {Object} attributes - The attributes to set.
     * @returns {XMLElement} - Returns the current instance for chaining.
     */
    setAttributes(attributes) {
        this.attributes = attributes;
        return this;
    }

    /**
     * Converts the element to a JSON representation.
     * @returns {Object} - The JSON representation of the element.
     */
    toJSON() {
        return { ...this.element, attributes: this.attributes, elements: this.children };
    }
}