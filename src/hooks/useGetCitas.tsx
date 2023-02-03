import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { ServicioCitaType } from '../types'

interface useGetCitasReturn {
  loadingCitas: boolean
  citas: ServicioCitaType[]
}

const useGetCitas = (): useGetCitasReturn => {
  // Estados
  const [loadingCitas, setLoadingCitas] = useState<boolean>(true)
  const [citas, setCitas] = useState<ServicioCitaType[]>([])

  // UseEffect
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'citas'), snapshot => {
      const serviciosFirebase = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })) as []

      setLoadingCitas(false)
      setCitas(serviciosFirebase)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return { loadingCitas, citas }
}

export default useGetCitas
