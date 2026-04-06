import { createConnection } from "node:net";
import { userModel } from "../models/user.models.js";
import { novoUtilizador, updateuser, deleteuser } from "../user.js";
import { comparepassword, hashpassword } from "../util/passwor.js";
import type { utilizadorType } from "../util/types.js";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import connection from "../lib/db.js";
import type { RowDataPacket } from "mysql2";


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
        const id = req.params.id as string
        const updatedUser = req.body as utilizadorType

        if (id === null) {
            return res.status(400).json({
                status: "erro",
                message: "id obrigatorio",
                data: null
            })
        }
 
        const updatedUserResponse = await updateuser(id as string, updatedUser)

        if (updatedUserResponse === null) {
            return res.status(500).json({
                status: "erro",
                message: "Erro ao atualisar utilizador",
                data: null
            })
        }

        if (updatedUserResponse === null) {
            return res.status(403).json({
                status: "erro",
                message: "Utilizador nao autorizado",
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

    // controler para login
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
    },

    // controler para atualizar password
    async updatePassword(req: Request, res: Response) {
        //validar os dados recebidos
        try {
            const userId = req.params.id;
            // const hash = hashpassword(userId as string);
            const { oldPassword, newPassword } = req.body;

            if (!oldPassword || !newPassword) {
                return res.status(400).json({
                    message: "dados de servicos invalidos"
                });
            }
            //verificar se o user existe
            const user = await userModel.getUserById(userId as any);

            if (!user) {
                return res.status(404).json({
                    message: "Utilizador nao encontrado"
                });
            }
            //verificar se a senha antiga esta correta
            const isMatch = await comparepassword(oldPassword, user.password as string);

            if (!isMatch) {
                return res.status(401).json({
                    message: "A senha antiga está incorreta"
                });
            }
            //atualizar a senha
            const updateResponse = await userModel.updatePassword(userId as string, newPassword);

            if (!updateResponse) {
                return res.status(400).json({
                    message: "Erro ao atualizar a senha"
                });
            }
            //retornar a resposta
            return res.status(200).json({
                message: "Senha atualizada com sucesso"
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro no servidor"
            });
        }
    },

    //controler para resetar a password
    async resetPassword(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const { newPassword } = req.body;

            if (!newPassword) {
                return res.status(400).json({
                    message: "nova password invalida"
                });
            }
            const user = await userModel.getUserById(userId as any);

            if (!user) {
                return res.status(404).json({
                    message: "Utilizador nao encontrado"
                });
            }
            //resetar a senha
            const updateResponse = await userModel.resetPassword(userId as string, newPassword);

            if (!updateResponse) {
                return res.status(400).json({
                    message: "Erro ao resetar a password"
                });
            }
            //retornar a resposta
            return res.status(200).json({
                message: "password resetada com sucesso"
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erro no servidor"
            });
        }
    },


}


