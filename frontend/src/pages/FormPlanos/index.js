import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Styles from './Planos.module.css';
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FormPlanos() {
  const [user, setUser] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedPlan = queryParams.get('plan');
  const navigate = useNavigate();

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Assuming you have a function to handle plan selection, call it here.
    // In this example, I'm using a mock function named "selectPlan".
    try {
      await selectPlan(selectedPlan, user);
      navigate('/');
      
      const notify = () => toast.success(  `${selectedPlan}` +  " Resgatado com sucesso!", {
        theme: "dark"
    });
    notify()
    } catch (error) {
      let message = error.response.data.message;
      console.error('Erro ao resgatar plano', error);
      toast.error(`Erro ao resgatar plano: ${message}`, {
        theme: 'dark',
      });
    }
  }

  async function selectPlan(plan, userData) {
    // Here, you should implement your logic to send the plan selection to the server.
    // Make an API request or perform any other actions required.
    // You can use the userData to send any additional information along with the plan selection.
    // For example:
    // const response = await api.post('/select-plan', { plan, ...userData });
  }

  return (
    <div className={Styles.form}>
      <ul className={Styles.tabgroup}>
        <li className={Styles.tab}>
          <Link to='/register'>Registrar</Link>
        </li>
        <li>
          <Link to='/' className={Styles.tabactive}>
            Login
          </Link>
        </li>
      </ul>
      <div className={Styles.tabcontent}>
        <div id="login">
          <h1>Resgate seu plano!</h1>
          <p className={Styles.Selected}>Selected Plan: {selectedPlan}</p> {/* Display the selected plan */}
          <form onSubmit={handleSubmit}>
            <div className={Styles.fieldwrap}>
              <input
                onChange={handleChange}
                name='email'
                type="email"
                required
                placeholder="Digite seu email"
              />
            </div>
            <div className={Styles.fieldwrap}>
              <input
                onChange={handleChange}
                name='password'
                type="password"
                required
                placeholder="Digite sua senha"
              />
            </div>
            <button className={`${Styles.button} ${Styles.buttonBlock}`} type='submit'>
              <span style={{ color: "white" }}>Resgatar!</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormPlanos;