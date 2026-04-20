
import db from "./lib/db.js";
import type { NovoservicoType, ResponseType, Servicotype, } from "./util/types.js";

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
export function adicionarServico(NovoServico: Servicotype) {
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
export function listarservicos(): Servicotype[] {
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


// funcao para adicionar novo servico no bd !*
export async function novoServico(NovoServico: NovoservicoType) {
    try {
        const row = await db.execute(`INSERT INTO tabela_servicos Values (?,?,?,?,?,?,?)`,
            [
                null,
                NovoServico.nome,
                NovoServico.descricao,
                NovoServico.categoria,
                NovoServico.enabled,
                NovoServico.created_at,
                NovoServico.updated_at
            ])
        if (!row) return null
        return row
    } catch (error) {
        console.log({ "error": error })
        return null
    }
}

// funcao para selecionar todos os servicos no bd !
export async function listarServicos() {
    try {
        const servico = await db.execute(`SELECT * FROM tabela_servicos`)
        return servico[0]
    } catch (error) {
        console.log({ "error": error })
        return null
    }
}

// funcao para obter servicos no bd por id !
export async function getservicoById(id: string) {
    try {
        const [rows] = await db.execute(
            "SELECT * FROM tabela_servicos WHERE tabela_servicos.id = ?", [id])

        if (Array.isArray(rows) && rows.length === 0)
            return null

        return Array.isArray(rows) ? rows[0] : null
    } catch (error) {
        console.log({ "eror": error })
    }
}

//update dados servico
export async function updateservico(id: string, updatedservice: NovoservicoType) {
    try {
        const query = "UPDATE tabela_servicos SET nome=?, descricao=?, categoria=?, enabled=?, updated=?  WHERE id=?;"

        const values = [
            updatedservice.nome,
            updatedservice.descricao,
            updatedservice.categoria,
            new Date(),
            id]
        const rows = await db.execute(query, values)
        return rows
    } catch (error) {
        console.log(error)
        return null
    }
}

// funcao para deletar servico
export async function deleteService(id: string) {
    try {
        const query = "DELETE FROM tabela_servicos WHERE id =?"
        const value = [id]
        const rows = await db.execute(query, value)
        return rows
    } catch (error) {
        console.log(error)
        return null
    }
}


