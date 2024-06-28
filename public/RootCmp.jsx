const Router = ReactRouterDOM.BrowserRouter
const { Route, Routes } = ReactRouterDOM
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Home } from './pages/Home.jsx'
import { BugIndex } from './pages/BugIndex.jsx'
import { BugDetails } from './pages/BugDetails.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { AboutUs } from './pages/AboutUs.jsx'



export function App() {
  return (
    <Router>
      <section className='app main-layout grid'>
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bug" element={<BugIndex />} />
            <Route path="/bug/:bugId" element={<BugDetails />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/user/:userId" element={<UserDetails />} />
          </Routes>
        </main>
        <AppFooter />
      </section >
    </Router>
  )
}
