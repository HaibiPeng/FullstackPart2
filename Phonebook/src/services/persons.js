import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
  const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }
  
  const deletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const put = object => {
    const request = axios.put(`${baseUrl}/${object.id}`, {...object})
    return request.then(response => response.data)
}
  
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, deletePerson, put }