import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { CharactersInterface } from '../interfaces/Characters'
import { LocationsInterface } from '../interfaces/Locations'

interface FavoritesContextType {
  // Interfaces
  charactersFavorites: CharactersInterface[]
  locationsFavorites: LocationsInterface[]
  // Characters
  addCharacterFavorite: (character: CharactersInterface) => void
  removeCharacterFavorite: (id: number) => void
  isCharacterFavorite: (id: number) => boolean
  // Locations
  addLocationFavorite: (location: LocationsInterface) => void
  removeLocationFavorite: (id: number) => void
  isLocationFavorite: (id: number) => boolean
  // User session
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [charactersFavorites, setCharactersFavorites] = useState<CharactersInterface[]>(() => {
    try {
      const favoritesOnStorage = localStorage.getItem('charactersFavorites')
      return favoritesOnStorage ? JSON.parse(favoritesOnStorage) : []
    } catch (error) {
      return []
    }
  })

  const [locationsFavorites, setLocationsFavorites] = useState<LocationsInterface[]>(() => {
    try {
      const favoritesOnStorage = localStorage.getItem('locationsFavorites')
      return favoritesOnStorage ? JSON.parse(favoritesOnStorage) : []
    } catch (error) {
      return []
    }
  })

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const savedAuth = localStorage.getItem('isAuthenticated')
    return savedAuth ? JSON.parse(savedAuth) : false
  })

  useEffect(() => {
    localStorage.setItem('charactersFavorites', JSON.stringify(charactersFavorites))
  }, [charactersFavorites])

  useEffect(() => {
    localStorage.setItem('locationsFavorites', JSON.stringify(locationsFavorites))
  }, [locationsFavorites])

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated))
  }, [isAuthenticated])

  const addCharacterFavorite = (character: CharactersInterface) => {
    if (!isAuthenticated) {
      alert('Please login to add favorites')
      return
    }
    setCharactersFavorites((prevFavorites) => [...prevFavorites, character])
  }

  const removeCharacterFavorite = (id: number) => {
    if (!isAuthenticated) {
      alert('Please login to remove favorites')
      return
    }
    setCharactersFavorites((prevFavorites) => prevFavorites.filter((character) => character.id !== id))
  }

  const isCharacterFavorite = (id: number) => {
    return charactersFavorites.some((character) => character.id === id)
  }

  const addLocationFavorite = (location: LocationsInterface) => {
    if (!isAuthenticated) {
      alert('Please login to add favorites')
      return
    }
    setLocationsFavorites((prevFavorites) => [...prevFavorites, location])
  }

  const removeLocationFavorite = (id: number) => {
    if (!isAuthenticated) {
      alert('Please login to remove favorites')
      return
    }
    setLocationsFavorites((prevFavorites) => prevFavorites.filter((location) => location.id !== id))
  }

  const isLocationFavorite = (id: number) => {
    return locationsFavorites.some((location) => location.id === id)
  }

  const login = (username: string, password: string): boolean => {
    if (username === 'Admin' && password === 'Admin123') {
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  return (
    <FavoritesContext.Provider value={{
      charactersFavorites,
      locationsFavorites,
      addCharacterFavorite,
      removeCharacterFavorite,
      isCharacterFavorite,
      addLocationFavorite,
      removeLocationFavorite,
      isLocationFavorite,
      isAuthenticated,
      login,
      logout
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesProvider
