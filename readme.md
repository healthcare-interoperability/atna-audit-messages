# ATNA Audit Messages Generator

The ATNA Audit Messages Generator is a JavaScript library that provides a set of reusable static methods for generating Audit Trail and Node Authentication (ATNA) compliant audit messages. This library is particularly useful in healthcare systems and other contexts where standardized audit messages are required.

## Features

- Easily generate XML representations of common ATNA audit messages.
- Supports user login audits, application activity audits, audit log used audits, and node authentication audits.
- Simple and intuitive API for creating ATNA-compliant messages.
- Suitable for integration into healthcare information systems and applications.

## Installation

To install the ATNA Audit Messages Generator, use npm:

```bash
npm install atna-audit-messages
```

### 3. `ATNAComplexType`

Represents a generic complex type for ATNA data. It provides common methods for converting complex types to XML and JSON formats.

- `prepareXML(): void`: Abstract method for preparing XML data specific to each subclass.
- `toXML(): XMLElement`: Converts the complex type to XML format.
- `toJSON(): Object`: Converts the complex type to JSON format.

### 4. `Code`

Represents a code element for ATNA, extending `ATNAComplexType`.

- `setOriginalText(originalText: string): Code`: Sets the original text for the code.
- `setDisplay(display: string): Code`: Sets the display value for the code.
- `prepareXML(): XMLElement`: Prepares XML representation of the Code element.

### 5. `ValuePair`

Represents a value pair element for ATNA, extending `ATNAComplexType`.

- `prepareXML(): XMLElement`: Prepares XML representation of the ValuePair element.

### 6. `EventIdentification`

Represents an EventIdentification element for ATNA, extending `ATNAComplexType`.

- `setEventID(eventID: Code): EventIdentification`: Sets the EventID for the EventIdentification.
- `setTypeCode(typeCode: Code): EventIdentification`: Sets the TypeCode for the EventIdentification.
- `prepareXML(): XMLElement`: Prepares XML representation of the EventIdentification element.

### 7. `ActiveParticipant`

Represents an ActiveParticipant element for ATNA, extending `ATNAComplexType`.

- `setRoleIDCodes(roleCodes: Code|Code[]): ActiveParticipant`: Sets the RoleID codes for the ActiveParticipant.
- `setNetworkAccessPointID(netAccessPointId: string): ActiveParticipant`: Sets the NetworkAccessPointID for the ActiveParticipant.
- `setNetworkAccessPointTypeCode(netAccessPointTypeCode: Code): ActiveParticipant`: Sets the NetworkAccessPointTypeCode for the ActiveParticipant.
- `prepareXML(): XMLElement`: Prepares XML representation of the ActiveParticipant element.

### 8. `ParticipantObjectIdentification`

Represents a ParticipantObjectIdentification element for ATNA, extending `ATNAComplexType`.

- `setParticipantObjectIDTypeCode(objIdTypeCode: Code): ParticipantObjectIdentification`: Sets the ParticipantObjectIDTypeCode for the ParticipantObjectIdentification.
- `setParticipantObjectTypeCodeRole(objTypeCodeRole: string): ParticipantObjectIdentification`: Sets the ParticipantObjectTypeCodeRole for the ParticipantObjectIdentification.
- `setParticipantObjectTypeCode(objTypeCode: string): ParticipantObjectIdentification`: Sets the ParticipantObjectTypeCode for the ParticipantObjectIdentification.
- `setParticipantObjectDataLifeCycle(objDataLifeCycle: string): ParticipantObjectIdentification`: Sets the ParticipantObjectDataLifeCycle for the ParticipantObjectIdentification.
- `setParticipantObjectSensitivity(objSensitivity: string): ParticipantObjectIdentification`: Sets the ParticipantObjectSensitivity for the ParticipantObjectIdentification.
- `setParticipantObjectDetail(objDetails: ValuePair): ParticipantObjectIdentification`: Sets the ParticipantObjectDetail for the ParticipantObjectIdentification.
- `setParticipantObjectName(objName: string): ParticipantObjectIdentification`: Sets the ParticipantObjectName for the ParticipantObjectIdentification.
- `setParticipantObjectQuery(objQuery: string): ParticipantObjectIdentification`: Sets the ParticipantObjectQuery for the ParticipantObjectIdentification.
- `prepareXML(): XMLElement`: Prepares XML representation of the ParticipantObjectIdentification element.

### 9. `AuditSourceIdentification`

Represents an AuditSourceIdentification element for ATNA, extending `ATNAComplexType`.

- `prepareXML(): XMLElement`: Prepares XML representation of the AuditSourceIdentification element.

### 10. `AuditMessage`

Represents an AuditMessage element for ATNA, extending `ATNAComplexType`.

- `setActiveParticipant(activeParticipants: ActiveParticipant|ActiveParticipant[]): AuditMessage`: Sets the ActiveParticipant elements for the AuditMessage.
- `setParticipantObjectIdentification(participantObjs: ParticipantObjectIdentification|ParticipantObjectIdentification[]): AuditMessage`: Sets the ParticipantObjectIdentification elements for the AuditMessage.
- `setAuditSourceIdentification(auditSources: AuditSourceIdentification|AuditSourceIdentification[]): AuditMessage`: Sets the AuditSourceIdentification elements for the AuditMessage.
- `prepareXML(): XMLElement`: Prepares XML representation of the AuditMessage element.

## Usage

To use this library, instantiate the necessary classes and call their methods to build the desired ATNA elements. The provided methods for preparing XML and JSON representations allow easy integration with healthcare systems that require ATNA-compliant audit messages.

The `ATNAMessage` class provides the following static methods for generating different types of audit messages:

#### 1.1 `userLoginAudit(outcome, sysname, hostname, username, userRole, userRoleCode)`

Generates a user login audit message.

- `outcome`: The outcome of the login attempt.
- `sysname`: The system name.
- `hostname`: The hostname of the system.
- `username`: The username of the logged-in user.
- `userRole`: The role of the user.
- `userRoleCode`: The role code of the user.

#### 1.2 `appActivityAudit(isStart, sysname, hostname, username = 'root')`

Generates an application activity audit message.

- `isStart`: Indicates whether the application is starting or stopping.
- `sysname`: The system name.
- `hostname`: The hostname of the system.
- `username`: The username of the user associated with the activity (default: 'root').

#### 1.3 `auditLogUsedAudit(outcome, sysname, hostname, username, userRole, userRoleCode, auditLogURI, objDetails = null)`

Generates an audit log used audit message.

- `outcome`: The outcome of the audit log access.
- `sysname`: The system name.
- `hostname`: The hostname of the system.
- `username`: The username of the user accessing the audit log.
- `userRole`: The role of the user.
- `userRoleCode`: The role code of the user.
- `auditLogURI`: The URI of the accessed audit log.
- `objDetails`: Additional details about the accessed object (default: null).

#### 1.4 `nodeAuthentication(nodeIP, sysname, hostname, outcome)`

Generates a node authentication audit message.

- `nodeIP`: The IP address of the authenticated node.
- `sysname`: The system name.
- `hostname`: The hostname of the system.
- `outcome`: The outcome of the node authentication.

## Usage

To use the ATNA Audit Messages Generator, call the static methods of the `ATNA` class with the required parameters. The methods return XML representations of ATNA-compliant audit messages.

Example:

```javascript
const userLoginMessage = ATNA.userLoginAudit('success', 'SystemA', 'localhost', 'user1', 'Administrator', 'ADMIN_ROLE');
console.log(userLoginMessage);

## License

This ATNA Audit Trail Library is licensed under the AGPLv3 License.