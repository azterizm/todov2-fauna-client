import { ReactElement, useEffect, useState } from "react"
import axios from 'axios'
import { useHistory } from "react-router-dom"

export const CreateTodo = () => {
  const [add, setAdd] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [notifySync, setNotifySync] = useState<boolean>(false)
  const history = useHistory()

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setNotifySync(true)
      }, 5000)
    }
  }, [loading])

  const handleCreate = async () => {
    setLoading(true)
    try {
      await axios.post('https://faunadb-server.herokuapp.com/add', {
        title: add
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setLoading(false)
      history.push('/')
    } catch (error) {
      setError(error.response.statusText)
      setLoading(false)
    }
  }

  if (error) return <h1>{error}</h1>

  const NotifySyncMsg: ReactElement =
    <div className="notifySyncContainer">
      <h1 className='notifySync'>Could not connect to the server but thats fine!</h1>
      <p>You can continue using this app while this will be added when you get connection back.</p>
    </div>

  return (
    <div className="add">
      <div className="input">
        <input type="text" name="addTodo" id="create" value={add} onChange={(e) => setAdd(e.target.value)}/>
      </div>
      <button onClick={handleCreate} disabled={loading}>Create</button>
      {loading && <h3>Loading...</h3>}
      {notifySync && NotifySyncMsg}
    </div>
  )
}
