import type { promises } from "node:dns"
import db from "../lib/db.js"
import type { NovapropostaType } from "../util/types.js"
import type { RowDataPacket } from "mysql2"


// fuuncoes para criar proposta
export const propostaModel = {
    async createProposta(novaProposta: NovapropostaType): Promise<NovapropostaType | null> {

        try {
            const row = await db.execute<NovapropostaType & RowDataPacket[]>(`INSERT INTO tabela_proposta Values (?,?,?,?,?,?,?,?)`,
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
            return row[0] as NovapropostaType
        } catch (error) {
            console.log({ "error": error })
            return null
        }
    },

    // funcao atualizar proposta
    async updateProposta(id: string, updatedProposta: NovapropostaType): Promise<NovapropostaType | null> {
        try {
            const row = await db.execute<NovapropostaType & RowDataPacket[]>(`UPDATE tabela_proposta SET id_prestacao = ?, preco_hora = ?, hora_estimadas = ?, estado = ?, enabled = ?, created_at = ?, update_at = ? WHERE id = ?`,
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
            return row[0] as NovapropostaType
        } catch (error) {
            console.log({ "error": error })
            return null
        }
    },

    // funcao apagar proposta
    async deleteProposta(id: string): Promise<NovapropostaType | null> {
        try {
            const row = await db.execute<NovapropostaType & RowDataPacket[]>(`DELETE FROM tabela_proposta WHERE id = ?`, [id])
            if (!row) return null
            return row[0] as NovapropostaType
        } catch (error) {
            console.log({ "error": error })
            return null
        }
    },

    // funcao buscar proposta por id
    async getPropostaById(id: string): Promise<NovapropostaType | null> {
        try {
            const query = `SELECT DISTINCT
            pt.*,
            u.id AS owner
            FROM tabela_proposta pt 
            INNER JOIN tabela_prestadores pr ON pt.id_prestador = pr.id
            INNER JOIN tabela_utilizadores u ON pr.id_utilizador = u.id
            WHERE pt.id = ?`
            const values = [id]
            const [rows] = await db.execute<NovapropostaType & RowDataPacket[]>(query, values)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as NovapropostaType : null
        } catch (error) {
            console.log({ "error": error })
            return null
        }
    }, 

    // funcao buscar todas as propostas
    async getAllPropostas(): Promise<NovapropostaType | null> {
        try {
            const row = await db.execute<NovapropostaType & RowDataPacket[]>(`SELECT * FROM tabela_proposta`)
            if (!row) return null
            return row[0] as NovapropostaType
        } catch (error) {
            console.log({ "error": error })
            return null
        }
    },

    //funcao para aceitar proposta
    async aceitarProposta(id: string): Promise<NovapropostaType | null> {
        try {
            const row = await db.execute<NovapropostaType & RowDataPacket[]>(`UPDATE tabela_proposta SET estado = "ACEITE" WHERE id = ?`, [id])
            if (!row) return null
            return row[0] as NovapropostaType
        } catch (error) {
            console.log({ "error": error })
            return null
        }
    },

}