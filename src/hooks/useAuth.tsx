import useMain from './useMain'

const useAuth = (): boolean => {
  // useMain
  const { user } = useMain()
  return Object.keys(user ?? {}).length > 0
}

export default useAuth
