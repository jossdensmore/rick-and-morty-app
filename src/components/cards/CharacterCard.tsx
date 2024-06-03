import { useContext } from 'react'
import './CharacterCard.css'
import { FavoritesContext } from '../../context/FavoritesContext'
import HeartSolid from '../icons/HeartSolid'
import HeartRegular from '../icons/HeartRegular'

interface CharacterCardProps {
  id: number
  image?: string
  name?: string
  status?: string
  species?: string
  location?: string
}

const CharacterCard = ({ id, image, name, status, species, location }: CharacterCardProps) => {
  const favoritesContext = useContext(FavoritesContext)

  if (!favoritesContext) {
    throw new Error('FavoritesContext must be used within a FavoritesProvider')
  }

  const { addCharacterFavorite, removeCharacterFavorite, isCharacterFavorite, isAuthenticated } = favoritesContext

  const handleFavoriteClick = () => {
    const character = { id, image, name, status, species, location }
    if (!isAuthenticated) {
      alert('Please login to add favorites')
      return;
    }
    if (isCharacterFavorite(id)) {
      removeCharacterFavorite(id)
    } else {
      addCharacterFavorite(character as any)
    }
  }

  return (
    <div className="characterCard boxShadow">
      <img src={image} alt={name} loading="lazy" className="characterCardImage" />
      <div className="characterCardContent">
        <p className="characterCardContentFavorite">
          <button onClick={handleFavoriteClick}>
            {isCharacterFavorite(id) ?
              <HeartSolid className="heartSolid"/>
              :
              <HeartRegular className="heartRegular" />
            }
          </button>
        </p>
        <p className="mediumText fw600 mt-1">{name}</p>
        <div className="flex justifyCenter alignCenter mbHalf">
          {status === "Alive" ? <span className="blueDot" /> : <span className="magentaDot" />}
          <p>{status} - {species}</p>
        </div>
        <p className="lightWhite">Last known location:</p>
        <p>{location}</p>
      </div>
    </div>
  )
}

export default CharacterCard