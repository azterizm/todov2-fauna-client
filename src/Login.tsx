import axios from 'axios'
import { useState } from "react"
import { useHistory } from "react-router-dom"

export const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const history = useHistory()

  const handleLogin = async () => {
    const { data: token } = await axios.post('https://faunadb-server.herokuapp.com/login', {
      email,
      password
    })
    localStorage.setItem('token', token)
    history.push('/')
  }

  return (
    <div id="login">
      <div className="input">
        <div className="emailInput">
          <label htmlFor="loginEmail">Email:</label>
          <input
            type="email"
            name="Email"
            id="loginEmail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="passwordInput">
          <label htmlFor="loginPassword">Password:</label>
          <input
            type="password"
            name="Password"
            id="loginPassword"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}
