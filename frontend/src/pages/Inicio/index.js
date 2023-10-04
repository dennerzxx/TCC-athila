import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import academiaLoginImage from '../../assets/tccGym.png';
import Styles from './Inicio.module.css';
import Pricing from '../../components/Price';
// import Props from '../../components/Price'

const Inicio = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = academiaLoginImage;
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  return (
    <>

      <div className={Styles.backgroundContainer} id='inicio'>
        {/* {imageLoaded && (
          <img
            src={academiaLoginImage}
            alt="Academia Login"
            className={Styles.backgroundImage}
          />
        )} */}
        <div className={Styles.content}>
          <h1 className={Styles.titulo}>O lugar certo</h1>
        </div>
        <div className={Styles.content}>
          <h1 className={Styles.titulo1}>para você</h1>
        </div>
        <div className={Styles.content}>
          <h1 className={Styles.titulo2}>mudar de vida!</h1>
        </div>
      </div>


      <Pricing />

    </>
  );
};

export default Inicio;

