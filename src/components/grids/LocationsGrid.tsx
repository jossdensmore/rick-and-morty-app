import { useEffect, useRef, useState } from 'react'
import LocationCard from '../cards/LocationCard'
import { LocationsInterface, LocationsResponse } from '../../interfaces/Locations'

const LocationsGrid = () => {
  const [locations, setLocations] = useState<LocationsInterface[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<any | null>(null)
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/location?page=${page}`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data: LocationsResponse = await response.json()
        if (page === 1) {
          setLocations(data.results)
        } else {
          setLocations((prevLocations) => [...prevLocations, ...data.results])
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

    fetchLocations()
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
        {locations.map((location) => {
          return (
            <div key={location.id} className="col4 mb1 flex">
              <LocationCard
                id={location.id}
                name={location.name}
                type={location.type}
                dimension={location.dimension}
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

export default LocationsGrid