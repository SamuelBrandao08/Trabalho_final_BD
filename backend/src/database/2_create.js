const client = require('./_database');

async function createTables(){
    await client.connect()

    await client.query(`create table if not exists usuario (
        id serial primary key,
        nome varchar (40),
    );`)

    await client.query(`create table if not exists categoria (
        id serial primary key,
        nome varchar (40) not null,
        teto real,
        id_usuario int,
        foreign key (id_usuario) references usuario (id)
    );`)

    await client.query(`create table if not exists despesas (
        _data date not null default current_date,
        valor real,
        id_usuario int,        
        id_categoria int,
        primary key (id_usuario, id_categoria),
        foreign key (id_usuario) references usuario (id),
        foreign key (id_categoria) references categoria (id)
    );`)

    await client.query(`create table if not exists receitas (
        _data date not null default current_date,
        valor real not null,
        id_usuario int not null,
        foreign key (id_usuario) references usuario (id)
    );`)
    
    await client.end()

    console.log("Tabelas criadas com sucesso!");
}

createTables();