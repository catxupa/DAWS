
import type { responseType, Servicotype } from "./util/types.js";

export let catalogoServico: Servicotype[] = [
    {
        nome: "Luis",
        precoHora: 50,
        minimiDesconto: 3,
        percentagemDesconto: 10,
        categoria: "Limpeza",
    },
];

// adicionar um serviço
export function adicionarServico(NovoServico: Servicotype): responseType {
    // 1. Validação de Dados
    if (NovoServico.nome.trim() === "") {
        console.log("Erro: O nome do serviço não pode ser vazio.");
        return {
            success: false,
            message: "O nome do serviço não pode ser vazio.",
            data: "erro:o nome do serviço não pode ser vazio."
        }
    }
    if (NovoServico.precoHora <= 0) {
        console.log("Erro: O preço por hora deve ser um número positivo.");
        return {
            success: false,
            message: "O preço por hora deve ser um número positivo.",
            data: "erro:O preço por hora deve ser um número positivo."
        }
    }
    for (let i = 0; i < catalogoServico.length; i++) {
        if (catalogoServico[i]?.nome === NovoServico.nome) {
            console.log("Erro: O serviço já existe no catálogo.");
            return ({
                success: false,
                message: "O serviço já existe no catálogo.",
                data: "erro:O serviço já existe no catálogo."
            })
        }
    }
    // 3. Se passou por todos os "filtros" acima, adicionamos
    catalogoServico.push(NovoServico);
    return ({
        success: true,
        message: "Serviço adicionado com sucesso.",
        data: NovoServico
    })
}

// listar todos os servicos
export function listarServicos(): Servicotype[] {
    return catalogoServico;
}

// apagar um servico
export function apagarServico(nome: string): boolean {
    // todo: implementar fetch de servicos
    const novocatalogtempprario: Servicotype[] = []
    for (let i = 0; i < catalogoServico.length; i++) {
        if (catalogoServico[i]?.nome !== undefined && catalogoServico[i]?.nome !== nome) {

            novocatalogtempprario.push(catalogoServico[i]!)
        }
    } // Densemvolver um novo catalogo sem o serviço ser apagado
    catalogoServico = novocatalogtempprario
    return true
}

// obter um serviço por nome
export function obterServico(nome: string): Servicotype | null {

    for (let i = 0; i < catalogoServico.length; i++) {
        if (catalogoServico[i]?.nome === nome) {
            return catalogoServico[i]!
        }
    }
    return null
}



