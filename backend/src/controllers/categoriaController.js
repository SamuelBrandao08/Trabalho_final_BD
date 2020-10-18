const pool = require('../database/_database');

module.exports={

    // Criar nova categoria
    async create(Request, Response){
        pool.connect(async function (err, client, done){
            
            const { nome, teto } = Request.body;
            const userId = Request.headers.authorization;
            
            const queryCreate = "insert into categoria ( nome, teto, id_usuario) values ($1, $2, $3)"
            await client.query(queryCreate, [nome, teto, userId])
            
            done();

            return Response.status(204).send();
        });
    },

    // Listar todas as categorias de um usuario
    async list (Request, Response){
        pool.connect(async function (err, client, done){

            const userId = Request.headers.authorization;
            const categoria = await client.query("select * from categoria where id_usuario = $1", [userId]);
            
            done();

            return Response.json(categoria.rows);
        });
    },

    // Atualizar uma categoria
    async update (Request, Response) {
        pool.connect(async function (err, client, done){
        
            const {teto} = Request.body;
            const userId = Request.headers.ahthorization;

            const queryUpdate = "update usuario set teto=$1 where id_usuario = $2"
            await client.query(queryUpdate, [teto, userId])

            done();

            return Response.json();
        });
    },

    // Deletar uma categoria
    async delete(Request, Response){
        pool.connect(async function (err, client, done){

            const { id } = Request.params;
            const userId = Request.headers.authorization;

            const categoria = await client.query("select id_usuario from categoria where id = $1 ", [id] );

            if (categoria.rows[0].id_usuario != userId ) {
                return Response.status(401).json({ error: 'Operation not permited.'});
            }

            const queryDelete = "delete from categoria where id = $1"
            await client.query(queryDelete, [id])

            done();
            return Response.status(204).send();
        });

     }

};  