import { propostaModel } from "../models/proposta.models.js"
import type { NovapropostaType } from "../util/types.js"
import type { Request, Response } from "express"


// controlador para criar proposta
export const propostaControler = {
    async createProposta(req: Request, res: Response) {
        const novaProposta: NovapropostaType = req.body
        console.log("proposta controler", novaProposta)
        if (!novaProposta) {
            return res.status(400).json({
                status: "error",
                message: "dados invalidos",
                data: null
            })
        }
        const createPropostaResponse = await propostaModel.createProposta(novaProposta)
        console.log("proposta123", createPropostaResponse)
        if (!createPropostaResponse) {
            return res.status(500).json({
                status: "error",
                message: "erro ao criar proposta",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "proposta criada com sucesso",
            data: createPropostaResponse
        })
    },

    // controlador para atualizar proposta
    async updateProposta(req: Request, res: Response) {
        const id = req.params.id
        const updatedProposta: NovapropostaType = req.body
        if (!updatedProposta) {
            return res.status(400).json({
                status: "error",
                message: "dados invalidos",
                data: null
            })
        }
        const updatePropostaResponse = await propostaModel.updateProposta(id as string, updatedProposta)
        if (!updatePropostaResponse) {
            return res.status(500).json({
                status: "error",
                message: "erro ao atualizar prestador",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "prestador atualizado com sucesso",
            data: updatePropostaResponse
        })
    },

    // controlador para apagar proposta
    async deleteProposta(req: Request, res: Response) {
        const id = req.params.id
        const deletePropostaResponse = await propostaModel.deleteProposta(id as string)
        if (!deletePropostaResponse) {
            return res.status(500).json({
                status: "error",
                message: "erro ao apagar prestador",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "prestador apagado com sucesso",
            data: deletePropostaResponse
        })
    },

    // controlador para buscar proposta por id
    async getPropostaById(req: Request, res: Response) {
        const id = req.params.id
        const getPropostaByIdResponse = await propostaModel.getPropostaById(id as string)
        if (!getPropostaByIdResponse) {
            return res.status(500).json({
                status: "error",
                message: "erro ao buscar prestador",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "proposta buscada com sucesso",
            data: getPropostaByIdResponse
        })
    },

    // controlador para buscar todas as propostas
    async getAllPropostas(req: Request, res: Response) {
        const getAllPropostasResponse = await propostaModel.getAllPropostas()
        if (!getAllPropostasResponse) {
            return res.status(500).json({
                status: "error",
                message: "erro ao buscar prestador",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "proposta buscada com sucesso",
            data: getAllPropostasResponse
        })
    }
}