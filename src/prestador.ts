import db from "./lib/db.js"
import type { NovoprestadorType } from "./util/types.js"
import { generateUUID } from "./util/uuid.js"

export class prestador {
    nome: string
    precoHora: number
    profissao: string
    minimoParaDesconto: number
    percentagemDesconto: number
    taxaUrgencia: number


    constructor(nomeDoPrestador: string,
        precoHoraDoPrestador: number,
        profissaoDoPrestador: string,
        minimoParaDescontoDoPrestador: number,
        percentagemDescontoDoPrestador: number,
        taxaUrgenciaDoPrestador: number
    ) {
        this.nome = nomeDoPrestador
        this.precoHora = precoHoraDoPrestador
        this.profissao = profissaoDoPrestador
        this.minimoParaDesconto = minimoParaDescontoDoPrestador
        this.percentagemDesconto = percentagemDescontoDoPrestador
        this.taxaUrgencia = taxaUrgenciaDoPrestador
    }
    alterarPrecoHora(novoPrecoHora: number) {
        this.precoHora = novoPrecoHora
    }
    alterarNome(novoNome: string) {
        this.nome = novoNome
    }
}

const prestador1 = new prestador("Bruno", 100,
    "Desenvolvedor de Software",
    1000, 0.1,
    0.3,)

console.log(prestador1.precoHora)// preco hora do prestador, 100

prestador1.alterarPrecoHora(150)
prestador1.alterarNome("Bruno Monteiro")

console.log(prestador1.precoHora)// preco hora do prestador, 150
console.log(prestador1.nome)// nome do prestador, Tiago Soares


// funcao para introduzir novo prestador no bd !
export async function novoPrestador(Novoprestador: NovoprestadorType) {
    console.log({ "Novo prestador": Novoprestador })
    try {
        const row = await db.execute(`INSERT INTO tabela_prestadores Values (?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                generateUUID(),
                Novoprestador.nome,
                Novoprestador.profissao,
                Novoprestador.taxa_urgencia,
                Novoprestador.minimo_desconto,
                Novoprestador.nif,
                Novoprestador.percentagem_desconto,
                Novoprestador.preco_hora,
                Novoprestador.disponivel,
                Novoprestador.enable,
                new Date(),
                new Date()
            ])
        if (!row) return null
        return row
    } catch (error) {
        console.log({ "error": error })
        return null
    }
}

//funcao para selecionar todos os prestadores no bd !*
export async function getAllPrestadores() {
    try {
        const [rows] = await db.execute("SELECT * FROM tabela_prestadores")
        return rows
    } catch (error) {
        console.log({ "error": error })
        return null
    }
}

//funcao para selecionar prestador por id no bd !*
export async function getPrestadorById(id: string) {
    try {
        const [rows] = await db.execute("SELECT * FROM tabela_prestadores WHERE id=?", [id])
        return rows
    } catch (error) {
        console.log({ "error": error })
        return null
    }
}

//funcao para atualizar prestador no bd !*
export async function updatePrestador(id: string, updatedPrestador: NovoprestadorType) {
    try {
        const query = "UPDATE tabela_prestadores SET nome=?, profissao=?, taxa_urgencia=?, minimo_desconto=?, nif=?, percentagem_desconto=?, preco_hora=?, disponivel=?, enable=?, created_at=?, update_at=? WHERE id=?"
        const values = [
            updatedPrestador.nome,
            updatedPrestador.profissao,
            updatedPrestador.taxa_urgencia,
            updatedPrestador.minimo_desconto,
            updatedPrestador.nif,
            updatedPrestador.percentagem_desconto,
            updatedPrestador.preco_hora,
            updatedPrestador.disponivel,
            updatedPrestador.enable,
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

//funcao para apagar prestador no bd !*
export async function deletePrestador(id: string) {
    try {
        const query = "DELETE FROM tabela_prestadores WHERE id=?"
        const values = [id]
        const rows = await db.execute(query, values)
        return rows
    } catch (error) {
        console.log({ "error": error })
        return null
    }
}

