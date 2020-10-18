const db = require('./_database');

async function insertData(){
    await db.connect()
    // inserir dados do usuario

    const queryUsuario = "insert into usuario (nome) values ($1)"

    await db.query(queryUsuario, ['Samuel Brandao'])
    await db.query(queryUsuario, ['Gabriel Brandao'])

    // inserir dados das categorias

    const queryCategoria = "insert into categoria (nome, teto, id_usuario) values ($1, $2, $3)"

    await db.query(queryCategoria, ['alimentacao', 600, 1])
    await db.query(queryCategoria, ['lazer', 200, 1])
    await db.query(queryCategoria, ['transporte', 350, 2])
    await db.query(queryCategoria, ['alimentacao', 450, 2])

    const queryDespesas = "insert into despesas (valor, id_usuario, id_categoria) values ($1, $2, $3)"

    await db.query(queryCategoria, [30, 1, 1])
    await db.query(queryCategoria, [200, 1, 2])
    await db.query(queryCategoria, [350, 2, 1])
    await db.query(queryCategoria, [450, 2, 2])

    const queryReceitas = "insert into receitas (valor, id_usuario) values ($1, $2)"

    await db.query(queryCategoria, [3000, 1])
    await db.query(queryCategoria, [2000, 2])

    await db.end();

    console.log("Dados Inseridos com sucesso!");
}

insertData();
