import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <>
      <Helmet>
        <title>Portfolio of PAVINVELAN S K - B.Sc. Information Systems Student</title>
        <meta 
          name="description" 
          content="This is the portfolio of PAVINVELAN S K. I am a B.Sc. Information Systems student. I love to learn new things and I am always open to collaborating with others." 
        />
      </Helmet>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
