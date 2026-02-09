import axios from 'axios'

const BASE_URL = 'https://api.escuelajs.co/api/v1'

const api = axios.create({
  baseURL: BASE_URL,
})

export const getProducts = async () => {
  try {
    const response = await api.get('/products')
    return response.data
  } catch (error) {
    throw error
  }
}

export const getCategories = async () => {
  try {
    const response = await api.get('/categories')
    return response.data
  } catch (error) {
    throw error
  }
}

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}
