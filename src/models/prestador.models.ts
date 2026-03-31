import db from "../lib/db.js"
import type { NovoprestadorType } from "../util/types.js"


export const prestadorModel = {
    //funcao para selecionar todos os prestadores no bd !*
    async getAllPrestadores() {
        try {
            const rows = await db.execute("SELECT * FROM tabela_prestadores")
            return rows[0]
        } catch (error) {
            console.log({ "error": error })
            return null 
        }
    },

    //funcao para selecionar prestador por id no bd !*
    async getPrestadorById(id: string) {
        try {
            const [rows] = await db.execute("SELECT * FROM tabela_prestadores WHERE id=?", [id])
            return rows
        } catch (error) {
            console.log({ "error": error })
            return null
        }
    },

    //funcao para adicionar novo prestador no bd !*
    async novoPrestador(Novoprestador: NovoprestadorType) {
        try {
            const row = await db.execute(`INSERT INTO tabela_prestadores Values (?,?,?,?,?,?,?,?,?,?,?,?)`,
                [
                    null,
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
    },

    //funcao para atualizar prestador no bd !*
    async updatePrestador(id: string, updatedPrestador: NovoprestadorType) {
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
    },

    //funcao para apagar prestador no bd !*
    async deletePrestador(id: string) {
        try {
            const query = "DELETE FROM tabela_prestadores WHERE id=?"
            const values = [id]
            const rows = await db.execute(query, values)
            return rows
        } catch (error) {
            console.log({ "error": error })
            return null
        }
    },
}