import { useContext } from 'react'
import { MainContext, MainContextProps } from '../contexts/MainContext'

const useMain = (): MainContextProps => {
  return useContext(MainContext)
}

export default useMain
