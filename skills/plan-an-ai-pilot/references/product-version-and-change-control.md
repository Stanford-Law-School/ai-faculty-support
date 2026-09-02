# Product version and change control

Current AI products change without notice. A pilot result is tied to a specific configuration on a specific date, and can be silently invalidated by an update.

## Record the exact system

- Product name
- Model or family
- Feature
- Tier
- Region
- Tools enabled
- Retrieval configuration and source collection
- System instructions
- Administrative settings
- Account type
- Test date and research-checked date

## Change triggers

If any of the following changes, determine which cases must be rerun before relying on prior results:

- Product or model version
- Tier or feature availability
- Retrieval collection or its contents
- System instructions or prompt template
- Permissions or connectors
- A material feature
- Vendor terms, data handling, or retention

## Rerun policy

- Maintain a small regression subset of high-stakes and critical-failure-prone cases.
- Rerun the regression subset after any change trigger.
- Do not combine results from materially different configurations without labeling which configuration produced which result.

## Reporting

State the configuration and dates prominently in every results report and decision memo. A memo that omits the version and date cannot be safely relied on later.
