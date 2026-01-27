import { useState, useEffect } from 'react'
import { personalData } from '@/utils/data/personal-data'
import BlogCard from '@/components/homepage/BlogCard'

function BlogPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`)
        if (!res.ok) {
          throw new Error('Failed to fetch data')
        }
        const data = await res.json()
        setBlogs(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  if (loading) {
    return (
      <div className="py-8 flex justify-center items-center min-h-[50vh]">
        <div className="text-white text-xl">Loading blogs...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-8 flex justify-center items-center min-h-[50vh]">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-2xl rounded-md">
            All Blog
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {blogs.map((blog, i) => (
          blog?.cover_image && <BlogCard blog={blog} key={i} />
        ))}
      </div>
    </div>
  )
}

export default BlogPage
