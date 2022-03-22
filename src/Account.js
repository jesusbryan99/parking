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
    const result = format(new Date(), 'HHmmss')
    console.log(result);
    return result;
}
function horaPariking() {
//Conversion de chekin para resta----------------------------------------------------------------

  const cadena = chekin;  
  const cadena2 = chekout;
  const hora1 = parseFloat(cadena);
  const hora2 = parseFloat(cadena2);
  const resultado = hora2 - hora1;
  console.log(resultado);
  return resultado;
 

}
//fin--------------------------------------------------------------------------------------------
//Funcion para hacer el cobro por hora-----------------------------------------------------------
function ticket() {
 const cobro= horaPariking() ;
const aux =15;
const aux2=30;
const aux3=45;
const aux4 = "Tu estancia es menor a la permitida, sal de manera gratuita";
if (cobro> 0 && cobro<=1499) {
  return aux;
}
else if (cobro>1500 &&cobro<19999) {
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
        visitas: sumarVisita(),
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
function visita() {
  const numeroVisitas= visitas;
  return numeroVisitas;
}
function sumarVisita() {
  const sumVisitas = visitas;

  const resulVisita = parseFloat(sumVisitas) + 1;
  
  return resulVisita;
}
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
            

            <div>Tiempo que permanecio: {horaPariking()} <br />
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

                <td>{visita()}</td>

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