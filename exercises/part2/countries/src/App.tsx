import React, {useEffect, useState} from 'react'
import './App.css'
import axios from 'axios'

interface Country {
  name: string,
  capital: string,
  population: number,
  languages: { languageName: string }
}

const App = () => {
  const [ search, setSearch ] = useState('')
  const [ countries, setCountries ] = useState([] as Country[])
  const [ matchedCountries, setMatchedCountries] = useState([] as Country[])
  const [ result, setResult ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response: any) => {
        setCountries(response.data)
      })
  }, [])

  const onInputChange = (event: any) => {
    event.preventDefault()
    setSearch(event.target.value)
    setMatchedCountries(countries.filter(country => country.name.toLowerCase().startsWith(search.toLowerCase())))
  }

  const numResults = () => {
    if (matchedCountries.length >= 10)
      return <p>too many countries, please narrow</p>
    return (
      <>
        {matchedCountries.map(country => <p>{country.name}</p>)}
      </>
    )
  }

  return (
    <>
      find countries
      <input onChange={onInputChange}/>
      {numResults()}
    </>
  )
}

export default App
