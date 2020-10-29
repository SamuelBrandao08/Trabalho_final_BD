import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import './style.css'

export default function R() {
    const [receitas, setReceita] = useState([]);

    const history = useHistory();

    const usuarioId = localStorage.getItem('userId'); 
    const usuarioNome = localStorage.getItem('userName');

    useEffect(() => {
        api.get('receitas', {
            headers: {
                Authorization: usuarioId,
            }
        }).then(response => {
            setReceita(response.data);
        })
    }, [usuarioId]);

    async function handleDeleteIncome(id) {
        try {
            await api.delete(`receitas/${id}`, {
                headers: {
                    Authorization: usuarioId,
                }
            });

            setReceita(receitas.filter(receita => receita.id !== id));
        } catch (err) {
            alert('Erro ao deletar receita, tente novamente.');
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

                <Link className="button" to="/recetas/new">Cadastrar nova receita</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Receitas cadastradas</h1>

            <ul>
                {receitas.map(receita => (
                    <li key={receita.id_receitas}>

                    
                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(receita.value)}</p>

                    <strong>DESCRICAO:</strong>
                    <p>{receita.descricao}</p>

                    <button onClick={() => handleDeleteIncome(receita.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
                ))}

                
            </ul>
        </div>
    );
}