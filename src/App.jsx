import { useState, useEffect } from 'react'
import './App.css'

const api_server = 'http://localhost:3000'
const api_endpoint = '/ricette'

const initialFormData = {
  title: '',
  content: ''
}

function App() {

  const [ricette, setRicette] = useState({})
  const [formData, setFormDeta] = useState()
  // const [newRicetta, setNewRicetta] = ({})

  function fetchData(url = `${api_server}${api_endpoint}`) {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        setRicette(data)
      })
  }
  function handleFormSubmit(e) {
    e.preventDefault()
    console.log('form state');

  }
  function handleFormfil(e) {

  }
  useEffect(fetchData, [])

  // function handleForm(e) {

  // }

  return (
    <>
      <h1>Le mie ricette</h1>
      <section className='operationSect'>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="title">Nome ricetta</label>
          <input type="text" name='title' id='title' />
          <label htmlFor="content">Descrizione</label>
          <input type="text" name='content' id='content' />
          <button type='submit'>Aggiungi ricetta</button>
        </form>

      </section>
      <section>
        <div className="container">
          {ricette.data ? ricette.data.map(ricetta => (
            <div key={ricetta.id} className='card'>
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
