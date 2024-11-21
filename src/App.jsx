import { useState, useEffect } from 'react'
import './App.css'

const api_server = 'http://localhost:3000'
const api_endpoint = '/ricette'

const initialFormData = {
  title: '',
  content: '',
  images: '',
  tags: [],
}

function App() {

  const [ricette, setRicette] = useState([])
  const [formData, setFormData] = useState(initialFormData)
  const [allTags, setAllTags] = ([])



  function fetchData(url = `${api_server}${api_endpoint}`) {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        console.log(data.data);
        setRicette(data.data)
        setAllTags([...new Set(data.data.flatMap(item => Object.values(item).filter(value => Array.isArray(value)).flat()))])

      })
  }
  function handleFormSubmit(e) {
    e.preventDefault()
    console.log(formData);
    const newRicetta = {
      slug: Date.now(),
      ...formData
    }
    console.log(newRicetta);

    setRicette([
      newRicetta,
      ...ricette
    ])

  }
  function handleFormfield(e) {

    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    setFormData({
      ...formData,
      [e.target.name]: value
    })


  }
  useEffect(fetchData, [])



  return (
    <>
      <header>
        <h1>Le mie ricette</h1>

      </header>
      <div className="container">
        <section className='operationSect'>
          <form onSubmit={handleFormSubmit}>
            <div className="inputstyle">
              <label htmlFor="title">Nome ricetta</label>
              <input
                type="text"
                name='title'
                id='title'
                value={formData.title}
                onChange={handleFormfield} />
            </div>
            <div className="inputstyle">

              <label htmlFor="content">Descrizione</label>
              <textarea
                type="textarea"
                rows="5"
                cols="50"
                name='content'
                id='content'
                value={formData.content}
                onChange={handleFormfield} />
            </div>
            <div className="checktags">
              <div className="inputstyle">
                <label htmlFor="dolci">Dolci {allTags}</label>
                <input type="checkbox" name="tags" id="dolci" value={formData.tags} onChange={handleFormfield} />
              </div>

              <div className="inputstyle">
                <label htmlFor='torte'>torte</label>
                <input type="checkbox" name="tags" id='torte' value={formData.tags} onChange={handleFormfield} />
              </div>


            </div>
            <button type='submit'>Aggiungi ricetta</button>
          </form>

        </section>
        <section>
          {ricette ? ricette.map(ricetta => (
            <div key={ricetta.title} className='card'>
              <h3>{ricetta.title}</h3>
              <img src='{}' alt="" />
              <p className='description'>{ricetta.content}</p>
              <div className='tags'>

                {ricetta.tags.map((tag, index) => <div key={index} className='tag' >{tag}</div>)}
              </div>

            </div>

          )) :
            <p>Nessuna ricetta trovata</p>}

        </section>
      </div>

    </>
  )
}

export default App
