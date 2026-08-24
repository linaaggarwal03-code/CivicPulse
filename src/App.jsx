import { useState } from 'react'
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import './App.css'

function App() {
  /* =====================================================
     ZONE DATA
     ===================================================== */

  const zones = {
    sector18: {
      name: 'Sector 18',
      score: 87,
      level: 'HIGH RISK',
      issue: 'Waterlogging',
      increase: '73%',
      complaints: '31 complaints this week',
      rainfall: 'Heavy rainfall forecast',
      flooding: 'Previous flooding incidents',
      drainage: 'Nearby drainage complaints',
      confidence: 91,
      escalation: 78,
    },

    sector22: {
      name: 'Sector 22',
      score: 64,
      level: 'MEDIUM RISK',
      issue: 'Waste accumulation',
      increase: '42%',
      complaints: '18 complaints this week',
      rainfall: 'Moderate rainfall forecast',
      flooding: 'No recent flooding',
      drainage: 'Waste collection complaints',
      confidence: 84,
      escalation: 61,
    },

    sector12: {
      name: 'Sector 12',
      score: 31,
      level: 'LOW RISK',
      issue: 'Street lighting',
      increase: '18%',
      complaints: '9 complaints this week',
      rainfall: 'Normal weather conditions',
      flooding: 'Low flooding history',
      drainage: 'No major drainage complaints',
      confidence: 76,
      escalation: 32,
    },
  }

  /* =====================================================
     MAIN STATE
     ===================================================== */

  const [selectedZone, setSelectedZone] = useState(zones.sector18)

  const [activeNav, setActiveNav] = useState('Overview')

  const [showAnalysis, setShowAnalysis] = useState(false)

  const [actions, setActions] = useState([
    {
      id: 1,
      priority: 'PRIORITY 1',
      type: 'IMMEDIATE',
      title: 'Inspect drainage infrastructure',
      description:
        'Inspect Sector 18 drainage channels and identify possible blockages.',
      team: 'Municipal Drainage Team',
      eta: '15 min',
      status: 'pending',
    },

    {
      id: 2,
      priority: 'PRIORITY 2',
      type: 'HIGH PRIORITY',
      title: 'Deploy cleaning team',
      description:
        'Deploy a cleaning crew to remove accumulated waste and clear drainage paths.',
      team: 'Civic Maintenance Team',
      eta: '30 min',
      status: 'pending',
    },

    {
      id: 3,
      priority: 'PRIORITY 3',
      type: 'PREVENTIVE',
      title: 'Place warning signage',
      description:
        'Place temporary warning signage around flood-prone pedestrian areas.',
      team: 'Field Response Team',
      eta: '45 min',
      status: 'pending',
    },

    {
      id: 4,
      priority: 'PRIORITY 4',
      type: 'MONITOR',
      title: 'Monitor next 12 hours',
      description:
        'Continuously monitor complaint velocity and waterlogging reports.',
      team: 'CivicPulse Monitoring',
      eta: '12 hrs',
      status: 'pending',
    },
  ])

  /* =====================================================
     NAVIGATION
     ===================================================== */

  const navigation = [
    {
      label: 'Overview',
      icon: '◈',
    },

    {
      label: 'Live Map',
      icon: '⌖',
    },

    {
      label: 'Complaints',
      icon: '▤',
    },

    {
      label: 'Analytics',
      icon: '⌁',
    },

    {
      label: 'Predictions',
      icon: '◌',
    },

    {
      label: 'Actions',
      icon: '✓',
    },
  ]

  /* =====================================================
     RISK CLASS
     ===================================================== */

  const riskClass =
    selectedZone.score >= 80
      ? 'high'
      : selectedZone.score >= 50
        ? 'medium'
        : 'low'

  const isSelected = (zone) =>
    selectedZone.name === zone.name

  /* =====================================================
     NAVIGATION HANDLER
     ===================================================== */

  const handleNavigation = (label) => {
    setActiveNav(label)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  /* =====================================================
     DEPLOY ACTION
     ===================================================== */

  const deployAction = (id) => {
    setActions((currentActions) =>
      currentActions.map((action) =>
        action.id === id
          ? {
              ...action,
              status: 'deployed',
            }
          : action
      )
    )
  }

  const completedCount = actions.filter(
    (action) => action.status === 'deployed'
  ).length

  /* =====================================================
     PREDICTION DATA
     ===================================================== */

  const predictions = [
    {
      zone: 'Sector 18',
      issue: 'Waterlogging',
      score: 87,
      probability: 78,
      confidence: 91,
      trend: '+73%',
      severity: 'HIGH',
      timeframe: 'Within 24 hours',
      signal: 'Complaint velocity + rainfall',
    },

    {
      zone: 'Sector 22',
      issue: 'Waste accumulation',
      score: 64,
      probability: 61,
      confidence: 84,
      trend: '+42%',
      severity: 'MEDIUM',
      timeframe: 'Within 24 hours',
      signal: 'Complaint growth + collection delays',
    },

    {
      zone: 'Sector 12',
      issue: 'Street lighting',
      score: 31,
      probability: 32,
      confidence: 76,
      trend: '+18%',
      severity: 'LOW',
      timeframe: 'Within 48 hours',
      signal: 'Historical complaints',
    },
  ]

  /* =====================================================
     COMPLAINT DATA
     ===================================================== */

  const complaintData = [
    {
      id: 'CP-0243',
      sector: 'Sector 18',
      category: 'Waterlogging',
      description:
        'Water accumulation reported near main drainage corridor',
      status: 'Investigating',
      severity: 'Critical',
      time: '8 min ago',
      trend: '+73%',
    },

    {
      id: 'CP-0242',
      sector: 'Sector 22',
      category: 'Waste accumulation',
      description:
        'Garbage collection delayed for multiple residential blocks',
      status: 'Open',
      severity: 'High',
      time: '19 min ago',
      trend: '+42%',
    },

    {
      id: 'CP-0241',
      sector: 'Sector 18',
      category: 'Drainage',
      description:
        'Blocked drainage reported after rainfall',
      status: 'Investigating',
      severity: 'Critical',
      time: '31 min ago',
      trend: '+68%',
    },

    {
      id: 'CP-0240',
      sector: 'Sector 12',
      category: 'Street lighting',
      description:
        'Three street lights reported inactive',
      status: 'Open',
      severity: 'Low',
      time: '46 min ago',
      trend: '+18%',
    },

    {
      id: 'CP-0239',
      sector: 'Sector 18',
      category: 'Waterlogging',
      description:
        'Flooding reported near pedestrian underpass',
      status: 'Investigating',
      severity: 'Critical',
      time: '1 hr ago',
      trend: '+73%',
    },

    {
      id: 'CP-0238',
      sector: 'Sector 22',
      category: 'Waste accumulation',
      description:
        'Overflowing waste bins reported by residents',
      status: 'Resolved',
      severity: 'Medium',
      time: '2 hrs ago',
      trend: '+42%',
    },
  ]

  /* =====================================================
     PREDICTION VIEW
     ===================================================== */

  const PredictionView = () => (
    <main className="dashboard prediction-page">

      <section className="prediction-hero">

        <div>

          <span className="intro-label">
            PREDICTIVE INTELLIGENCE ENGINE
          </span>

          <h2>
            What happens next?
          </h2>

          <p>
            CivicPulse analyzes complaint velocity,
            historical incidents, environmental signals
            and spatial patterns to identify where civic
            problems are most likely to escalate.
          </p>

        </div>


        <div className="prediction-live-card">

          <span className="prediction-live-dot"></span>

          <div>

            <strong>
              AI ENGINE ACTIVE
            </strong>

            <small>
              Predictions updated continuously
            </small>

          </div>

        </div>

      </section>


      <section className="prediction-stats">

        <div className="prediction-stat-card main">

          <span>
            PREDICTED ESCALATIONS
          </span>

          <strong>
            12
          </strong>

          <small>
            Next 24 hours
          </small>

        </div>


        <div className="prediction-stat-card">

          <span>
            HIGHEST RISK
          </span>

          <strong>
            87
            <small>/100</small>
          </strong>

          <small>
            Sector 18
          </small>

        </div>


        <div className="prediction-stat-card">

          <span>
            MODEL CONFIDENCE
          </span>

          <strong>
            89%
          </strong>

          <small>
            Average confidence
          </small>

        </div>


        <div className="prediction-stat-card">

          <span>
            ACTIVE SIGNALS
          </span>

          <strong>
            24
          </strong>

          <small>
            Being analyzed
          </small>

        </div>

      </section>


      <section className="panel prediction-timeline">

        <div className="panel-header">

          <div>

            <div className="panel-kicker">
              ESCALATION FORECAST
            </div>

            <h3>
              Next 24 Hours
            </h3>

            <p>
              Predicted civic risk progression
            </p>

          </div>

          <span className="ai-badge">
            AI FORECAST
          </span>

        </div>


        <div className="timeline">

          <div className="timeline-line"></div>


          <div className="timeline-item">

            <div className="timeline-time">
              NOW
            </div>

            <div className="timeline-dot high"></div>

            <div className="timeline-content">

              <strong>
                Sector 18
              </strong>

              <span>
                Waterlogging risk increasing
              </span>

            </div>

            <div className="timeline-score high">
              87
            </div>

          </div>


          <div className="timeline-item">

            <div className="timeline-time">
              +6 HRS
            </div>

            <div className="timeline-dot medium"></div>

            <div className="timeline-content">

              <strong>
                Sector 22
              </strong>

              <span>
                Waste accumulation may escalate
              </span>

            </div>

            <div className="timeline-score medium">
              64
            </div>

          </div>


          <div className="timeline-item">

            <div className="timeline-time">
              +12 HRS
            </div>

            <div className="timeline-dot high"></div>

            <div className="timeline-content">

              <strong>
                Sector 18
              </strong>

              <span>
                Potential drainage failure
              </span>

            </div>

            <div className="timeline-score high">
              92
            </div>

          </div>


          <div className="timeline-item">

            <div className="timeline-time">
              +24 HRS
            </div>

            <div className="timeline-dot medium"></div>

            <div className="timeline-content">

              <strong>
                Delhi NCR
              </strong>

              <span>
                Multiple civic signals monitored
              </span>

            </div>

            <div className="timeline-score medium">
              71
            </div>

          </div>

        </div>

      </section>


      <section className="prediction-section">

        <div className="section-heading">

          <div>

            <span>
              RISK FORECAST
            </span>

            <h3>
              Areas likely to escalate
            </h3>

          </div>

          <small>
            03 high-value predictions
          </small>

        </div>


        <div className="prediction-grid">

          {predictions.map((prediction) => (

            <div
              className={`prediction-card ${prediction.severity.toLowerCase()}`}
              key={prediction.zone}
            >

              <div className="prediction-card-top">

                <div>

                  <span className="prediction-card-kicker">
                    {prediction.severity} RISK
                  </span>

                  <h4>
                    {prediction.zone}
                  </h4>

                </div>


                <div className="prediction-score">

                  <strong>
                    {prediction.score}
                  </strong>

                  <span>
                    /100
                  </span>

                </div>

              </div>


              <div className="prediction-issue">

                <span>
                  PRIMARY ISSUE
                </span>

                <strong>
                  {prediction.issue}
                </strong>

              </div>


              <div className="prediction-probability">

                <div>

                  <span>
                    ESCALATION PROBABILITY
                  </span>

                  <strong>
                    {prediction.probability}%
                  </strong>

                </div>


                <div className="probability-bar">

                  <div
                    style={{
                      width: `${prediction.probability}%`,
                    }}
                  ></div>

                </div>

              </div>


              <div className="prediction-meta">

                <div>

                  <span>
                    CONFIDENCE
                  </span>

                  <strong>
                    {prediction.confidence}%
                  </strong>

                </div>


                <div>

                  <span>
                    TREND
                  </span>

                  <strong>
                    {prediction.trend}
                  </strong>

                </div>

              </div>


              <div className="prediction-signal">

                <span>
                  TOP SIGNAL
                </span>

                <p>
                  {prediction.signal}
                </p>

              </div>


              <div className="prediction-card-footer">

                <span>
                  {prediction.timeframe}
                </span>

                <button
                  onClick={() => {

                    const zone =
                      prediction.zone === 'Sector 18'
                        ? zones.sector18
                        : prediction.zone === 'Sector 22'
                          ? zones.sector22
                          : zones.sector12

                    setSelectedZone(zone)

                    setActiveNav('Overview')

                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    })

                  }}
                >
                  VIEW ZONE →
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>


      <section className="prediction-bottom-grid">

        <div className="panel signals-panel">

          <div className="panel-header">

            <div>

              <div className="panel-kicker">
                MODEL INPUTS
              </div>

              <h3>
                Predictive Signals
              </h3>

              <p>
                Signals currently influencing risk predictions.
              </p>

            </div>

          </div>


          <div className="signal-grid">

            <div className="signal-card">

              <div className="signal-icon">
                ↑
              </div>

              <div>

                <strong>
                  Complaint Velocity
                </strong>

                <span>
                  Strong signal
                </span>

              </div>

              <b>
                94%
              </b>

            </div>


            <div className="signal-card">

              <div className="signal-icon weather">
                ☁
              </div>

              <div>

                <strong>
                  Weather Conditions
                </strong>

                <span>
                  Active signal
                </span>

              </div>

              <b>
                87%
              </b>

            </div>


            <div className="signal-card">

              <div className="signal-icon history">
                ◷
              </div>

              <div>

                <strong>
                  Historical Incidents
                </strong>

                <span>
                  Strong signal
                </span>

              </div>

              <b>
                82%
              </b>

            </div>


            <div className="signal-card">

              <div className="signal-icon spatial">
                ⌖
              </div>

              <div>

                <strong>
                  Nearby Complaints
                </strong>

                <span>
                  Moderate signal
                </span>

              </div>

              <b>
                71%
              </b>

            </div>

          </div>

        </div>


        <div className="panel model-panel">

          <div className="panel-header">

            <div>

              <div className="panel-kicker">
                AI EXPLAINABILITY
              </div>

              <h3>
                How CivicPulse predicts
              </h3>

            </div>

          </div>


          <div className="model-flow">

            <div className="model-step">

              <span>
                01
              </span>

              <div>

                <strong>
                  Collect signals
                </strong>

                <p>
                  Complaints, weather,
                  history and location.
                </p>

              </div>

            </div>


            <div className="model-connector"></div>


            <div className="model-step">

              <span>
                02
              </span>

              <div>

                <strong>
                  Detect patterns
                </strong>

                <p>
                  Identify unusual growth
                  and spatial clusters.
                </p>

              </div>

            </div>


            <div className="model-connector"></div>


            <div className="model-step">

              <span>
                03
              </span>

              <div>

                <strong>
                  Predict escalation
                </strong>

                <p>
                  Estimate probability of
                  future civic disruption.
                </p>

              </div>

            </div>


            <div className="model-connector"></div>


            <div className="model-step final">

              <span>
                04
              </span>

              <div>

                <strong>
                  Recommend action
                </strong>

                <p>
                  Prioritize the response
                  for city officials.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      <div className="prediction-footer">

        <div>

          <span className="footer-pulse"></span>

          <strong>
            Prediction engine operational
          </strong>

          <small>
            Last model update: just now
          </small>

        </div>


        <button
          onClick={() => {

            setActiveNav('Overview')

            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })

          }}
        >
          ← BACK TO COMMAND CENTER
        </button>

      </div>

    </main>
  )


  /* =====================================================
     COMPLAINTS VIEW
     ===================================================== */

  const ComplaintsView = () => {

    const [filter, setFilter] = useState('All')

    const [search, setSearch] = useState('')

    const filteredComplaints =
      complaintData.filter((complaint) => {

        const matchesFilter =
          filter === 'All' ||
          complaint.status === filter

        const searchText =
          search.toLowerCase()

        const matchesSearch =
          complaint.id
            .toLowerCase()
            .includes(searchText) ||
          complaint.sector
            .toLowerCase()
            .includes(searchText) ||
          complaint.category
            .toLowerCase()
            .includes(searchText) ||
          complaint.description
            .toLowerCase()
            .includes(searchText)

        return (
          matchesFilter &&
          matchesSearch
        )
      })


    const viewZone = (sector) => {

      if (sector === 'Sector 18') {
        setSelectedZone(zones.sector18)
      } else if (sector === 'Sector 22') {
        setSelectedZone(zones.sector22)
      } else if (sector === 'Sector 12') {
        setSelectedZone(zones.sector12)
      }

      setActiveNav('Overview')

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }


    return (
      <main className="dashboard complaints-page">

        <section className="complaints-hero">

          <div>

            <span className="intro-label">
              CIVIC SIGNAL MONITOR
            </span>

            <h2>
              Complaint intelligence.
            </h2>

            <p>
              Monitor incoming civic complaints,
              identify unusual patterns and surface
              problems before they escalate.
            </p>

          </div>


          <div className="complaints-live">

            <span className="complaints-live-dot"></span>

            <div>

              <strong>
                LIVE COMPLAINT STREAM
              </strong>

              <small>
                Receiving civic signals
              </small>

            </div>

          </div>

        </section>


        <section className="complaint-stats">

          <div className="complaint-stat primary">

            <span>
              ACTIVE COMPLAINTS
            </span>

            <strong>
              243
            </strong>

            <small>
              +31 received today
            </small>

          </div>


          <div className="complaint-stat">

            <span>
              CRITICAL
            </span>

            <strong>
              17
            </strong>

            <small>
              Require immediate attention
            </small>

          </div>


          <div className="complaint-stat">

            <span>
              INVESTIGATING
            </span>

            <strong>
              64
            </strong>

            <small>
              Currently being reviewed
            </small>

          </div>


          <div className="complaint-stat">

            <span>
              RESOLVED
            </span>

            <strong>
              162
            </strong>

            <small>
              Closed this week
            </small>

          </div>

        </section>


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

            <span>
              RISK SIGNAL
            </span>

            <strong>
              HIGH
            </strong>

          </div>

        </section>


        <section className="complaint-toolbar">

          <div className="complaint-search">

            <span>
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search complaints, sectors or categories..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          </div>


          <div className="complaint-filters">

            {[
              'All',
              'Open',
              'Investigating',
              'Resolved',
            ].map((item) => (

              <button
                key={item}
                className={
                  filter === item
                    ? 'active'
                    : ''
                }
                onClick={() =>
                  setFilter(item)
                }
              >
                {item}
              </button>

            ))}

          </div>

        </section>


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

            {filteredComplaints.map(
              (complaint) => (

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

                    <span>
                      LOCATION
                    </span>

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

                    <span>
                      TREND
                    </span>

                    <strong>
                      {complaint.trend}
                    </strong>

                  </div>


                  <button
                    className="complaint-view"
                    onClick={() =>
                      viewZone(
                        complaint.sector
                      )
                    }
                  >
                    VIEW →
                  </button>

                </div>

              )
            )}

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
                    style={{
                      width: '31%',
                    }}
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
                    style={{
                      width: '24%',
                    }}
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
                    style={{
                      width: '19%',
                    }}
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
                    style={{
                      width: '14%',
                    }}
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
                    style={{
                      width: '12%',
                    }}
                    className="other"
                  ></div>

                </div>

              </div>

            </div>

          </div>


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
                style={{
                  height: '18%',
                }}
              >
                <span>
                  8
                </span>
              </div>


              <div
                className="mini-bar"
                style={{
                  height: '29%',
                }}
              >
                <span>
                  13
                </span>
              </div>


              <div
                className="mini-bar"
                style={{
                  height: '43%',
                }}
              >
                <span>
                  19
                </span>
              </div>


              <div
                className="mini-bar"
                style={{
                  height: '68%',
                }}
              >
                <span>
                  28
                </span>
              </div>


              <div
                className="mini-bar active"
                style={{
                  height: '100%',
                }}
              >
                <span>
                  31
                </span>
              </div>

            </div>


            <div className="mini-chart-labels">

              <span>
                MON
              </span>

              <span>
                TUE
              </span>

              <span>
                WED
              </span>

              <span>
                THU
              </span>

              <span>
                FRI
              </span>

            </div>

          </div>

        </section>

      </main>
    )
  }


  /* =====================================================
     ACTIONS VIEW
     ===================================================== */

  const ActionsView = () => (
    <main className="dashboard actions-page">

      <section className="actions-hero">

        <div>

          <span className="intro-label">
            AI DECISION SUPPORT
          </span>

          <h2>
            Response action center.
          </h2>

          <p>
            Convert CivicPulse predictions into prioritized
            operational responses. Deploy interventions directly
            from the intelligence dashboard.
          </p>

        </div>


        <div className="actions-status-card">

          <div className="actions-status-icon">
            ✓
          </div>

          <div>

            <strong>
              RESPONSE SYSTEM READY
            </strong>

            <small>
              {completedCount} of {actions.length} actions deployed
            </small>

          </div>

        </div>

      </section>


      <section className="action-risk-summary">

        <div className="action-risk-main">

          <div>

            <span>
              CURRENT PRIORITY ZONE
            </span>

            <strong>
              {selectedZone.name}
            </strong>

            <p>
              {selectedZone.issue}
            </p>

          </div>


          <div className="action-risk-score">

            <strong>
              {selectedZone.score}
            </strong>

            <span>
              /100
            </span>

          </div>

        </div>


        <div className="action-risk-details">

          <div>

            <span>
              RISK LEVEL
            </span>

            <strong className={`risk-text ${riskClass}`}>
              {selectedZone.level}
            </strong>

          </div>


          <div>

            <span>
              ESCALATION
            </span>

            <strong>
              {selectedZone.escalation}%
            </strong>

          </div>


          <div>

            <span>
              CONFIDENCE
            </span>

            <strong>
              {selectedZone.confidence}%
            </strong>

          </div>


          <div>

            <span>
              TIME WINDOW
            </span>

            <strong>
              24 HOURS
            </strong>

          </div>

        </div>

      </section>


      <section className="actions-section-header">

        <div>

          <span>
            AI-GENERATED RESPONSE PLAN
          </span>

          <h3>
            Recommended interventions
          </h3>

        </div>


        <div className="action-progress">

          <div className="action-progress-bar">

            <div
              style={{
                width: `${
                  (completedCount / actions.length) *
                  100
                }%`,
              }}
            ></div>

          </div>

          <span>
            {completedCount}/{actions.length} deployed
          </span>

        </div>

      </section>


      <section className="actions-list">

        {actions.map((action) => (

          <div
            className={`action-card ${
              action.status === 'deployed'
                ? 'deployed'
                : ''
            }`}
            key={action.id}
          >

            <div className="action-number">

              {action.status === 'deployed'
                ? '✓'
                : String(action.id).padStart(2, '0')}

            </div>


            <div className="action-card-content">

              <div className="action-card-top">

                <div>

                  <span className="action-priority">
                    {action.priority}
                  </span>

                  <span className="action-type">
                    {action.type}
                  </span>

                </div>


                {action.status === 'deployed' && (

                  <span className="deployed-badge">
                    ✓ DEPLOYED
                  </span>

                )}

              </div>


              <h3>
                {action.title}
              </h3>

              <p>
                {action.description}
              </p>


              <div className="action-meta">

                <div>

                  <span>
                    ASSIGNED TEAM
                  </span>

                  <strong>
                    {action.team}
                  </strong>

                </div>


                <div>

                  <span>
                    ESTIMATED RESPONSE
                  </span>

                  <strong>
                    {action.eta}
                  </strong>

                </div>

              </div>

            </div>


            <div className="action-card-control">

              {action.status === 'deployed' ? (

                <div className="action-deployed">

                  <span>
                    ✓
                  </span>

                  <strong>
                    ACTION ACTIVE
                  </strong>

                  <small>
                    Response initiated
                  </small>

                </div>

              ) : (

                <button
                  className="deploy-button"
                  onClick={() =>
                    deployAction(action.id)
                  }
                >

                  <span>
                    DEPLOY
                  </span>

                  <strong>
                    →
                  </strong>

                </button>

              )}

            </div>

          </div>

        ))}

      </section>


      <section className="response-summary">

        <div className="response-summary-icon">
          ◉
        </div>


        <div>

          <span>
            CIVICPULSE RESPONSE WORKFLOW
          </span>

          <strong>
            Intelligence → Decision → Intervention
          </strong>

          <p>
            CivicPulse transforms detected civic patterns into
            prioritized actions for field teams.
          </p>

        </div>


        <div className="response-summary-status">

          <span>
            SYSTEM STATUS
          </span>

          <strong>
            OPERATIONAL
          </strong>

        </div>

      </section>

    </main>
  )


  /* =====================================================
     DASHBOARD VIEW
     ===================================================== */

  const DashboardView = () => (
    <main className="dashboard">

      <section className="dashboard-intro">

        <div>

          <span className="intro-label">
            URBAN INTELLIGENCE OVERVIEW
          </span>

          <h2>
            City situation at a glance.
          </h2>

          <p>
            CivicPulse continuously analyzes civic signals,
            identifies emerging problems and predicts where
            intervention may be required next.
          </p>

        </div>


        <div className="last-updated">

          <span>
            LAST UPDATED
          </span>

          <strong>
            Just now
          </strong>

          <small>
            ● Intelligence engine active
          </small>

        </div>

      </section>


      <section className="stats-grid">

        <div className="stat-card critical">

          <div className="stat-top">

            <span>
              CRITICAL ZONES
            </span>

            <span className="stat-symbol">
              !
            </span>

          </div>

          <strong>
            7
          </strong>

          <div className="stat-bottom">

            <span className="trend danger">
              ↑ 2
            </span>

            <span>
              vs last week
            </span>

          </div>

        </div>


        <div className="stat-card emerging">

          <div className="stat-top">

            <span>
              EMERGING PROBLEMS
            </span>

            <span className="stat-symbol">
              ◈
            </span>

          </div>

          <strong>
            18
          </strong>

          <div className="stat-bottom">

            <span className="trend warning">
              ↑ 24%
            </span>

            <span>
              detected this week
            </span>

          </div>

        </div>


        <div className="stat-card complaints">

          <div className="stat-top">

            <span>
              ACTIVE COMPLAINTS
            </span>

            <span className="stat-symbol">
              ≡
            </span>

          </div>

          <strong>
            243
          </strong>

          <div className="stat-bottom">

            <span className="trend info">
              +31
            </span>

            <span>
              today
            </span>

          </div>

        </div>


        <div className="stat-card predicted">

          <div className="stat-top">

            <span>
              PREDICTED ESCALATIONS
            </span>

            <span className="stat-symbol">
              ◉
            </span>

          </div>

          <strong>
            12
          </strong>

          <div className="stat-bottom">

            <span className="trend purple">
              Next 24h
            </span>

            <span>
              AI forecast
            </span>

          </div>

        </div>

      </section>


      <section className="main-grid">

        <div className="panel map-panel">

          <div className="panel-header map-header">

            <div>

              <div className="panel-kicker">
                GEOSPATIAL INTELLIGENCE
              </div>

              <h3>
                Live City Risk Map
              </h3>

              <p>
                Real-time civic hotspots across Delhi NCR
              </p>

            </div>


            <div className="map-tools">

              <div className="map-live">

                <span></span>

                LIVE DATA

              </div>


              <div className="map-legend">

                <span>

                  <i className="legend-dot high"></i>

                  High

                </span>


                <span>

                  <i className="legend-dot medium"></i>

                  Medium

                </span>


                <span>

                  <i className="legend-dot low"></i>

                  Low

                </span>

              </div>

            </div>

          </div>


          <div className="map-container">

            <MapContainer
              center={[28.6139, 77.2090]}
              zoom={11}
              scrollWheelZoom={true}
              className="leaflet-map"
            >

              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              />


              <CircleMarker
                center={[28.635, 77.225]}
                radius={
                  isSelected(zones.sector18)
                    ? 30
                    : 25
                }
                pathOptions={{
                  color: '#ef4444',
                  fillColor: '#ef4444',
                  fillOpacity: 0.82,
                  weight:
                    isSelected(zones.sector18)
                      ? 6
                      : 4,
                }}
                eventHandlers={{
                  click: () =>
                    setSelectedZone(
                      zones.sector18
                    ),
                }}
              >

                <Popup>

                  <strong>
                    SECTOR 18
                  </strong>

                  <br />

                  Risk Score: 87/100

                  <br />

                  Waterlogging

                </Popup>

              </CircleMarker>


              <CircleMarker
                center={[28.650, 77.180]}
                radius={
                  isSelected(zones.sector22)
                    ? 30
                    : 22
                }
                pathOptions={{
                  color: '#f59e0b',
                  fillColor: '#f59e0b',
                  fillOpacity: 0.82,
                  weight:
                    isSelected(zones.sector22)
                      ? 6
                      : 4,
                }}
                eventHandlers={{
                  click: () =>
                    setSelectedZone(
                      zones.sector22
                    ),
                }}
              >

                <Popup>

                  <strong>
                    SECTOR 22
                  </strong>

                  <br />

                  Risk Score: 64/100

                  <br />

                  Waste accumulation

                </Popup>

              </CircleMarker>


              <CircleMarker
                center={[28.600, 77.190]}
                radius={
                  isSelected(zones.sector12)
                    ? 27
                    : 18
                }
                pathOptions={{
                  color: '#22c55e',
                  fillColor: '#22c55e',
                  fillOpacity: 0.82,
                  weight:
                    isSelected(zones.sector12)
                      ? 6
                      : 4,
                }}
                eventHandlers={{
                  click: () =>
                    setSelectedZone(
                      zones.sector12
                    ),
                }}
              >

                <Popup>

                  <strong>
                    SECTOR 12
                  </strong>

                  <br />

                  Risk Score: 31/100

                  <br />

                  Street lighting

                </Popup>

              </CircleMarker>

            </MapContainer>


            <div className="map-overlay">

              <div className="map-selected-zone">

                <span>
                  SELECTED ZONE
                </span>

                <strong>
                  {selectedZone.name}
                </strong>

                <small>
                  {selectedZone.score}/100 ·{' '}
                  {riskClass.toUpperCase()}
                </small>

              </div>


              <div className="map-overlay-divider"></div>


              <div className="map-overlay-item">

                <span>
                  ACTIVE HOTSPOTS
                </span>

                <strong>
                  03
                </strong>

              </div>


              <div className="map-overlay-divider"></div>


              <div className="map-overlay-item">

                <span>
                  RISK COVERAGE
                </span>

                <strong>
                  68%
                </strong>

              </div>

            </div>

          </div>

        </div>


        <div
          className={`panel risk-panel ${riskClass}`}
        >

          <div className="panel-header">

            <div>

              <div className="panel-kicker">
                PREDICTIVE INTELLIGENCE
              </div>

              <h3>
                {selectedZone.name}
              </h3>

            </div>


            <span
              className={`risk-badge ${riskClass}`}
            >
              {selectedZone.level}
            </span>

          </div>


          <div className="risk-main">

            <div className="risk-ring">

              <div className="risk-ring-inner">

                <strong>
                  {selectedZone.score}
                </strong>

                <span>
                  /100
                </span>

              </div>

            </div>


            <div className="risk-description">

              <span>
                CIVIC RISK SCORE
              </span>

              <p>
                Predicted probability of escalation
                within the next 24 hours.
              </p>

            </div>

          </div>


          <div className="risk-problem">

            <span>
              PRIMARY CIVIC ISSUE
            </span>

            <h4>
              {selectedZone.issue}
            </h4>

            <div className="issue-growth">

              ↑ {selectedZone.increase}

              <span>
                complaints
              </span>

            </div>

          </div>


          <div className="factors">

            <div className="factor-heading">

              <span>
                MODEL EXPLANATION
              </span>

              <span>
                5 SIGNALS
              </span>

            </div>


            <div className="factor">

              <div className="factor-number">
                01
              </div>

              <div>

                <strong>
                  Complaint surge
                </strong>

                <p>
                  {selectedZone.complaints}
                </p>

              </div>

            </div>


            <div className="factor">

              <div className="factor-number">
                02
              </div>

              <div>

                <strong>
                  Rapid growth
                </strong>

                <p>
                  Complaints increased{' '}
                  {selectedZone.increase}
                </p>

              </div>

            </div>


            <div className="factor">

              <div className="factor-number">
                03
              </div>

              <div>

                <strong>
                  Weather signal
                </strong>

                <p>
                  {selectedZone.rainfall}
                </p>

              </div>

            </div>


            <div className="factor">

              <div className="factor-number">
                04
              </div>

              <div>

                <strong>
                  Historical recurrence
                </strong>

                <p>
                  {selectedZone.flooding}
                </p>

              </div>

            </div>


            <div className="factor">

              <div className="factor-number">
                05
              </div>

              <div>

                <strong>
                  Nearby signals
                </strong>

                <p>
                  {selectedZone.drainage}
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      <section className="bottom-grid">

        <div className="panel trend-panel">

          <div className="panel-header">

            <div>

              <div className="panel-kicker">
                TEMPORAL INTELLIGENCE
              </div>

              <h3>
                Complaint Velocity
              </h3>

              <p>
                Rapid growth indicates an emerging civic issue
              </p>

            </div>


            <div className="trend-summary">

              <strong>
                +933%
              </strong>

              <span>
                5 day growth
              </span>

            </div>

          </div>


          <div className="trend-chart">

            <div className="chart-y">

              <span>
                35
              </span>

              <span>
                25
              </span>

              <span>
                15
              </span>

              <span>
                5
              </span>

            </div>


            <div className="chart-area">

              <div className="chart-lines">

                <span></span>
                <span></span>
                <span></span>
                <span></span>

              </div>


              <div className="bars">

                <div className="bar-group">

                  <div
                    className="bar"
                    style={{
                      height: '10%',
                    }}
                  ></div>

                  <span>
                    MON
                  </span>

                </div>


                <div className="bar-group">

                  <div
                    className="bar"
                    style={{
                      height: '16%',
                    }}
                  ></div>

                  <span>
                    TUE
                  </span>

                </div>


                <div className="bar-group">

                  <div
                    className="bar"
                    style={{
                      height: '35%',
                    }}
                  ></div>

                  <span>
                    WED
                  </span>

                </div>


                <div className="bar-group">

                  <div
                    className="bar"
                    style={{
                      height: '61%',
                    }}
                  ></div>

                  <span>
                    THU
                  </span>

                </div>


                <div className="bar-group">

                  <div
                    className="bar active"
                    style={{
                      height: '100%',
                    }}
                  ></div>

                  <span>
                    FRI
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>


        <div className="panel action-panel">

          <div className="panel-header">

            <div>

              <div className="panel-kicker">
                AI DECISION SUPPORT
              </div>

              <h3>
                Recommended Actions
              </h3>

              <p>
                Prioritized response for{' '}
                {selectedZone.name}
              </p>

            </div>


            <span className="ai-badge">
              AI GENERATED
            </span>

          </div>


          <div className="actions">

            <div className="action priority">

              <span>
                01
              </span>

              <div>

                <small>
                  IMMEDIATE
                </small>

                <p>
                  Inspect drainage infrastructure
                </p>

              </div>

              <b>
                →
              </b>

            </div>


            <div className="action">

              <span>
                02
              </span>

              <div>

                <small>
                  HIGH PRIORITY
                </small>

                <p>
                  Deploy cleaning team
                </p>

              </div>

              <b>
                →
              </b>

            </div>


            <div className="action">

              <span>
                03
              </span>

              <div>

                <small>
                  PREVENTIVE
                </small>

                <p>
                  Place temporary warning signage
                </p>

              </div>

              <b>
                →
              </b>

            </div>


            <div className="action">

              <span>
                04
              </span>

              <div>

                <small>
                  MONITOR
                </small>

                <p>
                  Monitor area for next 12 hours
                </p>

              </div>

              <b>
                →
              </b>

            </div>

          </div>

        </div>

      </section>


      <section className="emerging-alert">

        <div className="alert-icon">
          !
        </div>


        <div className="alert-content">

          <div className="alert-label">

            <span className="alert-pulse"></span>

            AI PATTERN DETECTION

          </div>


          <h3>
            Emerging Civic Issue Detected
          </h3>


          <p>
            A potential drainage failure is developing
            in Sector 18 based on clustered complaints
            and temporal growth.
          </p>

        </div>


        <div className="alert-stat">

          <span>
            ESCALATION PROBABILITY
          </span>

          <strong>
            78%
          </strong>

          <small>
            within 24 hours
          </small>

        </div>


        <button
          className="alert-button"
          onClick={() =>
            setShowAnalysis(true)
          }
        >
          VIEW ANALYSIS →
        </button>

      </section>


      {/* =====================================================
          ANALYSIS MODAL
          ===================================================== */}

      {showAnalysis && (

        <div
          className="analysis-backdrop"
          onClick={() =>
            setShowAnalysis(false)
          }
        >

          <div
            className="analysis-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="analysis-header">

              <div>

                <div className="analysis-kicker">

                  <span className="analysis-live-dot"></span>

                  AI PATTERN ANALYSIS

                </div>

                <h2>
                  Sector 18 Risk Analysis
                </h2>

                <p>
                  Explainable prediction generated by CivicPulse
                </p>

              </div>


              <button
                className="analysis-close"
                onClick={() =>
                  setShowAnalysis(false)
                }
              >
                ×
              </button>

            </div>


            <div className="analysis-summary">

              <div className="analysis-summary-text">

                <span>
                  DETECTED PATTERN
                </span>

                <strong>
                  Emerging drainage failure
                </strong>

                <p>
                  Complaint activity is increasing rapidly
                  while weather and historical signals indicate
                  elevated flooding risk.
                </p>

              </div>


              <div className="analysis-score">

                <span>
                  ESCALATION PROBABILITY
                </span>

                <strong>
                  78%
                </strong>

                <small>
                  within 24 hours
                </small>

              </div>

            </div>


            <div className="analysis-progress">

              <div className="analysis-progress-top">

                <span>
                  MODEL CONFIDENCE
                </span>

                <strong>
                  91%
                </strong>

              </div>


              <div className="analysis-progress-track">

                <div
                  className="analysis-progress-fill"
                  style={{
                    width: '91%',
                  }}
                ></div>

              </div>

            </div>


            <div className="analysis-section">

              <div className="analysis-section-title">

                <span>
                  CONTRIBUTING SIGNALS
                </span>

                <small>
                  5 SIGNALS DETECTED
                </small>

              </div>


              <div className="analysis-signal">

                <div className="signal-check">
                  ✓
                </div>

                <div>

                  <strong>
                    Complaint surge
                  </strong>

                  <p>
                    31 complaints recorded this week,
                    significantly above the normal baseline.
                  </p>

                </div>

              </div>


              <div className="analysis-signal">

                <div className="signal-check">
                  ✓
                </div>

                <div>

                  <strong>
                    Rapid temporal growth
                  </strong>

                  <p>
                    Complaint volume increased by 73%
                    over the observed period.
                  </p>

                </div>

              </div>


              <div className="analysis-signal">

                <div className="signal-check">
                  ✓
                </div>

                <div>

                  <strong>
                    Weather conditions
                  </strong>

                  <p>
                    Heavy rainfall is forecast for the area.
                  </p>

                </div>

              </div>


              <div className="analysis-signal">

                <div className="signal-check">
                  ✓
                </div>

                <div>

                  <strong>
                    Historical recurrence
                  </strong>

                  <p>
                    Previous flooding incidents increase
                    the likelihood of repeated disruption.
                  </p>

                </div>

              </div>


              <div className="analysis-signal">

                <div className="signal-check">
                  ✓
                </div>

                <div>

                  <strong>
                    Nearby drainage complaints
                  </strong>

                  <p>
                    Spatially related complaints reinforce
                    the detected pattern.
                  </p>

                </div>

              </div>

            </div>


            <div className="analysis-prediction">

              <div className="prediction-icon">
                ◉
              </div>

              <div>

                <span>
                  AI PREDICTION
                </span>

                <strong>
                  Sector 18 may experience severe
                  waterlogging within 24 hours.
                </strong>

              </div>

            </div>


            <div className="analysis-response">

              <div>

                <span>
                  RECOMMENDED RESPONSE
                </span>

                <strong>
                  Inspect drainage infrastructure immediately.
                </strong>

              </div>

              <span className="response-priority">
                PRIORITY 1
              </span>

            </div>


            <div className="analysis-footer">

              <span>
                CIVICPULSE INTELLIGENCE ENGINE · v1.0
              </span>

              <button
                onClick={() =>
                  setShowAnalysis(false)
                }
              >
                CLOSE ANALYSIS
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  )


  /* =====================================================
     MAIN APP
     ===================================================== */

  return (
    <div className="app">

      {/* =================================================
          SIDEBAR
          ================================================= */}

      <aside className="sidebar">

        <div className="brand">

          <div className="brand-mark">
            CP
          </div>

          <div>

            <h1>
              CIVICPULSE
            </h1>

            <span>
              URBAN INTELLIGENCE
            </span>

          </div>

        </div>


        <div className="sidebar-section">

          <span className="sidebar-label">
            COMMAND CENTER
          </span>


          <nav className="nav">

            {navigation.map((item) => (

              <button
                key={item.label}
                className={`nav-item ${
                  activeNav === item.label
                    ? 'active'
                    : ''
                }`}
                onClick={() =>
                  handleNavigation(item.label)
                }
              >

                <span className="nav-icon">
                  {item.icon}
                </span>

                <span>
                  {item.label}
                </span>


                {item.label === 'Predictions' && (

                  <span className="nav-count">
                    12
                  </span>

                )}

              </button>

            ))}

          </nav>

        </div>


        <div className="sidebar-bottom">

          <div className="system-status">

            <span className="status-dot"></span>

            <div>

              <strong>
                Systems Operational
              </strong>

              <span>
                All intelligence services online
              </span>

            </div>

          </div>


          <div className="sidebar-footer">

            <span>
              v1.0.0
            </span>

            <span>
              Delhi NCR
            </span>

          </div>

        </div>

      </aside>


      {/* =================================================
          MAIN SHELL
          ================================================= */}

      <div className="main-shell">

        <header className="topbar">

          <div className="breadcrumb">

            <span>
              Command Center
            </span>

            <b>
              /
            </b>

            <strong>
              {activeNav}
            </strong>

          </div>


          <div className="topbar-right">

            <div className="city-selector">

              <span className="city-dot"></span>

              <span>
                Delhi NCR
              </span>

              <span className="chevron">
                ⌄
              </span>

            </div>


            <div className="live-indicator">

              <span className="status-dot"></span>

              LIVE

            </div>


            <button className="icon-button">
              ◔
            </button>


            <div className="user-avatar">
              S
            </div>

          </div>

        </header>


        {/* =================================================
            PAGE ROUTING
            ================================================= */}

        {activeNav === 'Predictions' ? (

          <PredictionView />

        ) : activeNav === 'Complaints' ? (

          <ComplaintsView />

        ) : activeNav === 'Actions' ? (

          <ActionsView />

        ) : (

          <DashboardView />

        )}

      </div>

    </div>
  )
}

export default App