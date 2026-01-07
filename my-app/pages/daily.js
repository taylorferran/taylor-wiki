import Head from 'next/head'
import { useState, useEffect } from 'react'
import styles from '../styles/Daily.module.css'

export default function Daily() {
  const [commits, setCommits] = useState([])
  const [weightData, setWeightData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [commitsRes, weightRes] = await Promise.all([
        fetch('/api/commits'),
        fetch('/api/weight')
      ])
      
      const commitsData = await commitsRes.json()
      const weightData = await weightRes.json()
      
      setCommits(commitsData)
      setWeightData(weightData)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  const startDate = new Date('2026-01-01')
  const today = new Date()
  const daysSince = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1

  // Get all dates from Jan 1 to today
  const getAllDates = () => {
    const dates = []
    let current = new Date(startDate)
    
    while (current <= today) {
      const dateStr = current.toISOString().split('T')[0]
      const dayCommits = commits.filter(c => c.date === dateStr).length
      const dayWeight = weightData.find(w => w.date === dateStr)?.value || 0
      
      dates.push({
        date: dateStr,
        day: current.getDate(),
        month: current.getMonth(),
        commits: dayCommits,
        weight: dayWeight
      })
      
      current.setDate(current.getDate() + 1)
    }
    
    return dates
  }

  const allDates = getAllDates()

  // Calculate stats
  const totalCommits = commits.length
  const currentWeight = weightData.length > 0 ? weightData[weightData.length - 1].value : 0
  const startWeight = weightData.length > 0 ? weightData[0].value : 0
  const weightChange = currentWeight - startWeight
  const avgCommits = (totalCommits / daysSince).toFixed(1)

  // Weight chart data
  const minWeight = weightData.length > 0 ? Math.min(...weightData.map(d => d.value)) : 0
  const maxWeight = weightData.length > 0 ? Math.max(...weightData.map(d => d.value)) : 100

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading...</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Daily - Taylor</title>
        <meta name="description" content="Daily progress 2026" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* Compact Header */}
        <div className={styles.compactHeader}>
          <h1>2026</h1>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNum}>{totalCommits}</span>
              <span className={styles.statLabel}>commits</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>{currentWeight.toFixed(1)}</span>
              <span className={styles.statLabel}>kg</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>{weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)}</span>
              <span className={styles.statLabel}>change</span>
            </div>
          </div>
        </div>

        {/* Weight Line Chart */}
        {weightData.length > 0 && (
          <div className={styles.chartContainer}>
            <div className={styles.chartTitle}>Weight (kg)</div>
            <div className={styles.lineChart}>
              <svg viewBox="0 0 1000 300" className={styles.svg}>
                {/* Grid lines */}
                <line x1="0" y1="250" x2="1000" y2="250" stroke="#1a1a1a" strokeWidth="1" />
                <line x1="0" y1="200" x2="1000" y2="200" stroke="#1a1a1a" strokeWidth="1" />
                <line x1="0" y1="150" x2="1000" y2="150" stroke="#1a1a1a" strokeWidth="1" />
                <line x1="0" y1="100" x2="1000" y2="100" stroke="#1a1a1a" strokeWidth="1" />
                <line x1="0" y1="50" x2="1000" y2="50" stroke="#1a1a1a" strokeWidth="1" />
                
                {/* Weight line */}
                <polyline
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  points={weightData.map((d, i) => {
                    const x = (i / (weightData.length - 1)) * 1000
                    const y = 250 - ((d.value - minWeight) / (maxWeight - minWeight)) * 200
                    return `${x},${y}`
                  }).join(' ')}
                />
                
                {/* Data points */}
                {weightData.map((d, i) => {
                  const x = (i / (weightData.length - 1)) * 1000
                  const y = 250 - ((d.value - minWeight) / (maxWeight - minWeight)) * 200
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#fff"
                    />
                  )
                })}
              </svg>
              
              {/* Labels */}
              <div className={styles.chartLabels}>
                <span>{minWeight.toFixed(1)} kg</span>
                <span>{maxWeight.toFixed(1)} kg</span>
              </div>
            </div>
          </div>
        )}

        {/* Calendar Grid */}
        <div className={styles.calendar}>
          {allDates.map((day, index) => (
            <div 
              key={index} 
              className={`${styles.calendarDay} ${day.date === today.toISOString().split('T')[0] ? styles.today : ''}`}
              title={`${day.date}\nCommits: ${day.commits}\nWeight: ${day.weight > 0 ? day.weight + ' kg' : '-'}`}
            >
              <div className={styles.dayNum}>{day.day}</div>
              <div className={styles.dots}>
                <span className={styles.dot} style={{backgroundColor: day.commits > 0 ? '#fff' : '#222'}}></span>
                {day.weight > 0 && <span className={styles.dot} style={{backgroundColor: '#888'}}></span>}
              </div>
            </div>
          ))}
        </div>

        {/* Simple Stats */}
        <div className={styles.graphs}>
          <div className={styles.graph}>
            <div className={styles.graphTitle}>Commits</div>
            <div className={styles.graphBar}>
              <div className={styles.graphFill} style={{width: `${(totalCommits / (daysSince * 3)) * 100}%`}}></div>
            </div>
            <div className={styles.graphLabel}>{avgCommits}/day avg • {totalCommits} total</div>
          </div>
        </div>

        <div className={styles.footer}>
          <a href="/">taylor.rip</a>
        </div>
      </main>
    </div>
  )
}
