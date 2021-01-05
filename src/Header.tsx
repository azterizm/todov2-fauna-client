import { Link, Redirect } from "react-router-dom"

export const Header = () => {
  const handleLogout = ()=> {
    localStorage.removeItem('token')
    return <Redirect to='/login'/>
  }

  return (
    <div className="header">
      <Link to='/'>Home</Link>
      {localStorage.getItem('token') ? (
        <>
          <Link to='/add'>Add</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
          <Link to='/login'>Login</Link>
        )}
    </div>
  )
}
