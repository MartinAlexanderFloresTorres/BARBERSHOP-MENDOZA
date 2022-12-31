import { useState, useEffect } from 'react'

type AlertaReturn = [state: string, changeCode: (code: string) => void]

const useAlerta = (): AlertaReturn => {
  // Estados
  const [state, setState] = useState('')
  const [code, setCode] = useState('')

  // Efecto de alerta
  useEffect(() => {
    if (!code) return

    // Verificar si hay un error
    if (code === 'auth/account-exists-with-different-credential') {
      setState('Ya existe una cuenta con este email')
    } else if (code === 'auth/invalid-credential') {
      setState('Credenciales invalidas')
    } else if (code === 'auth/user-disabled') {
      setState('Usuario deshabilitado')
    } else if (code === 'auth/user-not-found') {
      setState('Usuario no encontrado')
    } else if (code === 'auth/wrong-password') {
      setState('Password incorrecto')
    } else if (code === 'auth/invalid-email') {
      setState('Email invalido')
    } else if (code === 'auth/popup-closed-by-user') {
      setState('La ventana se cerro')
    } else if (code === 'auth/cancelled-popup-request') {
      setState('La ventana se cerro')
    } else if (code === 'auth/popup-blocked') {
      setState('La ventana se cerro')
    } else if (code === 'auth/popup-closed-by-user') {
      setState('La ventana se cerro')
    } else if (code === 'auth/credential-already-in-use') {
      setState('Credenciales ya en uso')
    } else if (code === 'auth/timeout') {
      setState('Tiempo de espera agotado')
    } else if (code === 'auth/web-storage-unsupported') {
      setState('Navegador no soportado')
    } else if (code === 'auth/operation-not-allowed') {
      setState('Operacion no permitida')
    } else if (code === 'auth/weak-password') {
      setState('Password debil')
    } else if (code === 'auth/email-already-in-use') {
      setState('Email ya en uso')
    } else if (code === 'auth/operation-not-supported-in-this-environment') {
      setState('Operacion no soportada')
    } else if (code === 'auth/auth-domain-config-required') {
      setState('Dominio no configurado')
    } else if (code === 'auth/argument-error') {
      setState('Argumento invalido')
    } else if (code === 'auth/invalid-api-key') {
      setState('API key invalida')
    } else if (code === 'auth/app-deleted') {
      setState('App eliminada')
    } else if (code === 'auth/app-not-authorized') {
      setState('App no autorizada')
    } else if (code === 'auth/invalid-user-token') {
      setState('Token invalido')
    } else if (code === 'auth/network-request-failed') {
      setState('Error de red')
    } else if (code === 'auth/requires-recent-login') {
      setState('Necesitas iniciar sesion')
    } else if (code === 'auth/too-many-requests') {
      setState('Demasiadas peticiones')
    } else if (code === 'auth/unauthorized-domain') {
      setState('Dominio no autorizado')
    } else if (code === 'auth/user-token-expired') {
      setState('Token expirado')
    } else {
      setState('Error al autenticar')
    }
  }, [code])

  const changeCode = (code: string): void => {
    setCode(code)
  }

  return [state, changeCode]
}

export default useAlerta
