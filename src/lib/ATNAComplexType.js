import { XMLElement } from "../helpers/xml/XMLElement.js";
import xmljsconverter from "xml-js";

/**
 * Represents a complex type for ATNA (Audit Trail and Node Authentication) data.
 */
export class ATNAComplexType {
    /**
     * Initializes a new instance of the ATNAComplexType class.
     */
    constructor() {
        this.xml = {};
    }

    /**
     * Abstract method to prepare XML data specific to each subclass.
     * @abstract
     */
    prepareXML() {
        // Implementation specific to each subclass.
    }

    /**
     * Converts the complex type to XML format.
     * @returns {XMLElement} - The XML representation of the complex type.
     */
    toXML() {
        return xmljsconverter.json2xml(new XMLElement().addChild(this.prepareXML()),  {compact: false, spaces: 4})
    }

    /**
     * Converts the complex type to JSON format.
     * @returns {Object} - The JSON representation of the complex type.
     */
    toJSON() {
        return this.prepareXML();
    }
}