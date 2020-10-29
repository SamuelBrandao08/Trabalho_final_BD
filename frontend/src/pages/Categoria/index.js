import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import './style.css'

export default function Categoria() {
    const [categorias, setCategoria] = useState([]);

    const history = useHistory();

    const usuarioId = localStorage.getItem('userId'); 
    const usuarioNome = localStorage.getItem('userName');

    useEffect(() => {
        api.get('categoria', {
            headers: {
                Authorization: usuarioId,
            }
        }).then(response => {
            setCategoria(response.data);
        })
    }, [usuarioId]);

    async function handleDeleteCategoria(id) {
        try {
            await api.delete(`categoria/${id}`, {
                headers: {
                    Authorization: usuarioId,
                }
            });

            setCategoria(categorias.filter(categoria => categoria.id_categoria !== id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="listcategoria-container">
            <header>
                <span>Bem vinda, {usuarioNome}</span>

                <Link className="button" to="/categoria/new">Cadastrar nova categoria</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Categorias cadastradas</h1>

            <ul>
                {categorias.map(categoria => (
                    <li key={categoria.id_categoria}>

                    <strong>NOME:</strong>
                    <p>{categoria.nome}</p>

                    <strong>TETO:</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(categoria.value)}</p>

                    <button onClick={() => handleDeleteCategoria(categoria.id_categoria)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
                ))}

                
            </ul>
        </div>
    );
}