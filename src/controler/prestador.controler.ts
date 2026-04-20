import { prestadorModel } from "../models/prestador.models.js"
import type { NovoprestadorType, ResponseType } from "../util/types.js"
import type { Request, Response } from "express"

export const prestadorControler = {

    // criar prestador
    async createPrestador(req: Request, res: Response) {
        const novoPrestador: NovoprestadorType = req.body
        if (!novoPrestador) {
            const response: ResponseType<null> = {
                status: "error",
                message: "dados invalidos",
                data: null
            }
            return res.status(400).json(response)
        }
        const createPrestadorResponse = await prestadorModel.novoPrestador(novoPrestador)

        if (!createPrestadorResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "erro ao criar prestador",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<NovoprestadorType> = {
            status: "success",
            message: "prestador criado com sucesso",
            data: createPrestadorResponse
        }
        return res.status(200).json(response)
    },

    // buscar todos os prestadores
    async getAllPrestadores(req: Request, res: Response) {
        const prestadores = await prestadorModel.getAllPrestadores()
        if (!prestadores) {
            const response: ResponseType<null> = {
                status: "error",
                message: "erro ao buscar prestadores",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<NovoprestadorType> = {
            status: "success",
            message: "prestadores buscados com sucesso",
            data: prestadores
        }
        return res.status(200).json(response)
    },

    // buscar prestador por id
    async getPrestadorById(req: Request, res: Response) {
        const id = req.params.id
        const prestador = await prestadorModel.getPrestadorById(id as string)
        if (!prestador) {
            const response: ResponseType<null> = {
                status: "error",
                message: "erro ao buscar prestador",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<NovoprestadorType> = {
            status: "success",
            message: "prestador buscado com sucesso",
            data: prestador
        }
        return res.status(200).json(response)
    },

    // atualizar prestador
    async updatePrestador(req: Request, res: Response) {
        const id = req.params.id
        const prestadorAtualizado: NovoprestadorType = req.body
        if (!prestadorAtualizado) {
            const response: ResponseType<null> = {
                status: "error",
                message: "dados invalidos",
                data: null
            }
            return res.status(400).json(response)
        }
        const prestador = await prestadorModel.updatePrestador(id as string, prestadorAtualizado)
        if (!prestador) {
            const response: ResponseType<null> = {
                status: "error",
                message: "erro ao atualizar prestador",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<NovoprestadorType> = {
            status: "success",
            message: "prestador atualizado com sucesso",
            data: prestadorAtualizado
        }
        return res.status(200).json(response)
    },

    // apagar prestador
    async deletePrestador(req: Request, res: Response) {
        const id = req.params.id
        const prestador = await prestadorModel.deletePrestador(id as string)
        if (!prestador) {
            const response: ResponseType<null> = {
                status: "error",
                message: "erro ao apagar prestador",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<NovoprestadorType> = {
            status: "success",
            message: "prestador apagado com sucesso",
            data: prestador
        }
        return res.status(200).json(response)
    }

}