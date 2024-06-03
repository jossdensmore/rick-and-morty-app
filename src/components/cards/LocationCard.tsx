import { useContext } from 'react'
import HeartSolid from '../icons/HeartSolid'
import './LocationCard.css'
import HeartRegular from '../icons/HeartRegular'
import { FavoritesContext } from '../../context/FavoritesContext'

interface LocationCardProps {
  id: number
  name?: string
  dimension?: string
  type?: string
}

const LocationCard = ({id, name, dimension, type}: LocationCardProps) => {
  const favoritesContext = useContext(FavoritesContext)

  if (!favoritesContext) {
    throw new Error('FavoritesContext must be used within a FavoritesProvider')
  }

  const { addLocationFavorite, removeLocationFavorite, isLocationFavorite, isAuthenticated } = favoritesContext

  const handleFavoriteClick = () => {
    const location =({id, name, dimension, type})
    if (!isAuthenticated) {
      alert('Please login to add favorites')
      return;
    }
    if (isLocationFavorite(id)) {
      removeLocationFavorite(id)
    } else {
      addLocationFavorite(location as any)
    }
  }

  return (
    <div className="locationCard">
      <div className="locationCardContent">
        <p className="locationCardContentFavorite">
          <button onClick={handleFavoriteClick}>
            {isLocationFavorite(id) ?
              <HeartSolid className="heartSolid" />
              :
              <HeartRegular className="heartRegular" />
            }
          </button>
        </p>
        <p className="smallTitle">
          <strong>{name}</strong> - <span className="fw300">{type}</span>
        </p>
        <p className="mediumText lightWhite">
          {dimension}
        </p>
      </div>
    </div>
  )
}

export default LocationCard