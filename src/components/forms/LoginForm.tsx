import { useContext, useState } from 'react'
import { FavoritesContext } from '../../context/FavoritesContext'
import './LoginForm.css'

const LoginForm = () => {
  const favoritesContext = useContext(FavoritesContext)

  if (!favoritesContext) {
    throw new Error('FavoritesContext must be used within a FavoritesProvider')
  }

  const { login, logout, isAuthenticated } = favoritesContext
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(username, password)) {
      console.log("Login successful")
      setError('')
    } else {
      setError('Invalid username or password')
    }
  }

  // Logout
  const handleLogout = () => {
    logout();
  }

  return (
    <div className="loginForm">
      {!isAuthenticated ?
        <>
          <h1 className="smallTitle mb2">Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              className="loginFormInput"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="loginFormInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="error orange">{error}</p>}
            <button className="loginFormButton" type="submit">Login</button>
          </form>
        </> :
        <>
          <h1>Welcome!</h1>
          <button className="loginFormButton" onClick={handleLogout}>Logout</button>
        </>
      }
    </div>
  )
}

export default LoginForm