export function calcularParcela(valorCredito, prazo) {
    const taxaAdministrativa = 0.15; // 15% de taxa administrativa total
    const valorFinal = valorCredito * (1 + taxaAdministrativa);
    return (valorFinal / prazo).toFixed(2);
}
