import { createConnection } from "node:net";
import { userModel } from "../models/user.models.js";
import { novoUtilizador, updateuser, deleteuser } from "../user.js";
import { comparepassword, hashpassword } from "../util/passwor.js";
import type { ResponseType, utilizadorType } from "../util/types.js";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";



//controler para selecionar todos os users no bd !*  
export const userControlers = {
    //controler para selecionar todos os users no bd !*  
    async getUser(req: Request, res: Response) {
        const users = await userModel.getAll()

        if (!users) {

            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao buscar utilizador",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: ResponseType<utilizadorType[]> = {
            status: "success",
            message: "Utilizador buscados com sucesso",
            data: null
        }
        return res.status(200).json(response)
    },

    //controler para adicionar novo user no bd !*  
    async novoutilizador(req: Request, res: Response) {
        try {
            const utilizador = req.body as utilizadorType

            const novoUtilizadorResponse = await novoUtilizador(utilizador)
            res.json(novoUtilizadorResponse)

            const response: ResponseType<utilizadorType> = {
                status: "success",
                message: "Utilizador criado com sucesso",
                data: null
            }
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro interno no servidor",
                data: null
            }
            return res.status(500).json(response)
        }
    },

    //controler para fazer update de users !*
    async updateduser(req: Request, res: Response) {
        const id = req.params.id as string
        const updatedUser = req.body as utilizadorType

        if (id === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "id obrigatorio",
                data: null
            }
            return res.status(400).json(response)
        }

        const updatedUserResponse = await updateuser(id as string, updatedUser)

        if (updatedUserResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualisar utilizador",
                data: null
            }
            return res.status(500).json(response)
        }

        if (updatedUserResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Utilizador nao autorizado",
                data: null
            }
            return res.status(403).json(response)
        }

        const response: ResponseType<utilizadorType> = {
            status: "success",
            message: "Utilizador atualizado com sucesso",
            data: null
        }
        return res.status(200).json(response)
    },

    // controler para selecionar user por id
    async getUserById(req: Request, res: Response) {
        const id = req.params.id

        const user = await userModel.getUserById(id as string)

        if (!user) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Utilizador nao encontrado",
                data: null
            }
            return res.status(404).json(response)
        }

        const response: ResponseType<utilizadorType> = {
            status: "success",
            message: "Utilizador encontrado com sucesso",
            data: user
        }
        return res.status(200).json(response)
    },

    //controler para apagar user !*
    async deleteuser(req: Request, res: Response) {
        const { id } = req.params

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "id obrigatorio",
                data: null
            }
            return res.status(400).json(response)
        }

        const deleteUserResponse = await deleteuser(id as string)

        if (!deleteUserResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao apagar utilizador",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<utilizadorType> = {
            status: "success",
            message: "Utilizador apagado com sucesso",
            data: null
        }
        return res.status(200).json(response)
    },

    // controler para login
    async Login(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            if (!email || !password) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "dados de servicos invalidos",
                    data: null
                }
                return res.status(400).json(response)
            }

            const userData = await userModel.getUserByEmail(email as string)

            if (!userData) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "nao existe usuario com este email",
                    data: null
                }
                return res.status(404).json(response)
            }

            const isPasswordValid = await comparepassword(password, userData.password);

            if (!isPasswordValid) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "credenciais invalidas",
                    data: null
                }
                return res.status(401).json(response)
            }

            const payload = {
                id: userData.id,
                email: userData.email,
                nome: userData.nome,
                role: userData.role
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1h" })
            const response: ResponseType<string> = {
                status: "success",
                message: "Login realizado com sucesso",
                data: token
            }
            return res.status(200).json(response)

        } catch (error) {
            console.log(error)
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro interno no servidor",
                data: null
            }
            return res.status(500).json(response)
        }
    },

    // controler para atualizar password
    async updatePassword(req: Request, res: Response) {
        //validar os dados recebidos
        try {
            const userId = req.params.id;
            // const hash = hashpassword(userId as string);
            const { oldPassword, newPassword } = req.body;

            if (!oldPassword || !newPassword) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "dados de servicos invalidos",
                    data: null
                }
                return res.status(400).json(response)
            }
            //verificar se o user existe
            const user = await userModel.getUserById(userId as any);

            if (!user) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Utilizador nao encontrado",
                    data: null
                }
                return res.status(404).json(response)
            }
            //verificar se a senha antiga esta correta
            const isMatch = await comparepassword(oldPassword, user.password as string);

            if (!isMatch) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "A senha antiga está incorreta",
                    data: null
                }
                return res.status(401).json(response)
            }
            //atualizar a senha
            const updateResponse = await userModel.updatePassword(userId as string, newPassword);

            if (!updateResponse) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Erro ao atualizar a senha",
                    data: null
                }
                return res.status(400).json(response)
            }
            //retornar a resposta
            const response: ResponseType<utilizadorType> = {
                status: "success",
                message: "Senha atualizada com sucesso",
                data: null
            }
            return res.status(200).json(response)
        } catch (error) {
            console.error(error);
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro no servidor",
                data: null
            }
            return res.status(500).json(response)
        }
    },

    //controler para resetar a password
    async resetPassword(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const { newPassword } = req.body;

            if (!newPassword) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "nova password invalida",
                    data: null
                }
                return res.status(400).json(response)
            }
            const user = await userModel.getUserById(userId as any);

            if (!user) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Utilizador nao encontrado",
                    data: null
                }
                return res.status(404).json(response)
            }
            //resetar a senha
            const updateResponse = await userModel.resetPassword(userId as string, newPassword);

            if (!updateResponse) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Erro ao resetar a password",
                    data: null
                }
                return res.status(400).json(response)
            }
            //retornar a resposta
            const response: ResponseType<utilizadorType> = {
                status: "success",
                message: "Senha resetada com sucesso",
                data: null
            }
            return res.status(200).json(response)
        } catch (error) {
            console.error(error);
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro no servidor",
                data: null
            }
            return res.status(500).json(response)
        }
    },


}


