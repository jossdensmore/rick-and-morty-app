import './MainBackground.css'

interface MainBackgroundProps {
  rickAndMorty?: boolean
  title?: string
  backgroundOpacity?: boolean
  form?: React.ReactNode
}

const MainBackground = ({ rickAndMorty, title, backgroundOpacity, form }: MainBackgroundProps) => {
  return (
    <div
      className={`
        mainBackground
        ${backgroundOpacity && "mainBackgroundOpacity"}
        ${form && "h100"}
      `}
    >
      {rickAndMorty &&
        <img
          src="/images/backgrounds/rick-and-morty-background-02.png"
          alt="Rick and Morty Spaceship"
          className="mainBackgroundRickAndMorty"
        />
      }
      {title &&
        <h1>{title}</h1>
      }
      {form &&
        <>{form}</>
      }
    </div>
  )
}

export default MainBackground