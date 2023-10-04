import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Inicio from "../pages/Inicio"
import NavBar from '../components/NavBar'
import React, { useContext } from "react"
import { Context } from "../context/UserContext"
import Footer from "../components/Footer"
import FormPlanos from "../pages/FormPlanos"

function Rotas() {
    const { authenticated } = useContext(Context)

    return (
        <>
            {authenticated ? <NavBar /> : null}
            <Routes>
                {authenticated ? (
                    <>
                        <Route exact path="/inicio" element={<Inicio />} />
                        <Route exact path="/form-planos" element={<FormPlanos />} />
                        
                    </>
                ) : (
                    <>
                        <Route exact path="/" element={<Login />} />
                        <Route exact path="/register" element={<Register />} />
                    </>
                )}
            </Routes>
            {authenticated ? <Footer /> : null}
        </>
    )
}

export default Rotas