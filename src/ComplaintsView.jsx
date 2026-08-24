import { useState } from 'react'

function ComplaintsView({ onViewZone }) {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const complaints = [
    {
      id: 'CP-0243',
      sector: 'Sector 18',
      category: 'Waterlogging',
      description: 'Water accumulation reported near main drainage corridor',
      status: 'Investigating',
      severity: 'Critical',
      time: '8 min ago',
      trend: '+73%',
    },
    {
      id: 'CP-0242',
      sector: 'Sector 22',
      category: 'Waste accumulation',
      description: 'Garbage collection delayed for multiple residential blocks',
      status: 'Open',
      severity: 'High',
      time: '19 min ago',
      trend: '+42%',
    },
    {
      id: 'CP-0241',
      sector: 'Sector 18',
      category: 'Drainage',
      description: 'Blocked drainage reported after rainfall',
      status: 'Investigating',
      severity: 'Critical',
      time: '31 min ago',
      trend: '+68%',
    },
    {
      id: 'CP-0240',
      sector: 'Sector 12',
      category: 'Street lighting',
      description: 'Three street lights reported inactive',
      status: 'Open',
      severity: 'Low',
      time: '46 min ago',
      trend: '+18%',
    },
    {
      id: 'CP-0239',
      sector: 'Sector 18',
      category: 'Waterlogging',
      description: 'Flooding reported near pedestrian underpass',
      status: 'Investigating',
      severity: 'Critical',
      time: '1 hr ago',
      trend: '+73%',
    },
    {
      id: 'CP-0238',
      sector: 'Sector 22',
      category: 'Waste accumulation',
      description: 'Overflowing waste bins reported by residents',
      status: 'Resolved',
      severity: 'Medium',
      time: '2 hrs ago',
      trend: '+42%',
    },
  ]

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesFilter =
      filter === 'All' || complaint.status === filter

    const searchText = search.toLowerCase()

    const matchesSearch =
      complaint.id.toLowerCase().includes(searchText) ||
      complaint.sector.toLowerCase().includes(searchText) ||
      complaint.category.toLowerCase().includes(searchText) ||
      complaint.description.toLowerCase().includes(searchText)

    return matchesFilter && matchesSearch
  })

  return (
    <main className="dashboard complaints-page">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <section className="complaints-hero">

        <div>
          <span className="intro-label">
            CIVIC SIGNAL MONITOR
          </span>

          <h2>
            Complaint intelligence.
          </h2>

          <p>
            Monitor incoming civic complaints, identify unusual
            patterns and surface problems before they escalate.
          </p>
        </div>

        <div className="complaints-live">

          <span className="complaints-live-dot"></span>

          <div>
            <strong>LIVE COMPLAINT STREAM</strong>
            <small>Receiving civic signals</small>
          </div>

        </div>

      </section>


      {/* =====================================================
          KPI CARDS
          ===================================================== */}

      <section className="complaint-stats">

        <div className="complaint-stat primary">

          <span>ACTIVE COMPLAINTS</span>

          <strong>243</strong>

          <small>
            +31 received today
          </small>

        </div>


        <div className="complaint-stat">

          <span>CRITICAL</span>

          <strong>17</strong>

          <small>
            Require immediate attention
          </small>

        </div>


        <div className="complaint-stat">

          <span>INVESTIGATING</span>

          <strong>64</strong>

          <small>
            Currently being reviewed
          </small>

        </div>


        <div className="complaint-stat">

          <span>RESOLVED</span>

          <strong>162</strong>

          <small>
            Closed this week
          </small>

        </div>

      </section>


      {/* =====================================================
          AI PATTERN ALERT
          ===================================================== */}

      <section className="complaint-alert">

        <div className="complaint-alert-icon">
          !
        </div>

        <div>

          <span>
            AI PATTERN DETECTED
          </span>

          <strong>
            Waterlogging complaints are clustering in Sector 18.
          </strong>

          <p>
            Complaint volume has increased 73% while nearby
            drainage complaints are also rising.
          </p>

        </div>

        <div className="complaint-alert-score">

          <span>RISK SIGNAL</span>

          <strong>HIGH</strong>

        </div>

      </section>


      {/* =====================================================
          FILTER BAR
          ===================================================== */}

      <section className="complaint-toolbar">

        <div className="complaint-search">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search complaints, sectors or categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        <div className="complaint-filters">

          {['All', 'Open', 'Investigating', 'Resolved'].map(
            (item) => (

              <button
                key={item}
                className={filter === item ? 'active' : ''}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>

            )
          )}

        </div>

      </section>


      {/* =====================================================
          COMPLAINT TABLE
          ===================================================== */}

      <section className="panel complaints-panel">

        <div className="panel-header">

          <div>

            <div className="panel-kicker">
              LIVE CIVIC SIGNALS
            </div>

            <h3>
              Recent complaints
            </h3>

            <p>
              Incoming reports analyzed by CivicPulse
            </p>

          </div>

          <span className="complaint-count">
            {filteredComplaints.length} SHOWING
          </span>

        </div>


        <div className="complaint-list">

          {filteredComplaints.map((complaint) => (

            <div
              className="complaint-row"
              key={complaint.id}
            >

              <div className="complaint-id">
                {complaint.id}
              </div>


              <div className="complaint-main">

                <div className="complaint-title">

                  <strong>
                    {complaint.category}
                  </strong>

                  <span
                    className={`severity ${complaint.severity.toLowerCase()}`}
                  >
                    {complaint.severity}
                  </span>

                </div>

                <p>
                  {complaint.description}
                </p>

              </div>


              <div className="complaint-sector">

                <span>LOCATION</span>

                <strong>
                  {complaint.sector}
                </strong>

              </div>


              <div className="complaint-status">

                <span
                  className={`status-pill ${complaint.status
                    .toLowerCase()
                    .replace(' ', '-')}`}
                >
                  {complaint.status}
                </span>

                <small>
                  {complaint.time}
                </small>

              </div>


              <div className="complaint-trend">

                <span>TREND</span>

                <strong>
                  {complaint.trend}
                </strong>

              </div>


              <button
                className="complaint-view"
                onClick={() => onViewZone(complaint.sector)}
              >
                VIEW →
              </button>

            </div>

          ))}

        </div>


        {filteredComplaints.length === 0 && (

          <div className="no-complaints">

            <strong>
              No complaints found
            </strong>

            <span>
              Try changing your search or filter.
            </span>

          </div>

        )}

      </section>


      {/* =====================================================
          CATEGORY ANALYSIS
          ===================================================== */}

      <section className="complaint-bottom-grid">

        <div className="panel category-panel">

          <div className="panel-header">

            <div>

              <div className="panel-kicker">
                ISSUE DISTRIBUTION
              </div>

              <h3>
                Complaint categories
              </h3>

            </div>

          </div>


          <div className="category-list">

            <div className="category-item">

              <div className="category-top">

                <span>
                  Waterlogging
                </span>

                <strong>
                  31%
                </strong>

              </div>

              <div className="category-bar">
                <div
                  style={{ width: '31%' }}
                  className="water"
                ></div>
              </div>

            </div>


            <div className="category-item">

              <div className="category-top">

                <span>
                  Waste accumulation
                </span>

                <strong>
                  24%
                </strong>

              </div>

              <div className="category-bar">
                <div
                  style={{ width: '24%' }}
                  className="waste"
                ></div>
              </div>

            </div>


            <div className="category-item">

              <div className="category-top">

                <span>
                  Road damage
                </span>

                <strong>
                  19%
                </strong>

              </div>

              <div className="category-bar">
                <div
                  style={{ width: '19%' }}
                  className="road"
                ></div>
              </div>

            </div>


            <div className="category-item">

              <div className="category-top">

                <span>
                  Street lighting
                </span>

                <strong>
                  14%
                </strong>

              </div>

              <div className="category-bar">
                <div
                  style={{ width: '14%' }}
                  className="lighting"
                ></div>
              </div>

            </div>


            <div className="category-item">

              <div className="category-top">

                <span>
                  Other
                </span>

                <strong>
                  12%
                </strong>

              </div>

              <div className="category-bar">
                <div
                  style={{ width: '12%' }}
                  className="other"
                ></div>
              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            COMPLAINT VELOCITY
            ================================================= */}

        <div className="panel complaint-velocity">

          <div className="panel-header">

            <div>

              <div className="panel-kicker">
                TEMPORAL SIGNAL
              </div>

              <h3>
                Complaint velocity
              </h3>

              <p>
                Reports received over the last 5 days
              </p>

            </div>

            <strong className="velocity-growth">
              +933%
            </strong>

          </div>


          <div className="mini-chart">

            <div
              className="mini-bar"
              style={{ height: '18%' }}
            >
              <span>8</span>
            </div>

            <div
              className="mini-bar"
              style={{ height: '29%' }}
            >
              <span>13</span>
            </div>

            <div
              className="mini-bar"
              style={{ height: '43%' }}
            >
              <span>19</span>
            </div>

            <div
              className="mini-bar"
              style={{ height: '68%' }}
            >
              <span>28</span>
            </div>

            <div
              className="mini-bar active"
              style={{ height: '100%' }}
            >
              <span>31</span>
            </div>

          </div>


          <div className="mini-chart-labels">

            <span>MON</span>
            <span>TUE</span>
            <span>WED</span>
            <span>THU</span>
            <span>FRI</span>

          </div>

        </div>

      </section>

    </main>
  )
}

export default ComplaintsView