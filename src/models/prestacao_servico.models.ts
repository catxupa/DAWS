import db from "../lib/db.js"
import type { NovaprestacaoType } from "../util/types.js"



//funcao para atualizar prestacao de servico
export const prestacaoServicoModel = {
    async updatePrestacaoServico(id: string, updatedPrestacaoServico: NovaprestacaoType) {
        try {
            const query = `UPDATE tabela_prestacao_servicos SET 
            disignacao=?, 
            subtotal=?, 
            hora_estimadas=?, 
            id_prestador=?, 
            id_servico=?, 
            preco_hora=?, 
            estado=?, 
            id_orcamento=?, 
            enabled=?, 
            created_at=?, 
            updated_at=? 
            WHERE id=?`
            const values = [

                updatedPrestacaoServico.disignacao,
                updatedPrestacaoServico.subtotal,
                updatedPrestacaoServico.hora_estimadas,
                updatedPrestacaoServico.id_prestador,
                updatedPrestacaoServico.id_servico,
                updatedPrestacaoServico.preco_hora,
                updatedPrestacaoServico.estado,
                updatedPrestacaoServico.id_orcamento,
                updatedPrestacaoServico.enabled,
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

    //funcao para criar prestacao de servico
    async createPrestacaoServico(prestacaoServico: NovaprestacaoType) {
        try {
            const query = `INSERT INTO tabela_prestacao_servicos 
          
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            const values = [
                prestacaoServico.id,
                prestacaoServico.disignacao,
                prestacaoServico.subtotal,
                prestacaoServico.hora_estimadas,
                prestacaoServico.id_prestador,
                prestacaoServico.id_servico,
                prestacaoServico.preco_hora,
                prestacaoServico.estado,
                prestacaoServico.id_orcamento,
                prestacaoServico.enabled,
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

    //funcao para apagar prestacao de servico
    async deletePrestacaoServico(id: string) {
        try {
            const query = "DELETE FROM tabela_prestacao_servicos WHERE id=?"
            const values = [id]
            const rows = await db.execute(query, values)
            return rows
        } catch (error) {
            console.log(error)
            return null
        }
    },

    //funcao para obter prestacao de servico
    async getPrestacaoServico(id: string) {
        try {
            const query = "SELECT * FROM tabela_prestacao_servicos WHERE id=?"
            const values = [id]
            const rows = await db.execute(query, values)
            return rows[0]
        } catch (error) {
            console.log(error)
            return null
        }
    },

    //funcao para obter todas as prestacoes de servico
    async getAllPrestacoesServicos() {
        try {
            const query = "SELECT * FROM tabela_prestacao_servicos"
            const rows = await db.execute(query)
            return rows
        } catch (error) {
            console.log(error)
            return null
        }
    }
}
