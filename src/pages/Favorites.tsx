import { useContext } from 'react'
import { FavoritesContext } from '../context/FavoritesContext'
import CharacterCard from '../components/cards/CharacterCard'
import MainBackground from '../components/backgrounds/MainBackground'
import LocationCard from '../components/cards/LocationCard'
import { Link } from 'react-router-dom'

export default function FavoritesPage() {

  const favoritesContext = useContext(FavoritesContext)

  if (!favoritesContext) {
    throw new Error('FavoritesContext must be used within a FavoritesProvider')
  }

  const { charactersFavorites, locationsFavorites, isAuthenticated } = favoritesContext

  return (
    <>
      <MainBackground backgroundOpacity title="Favorites" />
      <div className="container">
        {isAuthenticated ?
          <>
            <h2 className="tac smallTitle">Characters</h2>
            <div className="flexContainer spaceBetween mt2 mb2">
              {charactersFavorites.length > 0 ? (
                charactersFavorites.map(character => (
                  <div className="col4 mb1 flex" key={character.id}>
                    <CharacterCard
                      id={character.id}
                      image={character.image}
                      name={character.name}
                      status={character.status}
                      species={character.species}
                      location={character.location.name}
                    />
                  </div>
                ))
              ) : (
                <div className="mt2 mb2 tac col12">
                  <p className="mediumText white">No favorites characters added yet.</p>
                </div>
              )}
            </div>
            {/* Locations */}
            <h2 className="tac smallTitle">Locations</h2>
            <div className="flexContainer spaceBetween mt2">
              {locationsFavorites.length > 0 ? (
                locationsFavorites.map(location => (
                  <div className="col4 mb1 flex" key={location.id}>
                    <LocationCard
                      id={location.id}
                      name={location.name}
                      type={location.type}
                      dimension={location.dimension}
                    />
                  </div>
                ))
              ) : (
                <div className="mt2 mb2 tac col12">
                  <p className="mediumText white">No favorites locations added yet.</p>
                </div>
              )}
            </div>
          </> :
          <div className="tac">
            <h2 className="mb2">Please login to see your favorites.</h2>
            <Link to="/login" className="blueBtn">Iniciar sesión</Link>
          </div>
        }
      </div>
    </>
  )
}