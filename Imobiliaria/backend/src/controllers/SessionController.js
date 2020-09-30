const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const{ id } = request.body;

        const realestate = await connection('realestate')
            .where('id', id)
            .select('name')
            .first();
        
        if(!realestate){
            return response.status(400).json({ error: 'no Real Estate found.' });
        }

        return response.json(realestate);
    }
}