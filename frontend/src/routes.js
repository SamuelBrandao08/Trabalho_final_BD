import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Login from './pages/Login';
import Register from './pages/Register'

import Profile from './pages/Profile'

import Categoria from './pages/Categoria'
import NovaCategoria from './pages/Categoria/NovaCategoria'

import Receitas from './pages/Receitas'
import NovaReceita from './pages/Receitas/NovaReceita'

import Despesas from './pages/Despesas'
import NovaDespesa from './pages/Despesas/NovaDespesa'


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                
                <Route path="/profile" component={Profile} />
                <Route path="/register" component={Register} />

                <Route path="/categoria" component={Categoria} />
                <Route path="/categoria" component={NovaCategoria} />

                <Route path="/receitas" component={Receitas} />
                <Route path="/receitas" component={NovaReceita} />

                <Route path="/despesas" component={Despesas} />
                <Route path="/despesas" component={NovaDespesa} />

            </Switch>
        </BrowserRouter>
    );
}