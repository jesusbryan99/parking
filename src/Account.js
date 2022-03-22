import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { format } from 'date-fns'
const Account = ({ session }) => {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [chekin, setChekin] = useState(null)
  const [chekout, setChekout] = useState(null)
  const [placas, setPlacas] = useState(null)
  const [visitas, setVisitas] = useState(null)

function hora(){
    const result = format(new Date(), 'hh:mm:ss')
    console.log(result);
    return result;
}
function horaPariking() {
//Conversion de chekin para resta----------------------------------------------------------------
 
if (chekin !== true) {
  
}else{
    var cadena = chekin;
    let result1 = cadena.replace(":", "");
    let result2 = result1.replace(":","");

//Conversion de chekin para resta
var cadena2 = chekout;
let res1 = cadena2.replace(":", "");
let res2 = res1.replace(":","");
console.log(res2); 

    const hora1 = parseFloat(res2);
    const hora2 = parseFloat(result2);
    const resultado = hora1-hora2;
    
    return resultado;
    }

}
//fin--------------------------------------------------------------------------------------------
//Funcion para hacer el cobro por hora-----------------------------------------------------------
function ticket() {
 const cobro= horaPariking();
const aux =15;
const aux2=30;
const aux3=45;
if (cobro>1500 &&cobro<19999) {
  return aux;
}
else if (cobro>20000 &&cobro<29999) {
  return aux2;
}

else {
  return aux3 + " Esta es la rarifa maxima";
}
}
//fin--------------------------------------------------------------------------------------------
//Obtencion de datos ----------------------------------------------------------------------------
  useEffect(() => {
    getProfile()
  }, [session])

  const getProfile = async () => {
      
    try {
      setLoading(true)
      const user = supabase.auth.user()
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, chekin, placas, visitas`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setChekin(data.chekin)
        //setChekout(data.chekout)
        setPlacas(data.placas)
        setVisitas(data.visitas)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }
//Fin obtencion de datos-----------------------------------------------------------------------------------------
//Actualizacion de usuarios -------------------------------------------------------------------------------------
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
        visitas:+1,
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
    return true;
  }

//Fin de actualizacion de datos usuario---------------------------------------------------------------------------------
//--------------------------------------OBTENCION DE DATOS PARA CHEKOUT-------------------------------------------------
useEffect(() => {
  getChekout()
}, [session])

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
//----------------------------------FIN OBTENCION DE DATOS PARA CHEKOUT-------------------------------------------------
//----------------------------------ACTUALIZACION DE CHEKOUT------------------------------------------------------------

const updateChekout = async (e) => {
  e.preventDefault()
  try {
    setLoading(true)
    const user = supabase.auth.user()
    const updates = {
      id: user.id,
      chekout: hora(),
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
  return true;
}
//----------------------------------FIN DE ACTUALIZACION DE CHEKOUT----------------------------------------------------- 
//----------------------------------INTEGRACION DE FUNCIONES------------------------------------------------------------

//----------------------------------FIN INTEGRACION DE FUNCIONES-------------------------------------------------------- 
//Fin de funciones------------------------------------------------------------------------------------------------------
  return (
    <div aria-live="polite">
      {loading ? (
        'Saving ...'
      ) : (
        
        
         
          <><div>Usuario: {session.user.email} </div><div>
            <label htmlFor="username">Nombre</label>
            <input
              id="username"
              type="text"
              value={username || 'Ingrese su nombre'}
              onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="username">Numero de placas</label>
            <input
              id="username"
              type="text"
              value={placas || 'Ingrese su numero de placas'}
              onChange={(e) => setPlacas(e.target.value)} />

            <div> Hora de entrada: {chekin || 'Dar click en el boton verde para iniciar su estancia'}</div>



            <div> Hora de salida: {chekout || 'Dar click en el boton verde para finalizar su estancia'}</div>

            <button onClick={updateProfile} className="button block primary" disabled={loading}>
              Click para ingresar hora de entrada
            </button>
            <label ></label>
    <button onClick={updateChekout} className="button block second" disabled={loading} >
              Click para ingresar hora de salida
            </button>
            

            <div>Horas que en el estacionamiento: {horaPariking()} <br />
              Su cobro seria de un total de: ${ticket() || 'No hay datos aun'}
            </div>

          </div><table class="default">

              <tr>

                <td>Nombre</td>

                <td>Placa</td>

                <td>Numero de visitas</td>

              </tr>

              <tr>

                <td>{username}</td>

                <td>{placas}</td>

                <td>{visitas}</td>

              </tr>

            </table>
            <label ></label>
            <button type="button" className="button block" onClick={() => supabase.auth.signOut()}>
              Cerrar sesion
            </button></>
        
        
      )}
   
    </div>
  )
}

export default Account