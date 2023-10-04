import React, { useState, useEffect } from 'react'
import Styles from './Price.module.css'
import api from '../../utils/api'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'

const Card = () => {
  const [user, setUser] = useState({})
  const [token, setToken] = useState(localStorage.getItem('token') || '');


  async function schedule(id) {
    const data = await api
      .patch(`/users/FormPlanos/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      })
      .then((response) => {
        console.log(response.data)
        return response.data
      })
      .catch((err) => {
        console.log(err)
        return err.response.data
      })
    // alert(data.message)
  }

  return (
    <>
      <div className={Styles.principal} id='planos'>
        <div class="card" className={Styles.card1}>
          <img src="" class="card-img-top" alt="" />
          <div class="">
            <h5 class={Styles.silver}>Plano Silver</h5>
            <p class="">
              ✔. Área de musculação e aeróbicos <hr />
              ✔. Cadeira de massagem <hr />
              ✖. Sauna e Banheira de Gelo <hr />
              ✖. Hidromassagem <hr />
              ✖. Frigobar Gratuito
            </p>
            <hr></hr>
            <h3 > R$ 99,99/MÊS</h3>
            <Link class="btn btn-secondary" to='/form-planos?plan=Silver' >Escolher Plano!</Link>
            <button class={Styles.custom_button} onClick={schedule(null)} id="cancelButton">Cancelar Plano</button>
          </div>
        </div>


        {/* ****************************************************************************************************************************** */}
        <div class="card" className={Styles.card2}>
          <img src="" class="card-img-top" alt="" />
          <div class="">
            <h5 class={Styles.diamond}>Plano Diamond</h5>
            <p class="">
              <hr />
              ✔. Área de musculação e aeróbicos <hr />
              ✔. Cadeira de massagem <hr />
              ✔. Sauna e Banheira de Gelo <hr />
              ✔. Hidromassagem <hr />
              ✔. Frigobar Gratuito
            </p>
            <hr></hr>
            <h3> R$ 249,99/MÊS</h3>
            <Link class="btn btn-secondary" to='/form-planos?plan=Diamond' >Escolher Plano!</Link>
            <button class={Styles.custom_button} id="cancelButton">Cancelar Plano</button>


          </div>
        </div>
        {/* ****************************************************************************************************************************** */}
        <div class="card" className={Styles.card3}>
          <img src="" class="card-img-top" alt="" />
          <div class="">
            <h5 class={Styles.gold}>Plano Gold</h5>
            <p class="">
              ✔. Área de musculação e aeróbicos <hr />
              ✔. Cadeira de massagem <hr />
              ✔. Sauna e Banheira de Gelo <hr />
              ✖. Hidromassagem <hr />
              ✖. Frigobar Gratuito
            </p>
            <hr></hr>
            <h3> R$ 149,99/MÊS</h3>
            <Link class="btn btn-secondary" to='/form-planos?plan=Gold' >Escolher Plano!</Link>
            <button class={Styles.custom_button} id="cancelButton">Cancelar Plano</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
