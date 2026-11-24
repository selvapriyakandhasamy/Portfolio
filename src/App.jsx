import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Download, ExternalLink, Github, Linkedin, Mail, Phone, MapPin, Users, Briefcase, Menu, X, Award, Maximize2 } from "lucide-react";

/* ───────── EDIT YOUR DETAILS HERE ───────── */
const profile = {
  name: "Selvapriya K",
  role: "Aspiring Software Developer",
  intro: "Third-year B.Tech Information Technology student at Sri Krishna College of Technology, building full-stack applications with Java, Spring Boot and React, with coursework in AI, reinforcement learning and cryptography.",
  email: "selvapriyakandhasamy@gmail.com",
  collegeEmail: "727824tuit211@skct.edu.in",
  phone: "+91 99524 50990",
  location: "Coimbatore, Tamil Nadu",
  github: "https://github.com/selvapriyakandhasamy",
  linkedin: "https://www.linkedin.com/in/selvapriya-kandhasamy-8095963b7?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  resume: "/resume.pdf",
  photo: "" // add a photo path like "/profile.jpg" to show a portrait in the hero
};
const education = [
  { level: "B.Tech, Information Technology", school: "Sri Krishna College of Technology", detail: "CGPA 8.0 · Expected graduation 2028" },
  { level: "Higher Secondary (11th and 12th)", school: "Sri Aanoor Vidyalaya Matric Higher Secondary School", detail: "11th: 90.5% · 12th: 93.6%" },
  { level: "SSLC (10th)", school: "Shree Kamadhenu Matric High School", detail: "97.4%" }
];
const moreCerts = ["Multi-Paradigm Programming with Modern C++", "Data Structures and Algorithms"];
const achievements = [
  "Shortlisted in the top 100 teams in the Smart India Hackathon (SIH) at the college level.",
  "Attended a workshop on AI-driven automation (RPA and cognitive intelligence for smarter workflows), covering RPA, AI automation and intelligent workflow systems.",
  "Regularly solve coding problems on online platforms to strengthen programming and problem-solving skills."
];
const SHOW_SCORES = true; // set false to hide percentages on certificates
const isSet = (v) => Boolean(v) && !/your|example\.com/i.test(v);
/* ────────────────────────────────────────── */

const skills = [
  ["Programming", ["C++", "Java", "Python", "JavaScript", "Data Structures & Algorithms (C++)"]],
  ["Frontend", ["React.js", "HTML5", "CSS"]],
  ["Backend", ["Spring Boot", "RESTful APIs"]],
  ["Database & tools", ["MySQL", "SQL", "Git", "GitHub", "Visual Studio Code"]],
  ["Coursework (NPTEL)", ["Artificial Intelligence", "Reinforcement Learning", "Cryptography", "Accelerated AI"]]
];

const projects = [
  { name: "Smart Tourist Safety and Incident Response System", type: "Proposed system", description: "A smart tourist safety system using AI, geo-fencing and a blockchain-based digital ID, with panic alerts, multilingual SOS, real-time location tracking and an authority dashboard for monitoring incidents and improving emergency response.", tech: ["AI", "Geo-fencing", "Blockchain Digital ID"] },
  { name: "Integrated Digital Retail Management System", type: "Full-stack application", description: "A digital retail system that manages customer records, purchases and billing, keeps service and promotional data in a centralized database, and gives customers secure access to their purchase and transaction history, reducing paperwork.", tech: ["React", "Java", "Spring Boot", "MySQL"] },
  { name: "University Course Transfer Validator", type: "Backend project", description: "A backend system that validates and manages university course transfer requests by checking course equivalency and verifying academic records, automating validation and improving accuracy.", tech: ["Java", "Spring Boot", "MySQL"] }
];

const certificates = [
  { id: "applied-accelerated-ai", title: "Applied Accelerated Artificial Intelligence", by: "IIT Guwahati", term: "Jul–Oct 2026", score: 75, elite: true, assign: "24.35/25", exam: "50.25/75", credits: "4", roll: "NPTEL26CS179S684209091" },
  { id: "reinforcement-learning", title: "Reinforcement Learning", by: "IIT Madras", term: "Jul–Oct 2026", score: 53, assign: "22.94/25", exam: "30/75", credits: "4", roll: "NPTEL26CS134S1384206056" },
  { id: "foundations-of-cryptography", title: "Foundations of Cryptography", by: "IIIT Bangalore", term: "Jan–Apr 2026", score: 52, assign: "20.72/25", exam: "31.25/75", credits: "4", roll: "NPTEL26CS18S450502771" },
  { id: "fundamentals-of-ai", title: "Fundamentals of Artificial Intelligence", by: "IIT Guwahati", term: "Jul–Oct 2025", score: 75, elite: true, assign: "21.97/25", exam: "53.5/75", credits: "3 or 4", roll: "NPTEL25GE55S1154300929" },
  { id: "campus-interviews", title: "Complete Guide for Campus Interviews", by: "IIT Palakkad", term: "Feb–Mar 2025", score: 53, assign: "13.83/25", exam: "39/75", credits: "1 or 2", roll: "NPTEL25HS85S943602301" }
];

const internships = [
  { id: "knite-fullstack-internship", title: "Full Stack Development Virtual Internship", by: "Knite Infotech", term: "17 Jun – 17 Jul 2026", note: "Internship completion certificate." },
  { id: "skylena-ai-ml-internship", title: "Artificial Intelligence and Machine Learning Internship", by: "Skylena Info Technology Pvt. Ltd., Coimbatore", term: "30 days", portrait: true, note: "Hands-on training in AI and ML fundamentals, data preprocessing, supervised and unsupervised learning, model training, data visualization and Python implementation." },
  { id: "skylena-acceptance-letter", title: "AI and ML Internship: Acceptance Letter", by: "Skylena Info Technology Pvt. Ltd.", term: "30 Apr – 12 Jun 2026", portrait: true }
];
const infosys = [
  { id: "infosys-intro-ai", title: "Introduction to Artificial Intelligence", by: "Infosys Springboard", term: "Jul 2025" },
  { id: "infosys-database-sql", title: "Database and SQL", by: "Infosys Springboard", term: "Apr 2025" },
  { id: "infosys-java-bootcamp", title: "Java Programming: A Comprehensive Bootcamp from Zero to Hero", by: "Infosys Springboard", term: "Mar 2025" },
  { id: "infosys-intro-html", title: "Introduction to HTML", by: "Infosys Springboard", term: "Dec 2024" }
];

const nav = ["About", "Skills", "Projects", "Internships", "Certifications", "Leadership", "Education", "Contact"];

function Viewer({ cert, onClose }) {
  const ref = useRef(null);
  return (
    <dialog className="viewer" ref={(el) => { ref.current = el; if (el && cert && !el.open) el.showModal(); }} onClose={onClose} onClick={(e) => e.target === ref.current && ref.current.close()}>
      {cert && (
        <div className="viewer-body">
          <button className="viewer-close" onClick={() => ref.current.close()} aria-label="Close preview"><X size={20} /></button>
          <img className={cert.portrait ? "portrait" : ""} src={`/certificates/${cert.id}.jpg`} alt={`${cert.title} document`} />
          <div className="viewer-meta">
            <div><h3>{cert.title}</h3><p>{cert.by} · {cert.term}{cert.roll ? ` · Roll No. ${cert.roll}` : ""}</p></div>
            <a className="button button-primary" href={`/certificates/${cert.id}.pdf`} download><Download size={16} /> Download PDF</a>
          </div>
        </div>
      )}
    </dialog>
  );
}

function Row({ c, onOpen }) {
  const meta = [c.by, c.term, c.credits && `${c.credits} credits recommended`].filter(Boolean).join(" · ");
  return (
    <li className={`cert ${c.portrait ? "portrait" : ""}`}>
      <button className="thumb" onClick={() => onOpen(c)} aria-label={`Preview ${c.title}`}>
        <img src={`/certificates/${c.id}.jpg`} alt="" loading="lazy" />
        <span><Maximize2 size={15} /> Preview</span>
      </button>
      <div className="cert-info">
        <div className="cert-title">
          <h3>{c.title}</h3>
          {c.elite && <span className="elite"><Award size={13} /> Elite</span>}
        </div>
        <p className="meta">{meta}</p>
        {c.note && <p className="scores">{c.note}</p>}
        {SHOW_SCORES && c.score != null && <p className="scores">Score <strong>{c.score}%</strong> · Assignments {c.assign} · Proctored exam {c.exam}</p>}
        {c.roll && <p className="roll">Roll No. {c.roll}</p>}
        <a className="text-link" href={`/certificates/${c.id}.pdf`} download><Download size={15} /> Download PDF</a>
      </div>
    </li>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);
  const close = () => setOpen(false);

  useEffect(() => {
    document.documentElement.classList.add("js");
    const els = [...document.querySelectorAll(".projects article,.cert,.skills>div,.edu,.lead-photos figure,.stat")];
    els.forEach((e) => e.classList.add("reveal"));
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.1 });
    els.forEach((e) => io.observe(e));
    const bar = document.getElementById("progress");
    const onScroll = () => { const h = document.documentElement; bar.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`; };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <>
      <div id="progress" className="progress" />
      <header className="header">
        <nav className="nav container" aria-label="Main">
          <a className="brand" href="#top" onClick={close}>{profile.name}</a>
          <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
          <div className={`nav-links ${open ? "open" : ""}`}>
            {nav.map((n) => <a key={n} href={`#${n.toLowerCase()}`} onClick={close}>{n}</a>)}
          </div>
        </nav>
      </header>

      <main id="top">
        <div className="hero-wrap">
          <section className="hero container">
            <div className="hero-copy">
              <p className="role">{profile.role}</p>
              <h1>{profile.name}</h1>
              <p className="lead">{profile.intro}</p>
              <div className="actions">
                <a className="button button-primary" href="#projects">View projects</a>
                <a className="button button-secondary" href="#certifications">View certificates</a>
                {isSet(profile.resume) && <a className="text-link" href={profile.resume} download><Download size={15} /> Resume</a>}
              </div>
              <div className="social">
                {isSet(profile.github) && <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>}
                {isSet(profile.linkedin) && <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>}
                <a href={`mailto:${profile.email}`} aria-label="Email"><Mail /></a>
                {isSet(profile.phone) && <a href={`tel:${profile.phone.replace(/\s/g, "")}`} aria-label="Phone"><Phone /></a>}
              </div>
            </div>
            {isSet(profile.photo) ? <div className="portrait-frame"><img src={profile.photo} alt={`Portrait of ${profile.name}`} /></div> : (
              <aside className="highlights" aria-label="Highlights">
                <h2>Highlights</h2>
                {[[Briefcase, "Internship", "Full Stack Development, Knite Infotech", "#internships"], [Briefcase, "Internship", "AI and Machine Learning, Skylena Info Technology", "#internships"], [Award, "Elite certification", "Applied Accelerated AI, IIT Guwahati", "#certifications"], [Users, "Leadership", "Core team member, AWS Student Builder Group SKCT", "#leadership"]].map(([Icon, label, text, href]) => (
                  <a href={href} key={text}><span className="hl-icon"><Icon size={18} /></span><span><small>{label}</small>{text}</span></a>
                ))}
              </aside>
            )}
          </section>
          <div className="stats container">
            {[["8.0", "CGPA"], ["5", "NPTEL certificates"], ["2", "Internships in 2026"], ["4", "Infosys Springboard certificates"]].map(([n, l]) => (
              <div className="stat" key={l}><strong>{n}</strong><span>{l}</span></div>
            ))}
          </div>
        </div>

        <section className="section alt" id="about">
          <div className="container split">
            <div className="about-side">
              <h2>About</h2>
            </div>
            <div className="prose">
              <p className="big">I'm an IT student who enjoys turning ideas into working software, from the interface to the database behind it.</p>
              <p>I'm a third-year B.Tech student with a strong interest in software development and database management. I work across frontend and backend development and keep improving my programming and problem-solving. Alongside projects, I have completed internships in full stack development and AI/ML, and NPTEL courses in artificial intelligence, reinforcement learning and cryptography, two of them with Elite certification. I am also a core team member of the AWS Student Builder Group SKCT.</p>
              <p>I'm looking for internships and projects where I can apply what I've learned, work in a team and grow as a software developer.</p>
            </div>
          </div>
        </section>

        <section className="section" id="skills">
          <div className="container split">
            <h2>Skills</h2>
            <dl className="skills">
              {skills.map(([g, items]) => (
                <div key={g}><dt>{g}</dt><dd>{items.map((i) => <span className="tag" key={i}>{i}</span>)}</dd></div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section alt" id="projects">
          <div className="container split">
            <h2>Projects</h2>
            <div className="projects">
              {projects.map((p) => (
                <article key={p.name}>
                  <div>
                    <span className="meta">{p.type}</span>
                    <h3>{p.name}</h3>
                    <p>{p.description}</p>
                    <div className="tags">{p.tech.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
                  </div>
                  {isSet(p.link) && <a className="icon-link" href={p.link} target="_blank" rel="noreferrer" aria-label={`View ${p.name} on GitHub`}><ArrowUpRight /></a>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="internships">
          <div className="container">
            <div className="cert-head">
              <h2>Internships</h2>
              <p>Two internships in 2026: full stack development at Knite Infotech, and artificial intelligence and machine learning at Skylena Info Technology. Open a document to read it in full.</p>
            </div>
            <ul className="certs">{internships.map((c) => <Row key={c.id} c={c} onOpen={setActive} />)}</ul>
          </div>
        </section>

        <section className="section alt" id="certifications">
          <div className="container">
            <div className="cert-head">
              <h2>Certifications</h2>
              <p>Certificates from NPTEL (IITs and IIIT Bangalore) and Infosys Springboard. Open one to see the full certificate, or download the PDF.</p>
            </div>
            <h3 className="group">NPTEL</h3>
            <ul className="certs">{certificates.map((c) => <Row key={c.id} c={c} onOpen={setActive} />)}</ul>
            <h3 className="group">Infosys Springboard</h3>
            <ul className="certs">{infosys.map((c) => <Row key={c.id} c={c} onOpen={setActive} />)}</ul>
            <p className="also">Also completed on Infosys Springboard: {moreCerts.join(" and ")}.</p>
          </div>
        </section>

        <section className="section" id="leadership">
          <div className="container">
            <div className="cert-head">
              <h2>Leadership</h2>
              <div className="prose">
                <h3 className="role-title">Core Team Member, AWS Student Builder Group SKCT</h3>
                <p>I am a core team member of the AWS Student Builder Group SKCT. We organized an event that brought together a large audience of students.</p>
              </div>
            </div>
            <div className="lead-photos">
              <figure><img src="/community/core-team.jpg" alt="The AWS Student Builder Group SKCT core team" loading="lazy" /><figcaption>The core team</figcaption></figure>
              <figure><img src="/community/event.jpg" alt="Students at the event organized by the core team" loading="lazy" /><figcaption>Students at the event we organized</figcaption></figure>
            </div>
            <h3 className="group">Achievements</h3>
            <ul className="plain">{achievements.map((a) => <li key={a}>{a}</li>)}</ul>
          </div>
        </section>

        <section className="section alt" id="education">
          <div className="container split">
            <h2>Education</h2>
            <div className="edu-list">
              {education.map((e) => (
                <div className="edu" key={e.level}>
                  <span className="meta">{e.detail}</span>
                  <h3>{e.level}</h3>
                  <p>{e.school}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container contact">
            <div>
              <h2>Let's work together</h2>
              <p>I'm open to internships, collaborations and conversations about technology.</p>
            </div>
            <div className="contact-links">
              <a className="button button-primary" href={`mailto:${profile.email}`}><Mail size={17} /> {profile.email}</a>
              {isSet(profile.phone) && <a href={`tel:${profile.phone.replace(/\s/g, "")}`}><Phone size={17} /> {profile.phone}</a>}
              {isSet(profile.collegeEmail) && <a href={`mailto:${profile.collegeEmail}`}><Mail size={17} /> {profile.collegeEmail}</a>}
              {isSet(profile.location) && <span><MapPin size={17} /> {profile.location}</span>}
              {isSet(profile.github) && <a href={profile.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ExternalLink size={13} /></a>}
              {isSet(profile.linkedin) && <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ExternalLink size={13} /></a>}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer container"><span>© {new Date().getFullYear()} {profile.name}</span><a href="#top">Back to top</a></footer>
      <Viewer cert={active} onClose={() => setActive(null)} />
    </>
  );
}
