import type { RowDataPacket } from "mysql2"
import db from "../lib/db.js"
import type { NovaprestacaoType, PrestacaoDeServicoDetalhadaType } from "../util/types.js"



//funcao para atualizar prestacao de servico
export const prestacaoServicoModel = {
    async updatePrestacaoServico(id: string, updatedPrestacaoServico: NovaprestacaoType): Promise<NovaprestacaoType | null> {
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
                updatedPrestacaoServico.hora_estimada,
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
            const [rows] = await db.execute<NovaprestacaoType & RowDataPacket[]>(query, values)
            return rows as NovaprestacaoType
        } catch (error) {
            console.log(error)
            return null
        }
    },

    //funcao para criar prestacao de servico
    async createPrestacaoServico(prestacaoServico: NovaprestacaoType): Promise<NovaprestacaoType | null> {
        try {
            const query = `INSERT INTO tabela_prestacao_servicos 
          
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            const values = [
                prestacaoServico.id,
                prestacaoServico.disignacao,
                prestacaoServico.subtotal,
                prestacaoServico.hora_estimada,
                prestacaoServico.id_prestador,
                prestacaoServico.id_servico,
                prestacaoServico.preco_hora,
                prestacaoServico.estado,
                prestacaoServico.id_orcamento,
                prestacaoServico.enabled,
                new Date(),
                new Date()
            ]
            const [rows] = await db.execute<NovaprestacaoType & RowDataPacket[]>(query, values)
            return rows as NovaprestacaoType
        } catch (error) {
            console.log(error)
            return null
        }
    },

    //funcao para apagar prestacao de servico
    async deletePrestacaoServico(prestacaoServico: NovaprestacaoType): Promise<NovaprestacaoType | null> {
        try {

            const query = "DELETE FROM tabela_prestacao_servicos WHERE id=?"
            const values = [prestacaoServico.id]
            const [rows] = await db.execute<NovaprestacaoType & RowDataPacket[]>(query, values)
            return rows as NovaprestacaoType
        } catch (error) {
            console.log(error)
            return null
        }
    },

    //funcao para obter prestacao de servico
    async getPrestacaoServico(id: string): Promise<NovaprestacaoType | null> {
        try {
            const query = "SELECT * FROM tabela_prestacao_servicos WHERE id=?"
            const values = [id]
            const [rows] = await db.execute<NovaprestacaoType & RowDataPacket[]>(query, values)
            return rows as NovaprestacaoType
        } catch (error) {
            console.log(error)
            return null
        }
    },

    //funcao para obter todas as prestacoes de servico
    async getAllPrestacoesServicos(): Promise<NovaprestacaoType | null> {
        try {
            const query = "SELECT * FROM tabela_prestacao_servicos"
            const [rows] = await db.execute<NovaprestacaoType & RowDataPacket[]>(query)
            return rows as NovaprestacaoType
        } catch (error) {
            console.log(error)
            return null
        }
    },

    //funcao para obter prestacao de servico detalhada
    async getAllPrestacaoServicoDetalhada(limit: number, offset: number) {
        try {
            const query = `SELECT 
            ps.id AS id_prestacao_servico,
            ps.disignacao AS descricao,
            u.nome AS nome_utilizador,
            u.email AS email_utilizador,
            s.nome AS nome_servico,
            ps.created_at AS data_pedido,
            ps.urgente
        FROM tabela_prestacao_servicos ps
        INNER JOIN tabela_utilizadores u ON ps.id_utilizador = u.id
        INNER JOIN tabela_servicos s ON ps.id_servico = s.id
        ORDER BY ps.created_at DESC`

            const [rows] = await db.execute<PrestacaoDeServicoDetalhadaType[] & RowDataPacket[]>(
                query,
                [
                    limit.toString(),
                    offset.toString()
                ]
            )

            if (Array.isArray(rows) && rows.length === 0) return []
            return Array.isArray(rows) ? rows as PrestacaoDeServicoDetalhadaType[] : []

        } catch (error) {
            console.log(error)
            return null
        }
    },

    //funcao para obter prestacao de servico detalhada por categoria e servicos
    async getAllPrestacaoServicoDetalhadaByCategoria(categoria: string): Promise<PrestacaoDeServicoDetalhadaType[] | null> {
        try {
            const query = `SELECT DISTINCT
            c.id AS id_categoria,
            c.disignacao AS nome_categoria,
            u.nome AS nome_utilizador,
            u.email AS email_utilizador,
            ps.preco_hora AS preco_hora,
            c.icone AS icone_categoria,
            s.nome AS nome_servico,
            ps.created_at AS data_pedido,
            ps.urgente
        FROM tabela_prestacao_servicos ps
        INNER JOIN tabela_utilizadores u ON ps.id_utilizador = u.id
        INNER JOIN tabela_servicos s ON ps.id_servico = s.id
        INNER JOIN tabela_categoria c ON s.id_categoria = c.id AND c.id = ?
        ORDER BY ps.created_at DESC`


            const [rows] = await db.execute<PrestacaoDeServicoDetalhadaType[] & RowDataPacket[]>(
                query,
                [
                    categoria
                ])
            if (Array.isArray(rows) && rows.length === 0) return []
            return Array.isArray(rows) ? rows as PrestacaoDeServicoDetalhadaType[] : []

        } catch (error) {
            console.log(error)
            return null
        }
    }
} 
