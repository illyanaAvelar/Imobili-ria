const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const realestate_id = request.headers.authorization;

        const property = await connection('property')
        //onde tipo = tipo selecionado
            .where('realestate_id', realestate_id)
            .select('*');

        return response.json(property);
    } 
}