const connection = require('../database/connection')
const crypto = require('crypto');

module.exports = {

    async index (request, response){
        const realestate = await connection('realestate').select('*');
    
        return response.json(realestate);
    },

    async create(request, response){
        
        const {name, email} = request.body;
    
        const id = crypto.randomBytes(4).toString('HEX');
        
        await connection('realestate').insert({
            id,
            name,
            email,
        })
    
        return response.json({id});
    }     

};