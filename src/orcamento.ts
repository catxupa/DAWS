import db from "./lib/db.js";
import { catalogoServico } from "./servico.js";
import type { pedidoServico, prestadorType, Servicotype } from "./util/types.js";

const pedido: pedidoServico = {
    cliente: "djoca",
    descricao: "Serviço de limpeza",
    horasEstimadas: 5,
    urgente: true,
};

// função para adicionar servico e HorasEstimadas
export function SelecionarServicos(nome: string) {
    for (let i = 0; i < catalogoServico.length; i++) {
        if (catalogoServico[i]?.nome === nome) {
            servicoSelecionados.push(catalogoServico[i]!);
            return true;
        }
        return true;
    }
}

const taxaUrgencia: number = 0.3;
const minimodesconto: number = 100;
const percentagemDeDesconto: number = 0.1;

const servicoSelecionados: Servicotype[] = [];
const prestadoresDeServicos: prestadorType[] = []
const prestadoresDeSelecionados: prestadorType[] = []



// função para processar o pedido
export function processarPedido(pedido: pedidoServico, precoHora: number): number {
    let total: number;
    if (pedido.urgente) {
        total = pedido.horasEstimadas * precoHora;
        total = total + total * taxaUrgencia;
    } else {
        total = pedido.horasEstimadas * precoHora;
    }
    return total;
}

// funcao para criar prestador de servicos
export function criarPrestadorDeServicos(novoPrestador: prestadorType) {
    //verificar se o prestador ja esta no array
    prestadoresDeServicos.map((prestadorExistente: prestadorType) => {
        if (prestadorExistente.nome === novoPrestador.nome) {
            // se o prestador ja existir , retorna uma mensagem de erro
            return {
                status: false,
                message: "ja existe um prestador de servico com este nome",
                data: null
            }
        }
    })

    // se o prestador nao existir, adiciona o prestador ao array
    prestadoresDeServicos.push(novoPrestador)
    return {
        status: true,
        message: "prestador adicionado com sucesso",
        data: novoPrestador
    }
}

// funcao para editar prestador de serviço
export function editarPrestadorDeServico(nomeDoPrestador: string, novoDadosDoPrestador: prestadorType) {
    // encontrar o prestador de servico e editar na minha lista 
    // ciclo que percorre a lista e verifica o nome do prestador de servico

    prestadoresDeServicos.map((prestadorExistente: prestadorType) => {
        if (prestadorExistente.nome === nomeDoPrestador) {
            prestadorExistente.nome = novoDadosDoPrestador.nome
            prestadorExistente.precoHora = novoDadosDoPrestador.precoHora
            prestadorExistente.profissao = novoDadosDoPrestador.profissao
            prestadorExistente.minimoParaDesconto = novoDadosDoPrestador.minimoParaDesconto
            prestadorExistente.percentagemDesconto = novoDadosDoPrestador.percentagemDesconto
            prestadorExistente.taxaUrgencia = novoDadosDoPrestador.taxaUrgencia

            return {
                status: true,
                message: "prestador de servico editado com sucesso",
                data: prestadorExistente
            }
        }
    })


    // se nao existir nenhum prestador como nome recebido, retorna retorna uma mensagem de erro
    return {
        status: false,
        message: "nao existe nenhum prestador de servico com este nome",
        data: null
    }
}


// apagar prestador de servico
export function apagarPrestadorDeServico(nomePrestador: string) {
    const novoArrayPrestadorDeServico: prestadorType[] = []
    // ciclo que precore a lista de prestadores
    for (let i = 0; i < prestadoresDeServicos.length; i++) {
        //if para verificar se o mome do prestador for igual ao nome  recebido 
        if (nomePrestador === prestadoresDeServicos[i]?.nome) {
            // se encontrarem remover o prestador 
            novoArrayPrestadorDeServico.push(prestadoresDeServicos[i]!)
            // retornar mensagem de sucesso
            return {
                status: true,
                mensagem: "prestador apagado com sucesso",
                data: novoArrayPrestadorDeServico
            }
            // se nao encontrar retornar mensagem de erro
        } else {
            return {
                status: false,
                mensagem: "Prestador nao encontrado",
                data: null
            }
        }
    }
}

// funcao para obter um prestador de servico pelo nome
export function obterPrestadorDeServico(nomePrestador: string) {
    for (let i = 0; i < prestadoresDeServicos.length; i++) {
        if (prestadoresDeServicos[i]?.nome === nomePrestador) {
            return prestadoresDeServicos[i]!
        }
    }
    return null
}


// funcao para selecionar prestador de servico
export function selecionarPrestadorDeServico(nomeDoprestador: string) {
    // ciclo for que percore o array prestadoresDeServico
    for (let i = 0; i < prestadoresDeServicos.length; i++) {
        // if que verifica o item [i] do array e igual ao nome recebido
        if (prestadoresDeServicos[i]?.nome === nomeDoprestador) {
            // se for igual, adiciona o item [i] ao array prestadoresSelecionados.push
            prestadoresDeSelecionados.push(prestadoresDeServicos[i]!)
            // retorna verdadeiro
            return true
        }
        // senao retorna falso
        return false
    }
}

// funcao para atualizar orcamento
export async function updateOrcamento(id: string, updatedOrcamento: prestadorType) {
    try {
        const query = "UPDATE tabela_orcamentos SET cliente=?, servico=?, horas_estimadas=?, urgente=?, preco_hora=?, taxa_urgencia=?, minimo_desconto=?, percentagem_desconto=?, total=?, created_at=?, update_at=? WHERE id=?"
        const values = [
            updatedOrcamento.nome,
            updatedOrcamento.profissao,
            updatedOrcamento.precoHora,
            updatedOrcamento.taxaUrgencia,
            updatedOrcamento.minimoParaDesconto,
            updatedOrcamento.percentagemDesconto,
            new Date(),
            id
        ]
        const [rows] = await db.execute(query, values)
        return rows
    } catch (error) {
        console.log({ "error": error })
        return null
    }
}


// calcular o orçamento
export function calcularOrcamento(pedido: pedidoServico) {
    let totalBruto: number = 0;
    let totalFinal: number = 0;

    servicoSelecionados.map((servico: Servicotype) => {
        let totalDoServico: number = servico.precoHora * pedido.horasEstimadas;
        totalBruto = totalBruto + totalDoServico;
    })

    totalFinal = totalBruto;

    if (pedido.urgente) {
        totalFinal = totalBruto + (totalBruto * 0.3)
    }
    if (totalBruto >= minimodesconto) {
        totalFinal = totalFinal - (totalFinal * percentagemDeDesconto);
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