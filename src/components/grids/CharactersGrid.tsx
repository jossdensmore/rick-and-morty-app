import { useEffect, useState, useRef } from 'react'
import CharacterCard from '../cards/CharacterCard'
import { CharactersInterface, CharactersResponse } from '../../interfaces/Characters'

const CharactersGrid = () => {
  const [characters, setCharacters] = useState<CharactersInterface[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<any | null>(null)
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/character?page=${page}`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data: CharactersResponse = await response.json()
        if (page === 1) {
          setCharacters(data.results)
        } else {
          setCharacters((prevCharacters) => [...prevCharacters, ...data.results])
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError(null)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchCharacters()
  }, [page])

  const bottomRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPage((prevPage) => prevPage + 1)
          }
        })
      },
      { rootMargin: '0px 0px 0px 0px' }
    )

    const bottomElement = bottomRef.current
    if (bottomElement) {
      observer.observe(bottomElement)
    }

    return () => {
      if (bottomElement) {
        observer.unobserve(bottomElement)
      }
    }
  }, [])

  return (
    <>
      <div className="flexContainer spaceBetween">
        {characters.map((character) => {
          return (
            <div key={character.id} className="col4 mb1 flex">
              <CharacterCard
                id={character.id}
                image={character.image}
                name={character.name}
                status={character.status}
                species={character.species}
                location={character.location.name}
              />
            </div>
          )
        })}
        {loading && <p className="white mediumText tac">Loading...</p>}
        {error && <p className="white mediumText tac">{error}</p>}
      </div>
      <div ref={bottomRef} style={{ height: '1px' }} />
    </>
  )
}

export default CharactersGrid