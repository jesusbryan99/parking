import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

const Account = ({ session }) => {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [chekin, setChekin] = useState(null)
  const [chekout, setChekout] = useState(null)
  const [placas, setPlacas] = useState(null)
  const [visitas, setVisitas] = useState(null)

function hora(){
    const fecha = new Date();
    const hora = fecha.getHours();
    const min = fecha.getMinutes();
    const seg = fecha.getSeconds();

    const horaActual = hora+':'+min+':'+seg;
    return horaActual;
}
function horaPariking() {
//Conversion de chekin para resta
    var cadena = chekin;
    let result1 = cadena.replace(":", "");
    let result2 = result1.replace(":","");
console.log(result2); 
//Conversion de chekin para resta
var cadena2 = chekout;
let res1 = cadena2.replace(":", "");
let res2 = res1.replace(":","");
console.log(res2); 

    const hora1 = parseFloat(res2);
    const hora2 = parseFloat(result2);
    const resultado = hora1-hora2;
    console.log("el resutado " + resultado );
    return resultado;
 
}
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
        .select(`username, chekin, chekout, placas, visitas`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setChekin(data.chekin)
        setChekout(data.chekout)
        setPlacas(data.placas)
        setVisitas(data.visitas)
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
        chekin: hora(),
        placas,
        chekout,
        visitas,
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
              value={username || 'Ingrese su nombre'}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username">Numero de placas</label>
            <input
              id="username"
              type="text"
              value={placas || 'Ingrese su numero de placas'}
              onChange={(e) => setPlacas(e.target.value)}
            />

          <div> Hora de entrada: (Ingrese con el formato HH:MM:SS){chekin || 'Ingrese su hora de llegada y de click en el boton verde'}</div>
          <input
          maxLength={8}
              id="username"
              type="text"
              value={chekin || ''}
              onChange={(e) => setChekin(e.target.value)}
            />
          <div> Hora de salida: (Ingrese con el formato HH:MM:SS) {chekout || 'Ingrese su hora de salida y de click en el boton rojo'}</div>
           
           
            <button className="button block primary" disabled={loading}>
              Click para ingresar hora de entrada
            </button>
            <input
          maxLength={8}
              id="username"
              type="text"
              value={chekout || ''}
              onChange={(e) => setChekout(e.target.value) }
            />
            <label ></label>
            <button className="button block second" disabled={loading}>
              Click para ingresar hora de salida
            </button>
            <label ></label>
           
           <div>Horas que en el estacionamiento: {horaPariking()} </div>
            
          </div>
        </form>
      )}
   
    </div>
  )
}

export default Account