import db from "../lib/db.js"
import { formatDateDDMMYYYY } from "../util/date.js"
import { hashpassword } from "../util/passwor.js"
import type { utilizadorType } from "../util/types.js"
import type { RowDataPacket } from "mysql2";

export const userModel = {
    //funcao para selecionar todos os users no bd !*  
    async getAll(): Promise<utilizadorType | null> {
        try {
            const [rows] = await db.execute<utilizadorType & RowDataPacket[]>("SELECT * FROM tabela_utilizadores")
            return rows as utilizadorType
        } catch (error) {
            console.log({ "error": error })
            return null
        }
    },

    //funcao para selecionar user por id no bd !*  
    async getUserById(id: string): Promise<utilizadorType | null> {
        const [rows] = await db.execute<utilizadorType & RowDataPacket[]>(
            "SELECT * FROM tabela_utilizadores WHERE tabela_utilizadores.id = ?", [id])
        if (Array.isArray(rows) && rows.length === 0)
            return null
        return Array.isArray(rows) ? rows[0] as utilizadorType : null
    },

    //funcao para criar novo user no bd !*  
    async novoUtilizador(utilizador: utilizadorType): Promise<utilizadorType | null> {
        try {
            const [rows] = await db.execute<utilizadorType & RowDataPacket[]>(`INSERT INTO tabela_utilizadores VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
                [
                    null,
                    utilizador.nome,
                    utilizador.numero_identificacao,
                    await formatDateDDMMYYYY(utilizador.data_nascimento),
                    utilizador.email,
                    utilizador.telefone,
                    utilizador.pais,
                    utilizador.localidade,
                    await hashpassword(utilizador.password),
                    utilizador.enabled,
                    new Date(),
                    new Date()
                ])
            if (!rows) return null
            return rows as utilizadorType
        } catch (error) {
            console.log({ "error": error })
            return null
        }
    },

    //funcao para atualizar user no bd !*  
    async updateuser(id: string, utilizador: utilizadorType): Promise<utilizadorType | null> {
        try {
            const query = `
        UPDATE tabela_utilizadores SET 
            nome=?, 
            numero_identificacao=?, 
            data_nascimento=?, 
            email=?, 
            telefone=?, 
            pais=?, 
            localidade=?, 
            password=?, 
            enabled=?, 
            updated_at=?  
        WHERE id=?`

            // Verifica se data_nascemento existe antes de tentar formatar ou usar

            const values = [
                utilizador.nome,
                utilizador.numero_identificacao,
                utilizador.data_nascimento, // Envia YYYY-MM-DD direto para o MySQL
                utilizador.email,
                utilizador.telefone,
                utilizador.pais,
                utilizador.localidade,
                await hashpassword(utilizador.password),
                utilizador.enabled,
                new Date(),
                new Date(),
                id
            ]

            const [rows] = await db.execute<utilizadorType & RowDataPacket[]>(query, values)
            return rows as utilizadorType
        } catch (error) {
            console.error("Erro no update:", error)
            return null
        }
    },

    //funcao para apagar user no bd !*  
    async deleteuser(id: string): Promise<utilizadorType | null> {
        try {
            const query = "DELETE FROM tabela_utilizadores WHERE id=?"
            const values = [id]

            const [rows] = await db.execute<utilizadorType & RowDataPacket[]>(query, values)

            return rows as utilizadorType
        } catch (error) {
            console.log(error)
            return null
        }
    },

    // funcao para verificar email
    async getUserByEmail(email: string): Promise<utilizadorType | null> {
        try {
            const [rows] = await db.execute<utilizadorType & RowDataPacket[]>(
                "SELECT * FROM tabela_utilizadores WHERE tabela_utilizadores.email = ?", [email])

            if (Array.isArray(rows) && rows.length === 0)
                return null

            return Array.isArray(rows) ? rows[0] as utilizadorType : null

        } catch (error) {
            console.log(error)
            return null
        }
    },

    //funcao para atualizar password
    async updatePassword(id: string, newPassword: string): Promise<utilizadorType | null> {
        try {
            const query = "UPDATE tabela_utilizadores SET password=?, updated_at=? WHERE id=?";

            const hashedPassword = await hashpassword(newPassword);
            const values = [hashedPassword,
                new Date(),
                id]
            //verificar se o user existe
            const [rows] = await db.execute<utilizadorType & RowDataPacket[]>(query, values);
            return rows as utilizadorType
        } catch (error) {
            console.error("Erro no update da password:", error);
            return null;
        }
    },

    // funcao para fazer reset do password
    async resetPassword(id: string, newPassword: string): Promise<utilizadorType | null> {
        try {
            const query = "UPDATE tabela_utilizadores SET password=?, updated_at=? WHERE id=?";

            const hashedPassword = await hashpassword(newPassword);

            const values = [hashedPassword,
                new Date(),
                id]
            const [rows] = await db.execute<utilizadorType & RowDataPacket[]>(query, values);
            return rows as utilizadorType
        } catch (error) {
            console.error("Erro ao resetar password:", error);
            return null;
        }
    }

} 
