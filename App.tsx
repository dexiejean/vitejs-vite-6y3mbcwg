import { FormEvent, ReactNode, useState } from 'react'

type IconName = 'home' | 'file' | 'book' | 'check' | 'bell' | 'menu' | 'plus' | 'arrow' | 'close'

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
    file: <><path d="M6 2h8l4 4v16H6z" /><path d="M14 2v5h5M9 13h6M9 17h6" /></>,
    book: <><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v16H7.5A3.5 3.5 0 0 0 4 21.5z" /><path d="M4 5.5v16" /></>,
    check: <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    plus: <path d="M12 5v14M5 12h14" />,
    arrow: <path d="m9 18 6-6-6-6" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
  }
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

const requests = [
  { id: 'REQ-2025-0148', service: 'Transcript of Records', date: 'May 28, 2025', status: 'Processing', tone: 'amber' },
  { id: 'REQ-2025-0131', service: 'Subject Overload Permit', date: 'May 21, 2025', status: 'For approval', tone: 'blue' },
  { id: 'REQ-2025-0097', service: 'Certificate of Enrollment', date: 'April 30, 2025', status: 'Ready to claim', tone: 'green' },
]

export default function App() {
  const [navOpen, setNavOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [category, setCategory] = useState('')
  const [details, setDetails] = useState('')
  const [errors, setErrors] = useState<{ category?: string; details?: string }>({})
  const [submitted, setSubmitted] = useState(false)

  function submitRequest(event: FormEvent) {
    event.preventDefault()
    const nextErrors: typeof errors = {}
    if (!category) nextErrors.category = 'Choose a service category.'
    if (details.trim().length < 15) nextErrors.details = 'Please provide at least 15 characters so we can assist you.'
    setErrors(nextErrors)
    setSubmitted(false)
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true)
      setCategory('')
      setDetails('')
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#main-content" aria-label="DSSC Student Services home">
          <span className="brand-mark">D</span>
          <span><strong>DSSC</strong><small>Student Services</small></span>
        </a>
        <div className="header-actions">
          <button className="icon-button notification" aria-label="Notifications, 2 unread"><Icon name="bell" /><span>2</span></button>
          <button className="profile" aria-label="Open profile menu">
            <span className="avatar">DM</span>
            <span className="profile-copy"><strong>Dhiexe Medillo</strong><small>BSIT · 3rd Year</small></span>
            <span className="chevron">⌄</span>
          </button>
          <button className="icon-button menu-button" onClick={() => setNavOpen(!navOpen)} aria-expanded={navOpen} aria-controls="primary-navigation" aria-label="Toggle navigation">
            <Icon name={navOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </header>

      <nav id="primary-navigation" className={navOpen ? 'sidebar open' : 'sidebar'} aria-label="Primary navigation">
        <div className="nav-group">
          <small className="nav-label">STUDENT PORTAL</small>
          <a className="nav-item active" href="#main-content" aria-current="page"><Icon name="home" />Dashboard</a>
          <a className="nav-item" href="#requests"><Icon name="file" />My requests<span className="nav-count">2</span></a>
          <a className="nav-item" href="#academic"><Icon name="book" />Academic records</a>
          <a className="nav-item" href="#clearance"><Icon name="check" />Clearance</a>
        </div>
        <div className="help-card">
          <span className="help-icon">?</span>
          <strong>Need help?</strong>
          <p>Visit the Student Affairs Office or send us a message.</p>
          <a href="mailto:studentaffairs@dssc.edu.ph">Contact support <Icon name="arrow" size={16} /></a>
        </div>
      </nav>

      <main id="main-content">
        <section className="welcome" aria-labelledby="page-title">
          <div>
            <p className="eyebrow">MONDAY, JUNE 2, 2025</p>
            <h1 id="page-title">Good morning, Dixi.</h1>
            <p>Here’s what needs your attention today.</p>
          </div>
          <button className="primary-button" onClick={() => { setSubmitted(false); setFormOpen(true) }}><Icon name="plus" />New service request</button>
        </section>

        <section className="metrics" aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="sr-only">Academic and clearance overview</h2>
          <article className="metric-card blue">
            <div className="metric-icon"><Icon name="book" /></div>
            <div><p>Active units</p><strong>21 <small>/ 24</small></strong><span>3 units still available</span></div>
          </article>
          <article className="metric-card amber">
            <div className="metric-icon"><Icon name="file" /></div>
            <div><p>Pending requests</p><strong>2</strong><span>1 awaiting your action</span></div>
          </article>
          <article className="metric-card red">
            <div className="metric-icon"><Icon name="check" /></div>
            <div><p>Clearance deficiencies</p><strong>1</strong><span>Library accountability</span></div>
            <a href="#clearance" aria-label="Review clearance deficiency"><Icon name="arrow" /></a>
          </article>
        </section>

        <div className="content-grid">
          <section id="requests" className="panel requests-panel" aria-labelledby="requests-heading">
            <div className="panel-heading">
              <div><p className="section-kicker">ACTIVITY</p><h2 id="requests-heading">Recent requests</h2></div>
              <a href="#all-requests">View all <Icon name="arrow" size={16} /></a>
            </div>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Request ID</th><th>Service type</th><th>Date filed</th><th>Status</th></tr></thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request.id}>
                      <td data-label="Request ID"><strong>{request.id}</strong></td>
                      <td data-label="Service type">{request.service}</td>
                      <td data-label="Date filed">{request.date}</td>
                      <td data-label="Status"><span className={`status ${request.tone}`}>{request.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <aside className="panel deadline-panel" aria-labelledby="deadline-heading">
            <div className="panel-heading"><div><p className="section-kicker">UPCOMING</p><h2 id="deadline-heading">Important dates</h2></div></div>
            <div className="date-item"><time dateTime="2025-06-06"><strong>06</strong><span>JUN</span></time><div><strong>Finals clearance</strong><p>Submit all deficiencies</p></div></div>
            <div className="date-item"><time dateTime="2025-06-12"><strong>12</strong><span>JUN</span></time><div><strong>Enrollment opens</strong><p>First semester, 2025–26</p></div></div>
          </aside>
        </div>
      </main>

      <footer><span>© 2025 Davao del Sur State College</span><span><a href="#privacy">Privacy</a><a href="#accessibility">Accessibility</a></span></footer>

      {formOpen && <div className="drawer-layer">
        <button className="drawer-backdrop" aria-label="Close request form" onClick={() => setFormOpen(false)} />
        <section className="request-drawer" role="dialog" aria-modal="true" aria-labelledby="form-title">
          <div className="drawer-header">
            <div><p className="section-kicker">STUDENT SERVICES</p><h2 id="form-title">New service request</h2></div>
            <button className="icon-button" onClick={() => setFormOpen(false)} aria-label="Close request form"><Icon name="close" /></button>
          </div>
          <p className="form-intro">Tell us what you need. Requests are typically reviewed within 2–3 working days.</p>
          {submitted && <div className="success-message" role="status"><Icon name="check" /><span><strong>Request submitted.</strong><br />We’ll notify you when its status changes.</span></div>}
          <form onSubmit={submitRequest} noValidate>
            <div className="form-field">
              <label htmlFor="service-category">Service category <span aria-hidden="true">*</span></label>
              <select id="service-category" value={category} onChange={(e) => { setCategory(e.target.value); setErrors({ ...errors, category: undefined }) }} aria-describedby={`category-help${errors.category ? ' category-error' : ''}`} aria-invalid={!!errors.category}>
                <option value="">Select a service</option>
                <option>Document Requisition</option>
                <option>Subject Overload Permit</option>
                <option>Enrollment Concern</option>
                <option>Clearance Assistance</option>
              </select>
              <small id="category-help">Choose the office service that best matches your concern.</small>
              {errors.category && <p className="error-msg" id="category-error" role="alert">{errors.category}</p>}
            </div>
            <div className="form-field">
              <label htmlFor="request-details">Reason / request details <span aria-hidden="true">*</span></label>
              <textarea id="request-details" rows={6} value={details} onChange={(e) => { setDetails(e.target.value); setErrors({ ...errors, details: undefined }) }} aria-describedby={`details-help${errors.details ? ' details-error' : ''}`} aria-invalid={!!errors.details} placeholder="Include the document, subject code, or details we should know." />
              <small id="details-help">Do not include passwords or other sensitive personal information.</small>
              {errors.details && <p className="error-msg" id="details-error" role="alert">{errors.details}</p>}
            </div>
            <div className="form-actions">
              <button type="button" className="secondary-button" onClick={() => setFormOpen(false)}>Cancel</button>
              <button type="submit" className="primary-button">Submit request <Icon name="arrow" size={18} /></button>
            </div>
          </form>
        </section>
      </div>}
    </div>
  )
}
