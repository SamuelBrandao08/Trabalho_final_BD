const pool = require('../database/_database');

module.exports={

    //Funcao para somar as despesas do usuario em um determinado mes
    async somaDespesas(Request, Response){
        pool.connect(async function (err, client, done){

            const { mes } = Request.body
            const userId = Request.headers.authorization;
            
            const despesas = await client.query("select  sum(valor) from despesas d inner join categoria c using (id_categoria) where Extract('Month' From _data) = $1 and id_usuario = $2", [mes, userId]);
            
            done();

            return Response.json(despesas.rows);
        });
    },

     //Funcao para somar as despesas do usuario em um determinado mes ordenando por categoria   
    async somaDespesasCategoria(Request, Response){
        pool.connect(async function (err, client, done){

            const { mes } = Request.body
            const userId = Request.headers.authorization;
            
            const despesas = await client.query("select c.nome, sum(d.valor) as soma from despesas d inner join categoria c using (id_categoria) where Extract('Month' From _data) = $1 and id_usuario = $2 and d.id_categoria = c.id_categoria group by c.nome;", [mes, userId]);
            
            done();

            return Response.json(despesas.rows);
        });
    },

    // Somar o valor total de receitas cadastradas por mes
    async somaReceitas(Request, Response){
        pool.connect(async function (err, client, done){

            const userId = Request.headers.authorization;
            const { mes } = Request.body;
            
            const receitas = await client.query("select sum(valor) from receitas where Extract('Month' From _data) = $1 and id_usuario = $2", [mes, userId]);
            
            done();
            return Response.json(receitas.rows);
        });
    }

}