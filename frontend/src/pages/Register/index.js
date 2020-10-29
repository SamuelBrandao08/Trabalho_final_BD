import React, { useState } from 'react';
import {Link, useHistory } from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';



export default function Register() {
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            nome,
            senha,
            
        };
        
        try {
            const response = await api.post('users', data);

            alert(`Cadastro realizado com sucesso: ${response.data.id_usuario}`);
            history.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
            
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                   

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude outras pessoas.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome do Usuario" 
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <input 
                        placeholder="Senha do Usuario" 
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                    
                    

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>

        </div>
    )
}