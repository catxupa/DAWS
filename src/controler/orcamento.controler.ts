import { orcamentoModel } from "../models/orcamento.models.js"
import type { Request, Response } from "express"
import type { NovoOrcamentoType } from "../util/types.js"


export const orcamentoControler = {
    //controlador para atualizar orcamento
    async updateOrcamento(req: Request, res: Response) {
        //recebe o id do orcamento e os dados do orcamento
        const { id } = req.params
        const updatedOrcamento: NovoOrcamentoType = req.body

        if (!updatedOrcamento) {
            return res.status(400).json({
                success: false,
                message: "Dados invalidos",
                data: null
            })
        }
        const orcamento = await orcamentoModel.updateOrcamento(id as string , updatedOrcamento)

        if (!orcamento) {
            return res.status(500).json({
                success: false,
                message: "Erro ao atualizar orcamento",
                data: null
            })
        }
        return res.status(200).json({
            success: true,
            message: "Orcamento atualizado com sucesso",
            data: updatedOrcamento
        })
    },

    //controlador para criar orcamento
    async createOrcamento(req: Request, res: Response) {
        const orcamento: NovoOrcamentoType = req.body
        if (!orcamento) {
            return res.status(400).json({
                success: false,
                message: "Dados invalidos",
                data: null
            })
        }
        const createOrcamento = await orcamentoModel.createOrcamento(orcamento)
        if (!createOrcamento) {
            return res.status(500).json({
                success: true,
                message: "tabela nao encontrada",
                data: null
            })
        } 
        return res.status(200).json({
            success: true,
            message: "Orcamento criado com sucesso",  
            data: createOrcamento
        })
    },

    //controlador para apagar orcamento
    async deleteOrcamento(req: Request, res: Response) {
        const { id } = req.params
        const orcamento = await orcamentoModel.deleteOrcamento(id as string)
        if (!orcamento) {
            return res.status(500).json({
                success: false,
                message: "Erro ao apagar orcamento",
                data: null
            })
        }
        return res.status(200).json({
            success: true,
            message: "Orcamento apagado com sucesso",
            data: orcamento
        })
    },

    //controlador para obter orcamento por id
    async getOrcamento(req: Request, res: Response) {
        const { id } = req.params
        const orcamento = await orcamentoModel.getOrcamento(id as string)
        if (!orcamento) {
            return res.status(404).json({
                success: true,
                message: "Orcamento nao encontrado",
                data: null
            })
        }
        return res.status(200).json({
            success: true,
            message: "Orcamento obtido com sucesso",
            data: orcamento
        })
    },

    //controlador para obter todos os orcamentos
    async getAllOrcamentos(req: Request, res: Response) {
        const orcamentos = await orcamentoModel.getAllOrcamentos()
        if (!orcamentos) {
            return res.status(500).json({
                success: false,
                message: "Erro ao obter orcamentos",
                data: null
            })
        }
        return res.status(200).json({
            success: true,
            message: "Orcamentos obtidos com sucesso",
            data: orcamentos
        })
    }
}