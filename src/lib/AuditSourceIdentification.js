import { ATNAComplexType } from "./ATNAComplexType.js";
import { Code } from "./Code.js";
import { XMLElement } from "../helpers/xml/XMLElement.js";

/**
 * Represents an AuditSourceIdentification element for ATNA.
 */
export class AuditSourceIdentification extends ATNAComplexType {
    /**
     * @param {string} auditEnterpriseSiteId - The audit enterprise site ID.
     * @param {string} auditSourceId - The audit source ID.
     * @param {Code} auditSourceTypeCode - The audit source type code.
     */
    constructor(auditEnterpriseSiteId, auditSourceId, auditSourceTypeCode) {
        super();
        this.auditEnterpriseSiteId = auditEnterpriseSiteId;
        this.auditSourceId = auditSourceId;
        if (auditSourceTypeCode instanceof Code) {
            this.auditSourceTypeCode = auditSourceTypeCode;
        } else {
            throw new Error(`Not a valid AuditSourceTypeCode`, auditSourceTypeCode);
        }
    }

    /**
     * Prepares XML representation of the AuditSourceIdentification element.
     * @returns {XMLElement} - The XML representation of the AuditSourceIdentification element.
     */
    prepareXML() {
        let attributes = {
            AuditEnterpriseSiteID: this.auditEnterpriseSiteId,
            AuditSourceID: this.auditSourceId,
            code: this.auditSourceTypeCode['csd-code'],
            codeSystemName: this.auditSourceTypeCode.codeSystemName,
            originalText: this.auditSourceTypeCode.originalText,
        };
        this.xml = new XMLElement().setName('AuditSourceIdentification').setAttributes(attributes);
        return this.xml;
    }
}