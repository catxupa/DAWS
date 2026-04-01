import { userModel } from "../models/user.models.js";
import { novoUtilizador, updateuser, deleteuser } from "../user.js";
import { comparepassword } from "../util/passwor.js";
import type { utilizadorType } from "../util/types.js";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

//controler para selecionar todos os users no bd !*  
export const userControlers = {
    //controler para selecionar todos os users no bd !*  
    async getUser(req: Request, res: Response) {
        const users = await userModel.getAll()

        if (!users) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar utilizador",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Utilizador buscados com sucesso",
            data: users
        })
    },

    //controler para adicionar novo user no bd !*  
    async novoutilizador(req: Request, res: Response) {
        try {
            const utilizador = req.body as utilizadorType

            const novoUtilizadorResponse = await novoUtilizador(utilizador)
            res.json(novoUtilizadorResponse)

            return res.status(200).json({
                status: "sucess",
                message: "Utilizador criado com sucesso",
                data: novoUtilizadorResponse
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "erro",
                message: "Erro interno no servidor",
                data: null
            })
        }
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
                message: "Erro ao atualizar utilizador",
                data: null
            })
        }

        return res.status(200).json({
            status: "sucess",
            message: "Utilizador atualizado com sucesso",
            data: updatedUserResponse
        })
    },

    // controler para selecionar user por id
    async getUserById(req: Request, res: Response) {
        const id = req.params.id

        const user = await userModel.getUserById(id as string)

        if (!user) {
            return res.status(404).json({
                status: "erro",
                message: "Utilizador nao encontrado",
                data: null
            })
        }

        return res.status(200).json({
            status: "sucess",
            message: "Utilizador encontrado com sucesso",
            data: user
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
                message: "Erro ao apagar utilizador",
                data: null
            })
        }
        return res.status(200).json({
            status: "sucess",
            message: "Utilizador apagado com sucesso",
            data: deleteUserResponse
        })
    },

    // funcao para login
    async Login(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            if (!email || !password) {
                return res.status(400).json({
                    status: "erro",
                    message: "dados de servicos invalidos",
                    data: null
                })
            }

            const userData = await userModel.getUserByEmail(email as string)

            if (!userData) {
                return res.status(404).json({
                    status: "erro",
                    message: "nao existe usuario com este email",
                    data: null
                })
            }

            const isPasswordValid = await comparepassword(password, userData.password);

            if (!isPasswordValid) {
                return res.status(401).json({
                    status: "erro",
                    message: "credenciais invalidas",
                    data: null
                })
            }

            const payload = {
                id: userData.id,
                email: userData.email,
                nome: userData.nome
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1h" })
            res.status(200).json({
                status: "sucess",
                message: "Login realizado com sucesso",
                data: token
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "erro",
                message: "Erro interno no servidor",
                data: null
            })
        }
    }
}


