import axios from 'axios'
import { PersonInterface } from '../App'

const baseUrl = 'http://localhost:3001/persons'

const getPeople = () => 
    axios
    .get(baseUrl)
    .then((response: any) => {
        return response.data
    })


const createPerson = (person: PersonInterface) => 
    axios
    .post(baseUrl, person)
    .then((response: any) => {
        return response.data
    })

const updatePerson = (id: number, newPerson: PersonInterface) => 
    axios
    .put(baseUrl+'/'+id, newPerson)
    .then((response: any) => {
        return response.data
    })

const deletePerson = (id: number) =>
    axios
    .delete(baseUrl+'/'+id)
    .then((response: any) => response)

export default { getPeople, createPerson, updatePerson, deletePerson }