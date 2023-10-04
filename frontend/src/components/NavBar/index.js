import LogoTcc1 from '../../assets/LogoTcc1.png'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
//Contexto
import { Context } from '../../context/UserContext'

function NavBar() {
    const { logout } = useContext(Context)
    return (
        <nav className="navbar navbar-expand-lg bg-dark position-fixed z-3 w-100" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" href="/"><img src={LogoTcc1} style={{ width: '100px' }}></img></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-flex flex-row-reverse" id="navbarNav">
                    <ul className="navbar-nav p-1">
                        <li className="nav-item p-2 flex-fill">
                            <Link className="nav-link home" aria-current="page" to='/inicio'>Home</Link>
                        </li>
                        <li className="nav-item p-2 flex-fill">
                            <a className="nav-link planos" href="#planos">Planos</a>
                        </li>
                        <li className="nav-item p-2 flex-fill">
                            <a className="nav-link sobre_nos" aria-disabled="true" href='#sobrenos'>Sobre Nós</a>
                        </li>
                        <li className="nav-item p-2 flex-fill">
                            <Link className="nav-link sobre_nos" aria-disabled="true" to='/cadastrarplanos'>Cadastrar Planos</Link>
                        </li>
                        <li onClick={logout} className='nav-link sair'><Link className='nav-link' to='/'>Sair</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar