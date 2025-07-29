import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authError = requireAuth(request)
    if (authError) return authError

    const { user } = requireAuth(request)!

    // Parse form data
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      )
    }

    // Validate file types and sizes
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/illustrator']
    const maxSize = 10 * 1024 * 1024 // 10MB

    const uploadedFiles = []

    for (const file of files) {
      // Check file type
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: `File type ${file.type} is not allowed` },
          { status: 400 }
        )
      }

      // Check file size
      if (file.size > maxSize) {
        return NextResponse.json(
          { error: `File ${file.name} is too large. Maximum size is 10MB` },
          { status: 400 }
        )
      }

      // In a real app, you'd upload to cloud storage (AWS S3, Google Cloud Storage, etc.)
      // For now, we'll simulate file upload and return a mock URL
      const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      const fileUrl = `/uploads/${fileId}/${file.name}`

      uploadedFiles.push({
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        url: fileUrl,
        uploadedAt: new Date().toISOString(),
        userId: user.userId,
      })
    }

    return NextResponse.json({
      files: uploadedFiles,
      message: 'Files uploaded successfully'
    })

  } catch (error) {
    console.error('File upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}