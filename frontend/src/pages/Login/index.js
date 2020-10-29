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
        
        
        try {
            
            const response = await api.post('session',  { nome, senha } ); 
            const [user] = response.data

            localStorage.setItem('userId', user.id_usuario);            
            localStorage.setItem('userName', user.nome);

            history.push('/profile');
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