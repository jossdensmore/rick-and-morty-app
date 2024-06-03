// React dependencies
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// Styles
import './App.css'
// Page components
import HomePage from './pages/Home'
import LocationsPage from './pages/Locations'
import FavoritesPage from './pages/Favorites'
import LoginPage from './pages/Login'
// Components
import Header from './components/nav/Header'
import Footer from './components/footer/Footer'
import FavoritesProvider from './context/FavoritesContext'

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer />
      </FavoritesProvider>
    </BrowserRouter>
  )
}

export default App
