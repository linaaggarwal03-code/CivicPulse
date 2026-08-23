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
    },
  }

  const [selectedZone, setSelectedZone] = useState(zones.sector18)
  const [activeNav, setActiveNav] = useState('Overview')

  const navigation = [
    { label: 'Overview', icon: '◈' },
    { label: 'Live Map', icon: '⌖' },
    { label: 'Complaints', icon: '▤' },
    { label: 'Analytics', icon: '⌁' },
    { label: 'Predictions', icon: '◌' },
    { label: 'Actions', icon: '✓' },
  ]

  const riskClass =
    selectedZone.score >= 80
      ? 'high'
      : selectedZone.score >= 50
        ? 'medium'
        : 'low'

  return (
    <div className="app">

      {/* =====================================================
          SIDEBAR
          ===================================================== */}

      <aside className="sidebar">

        <div className="brand">
          <div className="brand-mark">
            CP
          </div>

          <div>
            <h1>CIVICPULSE</h1>
            <span>URBAN INTELLIGENCE</span>
          </div>
        </div>

        <div className="sidebar-section">
          <span className="sidebar-label">COMMAND CENTER</span>

          <nav className="nav">
            {navigation.map((item) => (
              <button
                key={item.label}
                className={`nav-item ${
                  activeNav === item.label ? 'active' : ''
                }`}
                onClick={() => setActiveNav(item.label)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>

                {item.label === 'Predictions' && (
                  <span className="nav-count">12</span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="sidebar-bottom">

          <div className="system-status">
            <span className="status-dot"></span>

            <div>
              <strong>Systems Operational</strong>
              <span>All intelligence services online</span>
            </div>
          </div>

          <div className="sidebar-footer">
            <span>v1.0.0</span>
            <span>Delhi NCR</span>
          </div>

        </div>
      </aside>


      {/* =====================================================
          MAIN APPLICATION
          ===================================================== */}

      <div className="main-shell">

        {/* ===================================================
            TOP BAR
            =================================================== */}

        <header className="topbar">

          <div className="breadcrumb">
            <span>Command Center</span>
            <b>/</b>
            <strong>{activeNav}</strong>
          </div>

          <div className="topbar-right">

            <div className="city-selector">
              <span className="city-dot"></span>
              <span>Delhi NCR</span>
              <span className="chevron">⌄</span>
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


        {/* ===================================================
            DASHBOARD CONTENT
            =================================================== */}

        <main className="dashboard">

          {/* HERO INTRO */}

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
              <span>LAST UPDATED</span>
              <strong>Just now</strong>
              <small>● Intelligence engine active</small>
            </div>

          </section>


          {/* =================================================
              KPI CARDS
              ================================================= */}

          <section className="stats-grid">

            <div className="stat-card critical">

              <div className="stat-top">
                <span>CRITICAL ZONES</span>
                <span className="stat-symbol">!</span>
              </div>

              <strong>7</strong>

              <div className="stat-bottom">
                <span className="trend danger">↑ 2</span>
                <span>vs last week</span>
              </div>

            </div>


            <div className="stat-card emerging">

              <div className="stat-top">
                <span>EMERGING PROBLEMS</span>
                <span className="stat-symbol">◈</span>
              </div>

              <strong>18</strong>

              <div className="stat-bottom">
                <span className="trend warning">↑ 24%</span>
                <span>detected this week</span>
              </div>

            </div>


            <div className="stat-card complaints">

              <div className="stat-top">
                <span>ACTIVE COMPLAINTS</span>
                <span className="stat-symbol">≡</span>
              </div>

              <strong>243</strong>

              <div className="stat-bottom">
                <span className="trend info">+31</span>
                <span>today</span>
              </div>

            </div>


            <div className="stat-card predicted">

              <div className="stat-top">
                <span>PREDICTED ESCALATIONS</span>
                <span className="stat-symbol">◉</span>
              </div>

              <strong>12</strong>

              <div className="stat-bottom">
                <span className="trend purple">Next 24h</span>
                <span>AI forecast</span>
              </div>

            </div>

          </section>


          {/* =================================================
              MAP + RISK
              ================================================= */}

          <section className="main-grid">

            {/* CITY MAP */}

            <div className="panel map-panel">

              <div className="panel-header map-header">

                <div>
                  <div className="panel-kicker">
                    GEOSPATIAL INTELLIGENCE
                  </div>

                  <h3>Live City Risk Map</h3>

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


                  {/* SECTOR 18 */}

                  <CircleMarker
                    center={[28.635, 77.225]}
                    radius={25}
                    pathOptions={{
                      color: '#ef4444',
                      fillColor: '#ef4444',
                      fillOpacity: 0.82,
                      weight: 4,
                    }}
                    eventHandlers={{
                      click: () =>
                        setSelectedZone(zones.sector18),
                    }}
                  >
                    <Popup>
                      <strong>SECTOR 18</strong>
                      <br />
                      Risk Score: 87/100
                      <br />
                      Waterlogging
                    </Popup>
                  </CircleMarker>


                  {/* SECTOR 22 */}

                  <CircleMarker
                    center={[28.625, 77.245]}
                    radius={21}
                    pathOptions={{
                      color: '#f59e0b',
                      fillColor: '#f59e0b',
                      fillOpacity: 0.82,
                      weight: 4,
                    }}
                    eventHandlers={{
                      click: () =>
                        setSelectedZone(zones.sector22),
                    }}
                  >
                    <Popup>
                      <strong>SECTOR 22</strong>
                      <br />
                      Risk Score: 64/100
                      <br />
                      Waste accumulation
                    </Popup>
                  </CircleMarker>


                  {/* SECTOR 12 */}

                  <CircleMarker
                    center={[28.600, 77.190]}
                    radius={18}
                    pathOptions={{
                      color: '#22c55e',
                      fillColor: '#22c55e',
                      fillOpacity: 0.82,
                      weight: 4,
                    }}
                    eventHandlers={{
                      click: () =>
                        setSelectedZone(zones.sector12),
                    }}
                  >
                    <Popup>
                      <strong>SECTOR 12</strong>
                      <br />
                      Risk Score: 31/100
                      <br />
                      Street lighting
                    </Popup>
                  </CircleMarker>

                </MapContainer>


                {/* MAP OVERLAY */}

                <div className="map-overlay">

                  <div className="map-overlay-item">
                    <span>ACTIVE HOTSPOTS</span>
                    <strong>03</strong>
                  </div>

                  <div className="map-overlay-divider"></div>

                  <div className="map-overlay-item">
                    <span>RISK COVERAGE</span>
                    <strong>68%</strong>
                  </div>

                </div>

              </div>

            </div>


            {/* RISK INTELLIGENCE */}

            <div className={`panel risk-panel ${riskClass}`}>

              <div className="panel-header">

                <div>
                  <div className="panel-kicker">
                    PREDICTIVE INTELLIGENCE
                  </div>

                  <h3>{selectedZone.name}</h3>
                </div>

                <span className={`risk-badge ${riskClass}`}>
                  {selectedZone.level}
                </span>

              </div>


              <div className="risk-main">

                <div className="risk-ring">

                  <div className="risk-ring-inner">

                    <strong>{selectedZone.score}</strong>

                    <span>/100</span>

                  </div>

                </div>

                <div className="risk-description">

                  <span>CIVIC RISK SCORE</span>

                  <p>
                    Predicted probability of escalation
                    within the next 24 hours.
                  </p>

                </div>

              </div>


              <div className="risk-problem">

                <span>PRIMARY CIVIC ISSUE</span>

                <h4>{selectedZone.issue}</h4>

                <div className="issue-growth">
                  ↑ {selectedZone.increase}
                  <span>complaints</span>
                </div>

              </div>


              <div className="factors">

                <div className="factor-heading">
                  <span>MODEL EXPLANATION</span>
                  <span>5 SIGNALS</span>
                </div>


                <div className="factor">

                  <div className="factor-number">01</div>

                  <div>
                    <strong>Complaint surge</strong>
                    <p>{selectedZone.complaints}</p>
                  </div>

                </div>


                <div className="factor">

                  <div className="factor-number">02</div>

                  <div>
                    <strong>Rapid growth</strong>
                    <p>
                      Complaints increased {selectedZone.increase}
                    </p>
                  </div>

                </div>


                <div className="factor">

                  <div className="factor-number">03</div>

                  <div>
                    <strong>Weather signal</strong>
                    <p>{selectedZone.rainfall}</p>
                  </div>

                </div>


                <div className="factor">

                  <div className="factor-number">04</div>

                  <div>
                    <strong>Historical recurrence</strong>
                    <p>{selectedZone.flooding}</p>
                  </div>

                </div>


                <div className="factor">

                  <div className="factor-number">05</div>

                  <div>
                    <strong>Nearby signals</strong>
                    <p>{selectedZone.drainage}</p>
                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              ANALYTICS + ACTIONS
              ================================================= */}

          <section className="bottom-grid">

            {/* COMPLAINT VELOCITY */}

            <div className="panel trend-panel">

              <div className="panel-header">

                <div>
                  <div className="panel-kicker">
                    TEMPORAL INTELLIGENCE
                  </div>

                  <h3>Complaint Velocity</h3>

                  <p>
                    Rapid growth indicates an emerging civic issue
                  </p>
                </div>

                <div className="trend-summary">
                  <strong>+933%</strong>
                  <span>5 day growth</span>
                </div>

              </div>


              <div className="trend-chart">

                <div className="chart-y">
                  <span>35</span>
                  <span>25</span>
                  <span>15</span>
                  <span>5</span>
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
                      <div className="bar" style={{ height: '10%' }}></div>
                      <span>MON</span>
                    </div>

                    <div className="bar-group">
                      <div className="bar" style={{ height: '16%' }}></div>
                      <span>TUE</span>
                    </div>

                    <div className="bar-group">
                      <div className="bar" style={{ height: '35%' }}></div>
                      <span>WED</span>
                    </div>

                    <div className="bar-group">
                      <div className="bar" style={{ height: '61%' }}></div>
                      <span>THU</span>
                    </div>

                    <div className="bar-group">
                      <div className="bar active" style={{ height: '100%' }}></div>
                      <span>FRI</span>
                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* ACTION CENTER */}

            <div className="panel action-panel">

              <div className="panel-header">

                <div>
                  <div className="panel-kicker">
                    AI DECISION SUPPORT
                  </div>

                  <h3>Recommended Actions</h3>

                  <p>
                    Prioritized response for {selectedZone.name}
                  </p>
                </div>

                <span className="ai-badge">
                  AI GENERATED
                </span>

              </div>


              <div className="actions">

                <div className="action priority">

                  <span>01</span>

                  <div>
                    <small>IMMEDIATE</small>
                    <p>Inspect drainage infrastructure</p>
                  </div>

                  <b>→</b>

                </div>


                <div className="action">

                  <span>02</span>

                  <div>
                    <small>HIGH PRIORITY</small>
                    <p>Deploy cleaning team</p>
                  </div>

                  <b>→</b>

                </div>


                <div className="action">

                  <span>03</span>

                  <div>
                    <small>PREVENTIVE</small>
                    <p>Place temporary warning signage</p>
                  </div>

                  <b>→</b>

                </div>


                <div className="action">

                  <span>04</span>

                  <div>
                    <small>MONITOR</small>
                    <p>Monitor area for next 12 hours</p>
                  </div>

                  <b>→</b>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              EMERGING PROBLEM DETECTOR
              ================================================= */}

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

              <span>ESCALATION PROBABILITY</span>

              <strong>78%</strong>

              <small>
                within 24 hours
              </small>

            </div>


            <button className="alert-button">
              VIEW ANALYSIS →
            </button>

          </section>

        </main>

      </div>

    </div>
  )
}

export default App