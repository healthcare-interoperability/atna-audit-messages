import { ATNAComplexType } from "./ATNAComplexType.js";
import { Code } from "./Code.js";
import { XMLElement } from "../helpers/xml/XMLElement.js";

/**
 * Represents an ActiveParticipant element for ATNA.
 */
export class ActiveParticipant extends ATNAComplexType {
    /**
     * @param {string} userId - The user ID.
     * @param {string} altUserId - The alternative user ID.
     * @param {boolean} userIsRequestor - Indicates if the user is a requestor.
     */
    constructor(userId, altUserId, userIsRequestor) {
        super();
        this.userId = userId;
        this.altUserId = altUserId;
        this.userIsRequestor = userIsRequestor;
    }

    /**
     * Sets the RoleID codes for the ActiveParticipant.
     * @param {Code|Code[]} roleCodes - The RoleID code or an array of RoleID codes.
     * @returns {ActiveParticipant} - Returns the current instance for chaining.
     */
    setRoleIDCodes(roleCodes) {
        if (!Array.isArray(roleCodes)) {
            roleCodes = [roleCodes];
        }
        this.roleCodes = roleCodes.map((roleCode) => {
            if (roleCode instanceof Code) {
                return roleCode;
            } else {
                throw new Error(`Not a valid RoleCode`, roleCode);
            }
        });
        return this;
    }

    /**
     * Sets the NetworkAccessPointID for the ActiveParticipant.
     * @param {string} netAccessPointId - The NetworkAccessPointID.
     * @returns {ActiveParticipant} - Returns the current instance for chaining.
     */
    setNetworkAccessPointID(netAccessPointId) {
        this.netAccessPointId = netAccessPointId;
        return this;
    }

    /**
     * Sets the NetworkAccessPointTypeCode for the ActiveParticipant.
     * @param {Code} netAccessPointTypeCode - The NetworkAccessPointTypeCode.
     * @returns {ActiveParticipant} - Returns the current instance for chaining.
     */
    setNetworkAccessPointTypeCode(netAccessPointTypeCode) {
        this.netAccessPointTypeCode = netAccessPointTypeCode;
        return this;
    }

    /**
     * Prepares XML representation of the ActiveParticipant element.
     * @returns {XMLElement} - The XML representation of the ActiveParticipant element.
     */
    prepareXML() {
        this.xml = new XMLElement().setName('ActiveParticipant');
        let attributes = {
            UserID: this.userId,
            AlternativeUserID: this.altUserId,
            UserIsRequestor: this.userIsRequestor,
        };

        if (this.netAccessPointId) {
            attributes.NetworkAccessPointID = this.netAccessPointId;
        }
        if (this.netAccessPointTypeCode) {
            attributes.NetworkAccessPointTypeCode = this.netAccessPointTypeCode;
        }

        if (this.roleCodes) {
            this.roleCodes.forEach(roleCode => {
                this.xml.addChild(new XMLElement().setName('RoleIDCode').addChild(roleCode.prepareXML()));
            });
        }
        this.xml.setAttributes(attributes);
        return this.xml;
    }
}