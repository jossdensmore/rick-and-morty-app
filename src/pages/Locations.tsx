import MainBackground from '../components/backgrounds/MainBackground'
import LocationsGrid from '../components/grids/LocationsGrid'

export default function LocationsPage() {
  return (
    <>
      <MainBackground backgroundOpacity title="Locations" />
      <div className="container">
        <LocationsGrid />
      </div>
    </>
  )
}