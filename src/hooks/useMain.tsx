import { useContext } from 'react'
import { MainContext, MainContextProps } from '../providers/MainProvider'

const useMain = (): MainContextProps => {
  return useContext(MainContext)
}

export default useMain
