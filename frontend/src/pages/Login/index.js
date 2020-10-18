import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import './style.css';



export default function Login() {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const history = useHistory();
    
    async function handleLogin(e) {
        e.preventDefault();
        console.log(nome, senha);
        
        try {
            
            const response = await api.post('session',  { nome, senha } );
            console.log(response.data);
            
            const id = localStorage.setItem('userId', response.data);
            const name = localStorage.setItem('usuarioNome', response.data.nome);
            console.log("id e nome do usuario", id, name);
            

            history.push('/categoria');
        } catch (err) {
            alert('Falha no login, tente novamente.')
        }
    }

    return (
        <div className="login-container">
            <section className="form">
              
                <form onSubmit={handleLogin}>
                    <h1>Faca seu login</h1>

                    <input 
                        placeholder="Seu nome" 
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <input 
                        placeholder="Sua senha" 
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />
                        Nao possuo cadastro.
                    </Link>
                </form>
            </section>

           
        </div>
    );
}