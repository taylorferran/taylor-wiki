// API route to fetch GitHub commits from recent activity
// Fetches actual commit counts using compare API
// Also counts CreateEvents (initial commits when creating repos)

export default async function handler(req, res) {
  const username = 'taylorferran'
  const startDate = new Date('2026-01-01')
  
  if (!process.env.GITHUB_TOKEN) {
    console.error('No GITHUB_TOKEN found in environment')
    return res.status(200).json([])
  }
  
  try {
    const eventsUrl = `https://api.github.com/users/${username}/events?per_page=100`
    const response = await fetch(eventsUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
      }
    })

    if (!response.ok) {
      console.error('Failed to fetch GitHub events:', response.status)
      return res.status(200).json([])
    }

    const events = await response.json()
    const commits = []
    
    // Count PushEvents and CreateEvents
    for (const event of events) {
      const eventDate = new Date(event.created_at)
      const dateStr = eventDate.toISOString().split('T')[0]
      
      // Only include events from Jan 1, 2026 onwards
      if (eventDate < startDate) continue
      
      // Handle PushEvents
      if (event.type === 'PushEvent') {
        const repo = event.repo.name
        const before = event.payload.before
        const after = event.payload.head
        
        try {
          // Use compare API to get commits between before and after
          const compareUrl = `https://api.github.com/repos/${repo}/compare/${before}...${after}`
          const compareResponse = await fetch(compareUrl, {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
            }
          })
          
          if (compareResponse.ok) {
            const compareData = await compareResponse.json()
            const commitCount = compareData.commits?.length || 1
            
            console.log(`Push on ${dateStr} to ${repo}: ${commitCount} commits`)
            
            // Add entries for each commit
            for (let i = 0; i < commitCount; i++) {
              commits.push({
                date: dateStr,
                repo: repo,
                message: `Commit to ${repo}`
              })
            }
          } else {
            // If compare fails, count as 1
            commits.push({
              date: dateStr,
              repo: repo,
              message: `Commit to ${repo}`
            })
          }
        } catch (error) {
          console.error(`Error fetching commits for ${repo}:`, error)
          commits.push({
            date: dateStr,
            repo: repo,
            message: `Commit to ${repo}`
          })
        }
      }
      
      // Handle CreateEvents (repository or branch creation with initial commit)
      else if (event.type === 'CreateEvent' && event.payload.ref_type === 'repository') {
        const repo = event.repo.name
        console.log(`Repo created on ${dateStr}: ${repo} (counting as 1 commit)`)
        
        commits.push({
          date: dateStr,
          repo: repo,
          message: `Initial commit to ${repo}`
        })
      }
    }

    console.log(`Total commits found since 2026-01-01: ${commits.length}`)
    
    res.status(200).json(commits)
  } catch (error) {
    console.error('Error fetching commits:', error)
    res.status(200).json([])
  }
}

