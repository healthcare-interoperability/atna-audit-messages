import { ATNAComplexType } from "./ATNAComplexType.js";
import { XMLElement } from "../helpers/xml/XMLElement.js";

/**
 * Represents a code element for ATNA.
 */
export class Code extends ATNAComplexType {
    /**
     * @param {string} code - The code value.
     * @param {string} system - The code system.
     */
    constructor(code, system) {
        super();
        this.code = code;
        this.system = system;
    }

    /**
     * Sets the original text for the code.
     * @param {string} originalText - The original text value.
     * @returns {Code} - Returns the current instance for chaining.
     */
    setOriginalText(originalText) {
        this.originalText = originalText;
        return this;
    }

    /**
     * Sets the display value for the code.
     * @param {string} display - The display value.
     * @returns {Code} - Returns the current instance for chaining.
     */
    setDisplay(display) {
        this.display = display;
        return this;
    }

    /**
     * Prepares XML representation of the Code element.
     * @returns {XMLElement} - The XML representation of the Code element.
     */
    prepareXML() {
        let attributes = {
            'csd-code': this.code,
            codeSystemName: this.system,
        };
        if (this.originalText) {
            attributes.originalText = this.originalText;
        }
        if (this.display) {
            attributes.displayName = this.display;
        }
        this.xml = new XMLElement().setName('Code').setAttributes(attributes);
        return this.xml;
    }
}