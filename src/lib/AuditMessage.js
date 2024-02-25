import { ATNAComplexType } from "./ATNAComplexType.js";
import { ActiveParticipant } from "./ActiveParticipant.js";
import { AuditSourceIdentification } from "./AuditSourceIdentification.js";
import { EventIdentification } from "./EventIdentification.js";
import { ParticipantObjectIdentification } from "./ParticipantObjectIdentification.js";
import { XMLElement } from "../helpers/xml/XMLElement.js";

/**
 * Represents an AuditMessage element for ATNA.
 */
export class AuditMessage extends ATNAComplexType {
    /**
     * @param {EventIdentification} eventIdent - The event identification for the audit message.
     */
    constructor(eventIdent) {
        super();
        if (eventIdent instanceof EventIdentification) {
            this.eventIdent = eventIdent;
        } else {
            throw new Error(`Not a valid event identification!`);
        }
    }

    /**
     * Sets the ActiveParticipant elements for the AuditMessage.
     * @param {ActiveParticipant|ActiveParticipant[]} activeParticipants - The ActiveParticipants.
     * @returns {AuditMessage} - Returns the current instance for chaining.
     */
    setActiveParticipant(activeParticipants) {
        if (!Array.isArray(activeParticipants)) {
            activeParticipants = [activeParticipants];
        }
        this.activeParticipants = activeParticipants.map((activeParticipant) => {
            if (activeParticipant instanceof ActiveParticipant) {
                return activeParticipant;
            } else {
                throw new Error(`Not a valid ActiveParticipant`, activeParticipant);
            }
        });
        return this;
    }

    /**
     * Sets the ParticipantObjectIdentification elements for the AuditMessage.
     * @param {ParticipantObjectIdentification|ParticipantObjectIdentification[]} participantObjs - The ParticipantObjectIdentifications.
     * @returns {AuditMessage} - Returns the current instance for chaining.
     */
    setParticipantObjectIdentification(participantObjs) {
        if (!Array.isArray(participantObjs)) {
            participantObjs = [participantObjs];
        }
        this.participantObjs = participantObjs.map((participantObj) => {
            if (participantObj instanceof ParticipantObjectIdentification) {
                return participantObj;
            } else {
                throw new Error(`Not a valid ParticipantObjectIdentification`, participantObj);
            }
        });
        return this;
    }

    /**
     * Sets the AuditSourceIdentification elements for the AuditMessage.
     * @param {AuditSourceIdentification|AuditSourceIdentification[]} auditSources - The AuditSourceIdentifications.
     * @returns {AuditMessage} - Returns the current instance for chaining.
     */
    setAuditSourceIdentification(auditSources) {
        if (!Array.isArray(auditSources)) {
            auditSources = [auditSources];
        }
        this.auditSources = auditSources.map((auditSource) => {
            if (auditSource instanceof AuditSourceIdentification) {
                return auditSource;
            } else {
                throw new Error(`Not a valid AuditSourceIdentification`, auditSource);
            }
        });
        return this;
    }

    /**
     * Prepares XML representation of the AuditMessage element.
     * @returns {XMLElement} - The XML representation of the AuditMessage element.
     */
    prepareXML() {
        this.xml = new XMLElement().setName('AuditMessage');
        if (this.eventIdent) {
            this.xml.addChild(this.eventIdent.prepareXML());
        }
        if (this.activeParticipants) {
            this.activeParticipants.forEach(participant => {
                this.xml.addChild(participant.prepareXML());
            });
        }
        if (this.auditSources) {
            this.auditSources.forEach(auditSource => {
                this.xml.addChild(auditSource.prepareXML());
            });
        }
        if (this.participantObjs) {
            this.participantObjs.forEach(participantObj => {
                this.xml.addChild(participantObj.prepareXML());
            });
        }
        return this.xml;
    }
}