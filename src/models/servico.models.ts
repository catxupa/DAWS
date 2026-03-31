import { id } from "date-fns/locale"
import db from "../lib/db.js"
import type { NovoservicoType } from "../util/types.js"
import type { deleteService } from "../servico.js"
import { formatDateDDMMYYYY } from "../util/date.js"


export const servicoModel = {
    //funcao para criar um novo servico
    async create(novoServico: NovoservicoType) {
        try {
            const row = await db.execute(`INSERT INTO tabela_servicos Values (?,?,?,?,?,?,?)`,
                [
                    null,
                    novoServico.nome,
                    novoServico.descricao,
                    novoServico.categoria,
                    novoServico.enabled,
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

    // funcao para obter todos os servicos
    async getAll() {
        try {
            const [rows] = await db.execute("SELECT * FROM tabela_servicos")
            return rows
        } catch (error) {
            console.log({ "error": error })
            return null
        }
    },

    //funcao para obter um servico por id
    async get(id: string) {
        try {
            const [rows] = await db.execute(
                "SELECT * FROM tabela_servicos WHERE tabela_servicos.id = ?", [id])

            if (Array.isArray(rows) && rows.length === 0)
                return null

            return Array.isArray(rows) ? rows[0] : null
        } catch (error) {
            console.log({ "eror": error })
        }
    },

    //funcao para atualizar servico
    async update(id: string, servicoAtualizado: NovoservicoType) {
        try {
            const query = "UPDATE tabela_servicos SET nome=?, descricao=?, categoria=?, enabled=?, updated_at=?  WHERE id=?;"

            const values = [
                servicoAtualizado.nome,
                servicoAtualizado.descricao,
                servicoAtualizado.categoria,
                servicoAtualizado.enabled,
                formatDateDDMMYYYY(servicoAtualizado.updated_at),
                id]
            const rows = await db.execute(query, values)
            return rows
        } catch (error) {
            console.log(error)
            return null
        }
    },

    // funcao para apagar
    async deleteService(id: string) {
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
}
