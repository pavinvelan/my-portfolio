import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './helper/ScrollToTop'
import CarbonVapor from './CarbonVapor'

function Layout() {
  return (
    <>
      {/* Dynamic WebGL Background */}
      <CarbonVapor />
      <main className="min-h-screen relative z-10 mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
        <Navbar />
        <Outlet />
        <ScrollToTop />
      </main>
      <Footer />
    </>
  )
}

export default Layout
