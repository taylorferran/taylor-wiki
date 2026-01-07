// API route to fetch weight data from Google Sheets
// Sheet ID: 1R9Veg8OkP4DwxhV9L_Y-tZg3QrsOR1i6T7ZnRm2YP9g
// Sheet format: Column A = Date, Column B = Weight

export default async function handler(req, res) {
  const SHEET_ID = '1R9Veg8OkP4DwxhV9L_Y-tZg3QrsOR1i6T7ZnRm2YP9g'
  const API_KEY = process.env.GOOGLE_SHEETS_API_KEY
  const RANGE = 'Sheet1!A:B' // Date and Weight only
  
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error('Failed to fetch from Google Sheets')
    }

    const data = await response.json()
    const rows = data.values || []
    
    // Skip header row if exists, format data
    const startRow = rows[0] && rows[0][0].includes('-') ? 0 : 1
    const weightData = rows.slice(startRow).map(row => {
      if (row.length >= 2) {
        return {
          date: row[0],
          value: parseFloat(row[1])
        }
      }
      return null
    }).filter(item => item !== null && !isNaN(item.value))
    
    res.status(200).json(weightData)
  } catch (error) {
    console.error('Error fetching weight data:', error)
    res.status(200).json([])
  }
}

