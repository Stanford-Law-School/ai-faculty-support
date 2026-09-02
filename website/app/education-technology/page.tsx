import Link from "next/link";

export default function EducationTechnology() {
  return <>
    <p className="eyebrow">Coming soon</p>
    <h1>Education Technology</h1>
    <p className="lede">A new home for practical guidance on classroom, course, and learning technology for SLS faculty.</p>
    <section className="card">
      <h2>We&rsquo;re building this resource</h2>
      <p>This page will bring together support for selecting tools, designing accessible learning experiences, and using education technology with purpose.</p>
      <div className="actions"><Link className="primary" href="/">Return home</Link><Link className="secondary" href="/skills">Explore AI Skills</Link></div>
    </section>
  </>;
}
