const { Payment, Simulation } = require('../models');

const paymentController = {
    async createPayment (req, res){
        try {
            const {
                simulationId,
                valorPago,
                dataPagamento,
                status,
                formaPagamento,
                descricao
            } = req.body;
            const newPayment = await Payment.create({
                simulationId,
                valorPago,
                dataPagamento,
                status,
                formaPagamento,
                descricao  
            });
            res.status(201).json(newPayment);
        } catch (error) {
            res.status(500).json({error: 'Erro ao registrar pagamento', details: error.message});

        }
    },

    async getAllPayments (req, res){
        try {
            const payments = await Payment.findAll({
                include: [
                    { model: Simulation, as: 'simulation' }
                ]
            });
            return res.json(payments);
            
        } catch (error) {
            res.status(500).json({error:'Erro ao buscar pagamentos', details: error.message});
              
        }
    },

    async getPaymentById (req, res){
        try {
            const { id } = req.params;
            const payment = await Payment.findByPk(id, {
                include: [ 
                    {model: Simulation, as: 'simulation'}
                ]
            });
            if(!payment) return res.staus(404).json({error: 'Pagamento não encontrado', details: error.message});
            res.json(payment);          
        } catch (error) {
            res.staus(500).json({error:'Erro ao buscar pagamento', details: error.message});

        }
    },

    async updatePayment (req, res){
        try {
            const { id } = params;
            const {
                simulationId,
                valorPago,
                dataPagamento,
                status,
                formaPagamento,
                descricao
            } = req.body;
            const payment == await Payment.findByPk(id);
            if(!payment) return res.status(404).json({error: 'Pagamento não encontrado', details: error.message});

            await payment.update({
                simulationId,
                valorPago,
                dataPagamento,
                status,
                formaPagamento,
                descricao
            });
            return res.json(payment);
            
        } catch (error) {
            res.status(500).json({error: 'Erro ao atualizar pagamento', details: error.message});

        }
    },
    
    async deletePayment(req, res) {
        try {
          const { id } = req.params;
    
          const payment = await Payment.findByPk(id);
    
          if (!payment) {
            return res.status(404).json({ error: 'Pagamento não encontrado.' });
          }
    
          await payment.destroy();
          return res.status(204).send();
        } catch (error) {
          return res.status(500).json({
            error: 'Erro ao excluir pagamento.',
            details: error.message
          });
        }
    }
};

module.exports = paymentController;