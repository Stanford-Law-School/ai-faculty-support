# Access, permissions, and least privilege

Access to information and authority to act are different questions. Default to the least access that serves the purpose, and consider read-only before write.

## Examine for every agent, connector, folder, mailbox, calendar, or source

- Exact source
- Read versus write
- Folder or record scope
- User-level versus shared access
- Temporary versus persistent access
- Minimum necessary records
- Credential scope
- Cross-user access
- Logging
- Revocation
- Expiration
- Emergency disablement
- Permission inheritance
- Prompt-injection exposure

## Permission Boundary

# Permission Boundary

**System needs to:**
**Minimum information required:**
**Minimum permission:**
**Read-only alternative:**
**Human confirmation:**
**Logging:**
**Expiration:**
**Revocation:**
**Emergency stop:**
**System must not access:**

## Do not recommend for convenience

- Entire shared-drive access
- Entire mailbox access
- Broad write access
- Permanent access
- Institution-wide data access

## Principles

- Prefer read-only; justify any write access explicitly.
- Scope access to the minimum records and the minimum time.
- Ensure access can be revoked and expires by default.
- Treat broad connector access as a prompt-injection and data-exposure risk, not just a convenience.
