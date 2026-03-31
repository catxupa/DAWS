import db from "../lib/db.js";
import type { NovoOrcamentoType } from "../util/types.js";


//funcao para atualizar orcamento
export const orcamentoModel = {
    async updateOrcamento(id: string, updatedOrcamento: NovoOrcamentoType) {
        try {
            const query = "UPDATE tabela_orcamento SET total=?, id_utilizador=?, enabled=?, created_at=?, updated_at=? WHERE id=?"
            const values = [
                updatedOrcamento.total,
                updatedOrcamento.id_utilizador,
                updatedOrcamento.enabled,
                new Date(),
                new Date(),
                id
            ]
            const rows = await db.execute(query, values)
            return rows
        } catch (error) {
            console.log(error)
            return null
        }
    },

    // funcao para criar orcamento
    async createOrcamento(orcamento: NovoOrcamentoType) {
        try {
            const query = `INSERT INTO tabela_orcamento SET 
            id =?,
            total =?,
            id_utilizador =?,
            enabled =?,
            created_at =?,
            updated_at =? `

            const values = [
                null,
                orcamento.total,
                orcamento.id_utilizador,
                orcamento.enabled,
                new Date(),
                new Date()
            ]
            const rows = await db.execute(query, values)
            return rows
        } catch (error) {
            console.log(error)
            return null
        }
    },

    // funcao para apagar orcamento
    async deleteOrcamento(id: string) {
        try {
            const query = "DELETE FROM tabela_orcamento WHERE id=?"
            const values = [id]
            const rows = await db.execute(query, values)
            return rows
        } catch (error) {
            console.log(error)
            return null
        }
    },

    // funcao para obter orcamento por id
    async getOrcamento(id: string) {
        try {
            const query = "SELECT * FROM tabela_orcamento WHERE id=?"
            const values = [id]
            const rows = await db.execute(query, values)
            return rows[0]
        } catch (error) {
            console.log(error)
            return null
        }
    },

    // funcao para obter todos os orcamentos
    async getAllOrcamentos() {
        try {
            const query = "SELECT * FROM tabela_orcamento"
            const rows = await db.execute(query)
            return rows[0]
        } catch (error) {
            console.log(error)
            return null
        }
    }
}