const { Simulation, User, Consortium } = require('../models');

const simulationController = {
    //Criar simulação
    async createSimulation (req, res) {
        try {
            const { userId, consortiumId, parcelaMensal } = req.body;
            const newSimulation = await Simulation.create({userId, 
                consortiumId, 
                parcelaMensal});
            res.status(201).json(newSimulation);

        } catch (error) {
            res.status(500).json({error: 'Erro ao criar simulação', details: error.message});
            
        }

    },
    //Listar todas as simulações
    async getAllSimulations (req, res) {
        try {
            const simulations = await Simulation.findAll({
                include: [
                    { model: User, as:'user' }
                    { model: Consortium, as:'consortium '}
                ]
            })
            res.status(200).json(simulations);

        } catch (error) {
            res.status(500).json({error:'Erro ao buscar simulações', details: error.message});
            
        }

    },
    //Buscar simulação por ID
    async getSimulationById (req, res) {
        try {
            const simulation = await Simulation.findByPk({
                include: [
                    { model: User, as:'user' }
                    { model: Consortium, as:'consortium '}
                ]
            })
            if (!simulation) return res.status(404).json({error: 'Simulação não encontrada', details: error.message});
            res.status(200).json(simulation)
            
        } catch (error) {
            res.status(500).json({error:'Erro ao buscar simulação',details: error.message});

        }

    },
    //Atualizar simulação
    async updateSimulation (req, res) {
        try {
            const { id } = req.params;
            const { userId, consortiumId, parcelaMensal } = req.body;
            const simulation = await Simulation.findByPk(id);
            if (!simulation) return res.status(404).json({error:'Simulação não encontrada',details: error.message});
            
            await simulation.update({ userId, consortiumId, parcelaMensal});
            res.status(200).json(simulation);
            
        } catch (error) {
            res.status(500).json({error: 'Erro ao atualizar simulação',details: error.message});
           
        }

    },
    //Deletar simulação
    async deleteSimulation (req, res) {
        try {
            const { id } = req.params;
            const simulation = Simulation.findByPk(id);
            if(!simulation) return res.status(404).json({error:'Simulação não encontrada', details: error.message});
            
            await simulation.destroy();
            res.status(204).send();

        } catch (error) {
            res.status(500).json({error:'Erro ao deletar simulação', details: error.message});
            
        }

    }

};

module.exports = simulationController;
