import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { NovoOrcamentoType } from "../util/types.js";
import { generateUUID } from "../util/uuid.js";


//funcao para atualizar orcamento
export const orcamentoModel = {
    async updateOrcamento(id: string, updatedOrcamento: NovoOrcamentoType): Promise<NovoOrcamentoType | null> {
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
            const [rows] = await db.execute<NovoOrcamentoType & RowDataPacket[]>(query, values)
            return rows as NovoOrcamentoType
        } catch (error) {
            console.log(error)
            return null
        }
    },

    //funcao para criar orcamento
    async createOrcamento(orcamento: NovoOrcamentoType): Promise<NovoOrcamentoType | null> {
        try {
            const [rows] = await db.execute<NovoOrcamentoType & RowDataPacket[]>(
                `INSERT INTO tabela_orcamento
                VALUES(?,?,?,?,?,?)`,
                [
                    generateUUID(),
                    orcamento.total,
                    orcamento.id_utilizador,
                    orcamento.enabled,
                    new Date(),
                    new Date()
                ]
            )
            return rows as NovoOrcamentoType
        } catch (error) {
            console.log(error)
            return null
        }
    },

    // funcao para apagar orcamento
    async deleteOrcamento(id: string): Promise<NovoOrcamentoType | null> {
        try {
            const query = "DELETE FROM tabela_orcamento WHERE id=?"
            const values = [id]
            const [rows] = await db.execute<NovoOrcamentoType & RowDataPacket[]>(query, values)
            return rows as NovoOrcamentoType
        } catch (error) {
            console.log(error)
            return null
        }
    },

    // funcao para obter orcamento por id
    async getOrcamento(id: string): Promise<NovoOrcamentoType | null> {
        try {
            const query = "SELECT * FROM tabela_orcamento WHERE id=?"
            const values = [id]
            const [rows] = await db.execute<NovoOrcamentoType & RowDataPacket[]>(query, values)
            return rows as NovoOrcamentoType

        } catch (error) {
            console.log(error)
            return null
        }
    },

    // funcao para obter todos os orcamentos
    async getAllOrcamentos(): Promise<NovoOrcamentoType | null> {
        try {
            const query = "SELECT * FROM tabela_orcamento"
            const [rows] = await db.execute<NovoOrcamentoType & RowDataPacket[]>(query)
            return rows as NovoOrcamentoType
        } catch (error) {
            console.log(error)
            return null
        }
    },








}