const pool = require('../database/_database');

module.exports={

    //Funcao para criar novo usuario
    async create(Request, Response){
        pool.connect(async function (err, client, done){

            const {nome, senha} = Request.body;
        
            const queryCreate = "insert into usuario (nome, senha) values ($1, $2)"
            await client.query(queryCreate, [nome, senha] );

            const result = await client.query("select id_usuario from usuario where nome = $1 and senha = $2 ", [nome, senha]);   

            done();
            
            return Response.json(result.rows);
        });
    },

    // Funcao para listar todos os usuarios
    async list (Request, Response){
        pool.connect(async function (err, client, done){
        
            const user = await client.query("select * from usuario");

            done();
            
            return Response.json(user.rows);
        });
    },

    // Funcao para atualizar os dados de um usuario
    async update (Request, Response) {
        pool.connect(async function (err, client, done){
        
            const {nome, senha} = Request.body;
            const userId = Request.headers.ahthorization;

            const queryUpdate = "update usuario set nome=$1, senha=$2 where id_usuario = $2"
            await client.query(queryUpdate, [nome, senha, userId])

            done();

            return Response.status(200).send();
        });
    },

    //Funcao para deletar um usuario passando o id
    async delete(Request, Response){
        pool.connect(async function (err, client, done){

            const { id } = Request.body
            const userId = Request.headers.authorization;
                        
            if (userId != id) {
                return Response.status(401).json({ error: 'Operation not permited.'});
            }

            const queryDelete = "delete from usuario where id_usuario = $1"
            await client.query(queryDelete, [userId])

            done();

            return Response.status(204).send();
        });
    }

    

};