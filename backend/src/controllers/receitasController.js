const pool = require('../database/_database');

module.exports={

    // Cadastrar uma nova receita
    async create(Request, Response){
        pool.connect(async function (err, client, done){

            const { valor, descricao } = Request.body;
            const userId = Request.headers.authorization;
        
            
            const queryCreate = "insert into receitas (valor, descricao, id_usuario) values ($1, $2, $3)"
            await client.query(queryCreate, [valor, descricao, userId])
            
            done();
            return Response.status(204).send();
        });
    },

    // Listar todas as receitas do usuario agrupando por mes
    async list(Request, Response){
        pool.connect(async function (err, client, done){

            const userId = Request.headers.authorization;
            const { mes } = Request.body
            console.log(mes);
            
            const receitas = await client.query("select * from receitas where Extract('Month' From _data) = $1 and id_usuario = $2", [mes, userId]);
            
            console.log(receitas.rows);
            
            done();
            return Response.json(receitas.rows);
        });
    },

    // Deletar receitas
    async delete(Request, Response){
        pool.connect(async function (err, client, done){

            const { id } = Request.params;
            const userId = Request.headers.authorization;
           

            const receitas = await client.query("select id_usuario from receitas where id_receitas = $1 ", [id] );
            console.log(receitas.rows[0].id_usuario, userId);

            if (receitas.rows[0].id_usuario != userId ) {
                return Response.status(401).json({ error: 'Operation not permited.'});
            }

            const queryDelete = "delete from receitas where id_receitas = $1"
            await client.query(queryDelete, [id])

            done();
            return Response.status(204).send();
        });
     },

     // Somar o valor total de receitas cadastradas por mes
     async soma(Request, Response){
        pool.connect(async function (err, client, done){

            const userId = Request.headers.authorization;
            const { mes } = Request.body;
            
            const receitas = await client.query("select sum(valor) from receitas where Extract('Month' From _data) = $1 and id_usuario = $2", [mes, userId]);
            
            console.log(receitas.rows);
            
            done();
            return Response.json(receitas.rows);
        });
    }



}