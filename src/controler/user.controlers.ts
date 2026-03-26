import { userModel } from "../models/user.models.js";
import { novoUtilizador, updateuser, deleteuser } from "../user.js";
import type { utilizadorType } from "../util/types.js";
import type { Request, Response } from "express"

//controler para selecionar todos os users no bd !*  
export const userControlers = {
    //controler para selecionar todos os users no bd !*  
    async getUser(req: Request, res: Response) {
        const users = await userModel.getAll()

        if (!users) {
            return res.status(500).json({
                status: "error",
                message: "erro ao buscar users",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "users buscados com sucesso",
            data: users
        })
    },

    //controler para adicionar novo user no bd !*  
    async novoutilizador(req: Request, res: Response) {
        const utilizador = req.body as utilizadorType

        console.log({ " utilizador index.ts": utilizador })
        const novoUtilizadorResponse = await novoUtilizador(utilizador)
        res.json(novoUtilizadorResponse)
    },

    //controler para fazer update de users !*
    async updateduser(req: Request, res: Response) {
        const id = req.params.id
        const updatedUser = req.body as utilizadorType

        if (!id) {
            return res.status(400).json({
                status: "erro",
                message: "id obrigatorio",
                data: null
            })
        }

        const updatedUserResponse = await updateuser(id as string, updatedUser)

        if (!updatedUserResponse) {
            return res.status(500).json({
                status: "erro",
                message: "erro ao atualizar user",
                data: null
            })
        }

        return res.status(200).json({
            status: "sucess",
            message: "user atualizado com sucesso",
            data: updatedUserResponse
        })
    },

//controler para apagar user !*
async deleteuser(req: Request, res: Response) {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({
            status: "erro",
            message: "id obrigatorio",
            data: null
        })
    }

    const deleteUserResponse = await deleteuser(id as string)

    if (!deleteUserResponse) {
        return res.status(500).json({
            status: "erro",
            message: "erro ao apagar este user",
            data: null
        })
    }
    return res.status(200)
}
}

