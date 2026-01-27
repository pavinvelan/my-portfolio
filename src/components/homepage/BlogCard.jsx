function BlogCard({ blog }) {
  return (
    <a
      href={blog.url}
      target="_blank"
      rel="noopener noreferrer"
      className="from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37] hover:scale-105 transition-all duration-300"
    >
      <div className="h-44 lg:h-52 w-full rounded-t-lg overflow-hidden">
        <img
          src={blog.cover_image}
          alt={blog.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="text-lg font-semibold text-white line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-sm text-gray-400 mt-2 line-clamp-3">
          {blog.description}
        </p>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xs text-[#16f2b3]">
            {new Date(blog.published_at).toLocaleDateString()}
          </span>
          <span className="text-xs text-gray-500">
            {blog.reading_time_minutes} min read
          </span>
        </div>
      </div>
    </a>
  )
}

export default BlogCard
