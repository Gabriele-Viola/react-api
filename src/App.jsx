import { useState, useEffect } from 'react'
import './App.css'

const api_server = 'http://localhost:3000'
const api_endpoint = '/ricette'



function App() {

  function fetchData(url = `${api_server}${api_endpoint}`) {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);

      })

  }
  useEffect(fetchData, [])


  return (
    <>

    </>
  )
}

export default App
