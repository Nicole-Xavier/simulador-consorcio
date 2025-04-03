const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

//Middleware para permitir JSON e CORS
app.use(express.json());
app.use(cors()); 

//Rota teste
app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});

//Rota para simular consórcio
app.post('/simular', (req,res) => {
    console.log('Dados recebidos:', req.body);

    const {valorCredito, prazo} = req.body;

    if(!valorCredito || !prazo){
        return res.status(400).json({erro:'Informe valor do crédito e prazo.'});
    }

    const taxaAdm = 0.15; //Taxa administrativa de 15%
    const valorFinal = valorCredito * (1 + taxaAdm);
    const parcela = valorFinal / prazo;

    res.json({parcela: parcela.toFixed(2)});
})
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

module.exports = app;
