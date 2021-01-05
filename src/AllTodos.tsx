import axios, { AxiosError } from 'axios'
import { useEffect, useState } from "react"

export const AllTodos = () => {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<AxiosError | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const { data: { data } } = await axios.get('https://faunadb-server.herokuapp.com/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        setTodos(data)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    })()
  }, [])

  console.log('todos', todos)

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>{error.response?.statusText}</h1>

  return (
    <div className="container">
      <ul className='allTodos'>
        {todos.map((todo: string, i: number) => (
          <li className='todo' key={i}>{todo}</li>
        ))}
      </ul>
    </div>
  )
}
