import { useState, useEffect } from 'react'
import './App.css'

const api_server = 'http://localhost:3000'
const api_endpoint = '/ricette'


function App() {

  const [ricette, setRicette] = useState({})


  function fetchData(url = `${api_server}${api_endpoint}`) {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        setRicette(data)
      })

  }
  useEffect(fetchData, [])


  return (
    <>
      <h1>Le mie ricette</h1>
      <section>
        <div className="container">
          {ricette.data ? ricette.data.map(ricetta => (
            <div className='card'>
              <h3>{ricetta.title}</h3>
              <p>{ricetta.content}</p>
            </div>

          )) :
            <p>Nessuna ricetta trovata</p>}
        </div>

      </section>

    </>
  )
}

export default App
