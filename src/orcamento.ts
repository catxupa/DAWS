import { catalogoServico } from "./servico.js";
import type { pedidoServico, Servicotype } from "./util/types.js";

const pedido: pedidoServico = {
    cliente: "Ismar",
    descricao: "Serviço de limpeza",
    horasEstimadas: 5,
    urgente: true,
};
const servicoSelecionados: Servicotype[] = [];

// função para adicionar servico e HorasEstimadas
export function SelecionarServicos(nome: string) {
    for (let i = 0; i < catalogoServico.length; i++) {
        if (catalogoServico[i]?.nome === nome) {
            servicoSelecionados.push(catalogoServico[i]!);
            return true;
        }
        return false;
    }
}

const taxaUrgencia: number = 0.3;
const minimodesconto: number = 100;
const peecentagemDeDesconto: number = 0.1;

// função para processar o pedido
function processarPedido(pedido: pedidoServico, precoHora: number): number {
    let total: number;
    if (pedido.urgente) {
        total = pedido.horasEstimadas * precoHora;
        total = total + total * taxaUrgencia;
    } else {
        total = pedido.horasEstimadas * precoHora;
    }
    return total;
}

// calcular o orçamento
export function calcularOrcamento(pedido: pedidoServico) {
    let totalBroto: number = 0;
    let totalFinal: number = 0;

    servicoSelecionados.map((servico: Servicotype) => {
        let totalDoServico: number = servico.precoHora * pedido.horasEstimadas;
        totalBroto = totalBroto + totalDoServico;
    })

    totalFinal = totalBroto;

    if (pedido.urgente) {
        totalFinal = totalBroto + (totalBroto * 0.3)
    }
    if (totalBroto >= minimodesconto) {
        totalFinal = totalFinal - (totalFinal * peecentagemDeDesconto);
    }
    return totalFinal;
    /*
    uegente:;true
    taxa de urgencia: 0.3
    totabroto: 100
    totaltaxa:100*0.3=30
    totalfinal: 100+30=130  

    totalbroto: 100
    total broto apos urgencia: 150
    minimo desconto: 100
    percentual desconto: 0.1
    desconto sobre taxa final: 150*0.1=15
    desconto sobre taxa broto: 100*0.1=10
    
    */
}