import { Link, useLocation } from 'react-router-dom'
import PillNav from './PillNav'
import ShimmerText from './ui/ShimmerText'

function Navbar() {
  const location = useLocation()

  const navItems = [
    { label: 'ABOUT', href: '#about', sectionId: 'about' },
    { label: 'EXPERIENCE', href: '#experience', sectionId: 'experience' },
    { label: 'SKILLS', href: '#skills', sectionId: 'skills' },
    { label: 'EDUCATION', href: '#education', sectionId: 'education' },
    { label: 'PROJECTS', href: '#projects', sectionId: 'projects' },
  ]

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
            className="text-3xl font-bold">
            <ShimmerText text="PAVINVELAN S K" />
          </Link>
        </div>

        <div className="hidden md:block">
          <PillNav 
            items={navItems}
            baseColor="#ffffff"
            pillColor="#e2e2e2"
            hoveredPillTextColor="#000000"
            activeHref={location.hash || '#'}
          />
        </div>

        <ul className="mt-4 flex h-screen max-h-0 w-full flex-col items-start text-sm opacity-0 md:hidden" id="navbar-default">
          {navItems.map((item) => (
            <li key={item.label}>
              <a 
                className="block px-4 py-2 no-underline outline-none hover:no-underline cursor-pointer" 
                href={item.href}
                onClick={(e) => scrollToSection(item.sectionId)}
              >
                <div className="text-sm text-white transition-colors duration-300 hover:text-[#A855F7]">{item.label}</div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
