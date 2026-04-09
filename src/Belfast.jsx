import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import './Belfast.css'

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'bars', label: 'Bars' },
  { id: 'brunch', label: 'Brunch' },
  { id: 'lunch', label: 'Lunch' },
  { id: 'dinner', label: 'Dinner' },
  { id: 'coffee', label: 'Coffee' },
]

const CATEGORY_COLORS = {
  bars: '#ff6b6b',
  brunch: '#ffd93d',
  lunch: '#6bcb77',
  dinner: '#4d96ff',
  coffee: '#c77dff',
}

const CATEGORY_LABELS = {
  bars: 'Bars',
  brunch: 'Brunch',
  lunch: 'Lunch',
  dinner: 'Dinner',
  coffee: 'Coffee',
}

const PLACES = [
  // Bars
  { name: 'The Watson', category: 'bars', lat: 54.60353, lng: -5.932011 },
  { name: "Lavery's", category: 'bars', lat: 54.588959, lng: -5.934068 },
  { name: 'XXX Liquor', category: 'bars', lat: 54.591697, lng: -5.933221, note: 'cocktails' },
  { name: 'The Points', category: 'bars', lat: 54.591599, lng: -5.932586 },
  { name: 'Bittles', category: 'bars', lat: 54.598450, lng: -5.924413, note: 'goated Guinness' },
  { name: 'Town Square', category: 'bars', lat: 54.588169, lng: -5.933260 },
  { name: 'The Crown', category: 'bars', lat: 54.595000, lng: -5.933900 },
  { name: 'The Garrick', category: 'bars', lat: 54.597240, lng: -5.926660 },
  { name: "White's Tavern", category: 'bars', lat: 54.600047, lng: -5.928396 },
  { name: 'Duke of York', category: 'bars', lat: 54.601754, lng: -5.927618 },
  { name: 'The Mermaid Inn', category: 'bars', lat: 54.599380, lng: -5.927230 },
  { name: 'The Spaniard', category: 'bars', lat: 54.600982, lng: -5.926335 },
  { name: "Bert's Jazz Bar", category: 'bars', lat: 54.600743, lng: -5.926000 },
  { name: 'Ulster Sports Club', category: 'bars', lat: 54.600743, lng: -5.925134 },

  // Brunch
  { name: 'The Pocket', category: 'brunch', lat: 54.598707, lng: -5.924413 },
  { name: 'Harlem Cafe', category: 'brunch', lat: 54.594419, lng: -5.931041 },
  { name: 'General Merchants', category: 'brunch', lat: 54.578556, lng: -5.919525 },
  { name: 'French Village Botanic', category: 'brunch', lat: 54.587600, lng: -5.932800 },
  { name: 'Munch', category: 'brunch', lat: 54.599650, lng: -5.925245 },
  { name: 'Sawyers', category: 'brunch', lat: 54.598114, lng: -5.932435, note: 'big ass sandwiches' },
  { name: 'Toto', category: 'brunch', lat: 54.589522, lng: -5.932480, note: 'dim sum' },

  // Lunch
  { name: 'Boojum', category: 'lunch', lat: 54.595340, lng: -5.934310 },
  { name: 'Bao Bun', category: 'lunch', lat: 54.587870, lng: -5.932730 },
  { name: 'Poke Shack', category: 'lunch', lat: 54.587202, lng: -5.932365 },

  // Dinner
  { name: 'La Taqueria', category: 'dinner', lat: 54.599243, lng: -5.932650, note: 'mexican' },
  { name: 'Same Happy', category: 'dinner', lat: 54.589893, lng: -5.931672, note: 'Hong Kong BBQ' },
  { name: 'EDO', category: 'dinner', lat: 54.596775, lng: -5.933487, note: 'boujee tapas' },
  { name: 'Mourne Seafood Bar', category: 'dinner', lat: 54.599543, lng: -5.932380 },
  { name: 'Orto', category: 'dinner', lat: 54.593796, lng: -5.931160, note: 'pizza' },
  { name: 'Bo Tree Kitchen', category: 'dinner', lat: 54.585932, lng: -5.931912, note: 'Thai' },
  { name: 'India Gate', category: 'dinner', lat: 54.592148, lng: -5.934368 },
  { name: 'Ox', category: 'dinner', lat: 54.598200, lng: -5.924100 },

  // Coffee
  { name: 'Established Coffee', category: 'coffee', lat: 54.602780, lng: -5.927294 },
  { name: 'Napoleon Coffee', category: 'coffee', lat: 54.592569, lng: -5.928898 },
  { name: 'Hustle', category: 'coffee', lat: 54.600307, lng: -5.929633 },
]

function mapsUrl(place) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' Belfast')}`
}

function MapFlyTo({ place }) {
  const map = useMap()
  useEffect(() => {
    if (place) map.flyTo([place.lat, place.lng], 16, { duration: 0.8 })
  }, [place, map])
  return null
}

export default function Belfast() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('all')
  const [activePlace, setActivePlace] = useState(null)
  const [listOpen, setListOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const filtered = activeCategory === 'all'
    ? PLACES
    : PLACES.filter(p => p.category === activeCategory)

  const grouped = CATEGORIES.slice(1).reduce((acc, cat) => {
    const items = filtered.filter(p => p.category === cat.id)
    if (items.length) acc[cat.id] = items
    return acc
  }, {})

  const handleMarkerClick = (place) => {
    setActivePlace(place)
    if (listOpen) setListOpen(false)
  }

  const handleListItemClick = (place) => {
    setActivePlace(place)
    setListOpen(false)
  }

  return (
    <div className="belfast-page">
      {/* Header */}
      <div className="belfast-header">
        <button className="belfast-back" onClick={() => navigate('/')}>←</button>
        <h1 className="belfast-title">Belfast spots Taylor rates</h1>
        <button
          className={`belfast-toggle ${listOpen ? 'active' : ''}`}
          onClick={() => { setListOpen(o => !o); setActivePlace(null) }}
          aria-label="Toggle list"
        >
          ☰
        </button>
      </div>

      {/* Filters */}
      <div className="belfast-filters">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`belfast-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
            style={activeCategory === cat.id && cat.id !== 'all'
              ? { borderColor: CATEGORY_COLORS[cat.id], color: CATEGORY_COLORS[cat.id] }
              : {}
            }
            onClick={() => { setActiveCategory(cat.id); setActivePlace(null) }}
          >
            {cat.id !== 'all' && (
              <span className="filter-dot" style={{ background: CATEGORY_COLORS[cat.id] }} />
            )}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="belfast-body">
        {/* Map */}
        <div className="belfast-map-wrap" onClick={() => { if (isMobile) setActivePlace(null) }}>
          <MapContainer
            center={[54.5966, -5.9310]}
            zoom={isMobile ? 13 : 14}
            style={{ width: '100%', height: '100%' }}
            zoomControl={!isMobile}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <MapFlyTo place={activePlace} />
            {filtered.map((place, i) => (
              <CircleMarker
                key={`${place.name}-${i}`}
                center={[place.lat, place.lng]}
                radius={activePlace?.name === place.name ? (isMobile ? 14 : 11) : (isMobile ? 10 : 8)}
                fillColor={CATEGORY_COLORS[place.category]}
                color={activePlace?.name === place.name ? '#ffffff' : CATEGORY_COLORS[place.category]}
                weight={activePlace?.name === place.name ? 2.5 : 1.5}
                opacity={1}
                fillOpacity={0.9}
                eventHandlers={{ click: (e) => { e.originalEvent.stopPropagation(); handleMarkerClick(place) } }}
              >
                <Popup className="belfast-leaflet-popup">
                  <div className="belfast-popup">
                    <span className="popup-dot" style={{ background: CATEGORY_COLORS[place.category] }} />
                    <div>
                      <div className="popup-name">{place.name}</div>
                      {place.note && <div className="popup-note">{place.note}</div>}
                      <div className="popup-cat">{CATEGORY_LABELS[place.category]}</div>
                      <a className="popup-maps-link" href={mapsUrl(place)} target="_blank" rel="noopener noreferrer">
                        Open in Maps ↗
                      </a>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {/* Desktop sidebar */}
        {!isMobile && (
          <div className="belfast-sidebar">
            <div className="sidebar-inner">
              <div className="sidebar-count">{filtered.length} places</div>
              {Object.entries(grouped).map(([catId, places]) => (
                <div key={catId} className="sidebar-group">
                  <div className="sidebar-group-label" style={{ color: CATEGORY_COLORS[catId] }}>
                    {CATEGORY_LABELS[catId]}
                  </div>
                  {places.map((place, i) => (
                    <div key={i} className={`sidebar-item ${activePlace?.name === place.name ? 'active' : ''}`}>
                      <button className="sidebar-item-btn" onClick={() => handleListItemClick(place)}>
                        <span className="sidebar-dot" style={{ background: CATEGORY_COLORS[place.category] }} />
                        <span className="sidebar-name">{place.name}</span>
                        {place.note && <span className="sidebar-note">{place.note}</span>}
                      </button>
                      <a className="sidebar-maps-link" href={mapsUrl(place)} target="_blank" rel="noopener noreferrer" title="Open in Google Maps">↗</a>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile: place card */}
      {isMobile && activePlace && (
        <div className="mobile-place-card">
          <div className="mobile-card-inner">
            <span className="mobile-card-dot" style={{ background: CATEGORY_COLORS[activePlace.category] }} />
            <div className="mobile-card-info">
              <div className="mobile-card-name">{activePlace.name}</div>
              {activePlace.note && <div className="mobile-card-note">{activePlace.note}</div>}
              <div className="mobile-card-cat">{CATEGORY_LABELS[activePlace.category]}</div>
            </div>
            <a
              className="mobile-card-maps"
              href={mapsUrl(activePlace)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Maps ↗
            </a>
            <button className="mobile-card-close" onClick={() => setActivePlace(null)}>✕</button>
          </div>
        </div>
      )}

      {/* Mobile: bottom sheet list */}
      {isMobile && (
        <>
          {listOpen && <div className="bottom-sheet-backdrop" onClick={() => setListOpen(false)} />}
          <div className={`bottom-sheet ${listOpen ? 'open' : ''}`}>
            <div className="bottom-sheet-handle" onClick={() => setListOpen(false)} />
            <div className="bottom-sheet-header">
              <span className="bottom-sheet-count">{filtered.length} places</span>
              <button className="bottom-sheet-close" onClick={() => setListOpen(false)}>✕</button>
            </div>
            <div className="bottom-sheet-scroll">
              {Object.entries(grouped).map(([catId, places]) => (
                <div key={catId} className="sidebar-group">
                  <div className="sidebar-group-label" style={{ color: CATEGORY_COLORS[catId] }}>
                    {CATEGORY_LABELS[catId]}
                  </div>
                  {places.map((place, i) => (
                    <div key={i} className={`sidebar-item ${activePlace?.name === place.name ? 'active' : ''}`}>
                      <button className="sidebar-item-btn" onClick={() => handleListItemClick(place)}>
                        <span className="sidebar-dot" style={{ background: CATEGORY_COLORS[place.category] }} />
                        <span className="sidebar-name">{place.name}</span>
                        {place.note && <span className="sidebar-note">{place.note}</span>}
                      </button>
                      <a className="sidebar-maps-link" href={mapsUrl(place)} target="_blank" rel="noopener noreferrer">↗</a>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
