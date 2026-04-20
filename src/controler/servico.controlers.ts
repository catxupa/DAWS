
import { servicoModel } from "../models/servico.models.js"
import type { NovoservicoType, ResponseType, ServicoDetalhadoType } from "../util/types.js"
import type { Request, Response } from "express"

// controler para criar um novo servico !*
export const servicoController = {
    async createServico(req: Request, res: Response) {
        const novoServico: NovoservicoType = req.body
        if (!novoServico) {
            const response: ResponseType<null> = {
                status: "error",
                message: "dados invalidos",
                data: null
            }
            return res.status(400).json(response)
        }

        const servico = await servicoModel.create(novoServico)

        if (!servico) {
            const response: ResponseType<null> = {
                status: "error",
                message: "erro ao criar servico",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: ResponseType<NovoservicoType> = {
            status: "success",
            message: "servico criado com sucesso",
            data: servico
        }
        return res.status(200).json(response)
    },

    // controler para selecionar todos os servicos na base de dados !*
    async getAllServicos(req: Request, res: Response) {
        const servicos = await servicoModel.getAll()

        if (!servicos) {
            const response: ResponseType<null> = {
                status: "error",
                message: "erro ao buscar servicos",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: ResponseType<NovoservicoType> = {
            status: "success",
            message: "servicos buscados com sucesso",
            data: servicos
        }
        return res.status(200).json(response)
    },

    // controler para selecionar um servico por id na base de dados !*
    async getServicoById(req: Request, res: Response) {
        const id = req.params.id
        const servico = await servicoModel.get(id as string)

        if (!servico) {
            const response: ResponseType<null> = {
                status: "error",
                message: "erro ao buscar servico",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: ResponseType<NovoservicoType> = {
            status: "success",
            message: "servico buscado com sucesso",
            data: servico
        }
        return res.status(200).json(response)
    },

    // controler para atualizar servico na base de dados !*
    async updateServico(req: Request, res: Response) {
        const id = req.params.id
        const servicoAtualizado: NovoservicoType = req.body

        if (!id) {
            const response: ResponseType<null> = {
                status: "error",
                message: "id obrigatorio",
                data: null
            }
            return res.status(400).json(response)
        }

        if (!servicoAtualizado) {
            const response: ResponseType<null> = {
                status: "error",
                message: "servico invalido",
                data: null
            }
            return res.status(400).json(response)
        }

        const servico = await servicoModel.update(id as string, servicoAtualizado)
        if (!servico) {
            const response: ResponseType<null> = {
                status: "error",
                message: "erro ao atualizar servico",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: ResponseType<NovoservicoType> = {
            status: "success",
            message: "servico atualizado com sucesso",
            data: servico
        }
        return res.status(200).json(response)
    },

    // controler para apagar servico na base de dados !*
    async deleteService(req: Request, res: Response) {
        const id = req.params.id
        const servico = await servicoModel.deleteService(id as string)

        if (!servico) {
            const response: ResponseType<null> = {
                status: "error",
                message: "erro ao apagar servico",
                data: null
            }
            return res.status(500).json(response)
        }

        const response: ResponseType<NovoservicoType> = {
            status: "success",
            message: "servico apagado com sucesso",
            data: servico
        }
        return res.status(200).json(response)
    },

    // controler para selecionar todos os servicos detalhados na base de dados !*
    async getAllServicoDetalhada(req: Request, res: Response) {
        const { limit, offset } = req.query

        let LIMIT = 10
        let OFFSET = 0

        if (limit && Number(limit) > 10) LIMIT = Number(limit)
        if (offset && Number(offset) > 0) OFFSET = Number(offset)

        const getAllServicoResponse = await servicoModel.getAllServicoDetalhada(LIMIT, OFFSET)

        if (!getAllServicoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "erro ao buscar servicos",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<ServicoDetalhadoType[]> = {
            status: "success",
            message: "servicos detalhados buscados com sucesso",
            data: getAllServicoResponse
        }
        return res.status(200).json(response)
    }
}


