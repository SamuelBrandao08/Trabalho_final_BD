import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import api from '../../services/api';
import './style.css';

export default function Profile() {
    const [receitas, setReceita] = useState([]); 
    const [despesas, setDespesa] = useState([]); 
    //const [saldo, setSaldo] = useState([]);

    const history = useHistory();


    const usuarioId = localStorage.getItem('userId');
    const usuarioNome = localStorage.getItem('userName');

    useEffect(() => {
        api.get('profile','profile1', {
            headers: {
                Authorization: usuarioId,
            }
        }).then(Response => {
            setReceita(Response.data);
            setDespesa(Response.data);
        })

        // api.get('profile1', {
        //     headers: {
        //         Authorization: usuarioId,
        //     }
        // }).then(Response => {
        //     setDespesa(Response.data);
        // })
    }, [usuarioId]);

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (

        <div className="profile-container">
            <header>
                <span>Bem vindo(a), {usuarioNome}</span>

                <Link className="button" to="/categoria">Categorias</Link>
                
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>
            
            <main>
                <strong>SALDO</strong>
                <p>{Intl.NumberFormat('pt-BR', { style:'currency', currency: 'BRL' }).format()}</p>

                <Link className="button" to="/receitas">
                    <strong>RECEITAS</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style:'currency', currency: 'BRL' }).format(receitas.sum)}</p>
                </Link>

                <Link className="button" to="/despesas/list">
                    <strong>DESPESAS</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style:'currency', currency: 'BRL' }).format(despesas.sum)}</p>
                </Link>
            </main>
        </div>

    );

}