import { ATNAComplexType } from "./ATNAComplexType.js";
import { Code } from "./Code.js";
import { XMLElement } from "../helpers/xml/XMLElement.js";

/**
 * Represents an EventIdentification element for ATNA.
 */
export class EventIdentification extends ATNAComplexType {
    /**
     * @param {string} actionCode - The action code.
     * @param {string|Date} datetime - The event datetime.
     * @param {string} outcome - The event outcome indicator.
     */
    constructor(actionCode, datetime, outcome) {
        super();
        this.actionCode = actionCode;
        this.datetime = datetime instanceof Date ? datetime : new Date(datetime);
        this.outcome = outcome;
    }

    /**
     * Sets the EventID for the EventIdentification.
     * @param {Code} eventID - The EventID code.
     * @returns {EventIdentification} - Returns the current instance for chaining.
     */
    setEventID(eventID) {
        if (eventID instanceof Code) {
            this.eventID = eventID;
        } else {
            throw new Error(`Not a valid EventID`, eventID);
        }
        return this;
    }

    /**
     * Sets the PurposeOfUse for the EventIdentification.
     * @param {Code} purposeOfUse - The PurposeOfUse for the event.
     * @returns {EventIdentification} - Returns the current instance for chaining.
     */
    setPurposeOfUse(purposeOfUse) {
        if (purposeOfUse instanceof Code) {
            this.purposeOfUse = purposeOfUse;
        } else {
            throw new Error(`Not a valid PurposeOfUse`, purposeOfUse);
        }
        return this;
    }

    /**
     * Sets the TypeCode for the EventIdentification.
     * @param {Code} typeCode - The TypeCode for the event.
     * @returns {EventIdentification} - Returns the current instance for chaining.
     */
        setTypeCode(typeCode) {
            if (typeCode instanceof Code) {
                this.typeCode = typeCode;
            } else {
                throw new Error(`Not a valid TypeCode`, typeCode);
            }
            return this;
        }

    /**
     * Prepares XML representation of the EventIdentification element.
     * @returns {XMLElement} - The XML representation of the EventIdentification element.
     */
    prepareXML() {
        let attributes = {
            EventActionCode: this.actionCode,
            EventDateTime: this.datetime.toISOString(),
            EventOutcomeIndicator: this.outcome,
        };
        this.xml = new XMLElement().setName('EventIdentification');
        if (this.eventID) {
            this.xml.addChild(new XMLElement().setName('EventId').addChild(this.eventID.prepareXML()));
        }
        if (this.purposeOfUse) {
            this.xml.addChild(new XMLElement().setName('PurposeOfUse').addChild(this.purposeOfUse.prepareXML()));
        }
        if (this.typeCode) {
            this.xml.addChild(new XMLElement().setName('EventTypeCode').addChild(this.typeCode.prepareXML()));
        }
        this.xml.setAttributes(attributes);
        return this.xml;
    }
}
