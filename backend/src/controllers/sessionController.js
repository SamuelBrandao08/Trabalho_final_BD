const pool = require('../database/_database');

module.exports = {

    async create(Request, Response) {
        pool.connect(async function (err, client, done){
            const {nome, senha} = Request.body
            
            const result = await client.query("select id_usuario, nome from usuario where nome = $1 and senha = $2" , [nome, senha]);
            
            if (result.rowCount == 0) {
                return Response.status(400).json({ error: 'User not exist.' });
            }

            done();
            
            return Response.json(result.rows);
        });
 
    }

};