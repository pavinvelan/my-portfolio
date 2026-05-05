import DecryptedText from '../DecryptedText'

function BlogCard({ blog }) {
  return (
    <a
      href={blog.url}
      target="_blank"
      rel="noopener noreferrer"
      className="from-black border-[#222222a0] relative rounded-lg border bg-gradient-to-r to-[#0a0a0a] hover:scale-105 transition-all duration-300"
    >
      <div className="h-44 lg:h-52 w-full rounded-t-lg overflow-hidden">
        <img
          src={blog.cover_image}
          alt={blog.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-3">
        <div className="text-lg font-semibold text-white line-clamp-2">
          <DecryptedText text={blog.title} animateOn="view" revealDirection="start" />
        </div>
        <div className="text-sm text-gray-400 mt-2 line-clamp-3 leading-relaxed">
          <DecryptedText text={blog.description} animateOn="view" revealDirection="start" maxIterations={10} />
        </div>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xs text-[#00F0FF]">
            <DecryptedText text={new Date(blog.published_at).toLocaleDateString()} animateOn="view" revealDirection="start" />
          </span>
          <span className="text-xs text-gray-500">
            <DecryptedText text={`${blog.reading_time_minutes} min read`} animateOn="view" revealDirection="start" />
          </span>
        </div>
      </div>
    </a>
  )
}

export default BlogCard
