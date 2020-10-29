import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './style.css';

import api from '../../../services/api';

export default function NovaDespesa() {
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');

    const userId = localStorage.getItem('userId');

    const history = useHistory();

    async function handleNewExpense(e) {
        e.preventDefault();

        const data = {
            nome,
            valor,
        };
            
        try {
            await api.post('despesas', data, {
                headers: {
                    Authorization: userId,
                }
            })    
            history.push('/despesasList');
        } catch (err) {
            alert('Erro ao cadastrar a despesa, tente novamente.');
        }
    }

    return (
        <div className="new-expense-container">
            <div className="content">
                <section>

                    <h1>Cadastrar nova despesa</h1>
                    <p>Descreva o caso detalhadamente.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar
                    </Link>
                </section>

                <form onSubmit={handleNewExpense}>
                    <input 
                        placeholder="Nome da categoria"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    
                    <input 
                        placeholder="Valor"
                        value={valor}
                        onChange={e => setValor(e.target.value)} 
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>

        </div>
    );
}