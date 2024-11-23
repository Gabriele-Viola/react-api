import { useState, useEffect } from 'react'
import './App.css'
import AppCard from './Components/AppCard'
import AppForm from './Components/AppForm'

const api_server = 'http://localhost:3000'
const api_endpoint = '/ricette/'
const url = api_server + api_endpoint

const initialFormData = {
  title: '',
  content: '',
  image: '',
  tags: [],
  checked: false
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

        setRicette(data.data)
        setAllTags([...new Set(data.data.flatMap(item => Object.values(item).filter(value => Array.isArray(value)).flat()))])

      })
  }

  function handleFormSubmit(e) {
    e.preventDefault()

    console.log(formData);
    const newRicetta = {
      slug: Date.now().toString(),
      ...formData
    }
    console.log(newRicetta);


    fetch(url, {
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

  function handleDeleteClick(e) {
    e.preventDefault()
    const id = e.target.getAttribute('slug')

    fetch(url + id, {
      method: 'DELETE',
      headers: {
        'ContentType': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {

        setRicette(data.data)
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
          <AppForm handleFormSubmit={handleFormSubmit} formData={formData} handleFormfield={handleFormfield} allTags={allTags} />
        </section>
        <section>
          {ricette ? ricette.map(ricetta => (
            <AppCard url={url} key={ricetta.title} ricetta={ricetta} server={api_server} handleDeleteClick={handleDeleteClick} />
          )) :
            <p>Nessuna ricetta trovata</p>}

        </section>
      </div>

    </>
  )
}

export default App
