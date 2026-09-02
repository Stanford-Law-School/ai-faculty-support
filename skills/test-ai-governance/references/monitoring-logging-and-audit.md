# Monitoring, logging, and audit

Monitoring is how governance stays true over time. Log enough to reconstruct an incident, assign someone to review it, and avoid creating a new sensitive dataset.

## What may need monitoring

Usage; error categories; omissions; critical incidents; review time; corrections; appeals; permission changes; product changes; model changes; source updates; accessibility issues; uneven outcomes; user confusion; external actions; failed escalations.

## Questions to resolve

- Who may view logs?
- Do logs contain sensitive information?
- How long should logs be kept?
- Are logs sufficient to reconstruct an incident?
- Can the system falsely claim an action occurred (so logs must be independent)?
- Who reviews the logs?
- What happens when monitoring identifies a pattern?

## Principles

- Logs no one reviews are not oversight; assign a responsible reviewer and a trigger for action.
- Independent action logs matter because a system may report an action it did not perform.
- Monitor omissions and uneven outcomes, not only obvious errors.

## Do not

- Recommend retaining all prompts, outputs, or logs indefinitely.
- Ignore that logs can themselves become a sensitive dataset requiring minimization, access limits, and deletion.
- Treat the existence of logging as evidence that monitoring happens.
