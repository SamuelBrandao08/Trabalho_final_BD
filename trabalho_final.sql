-- construcao do banco
create table if not exists usuario (
	id_usuario serial primary key,
	nome varchar (40) not null,
	senha varchar (12) not null unique
);

create table if not exists categoria (
	id_categoria serial primary key,
	nome varchar (40) not null,
	teto numeric (10,2),
	id_usuario int not null,
	unique (id_usuario, nome), 
	foreign key (id_usuario) references usuario (id_usuario) on delete cascade
);

create table if not exists despesas (
	id_despesas serial primary key,
    _data date not null default CURRENT_DATE,
    valor numeric (10,2) not null,
    id_categoria int not null,
    foreign key (id_categoria) references categoria (id_categoria) on delete cascade
);

create table if not exists receitas (
	id_receitas serial primary key,
	_data date not null default CURRENT_DATE,
	valor numeric (10,2) not null,
	descricao text,
	id_usuario int not null,
	foreign key (id_usuario) references usuario (id_usuario) on delete cascade
);



















