import { ATNAComplexType } from "./ATNAComplexType.js";
import { XMLElement } from "../helpers/xml/XMLElement.js";



/**
 * Represents a value pair element for ATNA.
 */
export class ValuePair extends ATNAComplexType {
    /**
     * @param {string} type - The type of the value.
     * @param {string} value - The value.
     */
    constructor(type, value) {
        super();
        this.type = type;
        this.value = value;
    }

    /**
     * Prepares XML representation of the ValuePair element.
     * @returns {XMLElement} - The XML representation of the ValuePair element.
     */
    prepareXML() {
        let attributes = {
            type: this.type,
            value: new Buffer.from(this.value).toString('base64'),
        };
        this.xml = new XMLElement().setAttributes(attributes).setName('ValuePair');
        return this.xml;
    }
}