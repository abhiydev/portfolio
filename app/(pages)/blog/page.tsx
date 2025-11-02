'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import axios from 'axios'



type BlogType = {
  _id: string
  title: string
  desc: string
  imageURL?: string
  slug: string
  author?: string
  createdAt?: string
}

const BlogPage = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('/api/blogs')
        setBlogs(res.data.blogs || [])
      } catch (err) {
        console.error('Error fetching blogs:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gray-950 text-gray-100 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mb-10">
            Latest Blogs
          </h1>

          {loading ? (
            <p className="text-gray-400">Loading blogs...</p>
          ) : blogs.length === 0 ? (
            <p className="text-gray-500">No blogs found.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link
                  key={blog._id}
                  href={`/blog/${blog.slug}`}
                  className="bg-gray-900 p-6 rounded-2xl hover:shadow-lg hover:shadow-blue-500/20 transition block"
                >
                  {blog.imageURL && (
                    <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={blog.imageURL}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority
                      />
                    </div>
                  )}
                  <h2 className="text-xl font-semibold text-blue-400 line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-400 text-sm mt-2 line-clamp-3">{blog.desc}</p>
                  <div className="text-gray-500 text-xs mt-3">
                    {blog.author && <>By {blog.author} • </>}
                    {blog.createdAt &&
                      new Date(blog.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}

export default BlogPage
