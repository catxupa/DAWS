
import { servicoModel } from "../models/servico.models.js"
import type { NovoservicoType } from "../util/types.js"
import type { Request, Response } from "express"

// controler para criar um novo servico !*
export const servicoController = {
    async createServico(req: Request, res: Response) {
        const novoServico: NovoservicoType = req.body
        if (!novoServico) {
            return res.status(400).json({
                status: "error",
                message: "dados invalidos",
                data: null
            })
        }

        const servico = await servicoModel.create(novoServico)

        if (!servico) {
            return res.status(500).json({
                status: "error",
                message: "erro ao criar servico",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "servico criado com sucesso",
            data: servico
        })
    },

    // controler para selecionar todos os servicos na base de dados !*
    async getAllServicos(req: Request, res: Response) {
        const servicos = await servicoModel.getAll()

        if (!servicos) {
            return res.status(500).json({
                status: "error",
                message: "erro ao buscar servicos",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "servicos buscados com sucesso",
            data: servicos
        })
    },

    // controler para selecionar um servico por id na base de dados !*
    async getServicoById(req: Request, res: Response) {
        const id = req.params.id
        const servico = await servicoModel.get(id as string)

        if (!servico) {
            return res.status(500).json({
                status: "error",
                message: "erro ao buscar servico",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "servico buscado com sucesso",
            data: servico
        })
    },

    // controler para atualizar servico na base de dados !*
    async updateServico(req: Request, res: Response) {
        const id = req.params.id
        const servicoAtualizado: NovoservicoType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "id obrigatorio",
                data: null
            })
        }

        if (!servicoAtualizado) {
            return res.status(500).json({
                status: "erro",
                message: "servico invalido",
                data: null
            })
        }

        const servico = await servicoModel.update(id as string, servicoAtualizado)
        if (!servico) {
            return res.status(400).json({
                status: "error",
                message: "erro ao atualizar servico",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "servico atualizado com sucesso",
            data: servico
        })
    },

    // controler para apagar servico na base de dados !*
    async deleteService(req: Request, res: Response) {
        const id = req.params.id
        const servico = await servicoModel.deleteService(id as string)

        if (!servico) {
            return res.status(500).json({
                status: "error",
                message: "erro ao apagar servico",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "servico apagado com sucesso",
            data: servico
        })
    }
}


