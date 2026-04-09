import { useState, useEffect } from 'react'
import Papa from 'papaparse'
import {
  GOOGLE_SHEET_PUBLISHED_URL,
  SHEET_GIDS,
  DEMO_PROGRAMS,
  DEMO_ACTIVITIES,
  DEMO_ACHIEVEMENTS,
} from '../config.js'

// Extract the published ID from a full published URL or return as-is if already an ID
function extractPublishedId(urlOrId) {
  if (!urlOrId) return null
  // Match the 2PACX-... segment from a full published URL
  const match = urlOrId.match(/\/e\/(2PACX-[^/]+)\//)
  return match ? match[1] : urlOrId
}

// Build the CSV export URL for a published sheet tab by GID
function buildCsvUrl(publishedId, gid) {
  return `https://docs.google.com/spreadsheets/d/e/${publishedId}/pub?output=csv&gid=${gid}`
}

async function fetchSheet(publishedId, gid, label) {
  const url = buildCsvUrl(publishedId, gid)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch sheet (gid=${gid}, ${label})`)
  const text = await res.text()
  const { data } = Papa.parse(text, { header: true, skipEmptyLines: true })
  return data
}


function normalisePrograms(rows) {
  return rows.map(r => ({
    id:          (r['Program ID'] || r['program_id'] || r['ID'] || '').trim(),
    title:       (r['Title'] || r['title'] || '').trim(),
    description: (r['Description'] || r['description'] || '').trim(),
  })).filter(p => p.id)
}

// Accept either a bare URL or a full <iframe src="..."> snippet — return just the URL.
function cleanDocUrl(raw) {
  if (!raw) return ''
  const trimmed = raw.trim()
  // If it looks like an iframe tag, pull the src attribute value
  const match = trimmed.match(/src=["']([^"']+)["']/i)
  if (match) return match[1].trim()
  return trimmed
}

function normaliseActivities(rows, imageRows) {
  // Build image map: activityId → [URL, ...]  (Images sheet: Activity ID | Image ID | URL)
  const imageMap = {}
  if (imageRows) {
    imageRows.forEach(row => {
      const actId = (row['Activity ID'] || '').trim()
      const url   = (row['URL'] || '').trim()
      if (actId && url) {
        if (!imageMap[actId]) imageMap[actId] = []
        imageMap[actId].push(url)
      }
    })
  }

  return rows.map(r => {
    const id        = (r['Activity ID'] || '').trim()
    const title     = (r['Activity Title'] || r['Title'] || '').trim()
    const shortDesc = (r['ShortDesc'] || r['Activty Description'] || r['Activity Description'] || '').trim()
    const docUrl    = cleanDocUrl(r['URL'] || '')
    return {
      programId: (r['Program ID'] || '').trim(),
      id,
      title:     title || id,
      shortDesc,
      docUrl,
      images:    imageMap[id] || [],
    }
  }).filter(a => a.id && a.programId)
}

function normaliseAchievements(rows) {
  // Achievements sheet: Title | Description | Image (Cloudinary URL)
  return rows.map(r => {
    const desc = (r['Description'] || '').trim()
    return {
      title:     (r['Title'] || '').trim(),
      shortDesc: desc.length > 160 ? desc.slice(0, 160).trimEnd() + '…' : desc,
      fullDesc:  desc,
      image:     (r['Image'] || '').trim(),
    }
  }).filter(a => a.title)
}

export function useSheets() {
  const [programs,     setPrograms]     = useState([])
  const [activities,   setActivities]   = useState([])
  const [achievements, setAchievements] = useState([])
  const [loading,      setLoading]      = useState(true)
  const [error,        setError]        = useState(null)
  const [usingDemo,    setUsingDemo]    = useState(false)

  useEffect(() => {
    const publishedId = extractPublishedId(GOOGLE_SHEET_PUBLISHED_URL)
    const allGidsSet  = SHEET_GIDS.activities !== null &&
                        SHEET_GIDS.achievements !== null &&
                        SHEET_GIDS.images !== null

    const isConfigured = publishedId && publishedId.startsWith('2PACX-') && allGidsSet

    if (!isConfigured) {
      setPrograms(DEMO_PROGRAMS)
      setActivities(DEMO_ACTIVITIES)
      setAchievements(DEMO_ACHIEVEMENTS)
      setUsingDemo(true)
      setLoading(false)
      return
    }

    async function load() {
      try {
        const [programRows, activityRows, achievementRows, imageRows] = await Promise.all([
          fetchSheet(publishedId, SHEET_GIDS.programs,     'Program'),
          fetchSheet(publishedId, SHEET_GIDS.activities,   'Activity'),
          fetchSheet(publishedId, SHEET_GIDS.achievements, 'Achievements'),
          fetchSheet(publishedId, SHEET_GIDS.images,       'Images'),
        ])
        setPrograms(normalisePrograms(programRows))
        setActivities(normaliseActivities(activityRows, imageRows))
        setAchievements(normaliseAchievements(achievementRows))
      } catch (err) {
        console.error('Sheet fetch error — falling back to demo data', err)
        setPrograms(DEMO_PROGRAMS)
        setActivities(DEMO_ACTIVITIES)
        setAchievements(DEMO_ACHIEVEMENTS)
        setUsingDemo(true)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return { programs, activities, achievements, loading, error, usingDemo }
}
