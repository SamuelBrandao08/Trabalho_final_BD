const pool = require('../database/_database');

module.exports={

    // Funcao para cadastrar uma nova despesa       PRECISA REFAZER  testar?
    async create(Request, Response){
        pool.connect(async function (err, client, done){
            const { id_categoria, valor } = Request.body;
            const userId = Request.headers.authorization;
            console.log(id_categoria, valor);

            //const id_categoria  = await client.query(`select categoria.id_categoria from categoria where categoria.nome = ${[nome]} and categoria.categoria.id_usuario = $2`, [userId])
            console.log( id_categoria.rows);
            
            const queryCreate = "insert into despesas (valor, id_categoria) values ($1, $2)"
            await client.query(queryCreate, [valor, id_categoria])     // id_categoria.rows[0].id
            
            done();
            return Response.status(204).send();
        });
    },

    // Funcao para listar todas as despesas de cada usuario   
    /*async list (Request, Response){
        pool.connect(async function (err, client, done){

            const userId = Request.headers.authorization;
            const despesas = await client.query("select * from despesas, categoria where categoria.id_usuario = $1", [userId]);
            
            
            done();
            return Response.json(despesas.rows);
        });
    },*/

    //Funcao para listar as despesas de um determinado mes     
    async list(Request, Response){
        pool.connect(async function (err, client, done){

            const userId = Request.headers.authorization;
            const { mes } = Request.body
            console.log(mes, userId);
            
            const despesas = await client.query("select id_despesas, nome, _data, valor from despesas inner join categoria using (id_categoria) where Extract('Month' From _data) = $1 and categoria.id_usuario = $2", [mes, userId]);
            
            done();
            
            return Response.json(despesas.rows);
        });
        
    },

     //Funcao para listar as despesas de um determinado mes ordenando por categoria      PRECISA REFAZER
    async listCategoria(Request, Response){
        pool.connect(async function (err, client, done){

            const userId = Request.headers.authorization;
            const { mes, nome } = Request.body
           
            const despesas = await client.query("select d.id_despesas, d._data, d.valor, c.nome  as soma from despesas d inner join categoria c using (id_categoria) where Extract('Month' From _data) = $1 and id_usuario = $2 and d.id_categoria = c.id_categoria and c.nome = $3;", [mes, userId, nome]);
            
            done();
            return Response.json(despesas.rows);
        });
    },

    //Funcao para deletar um despesa                              
    async delete(Request, Response){
        pool.connect(async function (err, client, done){

            const { id } = Request.params;
            const userId = Request.headers.authorization;

            const despesas = await client.query("select c.id_usuario from categoria c, despesas d where d.id_categoria = c.id_categoria and d.id_despesas = $1 ", [id] );
            console.log(despesas.rows[0].id_usuario);

            if (despesas.rows[0].id_usuario != userId ) {
                return Response.status(401).json({ error: 'Operation not permited.'});
            }

            const queryDelete = "delete from despesas where id_despesas = $1"
            await client.query(queryDelete, [id])

            done();
            return Response.status(204).send();
        });
    },

     //Funcao para somar as despesas do usuario em um determinado mes
     async soma(Request, Response){
        pool.connect(async function (err, client, done){

            const { mes } = Request.body
            const userId = Request.headers.authorization;
            
            const despesas = await client.query("select  sum(valor) from despesas d inner join categoria c using (id_categoria) where Extract('Month' From _data) = $1 and id_usuario = $2", [mes, userId]);
            
            done();

            return Response.json(despesas.rows);
        });
    },

     //Funcao para somar as despesas do usuario em um determinado mes ordenando por categoria   
    async somaCategoria(Request, Response){
        pool.connect(async function (err, client, done){

            const { mes } = Request.body
            const userId = Request.headers.authorization;
            
            const despesas = await client.query("select c.nome, sum(d.valor) as soma from despesas d inner join categoria c using (id_categoria) where Extract('Month' From _data) = $1 and id_usuario = $2 and d.id_categoria = c.id_categoria group by c.nome;", [mes, userId]);
            
            done();

            return Response.json(despesas.rows);
        });
    }

};