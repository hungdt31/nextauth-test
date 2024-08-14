import axios from 'axios'

const clientId = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY

const UNSPLASH_ROOT = 'https://api.unsplash.com'

export const getPhotosByCollection = async () => {
  const { data } = await axios.get(
    `${UNSPLASH_ROOT}/collections?client_id=${clientId}&per_page=3&page=1`
  )
  return data
}

export const getPhotosOrderByPopular = async () => {
  const { data } = await axios.get(
    `${UNSPLASH_ROOT}/photos?client_id=${clientId}&order_by=popular&per_page=5&page=1`
  )
  return data
}

export const getUsers = async () => {
  const { data } = await axios.get(
    `${UNSPLASH_ROOT}/search/users?query=tr&client_id=${clientId}&per_page=3`
  )
  return data.results
}
export const getTheRestUsers = async () => {
  const { data } = await axios.get(
    `${UNSPLASH_ROOT}/search/users?query=tr&client_id=${clientId}&per_page=5&page=2`
  )
  return data.results
}