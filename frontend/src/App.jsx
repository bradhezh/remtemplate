import {
  useState,
  useEffect,
} from 'react'

import itemsSvc from './services/items'

const App = () => {
  const [items, setItems] = useState([])

  useEffect(() => {(async () => {try {
    console.log('initial render')

    const data = await itemsSvc.get()
    setItems(data)

  } catch (err) {
    console.log(`${err.name}: ${err.message}`)
  }})()

    return () => {
      console.log('cleanup')
    }
  }, [
  ])

  return (
    <div>
      <ul>{
        items.map(e =>
          <li key={e.id}>
            <span>{e.id} | {e.name}</span>
          </li>
        )
      }</ul>
    </div>
  )
}

export default App
