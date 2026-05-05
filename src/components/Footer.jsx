import { CgGitFork } from "react-icons/cg"
import { IoStar } from "react-icons/io5"

function Footer() {
  return (
    <div className="relative border-t bg-black border-[#222222] text-white">
      <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-6 lg:py-10">
        <div className="flex justify-center -z-40">
          <div className="absolute top-0 h-[1px] w-1/2 bg-gradient-to-r from-transparent via-zinc-500 to-transparent"></div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm">
            © Developer Portfolio by{' '}
            <a 
              target="_blank" 
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/pavinvelan/" 
              className="text-zinc-300"
            >
              PAVINVELAN S K
            </a>
          </p>
          <div className="flex items-center gap-5">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/pavinvelan/my-portfolio"
              className="flex items-center gap-2 uppercase hover:text-zinc-300"
            >
              <IoStar />
              <span>Star</span>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/pavinvelan/my-portfolio/fork"
              className="flex items-center gap-2 uppercase hover:text-zinc-300"
            >
              <CgGitFork />
              <span>Fork</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
