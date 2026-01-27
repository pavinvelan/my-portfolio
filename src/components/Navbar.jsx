import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`
      return
    }

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="bg-transparent">
      <div className="flex items-center justify-between py-5">
        <div className="flex flex-shrink-0 items-center">
          <Link
            to="/"
            className="text-[#16f2b3] text-3xl font-bold">
            PAVINVELAN S K
          </Link>
        </div>

        <ul className="mt-4 flex h-screen max-h-0 w-full flex-col items-start text-sm opacity-0 md:mt-0 md:h-auto md:max-h-screen md:w-auto md:flex-row md:space-x-1 md:border-0 md:opacity-100" id="navbar-default">
          <li>
            <a 
              className="block px-4 py-2 no-underline outline-none hover:no-underline cursor-pointer" 
              href="#about"
              onClick={(e) => scrollToSection(e, 'about')}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">ABOUT</div>
            </a>
          </li>
          <li>
            <a 
              className="block px-4 py-2 no-underline outline-none hover:no-underline cursor-pointer" 
              href="#experience"
              onClick={(e) => scrollToSection(e, 'experience')}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">EXPERIENCE</div>
            </a>
          </li>
          <li>
            <a 
              className="block px-4 py-2 no-underline outline-none hover:no-underline cursor-pointer" 
              href="#skills"
              onClick={(e) => scrollToSection(e, 'skills')}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">SKILLS</div>
            </a>
          </li>
          <li>
            <a 
              className="block px-4 py-2 no-underline outline-none hover:no-underline cursor-pointer" 
              href="#education"
              onClick={(e) => scrollToSection(e, 'education')}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">EDUCATION</div>
            </a>
          </li>
          <li>
            <a 
              className="block px-4 py-2 no-underline outline-none hover:no-underline cursor-pointer" 
              href="#projects"
              onClick={(e) => scrollToSection(e, 'projects')}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">PROJECTS</div>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
