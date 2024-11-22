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
  const [allTags, setAllTags] = useState([])
  const [checktags, setTags] = useState(initialFormData.tags)



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
    fetch('http://localhost:3000/ricette', {
      method: 'POST',
      body: JSON.stringify(newRicetta),
      headers: {
        'Content-Type': 'Application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log('success:', data);

        setRicette(data.data)
      })
    setFormData(initialFormData)
  }


  function handleFormfield(e) {
    const { type, name, id, checked, value } = e.target;

    if (type === 'checkbox') {
      setTags((prevTags) =>
        checked ? [...prevTags, id] : prevTags.filter(tag => tag !== id)
      );

      setFormData({
        ...formData,
        tags: checked
          ? [...formData.tags, id]
          : formData.tags.filter(tag => tag !== id),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }




  useEffect(fetchData, [])



  return (
    <>
      <header>
        <h1>Le mie ricette</h1>

      </header>
      <div className="container">
        <section className='operationSect'>
          <form className='formstyle' onSubmit={handleFormSubmit}>
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
              <label htmlFor="image">Immagine</label>
              <input
                type="text"
                name='images'
                id='images'
                value={formData.images}
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

              {allTags.map((tag, index) =>

                <div key={index} className="inputstyle">
                  <input type="checkbox" name={tag} id={tag} value={formData.name} onChange={handleFormfield} />
                  <label htmlFor={tag}>{tag}</label>
                </div>
              )}


            </div>
            <button type='submit'>Aggiungi ricetta</button>
          </form>

        </section>
        <section>
          {ricette ? ricette.map(ricetta => (
            <div key={ricetta.title} className='card'>
              <h3>{ricetta.title}</h3>
              <img src={`${api_server}/imgs/${ricetta.image}`} alt="" />
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
