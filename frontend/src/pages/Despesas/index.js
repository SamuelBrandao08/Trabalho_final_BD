import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import './style.css'

export default function Despesa() {
    const [despesas, setDespesa] = useState([]);

    const history = useHistory();

    const usuarioId = localStorage.getItem('userId'); 
    const usuarioNome = localStorage.getItem('userName');

    useEffect(() => {
        api.get('despesasList', {
            headers: {
                Authorization: usuarioId,
            }
        }).then(response => {
            setDespesa(response.data);
        })
    }, [usuarioId]);

    async function handleDeleteDespesa(id) {
        try {
            await api.delete(`despesas/${id}`, {
                headers: {
                    Authorization: usuarioId,
                }
            });

            setDespesa(despesas.filter(despesa => despesa.id !== id));
        } catch (err) {
            alert('Erro ao deletar despesa, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="despesa-container">
            <header>
                <span>Bem vinda, {usuarioNome}</span>

                <Link className="button" to="/despesa/new">Cadastrar nova despesa</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Despesas cadastradas</h1>

            <ul>
                {despesas.map(despesa => (
                    <li key={despesa.id_despesa}>

                    <strong>CATEGORIA:</strong>
                    <p>{despesa.nome}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(despesa.value)}</p>

                    <button onClick={() => handleDeleteDespesa(despesa.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
                ))}

                
            </ul>
        </div>
    );
}