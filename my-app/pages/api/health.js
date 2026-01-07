// API route to fetch health data from Google Sheets
// Sheet ID: 1R9Veg8OkP4DwxhV9L_Y-tZg3QrsOR1i6T7ZnRm2YP9g
// NOTE: Currently returning empty data - add Steps/Sleep columns to sheet if needed

export default async function handler(req, res) {
  // Return empty data since sheet only has weight for now
  res.status(200).json({ steps: [], sleep: [] })
}
