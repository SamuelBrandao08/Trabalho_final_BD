import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './style.css';

import api from '../../services/api';

export default function NovaCategoria() {
    const [nome, setNome] = useState('');
    const [teto, setTeto] = useState('');

    const userId = localStorage.getItem('userId');

    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            nome,
            teto,
        };
            
        try {
            await api.post('categoria', data, {
                headers: {
                    Authorization: userId,
                }
            })    
            history.push('/categoria');
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>

                    <h1>Cadastrar nova categoria</h1>
                    <p>Descreva o caso detalhadamente.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Nome da categoria"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    
                    <input 
                        placeholder="Teto"
                        value={teto}
                        onChange={e => setTeto(e.target.value)} 
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>

        </div>
    );
}