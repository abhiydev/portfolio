'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import axios from 'axios'

type BlogType = {
  _id: string
  title: string
  desc: string
  imageURL?: string
  author?: string
  slug: string
  createdAt?: string
}

const BlogDetails = () => {
  const { slug } = useParams()
  const [blog, setBlog] = useState<BlogType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogs/${slug}`)
        setBlog(res.data.blog)
      } catch (err) {
        console.error('Error fetching blog:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [slug])

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-400">
        Loading blog...
      </div>
    )

  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-red-400">
        Blog not found.
      </div>
    )

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gray-950 text-gray-100 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {blog.imageURL && (
            <div className="relative w-full h-64 mb-8">
              <Image
                src={blog.imageURL}
                alt={blog.title}
                fill
                className="object-cover rounded-xl"
                priority
              />
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-4">
            {blog.title}
          </h1>
          <p className="text-gray-400 text-sm mb-6">
            By {blog.author || 'Abhishek Chedwal'} •{' '}
            {new Date(blog.createdAt || '').toLocaleDateString()}
          </p>
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {blog.desc}
          </p>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default BlogDetails
