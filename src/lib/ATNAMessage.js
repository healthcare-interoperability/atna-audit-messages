import { ActiveParticipant } from "./ActiveParticipant";
import { AuditMessage } from "./AuditMessage.js";
import { AuditSourceIdentification } from "./AuditSourceIdentification.js";
import { Code } from "./Code";
import { EventIdentification } from "./EventIdentification";
import { ParticipantObjectIdentification } from "./ParticipantObjectIdentification.js";
import { EventOutcomeIndicator, NetworkAccessPointType, AuditSourceTypeCode, ParticipantObjectTypeCodeRole, ParticipantObjectTypeCode, EventActionType } from "../constants.js";
/**
 * ATNA class provides static methods for generating ATNA-compliant audit messages.
 */
export class ATNAMessage {

    /**
     * Generates a user login audit message.
     * @param {string} outcome - The outcome of the login attempt.
     * @param {string} sysname - The system name.
     * @param {string} hostname - The hostname of the system.
     * @param {string} username - The username of the logged-in user.
     * @param {string} userRole - The role of the user.
     * @param {string} userRoleCode - The role code of the user.
     * @returns {XMLElement} - The XML representation of the user login audit message.
     */
    static userLoginAudit(outcome, sysname, hostname, username, userRole, userRoleCode) {
        let eventID = new Code(110114, 'DCM').setOriginalText('UserAuthenticated');
        let typeCode = new Code(110122, 'DCM').setOriginalText('Login');
        let eIdent = new EventIdentification(EventOutcomeIndicator.OUTCOME_SUCCESS, new Date(), outcome)
            .setEventID(eventID)
            .setTypeCode(typeCode);

        let sysRoleCode = new Code(110150, 'DCM').setOriginalText('Application');
        let sysParticipant = new ActiveParticipant(sysname, '', false)
            .setNetworkAccessPointID(hostname)
            .setNetworkAccessPointTypeCode(NetworkAccessPointType.NET_AP_TYPE_DNS)
            .setRoleIDCodes([sysRoleCode]);

        let userRoleCodeDef = new Code(userRole, userRoleCode).setOriginalText(userRole);
        let userParticipant = new ActiveParticipant(username, '', true)
            .setRoleIDCodes([userRoleCodeDef]);

        let sourceTypeCode = new Code(AuditSourceTypeCode.AUDIT_SRC_TYPE_UI, '');
        let sourceIdent = new AuditSourceIdentification(null, sysname, sourceTypeCode);

        let audit = new AuditMessage(eIdent)
            .setActiveParticipant([sysParticipant, userParticipant])
            .setAuditSourceIdentification(sourceIdent);

        return audit.toXML();
    }

    /**
     * Generates an application activity audit message.
     * @param {boolean} isStart - Indicates whether the application is starting or stopping.
     * @param {string} sysname - The system name.
     * @param {string} hostname - The hostname of the system.
     * @param {string} username - The username of the user associated with the activity.
     * @returns {XMLElement} - The XML representation of the application activity audit message.
     */
    static appActivityAudit(isStart, sysname, hostname, username = 'root') {
        let eventID = new Code(110100, 'DCM').setOriginalText('Application Activity');
        let typeCode = isStart
            ? new Code(110120, 'DCM').setOriginalText('Application Start')
            : new Code(110121, 'DCM').setOriginalText('Application Stop');

        let eIdent = new EventIdentification(EventActionType.EVENT_ACTION_EXECUTE, new Date(), EventOutcomeIndicator.OUTCOME_SUCCESS)
            .setEventID(eventID)
            .setTypeCode(typeCode);

        let sysRoleCode = new Code(110150, 'DCM').setOriginalText('Application');
        let sysParticipant = new ActiveParticipant(sysname, '', false)
            .setNetworkAccessPointID(hostname)
            .setNetworkAccessPointTypeCode(NetworkAccessPointType.NET_AP_TYPE_DNS)
            .setRoleIDCodes([sysRoleCode]);

        let userRoleCodeDef = new Code(110151, 'DCM').setOriginalText('Application Launcher');
        let userParticipant = new ActiveParticipant(username, '', true)
            .setRoleIDCodes([userRoleCodeDef]);

        let sourceTypeCode = new Code(AuditSourceTypeCode.AUDIT_SRC_TYPE_WEB_SERVER, '');
        let sourceIdent = new AuditSourceIdentification(null, sysname, sourceTypeCode);

        let audit = new AuditMessage(eIdent)
            .setActiveParticipant([sysParticipant, userParticipant])
            .setAuditSourceIdentification(sourceIdent);
        return audit.toXML();
    }

    /**
     * Generates an audit log used audit message.
     * @param {string} outcome - The outcome of the audit log access.
     * @param {string} sysname - The system name.
     * @param {string} hostname - The hostname of the system.
     * @param {string} username - The username of the user accessing the audit log.
     * @param {string} userRole - The role of the user.
     * @param {string} userRoleCode - The role code of the user.
     * @param {string} auditLogURI - The URI of the accessed audit log.
     * @param {ValuePair} objDetails - Additional details about the accessed object.
     * @returns {XMLElement} - The XML representation of the audit log used audit message.
     */
    static auditLogUsedAudit(outcome, sysname, hostname, username, userRole, userRoleCode, auditLogURI, objDetails = null) {
        let eventID = new Code(110101, 'DCM').setOriginalText('Audit Log Used');
        let eIdent = new EventIdentification(EventActionType.EVENT_ACTION_READ, new Date(), outcome)
            .setEventID(eventID);

        let sysRoleCode = new Code(110150, 'DCM').setOriginalText('Application');
        let sysParticipant = new ActiveParticipant(sysname, '', false)
            .setNetworkAccessPointID(hostname)
            .setNetworkAccessPointTypeCode(NetworkAccessPointType.NET_AP_TYPE_DNS, [sysRoleCode]);

        let userRoleCodeDef = new Code(userRole, userRoleCode).setOriginalText(userRole);
        let userParticipant = new ActiveParticipant(username, '', true)
            .setRoleIDCodes([userRoleCodeDef]);

        let sourceTypeCode = new Code(constants.AUDIT_SRC_TYPE_UI, '');
        let sourceIdent = new AuditSourceIdentification(null, sysname, sourceTypeCode);

        let objIdTypeCode = new Code(constants.OBJ_ID_TYPE_URI, 'URI');

        let participantObj = new ParticipantObjectIdentification(auditLogURI)
            .setParticipantObjectTypeCode(ParticipantObjectTypeCode.OBJ_TYPE_SYS_OBJ)
            .setParticipantObjectTypeCodeRole(ParticipantObjectTypeCodeRole.OBJ_TYPE_CODE_ROLE_SECURITY_RESOURCE)
            .setParticipantObjectIDTypeCode(objIdTypeCode)
            .setParticipantObjectName('Security Audit Log');

        if (objDetails) {
            participantObj.setParticipantObjectDetail(objDetails);
        }

        let audit = new AuditMessage(eIdent)
            .setActiveParticipant([sysParticipant, userParticipant])
            .setParticipantObjectIdentification([participantObj])
            .setAuditSourceIdentification(sourceIdent);
        return audit.toXML();
    }

    /**
     * Generates a node authentication audit message.
     * @param {string} nodeIP - The IP address of the authenticated node.
     * @param {string} sysname - The system name.
     * @param {string} hostname - The hostname of the system.
     * @param {string} outcome - The outcome of the node authentication.
     * @returns {XMLElement} - The XML representation of the node authentication audit message.
     */
    static nodeAuthentication(nodeIP, sysname, hostname, outcome) {
        let eventID = new Code(110113, 'DCM').setOriginalText('Security Alert');
        let typeCode = new Code(110126, 'DCM').setOriginalText('Node Authentication');
        let eIdent = new EventIdentification(EventActionType.EVENT_ACTION_EXECUTE, new Date(), outcome)
            .setEventID(eventID)
            .setTypeCode(typeCode);

        let sysRoleCode = new Code(110150, 'DCM').setOriginalText('Application');
        let sysParticipant = new ActiveParticipant(sysname, '', false)
            .setNetworkAccessPointID(hostname)
            .setNetworkAccessPointTypeCode(NetworkAccessPointType.NET_AP_TYPE_DNS)
            .setRoleIDCodes([sysRoleCode]);

        let objIdTypeCode = new Code(110182, 'DCM').setOriginalText('Node ID');
        let nodeParticipant = new ParticipantObjectIdentification(nodeIP)
            .setParticipantObjectTypeCode(2)
            .setParticipantObjectIDTypeCode(objIdTypeCode)
            .setParticipantObjectName(nodeIP);

        let sourceTypeCode = new Code(constants.AUDIT_SRC_TYPE_WEB_SERVER, '');
        let sourceIdent = new AuditSourceIdentification(null, sysname, sourceTypeCode);

        let audit = new AuditMessage(eIdent)
            .setActiveParticipant([sysParticipant])
            .setParticipantObjectIdentification([nodeParticipant])
            .setAuditSourceIdentification(sourceIdent);
        return audit.toXML();
    };
}
