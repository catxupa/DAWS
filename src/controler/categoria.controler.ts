import { categoriaModel } from "../models/categoria.models.js"
import type { ResponseType } from "../util/types.js"
import type { Request, Response } from "express"
import type { NovaCategoriaType } from "../util/types.js"


// controler para criar categoria
export const categoriacontroler = {
    async createCategoria(req: Request, res: Response) {
        try {
            const categoria = req.body
            const novaCategoria = await categoriaModel.createCategoria(categoria)
            if (!novaCategoria) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Erro ao criar categoria",
                    data: null
                }
                return res.status(400).json(response)
            }
            const response: ResponseType<NovaCategoriaType> = {
                status: "success",
                message: "Categoria criada com sucesso",
                data: novaCategoria
            }
            return res.status(201).json(response)
        } catch (error) {
            console.log(error)
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar categoria",
                data: null
            }
            return res.status(500).json(response)
        }
    },

    // controler para obter categoria por id
    async getCategoriaById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const categoria = await categoriaModel.getCategoriaById(id as string)
            if (categoria === null) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Categoria nao encontrada",
                    data: null
                }
                return res.status(404).json(response)
            }
            const response: ResponseType<NovaCategoriaType> = {
                status: "success",
                message: "Categoria encontrada com sucesso",
                data: categoria
            }
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao obter categoria",
                data: null
            }
            return res.status(500).json(response)
        }
    },

    // controler para obter todas as categorias
    async getAllCategoria(req: Request, res: Response) {
        try {
            const categorias = await categoriaModel.getAllCategoria()
            if (!categorias) {
                console.log("Categorias nao encontradas")
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Categorias nao encontradas",
                    data: null
                }
                return res.status(404).json(response)
            }
            const response: ResponseType<NovaCategoriaType[]> = {
                status: "success",
                message: "Categoria encontrada com sucesso",
                data: categorias
            }
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao obter categoria",
                data: null
            }
            return res.status(500).json(response)
        }
    },

    // controler para atualizar categoria
    async updateCategoria(req: Request, res: Response) {
        try {
            const { id } = req.params
            const categoria = req.body
            const updatedCategoria = await categoriaModel.updateCategoria(id as string, categoria)
            if (!updatedCategoria) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Erro ao atualizar categoria",
                    data: null
                }
                return res.status(400).json(response)
            }
            const response: ResponseType<NovaCategoriaType> = {
                status: "success",
                message: "Categoria atualizada com sucesso",
                data: updatedCategoria
            }
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar categoria",
                data: null
            }
            return res.status(500).json(response)
        }
    },

    // controler para apagar categoria
    async deleteCategoria(req: Request, res: Response) {
        try {
            const { id } = req.params
            const deletedCategoria = await categoriaModel.deleteCategoria(id as string)
            if (!deletedCategoria) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Erro ao apagar categoria",
                    data: null
                }
                return res.status(400).json(response)
            }
            const response: ResponseType<NovaCategoriaType> = {
                status: "success",
                message: "Categoria apagada com sucesso",
                data: deletedCategoria
            }
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao apagar categoria",
                data: null
            }
            return res.status(500).json(response)
        }
    },
}