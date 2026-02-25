import { useState, useEffect } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from "recharts";

const T = {
  navy: "#0C1B2A", navyMid: "#152B42", teal: "#0D7377", tealLight: "#14A3A8",
  amber: "#D4841F", amberLight: "#F0A83C", cream: "#FBF7F0", offWhite: "#F3EDE3",
  green: "#2D8F5C", red: "#C0392B", blue: "#1B6B93", brown: "#8B5E34",
  bg: "#0e1521", card: "#151f2e", cardHover: "#1a2638", border: "#1e3048",
  text: "#e2e8f0", textMuted: "#8896a6", textDim: "#5a6b7d",
  success: "#22c55e", warning: "#f59e0b", danger: "#ef4444",
};

// ─── CORRECTED DATA ───────────────────────────────────────
// CHANGE 1: Fourth agency = Dept. of Rural Development (not Revenue)
// CHANGE 3: Case studies only for key projects with logical rationale
const interventions = [
  { id: "PWD-BRG-KUL-001", name: "Garsa Nallah Bridge, SH-305", agency: "PWD", type: "Bridge", district: "Kullu", status: "In Progress", physical: 62, financial: 48, safeguard: "Compliant", risk: "Green", contract: "₹18.4 Cr", stage: 6, caseStudy: true, caseReason: "High-value, climate-resilient design innovation, cross-agency learning potential" },
  { id: "PWD-RD-MND-012", name: "Pandoh-Takoli Road Restoration", agency: "PWD", type: "Road", district: "Mandi", status: "In Progress", physical: 45, financial: 32, safeguard: "Compliant", risk: "Amber", contract: "₹42.1 Cr", stage: 6, caseStudy: true, caseReason: "Largest single contract, complex terrain with innovative slope stabilization" },
  { id: "PWD-BRG-SML-003", name: "Theog-Kotkhai Bridge", agency: "PWD", type: "Bridge", district: "Shimla", status: "Procurement", physical: 0, financial: 0, safeguard: "Under Review", risk: "Amber", contract: "₹12.8 Cr", stage: 4, caseStudy: false },
  { id: "JSV-WS-KGR-001", name: "Kangra Town Water Supply", agency: "Jal Shakti", type: "Water Supply", district: "Kangra", status: "In Progress", physical: 71, financial: 65, safeguard: "Compliant", risk: "Green", contract: "₹28.6 Cr", stage: 6, caseStudy: true, caseReason: "Community-led monitoring model, replicable across all JSV schemes" },
  { id: "JSV-IRR-MND-005", name: "Sundernagar Irrigation Canal", agency: "Jal Shakti", type: "Irrigation", district: "Mandi", status: "Design Review", physical: 0, financial: 0, safeguard: "ESIA Required", risk: "Amber", contract: "₹8.2 Cr", stage: 2, caseStudy: false },
  { id: "DOE-TL-KIN-002", name: "Kinnaur 33kV Transmission Line", agency: "DoE", type: "Power", district: "Kinnaur", status: "In Progress", physical: 38, financial: 25, safeguard: "Compliant", risk: "Red", contract: "₹15.7 Cr", stage: 6, caseStudy: false },
  { id: "DOE-SHP-LHL-001", name: "Lahaul Micro-Hydro Restoration", agency: "DoE", type: "Power", district: "Lahaul-Spiti", status: "Completed", physical: 100, financial: 92, safeguard: "Compliant", risk: "Green", contract: "₹6.3 Cr", stage: 8, caseStudy: true, caseReason: "First completed intervention, fast-track procurement model, emergency restoration success" },
  { id: "RD-LH-KUL-001", name: "Kullu Valley Livelihood Program", agency: "Rural Dev.", type: "Livelihood", district: "Kullu", status: "In Progress", physical: 55, financial: 40, safeguard: "Compliant", risk: "Green", contract: "₹4.8 Cr", stage: 6, caseStudy: false },
  { id: "PWD-RD-CHM-008", name: "Chamba-Pathankot NH Widening", agency: "PWD", type: "Road", district: "Chamba", status: "Not Started", physical: 0, financial: 0, safeguard: "Pending", risk: "Red", contract: "₹55.0 Cr", stage: 1, caseStudy: false },
  { id: "JSV-SAN-SML-003", name: "Shimla Sanitation Upgrade", agency: "Jal Shakti", type: "Sanitation", district: "Shimla", status: "In Progress", physical: 82, financial: 75, safeguard: "Compliant", risk: "Green", contract: "₹11.2 Cr", stage: 6, caseStudy: true, caseReason: "Urban context, innovative waste management, gender-responsive design" },
];

// CHANGE 6: Updated team positions and names
const pmcTeam = [
  { name: "Amit Tandon", position: "Team Leader", daysDeployed: "22/25", fieldVisits: 3 },
  { name: "Sunil Kashyap", position: "Procurement Specialist", daysDeployed: "24/25", fieldVisits: 2 },
  { name: "Shilpa Sharma", position: "Financial Management", daysDeployed: "20/25", fieldVisits: 1 },
  { name: "Anshul Tyagi", position: "Environment Safeguards", daysDeployed: "15/25", fieldVisits: 4 },
  { name: "Annie George", position: "Social Safeguards", daysDeployed: "16/25", fieldVisits: 5 },
  { name: "Manish Sen", position: "QA/QC Specialist", daysDeployed: "18/25", fieldVisits: 6 },
  { name: "Rohan Shinde", position: "DRM Specialist", daysDeployed: "14/25", fieldVisits: 3 },
  { name: "Anil Joshi", position: "MIS/IT Specialist", daysDeployed: "22/25", fieldVisits: 1 },
  { name: "Navneet Anand", position: "Communication Specialist", daysDeployed: "17/25", fieldVisits: 3 },
  { name: "Sakshi Bhutani", position: "Training & Capacity Building", daysDeployed: "15/25", fieldVisits: 4 },
];

const disbursementData = [
  { month: "Jul", planned: 12, actual: 8 }, { month: "Aug", planned: 18, actual: 14 },
  { month: "Sep", planned: 28, actual: 22 }, { month: "Oct", planned: 42, actual: 35 },
  { month: "Nov", planned: 55, actual: 48 }, { month: "Dec", planned: 68, actual: 58 },
  { month: "Jan", planned: 82, actual: 71 }, { month: "Feb", planned: 95, actual: 82 },
];

const procurementPipeline = [
  { stage: "Planned", count: 42 }, { stage: "Bid Issued", count: 28 },
  { stage: "Under Eval", count: 12 }, { stage: "Awarded", count: 18 },
  { stage: "In Progress", count: 15 }, { stage: "Completed", count: 5 },
];

const grievances = [
  { id: "GRM-001", date: "2025-12-15", type: "Land", location: "Kullu", intervention: "PWD-BRG-KUL-001", status: "Resolved", sla: 30, daysOpen: 22, desc: "Farmer's orchard encroached by approach road alignment" },
  { id: "GRM-002", date: "2025-12-20", type: "Labor", location: "Mandi", intervention: "PWD-RD-MND-012", status: "Open", sla: 15, daysOpen: 12, desc: "Workers not receiving minimum wages per LMP" },
  { id: "GRM-003", date: "2026-01-05", type: "Environment", location: "Kinnaur", intervention: "DOE-TL-KIN-002", status: "Escalated", sla: 20, daysOpen: 25, desc: "Tree felling beyond approved limit near Sangla forest" },
  { id: "GRM-004", date: "2026-01-10", type: "Safety", location: "Kullu", intervention: "PWD-BRG-KUL-001", status: "Resolved", sla: 2, daysOpen: 1, desc: "Missing barricades near excavation site on SH-305" },
  { id: "GRM-005", date: "2026-01-18", type: "Water", location: "Kangra", intervention: "JSV-WS-KGR-001", status: "Open", sla: 10, daysOpen: 5, desc: "Construction debris blocking village water channel" },
  { id: "GRM-006", date: "2026-02-01", type: "Payment", location: "Shimla", intervention: "JSV-SAN-SML-003", status: "Open", sla: 30, daysOpen: 3, desc: "Sub-contractor payment pending for 45 days" },
];

// CHANGE 2: No WB role in clearing designs — bridge timeline updated
const bridgeTimeline = [
  { stage: 1, title: "Prioritization", date: "Aug 2024", status: "done", desc: "Risk-scored 4th among 23 damaged bridges. PSC approved in priority pipeline." },
  { stage: 2, title: "Design Review", date: "Oct 2024", status: "done", desc: "PTMC prepared design. PMC QA/QC flagged insufficient scour depth. PTMC revised with climate-projected HFL. PMU cleared final design." },
  { stage: 3, title: "Safeguards", date: "Nov 2024", status: "done", desc: "ESIA cleared. RAP not required (govt land). Forest clearance obtained. GRM activated." },
  { stage: 4, title: "Procurement", date: "Jan 2025", status: "done", desc: "NCB via HP e-Tender. 7 bids received. PMC reviewed eval report. Contract awarded." },
  { stage: 5, title: "Finance", date: "Feb 2025", status: "done", desc: "₹5.5 Cr mobilization advance released. Treasury reconciled. IUFR submitted." },
  { stage: 6, title: "Construction", date: "Mar 2025–Now", status: "active", desc: "62% physical progress. Foundation + pier complete. Superstructure in progress." },
  { stage: 7, title: "GRM", date: "Ongoing", status: "active", desc: "6 grievances received. 4 resolved (avg 12 days). 2 under action." },
  { stage: 8, title: "Completion", date: "Sep 2025 (Est.)", status: "pending", desc: "Target completion before monsoon. Case study documentation initiated." },
];

const financialSummary = {
  byAgency: [
    { agency: "PWD", budget: 520, spent: 145 },
    { agency: "Jal Shakti", budget: 310, spent: 92 },
    { agency: "DoE", budget: 180, spent: 48 },
    { agency: "Rural Dev.", budget: 140, spent: 25 },
  ]
};

// CHANGE 4: HP Govt Procurement methods (no CQS)
const hpProcurementMethods = [
  { method: "Open Tender (NCB)", days: 95, desc: "Standard HP PWD open bidding for works > ₹50 lakh" },
  { method: "Limited Tender", days: 42, desc: "For works ₹5-50 lakh, limited to empanelled contractors" },
  { method: "e-Tender (HP Portal)", days: 75, desc: "Electronic bidding via HP e-Procurement portal" },
  { method: "Quotation", days: 18, desc: "For goods/works up to ₹5 lakh" },
  { method: "Rate Contract (RC)", days: 12, desc: "Pre-approved rates via HP Stores Purchase" },
  { method: "GeM Purchase", days: 25, desc: "Government e-Marketplace for standard goods" },
];

// CHANGE 3: Case study selection criteria
const caseStudyCriteria = [
  "Contract value > ₹10 Cr OR first-of-its-kind intervention",
  "Innovative design, procurement method, or implementation approach",
  "Cross-agency replicability potential (lessons applicable to other PIUs)",
  "Community engagement model worth documenting",
  "Completed or substantially completed intervention with measurable outcomes",
];

// ─── COMPONENTS ───────────────────────────────────────────
const Badge = ({ color, children }) => (
  <span style={{ background: color + "22", color, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>{children}</span>
);

const StatusDot = ({ status }) => {
  const c = status === "Green" ? T.success : status === "Amber" ? T.warning : T.danger;
  return <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: c, marginRight: 6 }} />;
};

const KPICard = ({ label, value, sub, color = T.teal }) => (
  <div style={{ background: T.card, borderRadius: 8, padding: "16px 18px", border: `1px solid ${T.border}`, flex: 1, minWidth: 140 }}>
    <div style={{ fontSize: 11, color: T.textMuted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>{label}</div>
    <div style={{ fontSize: 26, fontWeight: 700, color, fontFamily: "'JetBrains Mono', monospace" }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color: T.textDim, marginTop: 4 }}>{sub}</div>}
  </div>
);

const MiniTable = ({ headers, rows, onRowClick }) => (
  <div style={{ overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
      <thead>
        <tr>{headers.map((h, i) => <th key={i} style={{ textAlign: "left", padding: "8px 10px", borderBottom: `2px solid ${T.border}`, color: T.textMuted, fontWeight: 600, fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5, whiteSpace: "nowrap" }}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} onClick={() => onRowClick?.(ri)} style={{ cursor: onRowClick ? "pointer" : "default", borderBottom: `1px solid ${T.border}15` }}
            onMouseEnter={e => e.currentTarget.style.background = T.cardHover}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            {row.map((cell, ci) => <td key={ci} style={{ padding: "8px 10px", color: T.text, whiteSpace: "nowrap" }}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ProgressBar = ({ value, color = T.teal, height = 6 }) => (
  <div style={{ background: T.border, borderRadius: height / 2, height, width: "100%", overflow: "hidden" }}>
    <div style={{ height: "100%", width: `${Math.min(value, 100)}%`, background: color, borderRadius: height / 2, transition: "width 0.8s ease" }} />
  </div>
);

const SectionCard = ({ title, children, accent = T.teal }) => (
  <div style={{ background: T.card, borderRadius: 10, border: `1px solid ${T.border}`, overflow: "hidden", marginBottom: 16 }}>
    <div style={{ borderTop: `3px solid ${accent}`, padding: "14px 18px", borderBottom: `1px solid ${T.border}` }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{title}</div>
    </div>
    <div style={{ padding: "14px 18px" }}>{children}</div>
  </div>
);

// ─── TAB: EXECUTIVE DASHBOARD ─────────────────────────────
const ExecDashboard = ({ setTab, setSelected }) => (
  <div>
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
      <KPICard label="Total Interventions" value="120" sub="Across 4 agencies, 12 districts" />
      <KPICard label="On Track" value="68%" sub="82 of 120 interventions" color={T.success} />
      <KPICard label="Disbursement" value="₹340 Cr" sub="29.6% of ₹1,150 Cr budget" color={T.amber} />
      <KPICard label="Active Grievances" value="14" sub="87% resolution rate" color={T.warning} />
      <KPICard label="WB Mission" value="18 days" sub="Next ISM: Mar 15, 2026" color={T.blue} />
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 16 }}>
      <SectionCard title="📊 Disbursement Trend (₹ Cr cumulative)">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={disbursementData}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
            <XAxis dataKey="month" tick={{ fill: T.textMuted, fontSize: 11 }} />
            <YAxis tick={{ fill: T.textMuted, fontSize: 11 }} />
            <Tooltip contentStyle={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 6, color: T.text, fontSize: 12 }} />
            <Area type="monotone" dataKey="planned" stroke={T.textDim} fill={T.textDim + "20"} strokeDasharray="5 5" name="Planned" />
            <Area type="monotone" dataKey="actual" stroke={T.teal} fill={T.teal + "30"} name="Actual" />
            <Legend wrapperStyle={{ fontSize: 11, color: T.textMuted }} />
          </AreaChart>
        </ResponsiveContainer>
      </SectionCard>

      <SectionCard title="⚠️ Alerts & Risks" accent={T.danger}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { text: "Kinnaur 33kV line: tree felling beyond limit", type: "Safeguard", color: T.danger },
            { text: "Chamba NH: procurement not yet initiated", type: "Procurement", color: T.warning },
            { text: "3 IUFRs pending reconciliation with Treasury", type: "Financial", color: T.warning },
            { text: "PTMC deliverable overdue: Mandi road design", type: "Quality", color: T.amber },
          ].map((a, i) => (
            <div key={i} style={{ background: a.color + "12", border: `1px solid ${a.color}30`, borderRadius: 6, padding: "8px 10px", cursor: "pointer" }}>
              <Badge color={a.color}>{a.type}</Badge>
              <div style={{ fontSize: 11, color: T.text, marginTop: 4 }}>{a.text}</div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
      <SectionCard title="🏗️ Agency Progress (₹ Cr)">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={financialSummary.byAgency} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
            <XAxis type="number" tick={{ fill: T.textMuted, fontSize: 10 }} domain={[0, 550]} />
            <YAxis type="category" dataKey="agency" tick={{ fill: T.textMuted, fontSize: 11 }} width={75} />
            <Tooltip contentStyle={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 6, color: T.text, fontSize: 12 }} />
            <Bar dataKey="budget" fill={T.border} name="Budget" radius={[0, 4, 4, 0]} />
            <Bar dataKey="spent" fill={T.teal} name="Spent" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      <SectionCard title="📦 Procurement Pipeline">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={procurementPipeline}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
            <XAxis dataKey="stage" tick={{ fill: T.textMuted, fontSize: 10 }} />
            <YAxis tick={{ fill: T.textMuted, fontSize: 10 }} />
            <Tooltip contentStyle={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 6, color: T.text, fontSize: 12 }} />
            <Bar dataKey="count" fill={T.amber} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>
    </div>

    <SectionCard title="📋 Intervention Registry (Top 10)">
      <MiniTable
        headers={["ID", "Intervention", "Agency", "District", "Status", "Physical %", "Risk", "Contract"]}
        rows={interventions.map(r => [
          <span style={{ fontFamily: "monospace", fontSize: 11, color: T.tealLight }}>{r.id}</span>,
          r.name,
          <Badge color={r.agency === "PWD" ? T.blue : r.agency === "Jal Shakti" ? T.green : r.agency === "DoE" ? T.brown : r.agency === "Rural Dev." ? T.amber : T.textDim}>{r.agency}</Badge>,
          r.district,
          <Badge color={r.status === "Completed" ? T.success : r.status === "In Progress" ? T.teal : r.status === "Procurement" ? T.amber : T.textDim}>{r.status}</Badge>,
          <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 80 }}><ProgressBar value={r.physical} color={r.physical > 60 ? T.success : r.physical > 30 ? T.amber : T.textDim} /><span style={{ fontSize: 11 }}>{r.physical}%</span></div>,
          <><StatusDot status={r.risk} />{r.risk}</>,
          <span style={{ color: T.amberLight }}>{r.contract}</span>,
        ])}
        onRowClick={(i) => { setSelected(interventions[i]); setTab("project"); }}
      />
    </SectionCard>
  </div>
);

// ─── TAB: PROJECT MANAGEMENT ──────────────────────────────
const ProjectTab = ({ selected }) => {
  const item = selected || interventions[0];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 16 }}>
        <SectionCard title={`🔍 Intervention Detail: ${item.id}`}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[["Name", item.name], ["Agency/PIU", item.agency], ["District", item.district], ["Type", item.type], ["Status", item.status], ["Contract Value", item.contract]].map(([k, v], i) => (
              <div key={i}><div style={{ fontSize: 10, color: T.textMuted, textTransform: "uppercase" }}>{k}</div><div style={{ fontSize: 13, color: T.text, fontWeight: 600 }}>{v}</div></div>
            ))}
          </div>
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 10, color: T.textMuted, marginBottom: 6 }}>PHYSICAL PROGRESS</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ flex: 1 }}><ProgressBar value={item.physical} height={10} color={T.teal} /></div>
              <span style={{ fontSize: 18, fontWeight: 700, color: T.teal }}>{item.physical}%</span>
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 10, color: T.textMuted, marginBottom: 6 }}>FINANCIAL PROGRESS</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ flex: 1 }}><ProgressBar value={item.financial} height={10} color={T.amber} /></div>
              <span style={{ fontSize: 18, fontWeight: 700, color: T.amber }}>{item.financial}%</span>
            </div>
          </div>
          {item.caseStudy && (
            <div style={{ marginTop: 12, background: T.amber + "15", border: `1px solid ${T.amber}30`, borderRadius: 6, padding: "8px 10px" }}>
              <Badge color={T.amber}>📝 Case Study Candidate</Badge>
              <div style={{ fontSize: 10, color: T.textMuted, marginTop: 4 }}>{item.caseReason}</div>
            </div>
          )}
        </SectionCard>

        <SectionCard title="📊 PIU Performance Scorecard" accent={T.amber}>
          {[{ piu: "PWD", score: 72, items: "52 interventions" }, { piu: "Jal Shakti", score: 78, items: "38 interventions" }, { piu: "DoE", score: 61, items: "18 interventions" }, { piu: "Rural Dev.", score: 68, items: "12 interventions" }].map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 70, fontSize: 11, color: T.textMuted, fontWeight: 600 }}>{p.piu}</div>
              <div style={{ flex: 1 }}><ProgressBar value={p.score} color={p.score > 70 ? T.success : T.warning} height={8} /></div>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.text, width: 30, textAlign: "right" }}>{p.score}</div>
            </div>
          ))}
          <div style={{ fontSize: 10, color: T.textDim, marginTop: 8 }}>Composite: physical + financial + procurement + safeguards + reporting</div>
        </SectionCard>
      </div>

      {item.id === "PWD-BRG-KUL-001" && (
        <SectionCard title="🗺️ 8-Stage Journey: Garsa Nallah Bridge" accent={T.amber}>
          <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 8 }}>
            {bridgeTimeline.map((s, i) => (
              <div key={i} style={{ minWidth: 130, background: s.status === "active" ? T.teal + "20" : s.status === "done" ? T.success + "10" : T.border + "40", border: `1px solid ${s.status === "active" ? T.teal : s.status === "done" ? T.success + "40" : T.border}`, borderRadius: 8, padding: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: s.status === "done" ? T.success : s.status === "active" ? T.teal : T.textDim, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>{s.stage}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.text }}>{s.title}</div>
                </div>
                <div style={{ fontSize: 10, color: T.amber, marginBottom: 4 }}>{s.date}</div>
                <div style={{ fontSize: 10, color: T.textMuted, lineHeight: 1.4 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      <SectionCard title="📅 Upcoming Governance Events">
        <MiniTable
          headers={["Date", "Event", "Status", "Action Required"]}
          rows={[
            ["Mar 5, 2026", "Quarterly Review — PWD PIU", <Badge color={T.warning}>Preparation</Badge>, "PMC preparing briefing pack + data pull"],
            ["Mar 10, 2026", "PSC Meeting — Q4 FY26", <Badge color={T.amber}>Agenda Draft</Badge>, "PMC drafting agenda, pulling KPI data"],
            ["Mar 15, 2026", "WB Implementation Support Mission", <Badge color={T.danger}>18 days away</Badge>, "Aide-memoire inputs, IUFR, safeguard status"],
            ["Mar 25, 2026", "Inter-Agency Learning Session", <Badge color={T.teal}>Planned</Badge>, "Bridge resilience design: PWD case for JSV/DoE"],
          ]}
        />
      </SectionCard>
    </div>
  );
};

// ─── TAB: PROCUREMENT (CHANGE 4 — HP GOVT METHODS, NO CQS) ──────
const ProcurementTab = () => (
  <div>
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
      <KPICard label="Total Packages" value="42" sub="Across all agencies" />
      <KPICard label="Awarded" value="18" sub="42.9% of packages" color={T.success} />
      <KPICard label="Under Evaluation" value="12" sub="Avg 28 days in eval" color={T.warning} />
      <KPICard label="At Risk (Season)" value="5" sub="May miss Apr-Oct window" color={T.danger} />
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
      <SectionCard title="📦 Procurement Pipeline">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={procurementPipeline}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
            <XAxis dataKey="stage" tick={{ fill: T.textMuted, fontSize: 10 }} />
            <YAxis tick={{ fill: T.textMuted, fontSize: 10 }} />
            <Tooltip contentStyle={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 6, color: T.text, fontSize: 12 }} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {procurementPipeline.map((_, i) => <Cell key={i} fill={[T.textDim, T.blue, T.amber, T.teal, T.success, T.green][i]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      <SectionCard title="⏱️ Avg. Procurement Cycle — GoHP Methods (Days)" accent={T.amber}>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={hpProcurementMethods} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
            <XAxis type="number" tick={{ fill: T.textMuted, fontSize: 10 }} />
            <YAxis type="category" dataKey="method" tick={{ fill: T.textMuted, fontSize: 9 }} width={110} />
            <Tooltip contentStyle={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 6, color: T.text, fontSize: 12 }} formatter={(v, n, p) => [v + " days", p.payload.desc]} />
            <Bar dataKey="days" fill={T.amber} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>
    </div>

    <SectionCard title="📋 Active Procurement Packages">
      <MiniTable
        headers={["Package ID", "Description", "PIU", "HP Method", "WB Review", "Status", "STEP Sync", "Season Risk"]}
        rows={[
          ["PWD-W-001", "Garsa Nallah Bridge Construction", "PWD", "Open Tender (NCB)", "Prior", <Badge color={T.success}>Awarded</Badge>, <Badge color={T.success}>Synced</Badge>, <Badge color={T.success}>On Track</Badge>],
          ["PWD-W-003", "Theog-Kotkhai Bridge", "PWD", "Open Tender (NCB)", "Prior", <Badge color={T.amber}>Under Eval</Badge>, <Badge color={T.warning}>Pending</Badge>, <Badge color={T.warning}>At Risk</Badge>],
          ["JSV-W-002", "Kangra Water Supply Phase II", "Jal Shakti", "e-Tender (HP Portal)", "Post", <Badge color={T.teal}>Bid Issued</Badge>, <Badge color={T.success}>Synced</Badge>, <Badge color={T.success}>On Track</Badge>],
          ["DOE-G-001", "Kinnaur Transformer Procurement", "DoE", "GeM Purchase", "Post", <Badge color={T.success}>Awarded</Badge>, <Badge color={T.success}>Synced</Badge>, <Badge color={T.success}>On Track</Badge>],
          ["PWD-W-008", "Chamba-Pathankot NH Widening", "PWD", "Open Tender (NCB)", "Prior", <Badge color={T.danger}>Not Started</Badge>, <Badge color={T.danger}>Not Init</Badge>, <Badge color={T.danger}>Critical</Badge>],
          ["RD-CS-001", "Livelihood Training Consultancy", "Rural Dev.", "Limited Tender", "Post", <Badge color={T.amber}>Under Eval</Badge>, <Badge color={T.success}>Synced</Badge>, <Badge color={T.success}>On Track</Badge>],
        ]}
      />
    </SectionCard>

    {/* CHANGE 2: PMC review workflow — no WB design clearing */}
    <SectionCard title="🔍 PMC Review Workflow — Garsa Bridge (Stage 4)">
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["PTMC drafts bid doc", "PIU submits for review", "PMC reviews compliance", "PMC flags 3 issues", "PIU revises", "PMC clears", "Uploaded to STEP", "Bid on HP e-Tender", "Contract awarded"].map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ background: T.success, width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 700 }}>✓</div>
            <span style={{ fontSize: 11, color: T.text }}>{s}</span>
            {i < 8 && <span style={{ color: T.textDim, margin: "0 2px" }}>→</span>}
          </div>
        ))}
      </div>
    </SectionCard>
  </div>
);

// ─── TAB: FINANCIAL MANAGEMENT (CHANGE 7 — CORRECTED FUND FLOW) ─────
const FinanceTab = () => (
  <div>
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
      <KPICard label="Total Budget" value="₹1,150 Cr" />
      <KPICard label="Allocated" value="₹680 Cr" sub="59.1% of budget" color={T.blue} />
      <KPICard label="Disbursed" value="₹340 Cr" sub="29.6% of budget" color={T.teal} />
      <KPICard label="Utilized" value="₹310 Cr" sub="91.2% of disbursed" color={T.success} />
      <KPICard label="Pending IUFRs" value="1" sub="Q3 FY26 in progress" color={T.warning} />
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
      <SectionCard title="📊 Budget vs. Expenditure by Agency (₹ Cr)">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={financialSummary.byAgency}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
            <XAxis dataKey="agency" tick={{ fill: T.textMuted, fontSize: 11 }} />
            <YAxis tick={{ fill: T.textMuted, fontSize: 10 }} />
            <Tooltip contentStyle={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 6, color: T.text, fontSize: 12 }} />
            <Bar dataKey="budget" fill={T.border} name="Budget" radius={[4, 4, 0, 0]} />
            <Bar dataKey="spent" fill={T.teal} name="Expenditure" radius={[4, 4, 0, 0]} />
            <Legend wrapperStyle={{ fontSize: 11, color: T.textMuted }} />
          </BarChart>
        </ResponsiveContainer>
      </SectionCard>

      {/* CHANGE 7: Corrected fund flow — WB → State Treasury → Treasury/Revenue Dept → Department → Vendors */}
      <SectionCard title="💰 Fund Flow Architecture" accent={T.amber}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            { node: "① World Bank → HP State Treasury", amount: "IDA Credit", status: "Disbursement", days: "—", note: "WB releases funds to the state treasury based on IUFR claims" },
            { node: "② State Treasury → Treasury / Revenue Dept", amount: "Budget Release", status: "Allocation", days: "5-10 days", note: "Treasury allocates to Revenue Dept / Disaster Mgmt Cell" },
            { node: "③ Treasury / Revenue Dept → Implementing Department", amount: "Inter-dept transfer", status: "Release", days: "3-7 days", note: "Revenue Dept releases to PWD / Jal Shakti / DoE / Rural Dev." },
            { node: "④ Implementing Department → Vendors / Contractors", amount: "RA Bills / Invoices", status: "Payment", days: "Per contract", note: "Departments pay vendors against approved running account bills" },
          ].map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 12px", background: i % 2 === 0 ? T.border + "20" : "transparent", borderRadius: 6 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: T.text, fontWeight: 600 }}>{f.node}</div>
                <div style={{ fontSize: 9, color: T.textDim, marginTop: 2 }}>{f.note}</div>
              </div>
              <Badge color={f.status === "Disbursement" ? T.blue : f.status === "Allocation" ? T.amber : f.status === "Release" ? T.teal : T.success}>{f.status}</Badge>
              <div style={{ fontSize: 10, color: T.textDim, width: 70, textAlign: "right" }}>{f.days}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, padding: "8px 10px", background: T.teal + "10", borderRadius: 6, border: `1px solid ${T.teal}20` }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.tealLight, marginBottom: 2 }}>Example: Garsa Bridge (Stage 5)</div>
          <div style={{ fontSize: 10, color: T.textMuted }}>WB disbursed ₹82 Cr (Q3) → Treasury released ₹68 Cr → Revenue Dept transferred ₹42 Cr to PWD → PWD paid ₹5.5 Cr advance + ₹3.3 Cr RA bills to contractor</div>
        </div>
      </SectionCard>
    </div>

    {/* CHANGE 5: Corrected IUFR due dates — 45 days after period end */}
    <SectionCard title="📄 IUFR Submission Tracker">
      <MiniTable
        headers={["Period", "Due Date", "Treasury Recon", "PMC Review", "PMU Approval", "WB Submission", "Status"]}
        rows={[
          ["Q1 FY26 (Apr–Jun 2025)", "Aug 14, 2025", <Badge color={T.success}>Done</Badge>, <Badge color={T.success}>Done</Badge>, <Badge color={T.success}>Done</Badge>, <Badge color={T.success}>Aug 10</Badge>, <Badge color={T.success}>Accepted</Badge>],
          ["Q2 FY26 (Jul–Sep 2025)", "Nov 14, 2025", <Badge color={T.success}>Done</Badge>, <Badge color={T.success}>Done</Badge>, <Badge color={T.success}>Done</Badge>, <Badge color={T.success}>Nov 8</Badge>, <Badge color={T.success}>Accepted</Badge>],
          ["Q3 FY26 (Oct–Dec 2025)", "Feb 14, 2026", <Badge color={T.warning}>In Progress</Badge>, <Badge color={T.textDim}>Pending</Badge>, <Badge color={T.textDim}>Pending</Badge>, <Badge color={T.textDim}>Pending</Badge>, <Badge color={T.warning}>In Progress</Badge>],
          ["Q4 FY26 (Jan–Mar 2026)", "May 14, 2026", <Badge color={T.textDim}>—</Badge>, <Badge color={T.textDim}>—</Badge>, <Badge color={T.textDim}>—</Badge>, <Badge color={T.textDim}>—</Badge>, <Badge color={T.textDim}>Upcoming</Badge>],
        ]}
      />
      <div style={{ fontSize: 10, color: T.textDim, marginTop: 8, fontStyle: "italic" }}>Due dates are 45 days after the end of each reporting period, per WB guidelines.</div>
    </SectionCard>
  </div>
);

// ─── TAB: M&E ─────────────────────────────────────────────
const METab = () => (
  <div>
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
      <KPICard label="PDO Indicators" value="5 of 8" sub="On track" color={T.success} />
      <KPICard label="Intermediate" value="12 of 18" sub="On track" color={T.teal} />
      <KPICard label="Reports Submitted" value="8" sub="MPRs on time" color={T.success} />
      <KPICard label="Field Verifications" value="24" sub="This quarter" color={T.blue} />
    </div>

    <SectionCard title="📊 Results Framework: Key Indicators">
      <MiniTable
        headers={["Indicator", "Baseline", "Target (Y1)", "Actual", "Progress", "Status"]}
        rows={[
          ["Km of roads restored", "0", "120 km", "68 km", <ProgressBar value={57} />, <Badge color={T.warning}>57%</Badge>],
          ["Bridges rebuilt/strengthened", "0", "25", "8", <ProgressBar value={32} />, <Badge color={T.warning}>32%</Badge>],
          ["Beneficiaries (direct)", "0", "150,000", "92,000", <ProgressBar value={61} />, <Badge color={T.teal}>61%</Badge>],
          ["Water supply schemes restored", "0", "18", "12", <ProgressBar value={67} color={T.success} />, <Badge color={T.success}>67%</Badge>],
          ["Grievances resolved within SLA", "—", "85%", "87%", <ProgressBar value={87} color={T.success} />, <Badge color={T.success}>87%</Badge>],
          ["Districts with EWS operational", "0", "4", "2", <ProgressBar value={50} />, <Badge color={T.warning}>50%</Badge>],
        ]}
      />
    </SectionCard>

    <SectionCard title="📝 Automated Report Status" accent={T.amber}>
      <MiniTable
        headers={["Report", "Period", "Auto-Generated", "PMC Review", "PMU Approval", "Submitted"]}
        rows={[
          ["MPR", "January 2026", <Badge color={T.success}>✓</Badge>, <Badge color={T.success}>✓</Badge>, <Badge color={T.success}>✓</Badge>, <Badge color={T.success}>Feb 5</Badge>],
          ["MPR", "February 2026", <Badge color={T.teal}>Generating</Badge>, <Badge color={T.textDim}>—</Badge>, <Badge color={T.textDim}>—</Badge>, <Badge color={T.textDim}>Due Mar 5</Badge>],
          ["Bi-Annual Report", "Jul-Dec 2025", <Badge color={T.success}>✓</Badge>, <Badge color={T.success}>✓</Badge>, <Badge color={T.success}>✓</Badge>, <Badge color={T.success}>Jan 20</Badge>],
          ["Knowledge Note", "Q3 FY26", <Badge color={T.amber}>Draft</Badge>, <Badge color={T.textDim}>—</Badge>, <Badge color={T.textDim}>—</Badge>, <Badge color={T.textDim}>Due Mar 15</Badge>],
        ]}
      />
    </SectionCard>

    <SectionCard title="👤 PMC Team Deployment Tracker (February 2026)">
      <MiniTable
        headers={["Name", "Position", "Days Deployed", "Field Visits", "Status"]}
        rows={pmcTeam.map(t => [
          <span style={{ fontWeight: 600 }}>{t.name}</span>,
          t.position,
          t.daysDeployed,
          t.fieldVisits,
          <Badge color={T.success}>Active</Badge>,
        ])}
      />
    </SectionCard>
  </div>
);

// ─── TAB: SAFEGUARDS (with GRM) ──────────────────────────
const SafeguardsTab = () => (
  <div>
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
      <KPICard label="ESF Instruments" value="48" sub="Across all interventions" />
      <KPICard label="Cleared" value="31" sub="64.6% complete" color={T.success} />
      <KPICard label="Active Grievances" value="14" sub="3 escalated" color={T.warning} />
      <KPICard label="Resolution Rate" value="87%" sub="Within SLA" color={T.success} />
      <KPICard label="OHS Non-Compliance" value="6" sub="3 critical" color={T.danger} />
    </div>

    <SectionCard title="📋 Digital GRM Dashboard (Stage 7)">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 14 }}>
        {[{ v: 42, l: "Total Received", c: T.text }, { v: 28, l: "Resolved", c: T.success }, { v: 14, l: "Open", c: T.warning }].map((s, i) => (
          <div key={i} style={{ background: s.c + "15", borderRadius: 8, padding: 12, textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: s.c }}>{s.v}</div>
            <div style={{ fontSize: 10, color: T.textMuted }}>{s.l}</div>
          </div>
        ))}
      </div>
      <MiniTable
        headers={["ID", "Date", "Type", "Location", "Intervention", "SLA", "Days Open", "Status"]}
        rows={grievances.map(g => [
          <span style={{ fontFamily: "monospace", fontSize: 11, color: T.tealLight }}>{g.id}</span>,
          g.date, <Badge color={g.type === "Safety" ? T.danger : g.type === "Environment" ? T.green : g.type === "Land" ? T.brown : T.blue}>{g.type}</Badge>,
          g.location, <span style={{ fontSize: 10, color: T.textMuted }}>{g.intervention}</span>,
          g.sla, <span style={{ color: g.daysOpen > g.sla ? T.danger : g.daysOpen > g.sla * 0.75 ? T.warning : T.success, fontWeight: 600 }}>{g.daysOpen}</span>,
          <Badge color={g.status === "Resolved" ? T.success : g.status === "Escalated" ? T.danger : T.warning}>{g.status}</Badge>,
        ])}
      />
    </SectionCard>

    <SectionCard title="📊 GRM Analytics by Category" accent={T.amber}>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={[{ type: "Land", count: 8 }, { type: "Labor", count: 12 }, { type: "Environment", count: 6 }, { type: "Safety", count: 9 }, { type: "Water", count: 4 }, { type: "Payment", count: 3 }]}>
          <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
          <XAxis dataKey="type" tick={{ fill: T.textMuted, fontSize: 11 }} />
          <YAxis tick={{ fill: T.textMuted, fontSize: 10 }} />
          <Tooltip contentStyle={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 6, color: T.text, fontSize: 12 }} />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {[T.brown, T.blue, T.green, T.danger, T.teal, T.amber].map((c, i) => <Cell key={i} fill={c} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </SectionCard>

    <SectionCard title="🛡️ ESF Instrument Status — Garsa Bridge (Stage 3)">
      <MiniTable
        headers={["Instrument", "Status", "PTMC Prepared", "PMC Reviewed", "Notes"]}
        rows={[
          ["ESIA/ESMP", <Badge color={T.success}>Cleared</Badge>, "Oct 5, 2024", "Oct 15, 2024", "No significant impacts. Standard ESMP."],
          ["RAP", <Badge color={T.success}>Not Required</Badge>, "—", "—", "Government land. No displacement."],
          ["Forest Clearance", <Badge color={T.success}>Obtained</Badge>, "—", "Oct 20, 2024", "SEIAA: 0.3 ha diversion approved."],
          ["LMP", <Badge color={T.success}>Active</Badge>, "Oct 8, 2024", "Oct 12, 2024", "Contractor compliance monitored."],
          ["SEP", <Badge color={T.success}>Implemented</Badge>, "Sep 28, 2024", "Oct 5, 2024", "3 consultations. 120 participants."],
        ]}
      />
    </SectionCard>
  </div>
);

// ─── TAB: KNOWLEDGE MANAGEMENT ────────────────────────────
const KnowledgeTab = () => (
  <div>
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
      <KPICard label="Case Studies" value="5" sub="Selected for documentation" color={T.teal} />
      <KPICard label="Training Sessions" value="18" sub="Completed" color={T.success} />
      <KPICard label="LMS Enrollments" value="142" sub="Across PMU/PIU/FPIU" color={T.blue} />
      <KPICard label="Documents" value="384" sub="In library" color={T.amber} />
    </div>

    <SectionCard title="📐 Case Study Selection Criteria" accent={T.amber}>
      <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 8 }}>Projects are selected for case study documentation based on the following criteria (must meet at least 2):</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {caseStudyCriteria.map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
            <span style={{ color: T.amber, fontSize: 12, marginTop: 1 }}>●</span>
            <span style={{ fontSize: 11, color: T.text }}>{c}</span>
          </div>
        ))}
      </div>
    </SectionCard>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
      <SectionCard title="📚 Selected Case Studies">
        {interventions.filter(i => i.caseStudy).map((cs, i) => (
          <div key={i} style={{ borderBottom: i < 4 ? `1px solid ${T.border}` : "none", paddingBottom: 10, marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{cs.name}</div>
              <Badge color={cs.status === "Completed" ? T.success : cs.physical > 50 ? T.teal : T.amber}>{cs.physical > 80 ? "Published" : cs.physical > 40 ? "Draft" : "Planned"}</Badge>
            </div>
            <div style={{ fontSize: 10, color: T.textMuted, marginTop: 4 }}>{cs.caseReason}</div>
            <div style={{ marginTop: 4 }}><Badge color={cs.agency === "PWD" ? T.blue : cs.agency === "Jal Shakti" ? T.green : cs.agency === "DoE" ? T.brown : T.amber}>{cs.agency}</Badge></div>
          </div>
        ))}
      </SectionCard>

      <SectionCard title="🎓 E-Learning Platform (LMS)" accent={T.amber}>
        {[
          { course: "WB Procurement Regulations", enrolled: 42, completed: 28, pct: 67 },
          { course: "Environmental & Social Framework", enrolled: 38, completed: 22, pct: 58 },
          { course: "Financial Management for EAPs", enrolled: 25, completed: 18, pct: 72 },
          { course: "GRM Operations & Monitoring", enrolled: 37, completed: 30, pct: 81 },
        ].map((c, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 11, color: T.text }}>{c.course}</span>
              <span style={{ fontSize: 10, color: T.textMuted }}>{c.enrolled} enrolled</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1 }}><ProgressBar value={c.pct} color={c.pct > 70 ? T.success : T.amber} /></div>
              <span style={{ fontSize: 11, fontWeight: 600, color: T.text }}>{c.pct}%</span>
            </div>
          </div>
        ))}
        <div style={{ fontSize: 10, color: T.textDim, marginTop: 8, fontStyle: "italic" }}>Designed to preserve institutional memory despite frequent staff transfers in HP govt.</div>
      </SectionCard>
    </div>

    <SectionCard title="📅 Upcoming Training Calendar">
      <MiniTable
        headers={["Date", "Topic", "Target Audience", "Mode", "Trainer", "Status"]}
        rows={[
          ["Mar 8", "HP e-Tender + STEP Operations", "PIU Procurement Officers", "In-Person", "Sunil Kashyap", <Badge color={T.teal}>Confirmed</Badge>],
          ["Mar 12", "OHS Compliance for Contractors", "All FPIU Field Staff", "Hybrid", "Anshul Tyagi", <Badge color={T.amber}>Planning</Badge>],
          ["Mar 18", "IUFR & Treasury Reconciliation", "PIU Finance Teams", "Virtual", "Shilpa Sharma", <Badge color={T.amber}>Planning</Badge>],
          ["Mar 25", "Resilient Bridge Design: Garsa Lessons", "All PIU Engineers", "In-Person", "Manish Sen + PWD PTMC", <Badge color={T.teal}>Confirmed</Badge>],
        ]}
      />
    </SectionCard>
  </div>
);

// ─── TAB: DOWNLOADS (CHANGE 7 — with time selection) ─────
const DownloadsTab = () => {
  const [reportType, setReportType] = useState("all");
  const [fromDate, setFromDate] = useState("2025-07");
  const [toDate, setToDate] = useState("2026-02");
  const [agency, setAgency] = useState("all");

  const reportTypes = [
    { id: "mpr", name: "Monthly Progress Report (MPR)" },
    { id: "biannual", name: "Bi-Annual Consolidated Report" },
    { id: "annual", name: "Annual Progress Report" },
    { id: "iufr", name: "IUFR (Financial Report)" },
    { id: "safeguard", name: "Safeguard Compliance Report" },
    { id: "grm", name: "GRM Analytics Report" },
    { id: "psc", name: "PSC Meeting Pack" },
    { id: "knowledge", name: "Knowledge Note / Case Study" },
    { id: "procurement", name: "Procurement Status Report" },
    { id: "deployment", name: "PMC Deployment Report" },
  ];

  const availableReports = [
    { name: "MPR — January 2026", date: "Feb 5, 2026", type: "mpr", size: "2.4 MB", month: "2026-01" },
    { name: "MPR — December 2025", date: "Jan 6, 2026", type: "mpr", size: "2.1 MB", month: "2025-12" },
    { name: "MPR — November 2025", date: "Dec 5, 2025", type: "mpr", size: "1.9 MB", month: "2025-11" },
    { name: "MPR — October 2025", date: "Nov 5, 2025", type: "mpr", size: "1.8 MB", month: "2025-10" },
    { name: "MPR — September 2025", date: "Oct 5, 2025", type: "mpr", size: "2.0 MB", month: "2025-09" },
    { name: "MPR — August 2025", date: "Sep 5, 2025", type: "mpr", size: "1.7 MB", month: "2025-08" },
    { name: "MPR — July 2025", date: "Aug 5, 2025", type: "mpr", size: "1.6 MB", month: "2025-07" },
    { name: "Bi-Annual Report (Jul–Dec 2025)", date: "Jan 20, 2026", type: "biannual", size: "8.6 MB", month: "2026-01" },
    { name: "IUFR Q1 FY26 (Apr–Jun 2025)", date: "Aug 10, 2025", type: "iufr", size: "3.2 MB", month: "2025-08" },
    { name: "IUFR Q2 FY26 (Jul–Sep 2025)", date: "Nov 8, 2025", type: "iufr", size: "3.5 MB", month: "2025-11" },
    { name: "Safeguard Compliance — Q3 2025", date: "Jan 15, 2026", type: "safeguard", size: "4.1 MB", month: "2026-01" },
    { name: "GRM Analytics — Jan 2026", date: "Feb 3, 2026", type: "grm", size: "1.2 MB", month: "2026-02" },
    { name: "GRM Analytics — Dec 2025", date: "Jan 3, 2026", type: "grm", size: "1.1 MB", month: "2026-01" },
    { name: "PSC Meeting Pack — Dec 2025", date: "Dec 10, 2025", type: "psc", size: "5.8 MB", month: "2025-12" },
    { name: "Case Study: Lahaul Micro-Hydro", date: "Jan 25, 2026", type: "knowledge", size: "1.5 MB", month: "2026-01" },
    { name: "Procurement Status — Feb 2026", date: "Feb 20, 2026", type: "procurement", size: "1.8 MB", month: "2026-02" },
    { name: "Procurement Status — Jan 2026", date: "Jan 20, 2026", type: "procurement", size: "1.7 MB", month: "2026-01" },
    { name: "PMC Deployment — Feb 2026", date: "Feb 25, 2026", type: "deployment", size: "0.8 MB", month: "2026-02" },
    { name: "PMC Deployment — Jan 2026", date: "Jan 25, 2026", type: "deployment", size: "0.7 MB", month: "2026-01" },
  ];

  const filtered = availableReports.filter(r => {
    const typeMatch = reportType === "all" || r.type === reportType;
    const fromMatch = !fromDate || r.month >= fromDate;
    const toMatch = !toDate || r.month <= toDate;
    return typeMatch && fromMatch && toMatch;
  });

  return (
    <div>
      <SectionCard title="📥 Download Progress Reports" accent={T.amber}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16, alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: 10, color: T.textMuted, marginBottom: 4, textTransform: "uppercase" }}>Report Type</div>
            <select value={reportType} onChange={e => setReportType(e.target.value)}
              style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.text, padding: "8px 12px", borderRadius: 6, fontSize: 12, minWidth: 220 }}>
              <option value="all">All Reports</option>
              {reportTypes.map(rt => <option key={rt.id} value={rt.id}>{rt.name}</option>)}
            </select>
          </div>
          <div>
            <div style={{ fontSize: 10, color: T.textMuted, marginBottom: 4, textTransform: "uppercase" }}>From</div>
            <input type="month" value={fromDate} onChange={e => setFromDate(e.target.value)}
              style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.text, padding: "8px 12px", borderRadius: 6, fontSize: 12 }} />
          </div>
          <div>
            <div style={{ fontSize: 10, color: T.textMuted, marginBottom: 4, textTransform: "uppercase" }}>To</div>
            <input type="month" value={toDate} onChange={e => setToDate(e.target.value)}
              style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.text, padding: "8px 12px", borderRadius: 6, fontSize: 12 }} />
          </div>
          <div>
            <div style={{ fontSize: 10, color: T.textMuted, marginBottom: 4, textTransform: "uppercase" }}>Agency</div>
            <select value={agency} onChange={e => setAgency(e.target.value)}
              style={{ background: T.bg, border: `1px solid ${T.border}`, color: T.text, padding: "8px 12px", borderRadius: 6, fontSize: 12 }}>
              <option value="all">All Agencies</option>
              <option value="pwd">PWD</option>
              <option value="jsv">Jal Shakti</option>
              <option value="doe">DoE</option>
              <option value="rd">Rural Development</option>
            </select>
          </div>
        </div>

        <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 10 }}>Showing {filtered.length} reports {reportType !== "all" ? `(filtered: ${reportTypes.find(rt => rt.id === reportType)?.name})` : ""} {fromDate && toDate ? `from ${fromDate} to ${toDate}` : ""}</div>

        <MiniTable
          headers={["Report Name", "Generated On", "Type", "Size", "Action"]}
          rows={filtered.map(r => [
            <span style={{ fontWeight: 600 }}>{r.name}</span>,
            r.date,
            <Badge color={r.type === "mpr" ? T.teal : r.type === "iufr" ? T.amber : r.type === "biannual" ? T.blue : r.type === "grm" ? T.warning : r.type === "procurement" ? T.brown : T.green}>
              {reportTypes.find(rt => rt.id === r.type)?.name?.split("(")[0]?.trim() || r.type}
            </Badge>,
            r.size,
            <button style={{ background: T.teal, color: "#fff", border: "none", padding: "4px 12px", borderRadius: 4, fontSize: 11, cursor: "pointer", fontWeight: 600 }}
              onClick={() => alert(`Download: ${r.name}\n\nThis would trigger a file download in the production system.`)}>
              ⬇ Download
            </button>,
          ])}
        />
      </SectionCard>

      <SectionCard title="📊 Custom Report Generator">
        <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 12 }}>Generate a custom report by selecting parameters. The system will pull live data from all PMIS modules.</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            { label: "Physical Progress Summary", desc: "Intervention-wise progress with agency breakdown", icon: "📊" },
            { label: "Financial Utilization Report", desc: "Budget vs actual by component, agency, district", icon: "💰" },
            { label: "Safeguard Compliance Matrix", desc: "ESF instrument status across all interventions", icon: "🛡️" },
            { label: "GRM Summary Report", desc: "Grievance statistics, trends, resolution analysis", icon: "📋" },
            { label: "Contractor Performance Report", desc: "Performance scorecards for all active contractors", icon: "🏗️" },
            { label: "WB Mission Data Pack", desc: "Complete data package for implementation support mission", icon: "🌐" },
          ].map((r, i) => (
            <div key={i} style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: 8, padding: 14, cursor: "pointer" }}
              onClick={() => alert(`Generating: ${r.label}\n\nIn production, this would compile live data from all modules into a downloadable PDF/Excel report.`)}
              onMouseEnter={e => e.currentTarget.style.borderColor = T.teal}
              onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
              <div style={{ fontSize: 16, marginBottom: 6 }}>{r.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.text, marginBottom: 4 }}>{r.label}</div>
              <div style={{ fontSize: 10, color: T.textDim }}>{r.desc}</div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────
const tabs = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "project", label: "Project Mgmt", icon: "🗂️" },
  { id: "procurement", label: "Procurement", icon: "📦" },
  { id: "finance", label: "Finance", icon: "💰" },
  { id: "me", label: "M&E", icon: "📈" },
  { id: "safeguards", label: "Safeguards", icon: "🛡️" },
  { id: "knowledge", label: "Knowledge", icon: "📚" },
  { id: "downloads", label: "Downloads", icon: "📥" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selected, setSelected] = useState(interventions[0]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: T.bg, minHeight: "100vh", fontFamily: "'Segoe UI', -apple-system, sans-serif", color: T.text }}>
      {/* CHANGE 7: PMU Login (not PMC Team Leader) */}
      <div style={{ background: T.navy, borderBottom: `1px solid ${T.border}`, padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 52 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, background: T.teal, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#fff" }}>H</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.text, letterSpacing: 0.5 }}>HP-READY PMIS</div>
            <div style={{ fontSize: 9, color: T.textDim, textTransform: "uppercase", letterSpacing: 1 }}>Unified Project Management Information System</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 10, color: T.textDim }}>{time.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} • {time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: T.teal + "40", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: T.tealLight }}>PMU</div>
            <div>
              <div style={{ fontSize: 11, color: T.text, fontWeight: 600 }}>PMU Director</div>
              <div style={{ fontSize: 9, color: T.textDim }}>Disaster Mgmt Cell</div>
            </div>
          </div>
        </div>
      </div>

      {/* TAB NAV */}
      <div style={{ background: T.navyMid, borderBottom: `1px solid ${T.border}`, padding: "0 20px", display: "flex", gap: 0, overflowX: "auto" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{
              background: activeTab === t.id ? T.teal + "25" : "transparent",
              border: "none", borderBottom: activeTab === t.id ? `2px solid ${T.teal}` : "2px solid transparent",
              color: activeTab === t.id ? T.tealLight : T.textMuted,
              padding: "10px 14px", cursor: "pointer", fontSize: 12, fontWeight: activeTab === t.id ? 700 : 500,
              display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap", transition: "all 0.2s",
            }}
            onMouseEnter={e => { if (activeTab !== t.id) e.currentTarget.style.color = T.text; }}
            onMouseLeave={e => { if (activeTab !== t.id) e.currentTarget.style.color = T.textMuted; }}
          >
            <span style={{ fontSize: 13 }}>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ padding: "16px 20px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: T.textDim }}>
            HP-READY › {tabs.find(t => t.id === activeTab)?.label}
            {activeTab === "project" && selected ? ` › ${selected.id}` : ""}
          </div>
          {activeTab === "project" && (
            <select value={selected?.id || ""} onChange={e => setSelected(interventions.find(i => i.id === e.target.value))}
              style={{ background: T.card, border: `1px solid ${T.border}`, color: T.text, padding: "4px 8px", borderRadius: 4, fontSize: 11 }}>
              {interventions.map(i => <option key={i.id} value={i.id}>{i.id} — {i.name}</option>)}
            </select>
          )}
        </div>

        {activeTab === "dashboard" && <ExecDashboard setTab={setActiveTab} setSelected={setSelected} />}
        {activeTab === "project" && <ProjectTab selected={selected} />}
        {activeTab === "procurement" && <ProcurementTab />}
        {activeTab === "finance" && <FinanceTab />}
        {activeTab === "me" && <METab />}
        {activeTab === "safeguards" && <SafeguardsTab />}
        {activeTab === "knowledge" && <KnowledgeTab />}
        {activeTab === "downloads" && <DownloadsTab />}
      </div>

      {/* CHANGE 1: Footer — 4 agencies: PWD, Jal Shakti, DoE, Rural Development (not Revenue) */}
      <div style={{ borderTop: `1px solid ${T.border}`, padding: "8px 20px", display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: 9, color: T.textDim }}>HP-READY PMIS v2.0 • Last sync: {time.toLocaleTimeString("en-IN")} • All data illustrative</div>
        <div style={{ fontSize: 9, color: T.textDim }}>GoHP • PWD • Jal Shakti • DoE • Dept. of Rural Development • World Bank Funded</div>
      </div>
    </div>
  );
}
