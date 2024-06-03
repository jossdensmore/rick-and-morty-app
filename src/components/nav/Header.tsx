import { Link } from 'react-router-dom'
import './Header.css'
import HeartRegular from '../icons/HeartRegular'
import UserRegular from '../icons/UserRegular'

const Header = () => {
  return (
    <header className="mainHeader">
      <nav className="headerContainer flexContainer spaceBetween alignCenter">
        <Link to="/">
          <img
            src="/images/logo/rick-and-morty-logo.png"
            alt="Rick and Morty Logo"
            className="headerLogo"
          />
        </Link>
        <ul className="headerNavItems flexContainer spaceBetween alignCenter">
          <li>
            <Link to="/">Home</Link></li>
          <li>
            <Link to="/locations">Locations</Link></li>
          <li>
            <Link to="/favorites">
              <HeartRegular className="heartRegularItem" />
            </Link></li>
          <li>
            <Link to="/login">
              <UserRegular className="heartRegularItem" />  
            </Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header