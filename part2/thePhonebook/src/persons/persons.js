import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
  }
  
  const create = newPerson => {
    return axios.post(baseUrl, newPerson)
  }
  
  const update = (id, newPerson) => {
    return axios.put(`${baseUrl}/${id}`, newPerson)
  }

  const remove = (id, newObject) => {
    return axios.delete(`${baseUrl}/${id}`, newObject)
  }
  
  export default { 
    getAll: getAll, 
    create: create, 
    update: update,
    remove: remove
  }