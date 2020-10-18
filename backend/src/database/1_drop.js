const pool = require('./_database');

async function dropTables(){
    pool.connect(async function (err, client, done){
        await client.query(`drop table usuario cascade`)
        await client.query(`drop table categoria cascade`)
        await client.query(`drop table despesas cascade`)
        await client.query(`drop table receitas cascade`)
        done();

        console.log("Tabelas removidas com sucesso!");
    });
}

dropTables();