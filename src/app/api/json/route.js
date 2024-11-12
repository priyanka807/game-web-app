// src/app/api/json/route.js

import fs from 'fs'
import path from 'path'

export async function GET(req, res) {
  const filePath = path.join(process.cwd(), 'db.json')
  const fileContents = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(fileContents)

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
}
