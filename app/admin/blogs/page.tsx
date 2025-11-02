'use client'

import { useUser, RedirectToSignIn } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { toast } from 'sonner'

// 🧠 Helper to auto-generate slugs from titles
function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // replace spaces & special chars with -
    .replace(/(^-|-$)+/g, '')    // remove leading/trailing dashes
}

type BlogType = {
  _id?: string
  title: string
  desc: string
  imageURL?: string
  slug: string
}

export default function AdminBlogs() {
  const { isSignedIn, isLoaded } = useUser()
  const [blogs, setBlogs] = useState<BlogType[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<BlogType | null>(null)
  const [formData, setFormData] = useState({ title: '', desc: '', imageURL: '', slug: '' })
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    if (isLoaded && isSignedIn) fetchBlogs()
  }, [isLoaded, isSignedIn])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/api/blogs')
      setBlogs(res.data.blogs || [])
    } catch {
      toast.error('Failed to load blogs')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setPreview(URL.createObjectURL(file))
    const data = new FormData()
    data.append('file', file)

    try {
      const res = await axios.post('/api/upload', data)
      const url = res.data.result.secure_url
      setFormData((prev) => ({ ...prev, imageURL: url }))
      toast.success('Image uploaded successfully!')
    } catch {
      toast.error('Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  // 👇 Auto-generate slug whenever title changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === 'title') {
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: slugify(value),
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async () => {
    if (!formData.title || !formData.desc) {
      toast.error('Title and Description are required')
      return
    }

    try {
      if (editing) {
        await axios.put(`/api/blogs?id=${editing._id}`, formData)
        toast.success('Blog updated successfully!')
      } else {
        await axios.post('/api/blogs', formData)
        toast.success('Blog added successfully!')
      }
      setShowModal(false)
      setEditing(null)
      setFormData({ title: '', desc: '', imageURL: '', slug: '' })
      setPreview(null)
      fetchBlogs()
    } catch {
      toast.error('Something went wrong')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return
    try {
      await axios.delete(`/api/blogs?id=${id}`)
      toast.success('Blog deleted')
      fetchBlogs()
    } catch {
      toast.error('Failed to delete blog')
    }
  }

  if (isLoaded && !isSignedIn) return <RedirectToSignIn />
  if (!isLoaded) return <div className="text-gray-400 text-center mt-20">Loading...</div>

  return (
    <section className="min-h-screen bg-gray-950 text-gray-100 px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-500">Blog Management</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            + Add Blog
          </button>
        </div>

        {loading ? (
          <div className="text-gray-400">Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="text-gray-500">No blogs found.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((b) => (
              <div key={b._id} className="bg-gray-900 p-5 rounded-xl shadow-md">
                {b.imageURL && (
                  <div className="relative w-full h-40 mb-3">
                    <Image src={b.imageURL} alt={b.title} fill className="object-cover rounded-md" />
                  </div>
                )}
                <h2 className="text-blue-400 font-semibold text-lg">{b.title}</h2>
                <p className="text-gray-400 text-sm mt-2 line-clamp-2">{b.desc}</p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      setEditing(b)
                      setFormData({
                        title: b.title,
                        desc: b.desc,
                        imageURL: b.imageURL || '',
                        slug: b.slug,
                      })
                      setShowModal(true)
                      setPreview(b.imageURL || null)
                    }}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(b._id!)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">
              {editing ? 'Edit Blog' : 'Add Blog'}
            </h2>

            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full mb-3 p-2 rounded bg-gray-800 border border-gray-700 text-white"
            />
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              placeholder="Description"
              className="w-full mb-3 p-2 rounded bg-gray-800 border border-gray-700 text-white min-h-[100px]"
            />

            {/* 👇 The slug is generated automatically and shown as read-only */}
            <input
              name="slug"
              value={formData.slug}
              readOnly
              className="w-full mb-3 p-2 rounded bg-gray-800 border border-gray-700 text-gray-400 cursor-not-allowed"
              placeholder="Slug (auto-generated)"
            />

            <label className="block mb-2 text-gray-300">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="w-full mb-3 text-sm text-gray-400"
            />
            {uploading && <p className="text-blue-400 text-sm mb-3">Uploading...</p>}
            {preview && (
              <div className="relative w-full h-40 mb-3">
                <Image src={preview} alt="Preview" fill className="object-cover rounded-md" />
              </div>
            )}

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setShowModal(false)
                  setEditing(null)
                  setPreview(null)
                }}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
              >
                {editing ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
