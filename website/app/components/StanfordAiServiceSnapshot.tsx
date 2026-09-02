import {
  approvalLabels,
  publishedServices,
  riskColumns,
  serviceDistinctions,
  snapshotMeta,
  type StanfordAiService,
} from "../lib/stanfordAiServices";
import { formatReviewDate } from "../lib/guides";

/* ---------------------------------------------------------------------------
   Renders the dated Stanford AI service snapshot from the single authoritative
   record in app/lib/stanfordAiServices.ts. Nothing here hard-codes a service
   name or an approval level.

   Every status is written out in full text — "Approved", "Not approved" — so
   the meaning never depends on a colour, a checkmark, or an icon. The colour
   accent on each status is decorative reinforcement only.

   Two representations exist for the same data: a real <table> for wide screens
   and stacked cards for narrow ones, each repeating its risk-category label.
   Exactly one is rendered at a time via `display: none`, which removes the
   other from the accessibility tree as well as from view, so a screen reader
   never encounters the data twice.
   ------------------------------------------------------------------------- */

function StatusCell({ status }: { status: StanfordAiService[keyof StanfordAiService] & string }) {
  return (
    <span className={`approval approval-${status}`}>
      <span className="approvalDot" aria-hidden="true" />
      {approvalLabels[status as keyof typeof approvalLabels]}
    </span>
  );
}

/** The same-vendor confusions, rendered from data because they date quickly. */
export function ServiceDistinctions() {
  return (
    <dl className="distinctionList">
      {serviceDistinctions.map(({ nameA, nameB, explanation }) => (
        <div className="distinctionItem" key={nameA}>
          <dt>
            <span className="distinctionName">{nameA}</span>
            <span className="distinctionVs" aria-hidden="true">vs.</span>
            <span className="srOnly">compared with</span>
            <span className="distinctionName">{nameB}</span>
          </dt>
          <dd>{explanation}</dd>
        </div>
      ))}
    </dl>
  );
}

export function StanfordAiServiceSnapshot() {
  const services = publishedServices();
  const checkedOn = formatReviewDate(snapshotMeta.verifiedOn);
  const caption = `Current Stanford-provided AI service classifications, checked ${checkedOn}.`;

  return (
    <section className="serviceSnapshot" aria-labelledby="service-snapshot-heading">
      <h2 id="service-snapshot-heading">{snapshotMeta.snapshotTitle}</h2>
      <p className="snapshotChecked">
        Checked against Stanford University IT on{" "}
        <time dateTime={snapshotMeta.verifiedOn}>{checkedOn}</time>
      </p>
      <p>
        This is a dated orientation snapshot, not a substitute for Stanford&rsquo;s official service
        matrix. Confirm the current listing before using Moderate or High Risk data, and check every
        connector or plugin separately.
      </p>
      <p className="snapshotLinks">
        <a href={snapshotMeta.officialMatrixUrl} target="_blank" rel="noopener noreferrer">
          View Stanford&rsquo;s current AI Services Matrix
          <span className="externalLinkIcon" aria-hidden="true">&#8599;</span>
          <span className="srOnly"> (opens in a new tab)</span>
        </a>
        <a href={snapshotMeta.approvedConnectorsUrl} target="_blank" rel="noopener noreferrer">
          View Stanford&rsquo;s approved connectors
          <span className="externalLinkIcon" aria-hidden="true">&#8599;</span>
          <span className="srOnly"> (opens in a new tab)</span>
        </a>
      </p>

      {/* Wide screens: a real table. Hidden with display:none below 900px. */}
      <div className="snapshotTableWrap">
        <table className="snapshotTable">
          <caption>{caption}</caption>
          <thead>
            <tr>
              <th scope="col">Service</th>
              {riskColumns.map(({ key, label }) => (
                <th scope="col" key={key}>{label}</th>
              ))}
              <th scope="col">Important distinction</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <th scope="row">
                  <span className="snapshotServiceName">{service.displayName}</span>
                  <span className="snapshotVariant">{service.serviceVariant}</span>
                  <span className="snapshotVariant">Account: {service.accountBoundary}</span>
                </th>
                {riskColumns.map(({ key }) => (
                  <td key={key}>
                    <StatusCell status={service[key]} />
                  </td>
                ))}
                <td className="snapshotNotes">
                  {service.notes}
                  {service.connectorCheckRequired && (
                    <span className="snapshotConnector"> Check connectors separately.</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Narrow screens: the same records as stacked cards, each value paired
          with its own category label. Hidden with display:none from 900px up. */}
      <div className="snapshotCards">
        <p className="snapshotCaption">{caption}</p>
        {services.map((service) => (
          <article className="snapshotCard" key={service.id}>
            <h3>{service.displayName}</h3>
            <p className="snapshotVariant">{service.serviceVariant}</p>
            <p className="snapshotVariant">Account: {service.accountBoundary}</p>
            <dl className="snapshotCardRisks">
              {riskColumns.map(({ key, label }) => (
                <div key={key}>
                  <dt>{label}</dt>
                  <dd><StatusCell status={service[key]} /></dd>
                </div>
              ))}
            </dl>
            <p className="snapshotNotes">
              {service.notes}
              {service.connectorCheckRequired && (
                <span className="snapshotConnector"> Check connectors separately.</span>
              )}
            </p>
          </article>
        ))}
      </div>

      <div className="note snapshotCaveat">
        <p>
          <strong>&ldquo;Approved&rdquo; describes the service-level listing.</strong> It does not
          replace required authorization, minimum-necessary use, a Data Risk Assessment, FERPA or
          HIPAA requirements, IRB or research conditions, clinic direction, contractual obligations,
          or local policy.
        </p>
        <p>{snapshotMeta.scopeNote}</p>
      </div>

      <div className="caution">
        <p>
          <strong>Using a Law Library-licensed legal AI service?</strong> Library access does not by
          itself establish what nonpublic material may be uploaded. Follow the Law Library&rsquo;s
          current service-specific guidance or{" "}
          <a href="mailto:library@law.stanford.edu">ask</a> before sharing student, clinic, client,
          unpublished, or otherwise restricted material.
        </p>
      </div>
    </section>
  );
}
