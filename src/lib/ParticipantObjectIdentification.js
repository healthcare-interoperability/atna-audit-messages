import { ATNAComplexType } from "./ATNAComplexType.js";
import { Code } from "./Code.js";
import { TextElement } from "../helpers/xml/TextElement.js";
import { XMLElement } from "../helpers/xml/XMLElement.js";


/**
 * Represents a ParticipantObjectIdentification element for ATNA.
 */
export class ParticipantObjectIdentification extends ATNAComplexType {
    /**
     * @param {string} objId - The participant object ID.
     * @param {string} objTypeCode - The participant object type code.
     */
    constructor(objId, objTypeCode) {
        super();
        this.objId = objId;
        this.objTypeCode = objTypeCode;
    }

    /**
     * Sets the ParticipantObjectIDTypeCode for the ParticipantObjectIdentification.
     * @param {Code} objIdTypeCode - The ParticipantObjectIDTypeCode.
     * @returns {ParticipantObjectIdentification} - Returns the current instance for chaining.
     */
    setParticipantObjectIDTypeCode(objIdTypeCode) {
        if (objIdTypeCode instanceof Code) {
            this.objIdTypeCode = objIdTypeCode;
        } else {
            throw new Error(`Not a valid ParticipantObjectTypeCode`, objIdTypeCode);
        }

        return this;
    }

    /**
     * Sets the ParticipantObjectTypeCodeRole for the ParticipantObjectIdentification.
     * @param {string} objTypeCodeRole - The ParticipantObjectTypeCodeRole.
     * @returns {ParticipantObjectIdentification} - Returns the current instance for chaining.
     */
    setParticipantObjectTypeCodeRole(objTypeCodeRole) {
        this.objTypeCodeRole = objTypeCodeRole;
        return this;
    }

    /**
     * Sets the ParticipantObjectTypeCode for the ParticipantObjectIdentification.
     * @param {string} objTypeCode - The ParticipantObjectTypeCode.
     * @returns {ParticipantObjectIdentification} - Returns the current instance for chaining.
     */
    setParticipantObjectTypeCode(objTypeCode) {
        this.objTypeCode = objTypeCode;
        return this;
    }

    /**
     * Sets the ParticipantObjectDataLifeCycle for the ParticipantObjectIdentification.
     * @param {string} objDataLifeCycle - The ParticipantObjectDataLifeCycle.
     * @returns {ParticipantObjectIdentification} - Returns the current instance for chaining.
     */
    setParticipantObjectDataLifeCycle(objDataLifeCycle) {
        this.objDataLifeCycle = objDataLifeCycle;
        return this;
    }

    /**
     * Sets the ParticipantObjectSensitivity for the ParticipantObjectIdentification.
     * @param {string} objSensitivity - The ParticipantObjectSensitivity.
     * @returns {ParticipantObjectIdentification} - Returns the current instance for chaining.
     */
    setParticipantObjectSensitivity(objSensitivity) {
        this.objSensitivity = objSensitivity;
        return this;
    }

    /**
     * Sets the ParticipantObjectDetail for the ParticipantObjectIdentification.
     * @param {ValuePair} objDetails - The ParticipantObjectDetail as a ValuePair.
     * @returns {ParticipantObjectIdentification} - Returns the current instance for chaining.
     */
    setParticipantObjectDetail(objDetails) {
        if (objDetails instanceof ValuePair) {
            this.objDetails = objDetails;
        } else {
            throw new Error(`Not a valid ParticipantObjectDetail`, objDetails);
        }

        return this;
    }

    /**
     * Sets the ParticipantObjectName for the ParticipantObjectIdentification.
     * @param {string} objName - The ParticipantObjectName.
     * @returns {ParticipantObjectIdentification} - Returns the current instance for chaining.
     */
    setParticipantObjectName(objName) {
        this.objName = objName;
        return this;
    }

    /**
     * Sets the ParticipantObjectQuery for the ParticipantObjectIdentification.
     * @param {string} objQuery - The ParticipantObjectQuery.
     * @returns {ParticipantObjectIdentification} - Returns the current instance for chaining.
     */
    setParticipantObjectQuery(objQuery) {
        this.objQuery = objQuery;
        return this;
    }

    /**
     * Prepares XML representation of the ParticipantObjectIdentification element.
     * @returns {XMLElement} - The XML representation of the ParticipantObjectIdentification element.
     */
    prepareXML() {
        this.xml = new XMLElement().setName('ParticipantObjectIdentification');
        let attributes = {
            ParticipantObjectID: this.objId,
        };

        if (this.objTypeCode) {
            attributes['ParticipantObjectTypeCode'] = this.objTypeCode;
        }
        if (this.objTypeCodeRole) {
            attributes['ParticipantObjectTypeCodeRole'] = this.objTypeCodeRole;
        }
        if (this.objDataLifeCycle) {
            attributes['ParticipantObjectDataLifeCycle'] = this.objDataLifeCycle;
        }
        if (this.objSensitivity) {
            attributes['ParticipantObjectSensitivity'] = this.objSensitivity;
        }

        this.xml.addChild(
            new XMLElement().setName('ParticipantObjectIDTypeCode').addChild(this.objIdTypeCode.prepareXML())
        );

        if (this.objName) {
            this.xml.addChild(
                new XMLElement().setName('ParticipantObjectName').addChild(new TextElement(this.objName))
            );
        } else if (this.objQuery) {
            this.xml.addChild(
                new XMLElement().setName('ParticipantObjectQuery').addChild(new TextElement(this.objQuery))
            );
        }

        if (this.objDetails) {
            this.xml.addChild(
                new XMLElement('ParticipantObjectDetail', 'element', {}, [this.objDetails.prepareXML()])
            );
        }
        this.xml.setAttributes(attributes);
        return this.xml;
    }
}