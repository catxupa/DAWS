import db from "../lib/db.js"
import type { NovapropostaType } from "../util/types.js"


// fuuncoes para criar proposta
export const propostaModel = {
    async createProposta(novaProposta: NovapropostaType) {

        try {
            const row = await db.execute(`INSERT INTO tabela_proposta Values (?,?,?,?,?,?,?,?)`,
                [
                    null,
                    novaProposta.id_prestacao,
                    novaProposta.preco_hora,
                    novaProposta.hora_estimada,
                    novaProposta.estado,
                    novaProposta.enabled,
                    new Date(),
                    new Date()
                ])
            if (!row) return null
            return row[0]
        } catch (error) {
            console.log({ "error": error })
            return null
        }
    },

    // funcao atualizar proposta
    async updateProposta(id: string, updatedProposta: NovapropostaType) {
        try {
            const row = await db.execute(`UPDATE tabela_proposta SET id_prestacao = ?, preco_hora = ?, hora_estimadas = ?, estado = ?, enabled = ?, created_at = ?, update_at = ? WHERE id = ?`,
                [
                    updatedProposta.id_prestacao,
                    updatedProposta.preco_hora,
                    updatedProposta.hora_estimada,
                    updatedProposta.estado,
                    updatedProposta.enabled,
                    new Date(),
                    new Date(),
                    id
                ])
            if (!row) return null
            return row
        } catch (error) {
            console.log({ "error": error })
            return null
        }
    },

    // funcao apagar proposta
    async deleteProposta(id: string) {
        try {
            const row = await db.execute(`DELETE FROM tabela_proposta WHERE id = ?`, [id])
            if (!row) return null
            return row
        } catch (error) {
            console.log({ "error": error })
            return null
        }
    },

    // funcao buscar proposta por id
    async getPropostaById(id: string) {
        try {
            const row = await db.execute(`SELECT * FROM tabela_proposta WHERE id = ?`, [id])
            if (!row) return null
            return row[0]
        } catch (error) {
            console.log({ "error": error })
            return null
        }
    },

    // funcao buscar todas as propostas
    async getAllPropostas() {
        try {
            const row = await db.execute(`SELECT * FROM tabela_proposta`)
            if (!row) return null
            return row[0]
        } catch (error) {
            console.log({ "error": error })
            return null
        }
    },

    //funcao para aceitar proposta
    async aceitarProposta(id: string) {
        try {
            const row = await db.execute(`UPDATE tabela_proposta SET estado = "ACEITE" WHERE id = ?`, [id])
            if (!row) return null
            return row[0]
        } catch (error) {
            console.log({ "error": error })
            return null
        }
    }
}