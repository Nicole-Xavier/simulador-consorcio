document.addEventListener("DOMContentLoaded", function () {
    console.log("O script.js foi carregado!");

    // Selecionando o formulário e os campos de entrada
    const form = document.getElementById("consorcioForm");
    const valorCreditoInput = document.getElementById("valorCredito");
    const prazoInput = document.getElementById("prazo");
    const resultadoDiv = document.getElementById("resultado");
    const parcelaSpan = document.getElementById("parcela");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o recarregamento da página

        // Pegando os valores digitados
        const valorCredito = parseFloat(valorCreditoInput.value);
        const prazo = parseInt(prazoInput.value);

        if (isNaN(valorCredito) || isNaN(prazo) || valorCredito <= 0 || prazo <= 0) {
            alert("Por favor, insira valores válidos.");
            return;
        }

        // Simulação: Juros de 1% ao mês sobre o saldo devedor
        const taxaJuros = 0.01;
        let saldoDevedor = valorCredito;
        let parcela = 0;

        for (let i = 0; i < prazo; i++) {
            saldoDevedor += saldoDevedor * taxaJuros; // Aplicando juros ao saldo
        }
        
        parcela = saldoDevedor / prazo;

        // Exibindo o resultado
        parcelaSpan.textContent = `R$ ${parcela.toFixed(2)}`;
        resultadoDiv.classList.remove("hidden");
    });
});
