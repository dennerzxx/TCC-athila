//resolver o nosso login
//hooks
import { useState, useEffect } from "react"
//util
import api from '../utils/api'
//react-router-dom
import { json, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function useAuth() {
    //verificar o estado atual do login
    const [authenticated, setAuthenticated] = useState(false)
    const [selected, setSelectedPlan] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        //verificar se exite token e encaminhar para a api 
        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            //mudar o estado do usuario para autenticado
            setAuthenticated(true)
        }
    }, [])


    async function authUser(data) {
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token))
        navigate('/')
    }

    //função para registrar um novo usuario
    async function register(user) {
        try {
            //rota da api para se cadastrar um usuario
            const data = await api.post('/users/register', user)
                .then((response) => {
                    return response.data
                })
            const notify = () => toast.success("Registro realizado com sucesso!", {
                theme: "dark"
            });
            notify()
            await authUser(data)
            // navigate('/inicio')
        } catch (error) {
            let message = error.response.data.message
            console.log('Erro ao cadastrar' + error)
            const notify = () => toast.warn(message, {
                theme: 'dark'
            });
            notify()
        }
    }

    //função login
    async function login(user) {
        try {
            const data = await api.post('/users/login', user)
                .then((response) => {
                    return response.data
                })
            await authUser(data)
            const notify = () => toast.success("Login realizado com sucesso!", {
                theme: "dark"
            });
            notify()
            //mudar para a rota que vcs quiserem que o usuario vá apos o login
            navigate('/inicio')
        } catch (error) {
            let message = error.response.data.message
            console.log('Erro ao logar' + error)
            const notify = () => toast.warn(message, {
                theme: 'dark'
            });
            notify()
        }
    }

    //função para autenticar o usuario
    async function authUser(data) {
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token))
        navigate('/inicio')
    }


    async function logout() {
        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        navigate('/')
        const notify = () => toast.success("Log Out realizado com sucesso!", {
            theme: 'dark'
        });
        notify()
    }

    return { authenticated, register, login, logout }

    //Função para resgatar plano

    async function authUser(data) {
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token))
        navigate('/')
    }

    async function selectedPlan(user){
        try {
            const data = await api.post('/pages/inicio', user)
                .then((response) => {
                    return response.data
                })
            await authUser(data)
            const notify = () => toast.success("Plano selecionado com sucesso!", {
                theme: "dark"
            });
            notify()
            //mudar para a rota que vcs quiserem que o usuario vá apos o login
            navigate('../pages/inicio')
        } catch (error) {
            let message = error.response.data.message
            console.log('Erro ao selecionar plano' + error)
            const notify = () => toast.warn(message, {
                theme: 'dark'
            });
            notify()
        }
    }
}

export default useAuth