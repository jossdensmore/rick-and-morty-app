import MainBackground from '../components/backgrounds/MainBackground'
import CharactersGrid from '../components/grids/CharactersGrid'

export default function HomePage() {
  return (
    <>
      <MainBackground rickAndMorty={true} />
      <div className="container">
        <h1 className="bigTitle tac mb1">Characters</h1>
        <CharactersGrid />
      </div>
    </>
  )
}