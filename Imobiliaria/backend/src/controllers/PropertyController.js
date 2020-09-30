const connection = require('../database/connection');

module.exports = {
  
    async index(request, response){
        const { page = 1 } = request.query;

        const [count] = await connection('property').count();

        const property = await connection('property')
            .join('realestate', 'realestate.id', '=', 'property.realestate_id')
            .limit(2)
            .offset((page -1 ) * 2)    
            .select(['property.*', 
            'realestate.name', 
            'realestate.email']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(property);
    }, 

    async create(request, response){
        const{ tipo, bairro, endereco, quartos, suites, salas, vagas, area, armarios, descricao, aluguel, andar, portaria, condominio} = request.body;
        const realestate_id = request.headers.authorization;

        const [id] = await connection('property').insert({
            tipo,
            bairro,
            endereco,
            quartos,
            suites,
            salas,
            vagas,
            area,
            armarios,
            descricao,
            aluguel,
            andar,
            portaria,
            condominio,
            realestate_id  
        });

        return response.json({ id });
    },
    async delete(request, response){
        const { id } = request.params;
        const realestate_id = request.headers.authorization;
         
        const property = await connection('property')
            .where('id', id)
            .select('realestate_id')
            .first();
        
        if(property.realestate_id !== realestate_id) {
            return response.status(401).json({ error: 'operation not permitted' });
        }

        await connection('property').where('id', id).delete();

        return response.status(204).send();  
    }

};