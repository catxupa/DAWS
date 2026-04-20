import type { RowDataPacket } from "mysql2"
import type { NovaEmpresaType } from "../util/types.js"
import { generateUUID } from "../util/uuid.js"
import db from "../lib/db.js"


//funcao para criar empresa
export const empresaModel = {
    async createEmpresa(empresa: NovaEmpresaType): Promise<NovaEmpresaType | null> {
        try {
            const [rows] = await db.execute<NovaEmpresaType & RowDataPacket[]>(
                `INSERT INTO tabela_empresa
                VALUES
                (?,?,?,?,?,?,?,?,?,?)`,
                [
                    null,
                    empresa.designacao,
                    empresa.descricao,
                    empresa.localizacao,
                    empresa.nif,
                    empresa.icone,
                    empresa.id_utilizador,
                    empresa.enabled,
                    new Date(),
                    new Date()
                ]
            )
            return rows as NovaEmpresaType
        } catch (error) {
            console.log(error)
            return null
        }
    },

    //funcao para obter empresa por id
    async getEmpresaById(id: string): Promise<NovaEmpresaType | null> {
        try {
            const query = `SELECT DISTINCT
            pt.*,
            u.id AS owner
            FROM tabela_empresa pt 
            INNER JOIN tabela_utilizadores u ON pt.id_utilizador = u.id
            WHERE pt.id = ?`
            const values = [id]
            const [rows] = await db.execute<NovaEmpresaType & RowDataPacket[]>(query, values)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as NovaEmpresaType : null
        } catch (error) {
            console.log(error)
            return null
        }
    },

    //funcao para obter todas as empresas
    async getAllEmpresas(): Promise<NovaEmpresaType | null> {
        try {
            const query = `SELECT * FROM tabela_empresa`
            const [rows] = await db.execute<NovaEmpresaType & RowDataPacket[]>(query)
            return Array.isArray(rows) && rows.length > 0 ? rows as NovaEmpresaType : null
        } catch (error) {
            console.log(error)
            return null
        }
    },

    //funcao para atualizar empresa
    async updateEmpresa(id: string, empresa: NovaEmpresaType): Promise<NovaEmpresaType | null> {
        try {
            const query = `UPDATE tabela_empresa SET 
                    (?,?,?,?,?,?,?,?,?,?)`
            empresa.designacao,
                empresa.descricao,
                empresa.localizacao,
                empresa.nif,
                empresa.icone,
                empresa.id_utilizador,
                empresa.enabled,
                new Date(),
                new Date()

            const values = [id]
            const [rows] = await db.execute<NovaEmpresaType & RowDataPacket[]>(query, values)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as NovaEmpresaType : null

        } catch (error) {
            console.log(error)
            return null
        }
    },

    //funcao para apagar empresa
    async deleteEmpresa(id: string): Promise<NovaEmpresaType | null> {
        try {
            const query = `DELETE FROM tabela_empresa WHERE id = ?`
            const values = [id]
            const [rows] = await db.execute<NovaEmpresaType & RowDataPacket[]>(query, values)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as NovaEmpresaType : null
        } catch (error) {
            console.log(error)
            return null
        }
    },
}