import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './helper/ScrollToTop'
import LiquidEther from './LiquidEther'

function Layout() {
  return (
    <>
      {/* LiquidEther background */}
      <div className="fixed inset-0 -z-10 w-full h-full">
        <LiquidEther
          colors={['#050816', '#4F46E5', '#7C3AED', '#06B6D4']}
          mouseForce={15}
          cursorSize={80}
          resolution={0.5}
          autoDemo
          autoSpeed={0.4}
          autoIntensity={1.8}
          className="w-full h-full"
        />
      </div>
      <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
        <Navbar />
        <Outlet />
        <ScrollToTop />
      </main>
      <Footer />
    </>
  )
}

export default Layout
