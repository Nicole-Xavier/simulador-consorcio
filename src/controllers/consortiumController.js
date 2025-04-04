const { ConnectionRefusedError } = require('sequelize');
const { Consortium } = require('../models');
const { getById } = require('./UserController');

const consortiumController = {
    //Criar consórcio
    async createConsortium (req,res) 
    {
        try {
            const { nome, valorTotal, prazoMeses, taxaAdministrativa } = req.body;
            const newConsortium = await Consortium.create({ 
                nome, 
                valorTotal, 
                prazoMeses, 
                taxaAdministrativa
            });
            res.status(201).json(newConsortium);

        } catch (error) {
            res.status(500).json({error: 'Erro ao cadastrar consórcio', details: error.message});   
            
        }
    },

    //Consultar todos os consórcios
    async getAllConsortiums (req, res)
    {
        try {
            const { id } = req.params;
            res.status(200).json(Consortium);

        } catch (error) {
            res.status(500).json({error: 'Erro ao buscar consórcios', details: error.message});
       
        }
    },
    //Procurar consórcio por ID
    async getConsortiumById (req, res)
    {
        try {
            const { id } = req.params;
            const consortium = await Consortium.findByPk(id);
            if (!consortium) return res.status(404).json({error: 'Consórcio não encontrado', details: error.message});
            res.status(200).json(consortium);

        } catch (error) {
            res.status(500).json({error: 'Erro ao buscar consórcio',details: error.message});
  
        },
    }
    //Atualizar consórcio
    async updateConsortium(req, res)
    {
        try {
            const { id } = req.params;
            const { nome, valorTotal, prazoMeses, taxaAdministrativa } = req.body;
            const consortium = await Consortium.findByPk(id);
            if(!consortium) return res.status(404).json({error: 'Consórcio não encontrado', details: error.message});

            await consortium.update({ nome, valorTotal, prazoMeses, taxaAdministrativa });
            res.status(200).json(Consortium);
                        
        } catch (error) {
            res.status(500).json({error: 'Erro ao atualizar consórcio', details: error.message});

        }
    },
    //Deletar consórcio

    async deleteConsortium (req, res)
    {
        try {
            const { id } = req.params;
            const consortium = Consortium.findByPk(id);
            if (!consortium) return res.status(404).json({error: 'Consórcio não encontrado', details: error.message});
            
            await consortium.detroy();
            res.status(204).send();

        } catch (error) {
            res.status(500).json({error: 'Erro ao deletar usuário', details: error.message});

        }
    }
};

module.exports = consortiumController;