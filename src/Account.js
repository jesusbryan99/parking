import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

const Account = ({ session }) => {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [chekin, setChekin] = useState(null)
  const [chekout, setChekout] = useState(null)
  const [placas, setPlacas] = useState(null)


  //Usuarios
  useEffect(() => {
    getProfile()
  }, [session])

  const getProfile = async () => {
    try {
      setLoading(true)
      const user = supabase.auth.user()
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, chekin, placas`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setChekin(data.chekin)
        setPlacas(data.placas)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }
  //chekout
  const getChekout = async () => {
    try {
      setLoading(true)
      const user = supabase.auth.user()
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`chekout`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setChekout(data.chekout)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }
//Actualizacion de usuarios (Alta)
  const updateProfile = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        username,
        chekin: new Date(),
        placas,
        chekout: new Date(),
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div aria-live="polite">
      {loading ? (
        'Saving ...'
      ) : (
        <form onSubmit={updateProfile} className="form-widget">
          <div>Usuario: {session.user.email} </div>
          <div>
          <label htmlFor="username">Nombre</label>
            <input
              id="username"
              type="text"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username">Numero de placas</label>
            <input
              id="username"
              type="text"
              value={placas || ''}
              onChange={(e) => setPlacas(e.target.value)}
            />

          <div> Hora de entrada: {chekin || 'De click en el boton verde para comenzar su tiempo'}</div>

          <div> Hora de salida: {chekout || 'De click en el boton rojo para finalizar su tiempo'}</div>
            <button className="button block primary" disabled={loading}>
              Click para ingresar hora de entrada
            </button>
            <label ></label>
            <button className="button block second" disabled={loading}>
              Click para ingresar hora de salida
            </button>
          </div>
        </form>
      )}
   
    </div>
  )
}

export default Account