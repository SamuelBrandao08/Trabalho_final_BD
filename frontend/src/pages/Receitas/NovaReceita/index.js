import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './style.css';

import api from '../../../services/api';

export default function NovaReceita() {
    const [valor, setValor] = useState('');
    const [descricao, setDescricao] = useState('');

    const userId = localStorage.getItem('userId');

    const history = useHistory();

    async function handleNewIncome(e) {
        e.preventDefault();

        const data = {
            valor,
            descricao,

        };
            
        try {
            await api.post('receitas', data, {
                headers: {
                    Authorization: userId,
                }
            })    
            history.push('/receitas');
        } catch (err) {
            alert('Erro ao cadastrar a receita, tente novamente.');
        }
    }

    return (
        <div className="new-income-container">
            <div className="content">
                <section>

                    <h1>Cadastrar nova receita</h1>
                    <p>Descreva o caso detalhadamente.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar
                    </Link>
                </section>

                <form onSubmit={handleNewIncome}>
                    <input 
                        placeholder="Valor"
                        value={valor}
                        onChange={e => setValor(e.target.value)} 
                    />

                    <input 
                        placeholder="Descricao"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>

        </div>
    );
}