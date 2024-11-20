

import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'db.json')

function readData() {
  const fileContents = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(fileContents)
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

export async function GET(req) {
  // const { id } = await req.json()
  // console.log(id,'id')
  const data = readData()
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
}

export async function POST(req) {
  try {
    const newEntry = await req.json()
    const data = readData()
    data.posts.push(newEntry)
    writeData(data)
    return new Response(JSON.stringify(newEntry), {
      headers: { 'Content-Type': 'application/json' },
      status: 201,
    })
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Failed to add data' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
}

export async function PUT(req) {
  try {
    const updatedEntry = await req.json()
    const data = readData()
    const index = data.posts.findIndex((post) => post.id === updatedEntry.id)
    if (index !== -1) {
      data.posts[index] = updatedEntry
      writeData(data)
      return new Response(JSON.stringify(updatedEntry), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      })
    } else {
      return new Response(JSON.stringify({ message: 'Post not found' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 404,
      })
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Failed to update data' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json()
    const data = readData()
    const index = data.posts.findIndex((post) => post.id === id)
    if (index !== -1) {
      const deletedPost = data.posts.splice(index, 1)
      writeData(data)
      return new Response(JSON.stringify(deletedPost[0]), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      })
    } else {
      return new Response(JSON.stringify({ message: 'Post not found' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 404,
      })
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Failed to delete data' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
}
