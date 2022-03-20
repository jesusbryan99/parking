import { useState } from 'react'
import { supabase } from './supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget" aria-live="polite">
        <h1 className="header">Estacionamiento</h1>
        <p className="description">Ingresa tu correo para iniciar sesion</p>
        {loading ? (
          'Sending magic link...'
        ) : (
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Correo</label>
            <input
              id="email"
              className="inputField"
              type="email"
              placeholder="Ingrese su correo electronico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="description"></p>
            <button className="button block" aria-live="polite">
              Enviar enlace a correo electronico
            </button>
          </form>
        )}
      </div>
    </div>
  )
}