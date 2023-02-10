import { useSelector } from 'react-redux'
import { URLBACK } from '../env'
import { User } from '../reducers/userReducer'
import axios from 'axios'

export function createAxios(jwt) {
  return axios.create({
    baseURL: URLBACK,
    headers: { Authorization: `Bearer ${jwt}` },
  })
}

export const useAxiosWithHeader = () => {
  const jwt = useSelector(User.selectors.selectJWT)
  return createAxios(jwt)
}

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}
