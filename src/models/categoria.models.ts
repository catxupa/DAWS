import type { RowDataPacket } from "mysql2"
import type { NovaCategoriaType } from "../util/types.js"
import { generateUUID } from "../util/uuid.js"
import db from "../lib/db.js"


//funcao para criar categoria
export const categoriaModel = {
    async createCategoria(categoria: NovaCategoriaType): Promise<NovaCategoriaType | null> {
        try {
            const query = `INSERT INTO tabela_categoria
                VALUES(?,?,?,?,?) `
            const values = [
                null,
                categoria.designacao,
                categoria.icone,
                new Date(),
                new Date()
            ]
            const [rows] = await db.execute<NovaCategoriaType & RowDataPacket[]>(query, values)
            return rows as NovaCategoriaType
        } catch (error) {
            console.log(error)
            return null
        }
    },

    // funcao para obter categoria por id
    async getCategoriaById(id: string): Promise<NovaCategoriaType | null> {
        try {
            const query = `
                SELECT DISTINCT 
                    c.*, 
                    u.id AS owner
                FROM tabela_categoria c
                INNER JOIN tabela_prestadores pr ON c.id = pr.id_categoria
                INNER JOIN tabela_utilizadores u ON pr.id_utilizador = u.id
                WHERE c.id = ?`
            const values = [id]
            const [rows] = await db.execute<NovaCategoriaType & RowDataPacket[]>(query, values)
            console.log("Categoria encontrada: ", rows)
            return Array.isArray(rows) && rows.length > 0 ? rows[0] as NovaCategoriaType : null
        } catch (error) {
            console.log(error)
            return null
        }
    },

    //funcao para obter todas as categorias
    async getAllCategoria(): Promise<NovaCategoriaType[] | null> {
        try {
            const query = `SELECT * FROM tabela_categoria`
            const [rows] = await db.execute<NovaCategoriaType[] & RowDataPacket[]>(query)
            return rows as NovaCategoriaType[]
        } catch (error) {
            console.log(error)
            return null
        }
    },

    //funcao para atualizar categoria
    async updateCategoria(id: string, categoria: NovaCategoriaType): Promise<NovaCategoriaType | null> {
        try {
            const query = `UPDATE tabela_categoria
                SET 
                 (?,?,?,?,?)`
            const values = [
                generateUUID(),
                categoria.designacao,
                categoria.icone,
                new Date(),
                new Date()
            ]
            const [rows] = await db.execute<NovaCategoriaType & RowDataPacket[]>(query, values)
            return rows as NovaCategoriaType
        } catch (error) {
            console.log(error)
            return null
        }
    },

    //funcao para apagar categoria
    async deleteCategoria(id: string): Promise<NovaCategoriaType | null> {
        try {
            const query = `DELETE FROM tabela_categoria WHERE id = ?`
            const values = [id]
            const [rows] = await db.execute<NovaCategoriaType & RowDataPacket[]>(query, values)
            return rows as NovaCategoriaType
        } catch (error) {
            console.log(error)
            return null
        }
    },


}