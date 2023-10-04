import React from 'react';
import Styles from './Register.module.css'
import { Link } from 'react-router-dom'
import academiaLoginImage from '../../assets/tccGymLogin.png'

//hooks
import { useContext, useState } from 'react'

//context
import { Context } from '../../context/UserContext'

function Register() {
  //a logica para enviar um formulario, ou para fazer qualquer coisa diferenciada em uma pagina fica nesse local
  const [user, setUser] = useState({})
  const { register } = useContext(Context)

  function handleChange(evento) {
    setUser({ ...user, [evento.target.name]: evento.target.value })
    // const rawCPF = evento.target.value.replace(/\D/g, '');
    // if (rawCPF.length <= 11) {
    //   // Adicionar a máscara (###.###.###-##)
    //   const formattedCPF = rawCPF
    //     .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    //   setUser({ ...user, cpf: formattedCPF });
    // }
    // const rawPhone = evento.target.value.replace(/\D/g, '');

    // Limitar o número de telefone a 11 dígitos
    // if (rawPhone.length <= 11) {
    //   // Adicione a máscara (## #########)
    //   const formattedPhone = rawPhone.replace(/^(\d{2})(\d{1})(\d{0,8})$/, '$1 $2 $3');

    //   setUser({ ...user, phone: formattedPhone });
    // }

    //{...user}: isso aqui, cria uma cópia do objeto user atual, usando a sintaze de espalhamento do javascript(...), essa cópia e feita para preservar valores existentes no objeto antes de fazer qualquer att
  }

  function handleSubmit(evento) {
    evento.preventDefault()
    register(user)
  }
  return (
    <div className={Styles.form}>
      <ul className={Styles.tabgroup}>
        <li ><Link to='/register' className={Styles.tabactive}>Registrar</Link></li>
        <li className={Styles.tab} ><Link to='/'>Login</Link></li>
      </ul>
      <div className={Styles.tabcontent}>
        <div id="signup">
          <h1>Não tem uma conta conosco? Faça Agora!</h1>
          <form onSubmit={handleSubmit}>
            <div className={Styles.toprow}>
              <div className={Styles.fieldwrap}>
                <input
                  type="text"
                  name='name'
                  onChange={handleChange}
                  required
                  placeholder="Digite seu nome"
                />
              </div>
              <div className={Styles.fieldwrap}>
                <input
                  type="text"
                  name='cpf'
                  value={user.cpf}
                  onChange={handleChange}
                  required
                  maxLength={14} // Definir o número máximo de caracteres
                  placeholder="Digite seu CPF"
                />
              </div>
            </div>
            <div className={Styles.fieldwrap}>
              <input
                type="email"
                name='email'
                onChange={handleChange}
                required
                placeholder="Digite seu email"
              />
            </div>
            <div className={Styles.fieldwrap}>
              <input
                type="text"
                name='phone'
                value={user.phone}
                onChange={handleChange}
                required
                maxLength={13} // Definir o número máximo de caracteres (incluindo espaços)
                placeholder="Digite seu telefone"
              />
            </div>
            <div className={Styles.fieldwrap}>
              <input
                type="password"
                name='password'
                onChange={handleChange}
                required
                placeholder="Digite sua senha"
              />
            </div>
            <div className={Styles.fieldwrap}>
              <input
                type="password"
                name='confirmpassword'
                onChange={handleChange}
                required
                placeholder="Confirme sua senha"
              />
            </div>
            <button
              type='submit'
              className={`${Styles.button} ${Styles.buttonBlock}`}
            >
              <span style={{ color: "white" }}>Registrar</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
