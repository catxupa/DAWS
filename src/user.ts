import { error } from "node:console";
import db from "./lib/db.js";
import type { utilizadorType } from "./util/types.js";
import { generateUUID } from "./util/uuid.js";
import { hashpassword } from "./util/passwor.js";
import { formatDateDDMMYYYY } from "./util/date.js";

//funcao para selecionar todos os users no bd !*
export async function getUser() {
    const [rows] = await db.execute("SELECT * FROM tabela_utilizadores;")
    return rows
}

// funcao para selecionar user apartir de bd por id !*
export async function getUserById(id: string) {
    const [rows] = await db.execute(
        "SELECT * FROM tabela_utilizadores WHERE tabela_utilizadores.id = ?", [id])
    if (Array.isArray(rows) && rows.length === 0)
        return null
    return Array.isArray(rows) ? rows[0] : null
}

// funcao para adicionar novo user no bd !*
export async function novoUtilizador(utilizador: utilizadorType) {
    console.log({ "utilizador users.ts": utilizador })
    try {
        const user = db.execute(`insert into tabela_utilizadores values (?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                generateUUID(),
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
        if (Array.isArray(user) && user.length === 0) return null
        return user
    } catch (error) {
        console.log({ "error": error })
        return null
    }
}


//atualizacao de  user !*
export async function updateuser(id: string, updateduser: utilizadorType) {
    try {
        const query = "UPDATE tabela_utilizadores SET nome=?, numero_identificacao=?, data_nascimento=?, email=?, telefone=?, pais=?, localidade=?, password=?, enabled=?, updated_at=?  WHERE id=?;"

        const values = [
            updateduser.nome,
            updateduser.numero_identificacao,
            await formatDateDDMMYYYY(updateduser.data_nascimento),
            updateduser.email,
            updateduser.telefone,
            updateduser.pais,
            updateduser.localidade,
            await hashpassword(updateduser.password),
            updateduser.enabled,
            new Date(),
            id]
        const rows = await db.execute(query, values)
        return rows
    } catch (error) {
        console.log(error)
        return null
    }
}

//funcao para apagar user no bd !*
export async function deleteuser(id: string) {
    try {
        const query = "DELETE FROM tabela_utilizadores WHERE id=?"
        const values = [id]
        const rows = await db.execute(query, values)
        return rows
    } catch (error) {
        console.log(error)
        return null
    }
}




















