import React from 'react';
import Styles from './Login.module.css'
import { Link } from 'react-router-dom'
import academiaLoginImage from '../../assets/tccGymLogin.png';

//hooks
import { useContext, useState } from 'react'
//context
import { Context } from '../../context/UserContext'


function Login() {
  //aqui entra a lógica para o login

  const [user, setUser] = useState({})
  const { login } = useContext(Context)

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    login(user)
  }

  return (
      <div className={Styles.form}>
        <ul className={Styles.tabgroup}>
          <li className={Styles.tab} ><Link to='/register'>Registrar</Link></li>
          <li><Link to='/' className={Styles.tabactive}>Login</Link></li>
        </ul>
        <div className={Styles.tabcontent}>
          <div id="login">
            <h1>Bem Vindo de Volta!</h1>
            <form onSubmit={handleSubmit}>
              <div className={Styles.fieldwrap}>
                <input onChange={handleChange} name='email' type="email" required placeholder="Digite seu email" />
              </div>
              <div className={Styles.fieldwrap}>
                <input onChange={handleChange} name='password' type="password" required placeholder="Digite sua senha" />
              </div>
              <p className={`${Styles.forgot} text-light`}><a href="/register">Esqueceu a senha?</a></p>
              <button
                className={`${Styles.button} ${Styles.buttonBlock}`}
                type='submit'
              ><span style={{ color: "white" }}>Login</span></button>
            </form>
          </div>
        </div>
      </div>
  );
}

export default Login;
