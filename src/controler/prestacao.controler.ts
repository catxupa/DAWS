import type { NovaprestacaoType, PrestacaoDeServicoDetalhadaType, ResponseType } from "../util/types.js"
import type { Request, Response } from "express"
import { prestacaoServicoModel } from "../models/prestacao_servico.models.js"
import { id } from "date-fns/locale"


//controlador para atualizar prestacao de servico
export const prestacaoControler = {
    async updatePrestacaoServico(req: Request, res: Response) {
        const prestacaoServico: NovaprestacaoType = req.body
        const id = req.params.id
        if (!prestacaoServico) {
            const response: ResponseType<null> = {
                status: "error",
                message: "dados invalidos",
                data: null
            }
            return res.status(400).json(response)
        }
        const updatePrestacaoServicoResponse = await prestacaoServicoModel.updatePrestacaoServico(id as string, prestacaoServico)
        if (!updatePrestacaoServicoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "erro ao atualizar prestacao de servico",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<NovaprestacaoType> = {
            status: "success",
            message: "prestacao de servico atualizada com sucesso",
            data: updatePrestacaoServicoResponse
        }
        return res.status(200).json(response)
    },

    //funcao para criar prestacao de servico
    async createPrestacaoServico(req: Request, res: Response) {
        const prestacaoServico: NovaprestacaoType = req.body
        if (!prestacaoServico) {
            const response: ResponseType<null> = {
                status: "error",
                message: "dados invalidos",
                data: null
            }
            return res.status(400).json(response)
        }
        const createPrestacaoServicoResponse = await prestacaoServicoModel.createPrestacaoServico(prestacaoServico)
        if (!createPrestacaoServicoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "erro ao criar prestacao de servico",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<NovaprestacaoType> = {
            status: "success",
            message: "prestacao de servico criada com sucesso",
            data: createPrestacaoServicoResponse
        }
        return res.status(200).json(response)
    },

    //funcao para apagar prestacao de servico
    async deletePrestacaoServico(req: Request, res: Response) {
        const prestacaoServico: NovaprestacaoType = req.body
        if (!prestacaoServico) {
            const response: ResponseType<null> = {
                status: "error",
                message: "dados invalidos",
                data: null
            }
            return res.status(400).json(response)
        }
        const prestacaoServicoResponse = await prestacaoServicoModel.deletePrestacaoServico(prestacaoServico.id as string)

        if (!prestacaoServicoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "erro ao apagar prestacao de servico",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<NovaprestacaoType> = {
            status: "success",
            message: "prestacao de servico apagada com sucesso",
            data: prestacaoServicoResponse
        }
        return res.status(200).json(response)
    },

    //funcao para obter prestacao de servico por id
    async getPrestacaoServicoById(req: Request, res: Response) {
        const id = req.params.id
        const prestacaoServico = await prestacaoServicoModel.getPrestacaoServico(id as string)
        if (!prestacaoServico) {
            const response: ResponseType<null> = {
                status: "error",
                message: "erro ao obter prestacao de servico",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<NovaprestacaoType> = {
            status: "success",
            message: "prestacao de servico obtida com sucesso",
            data: prestacaoServico
        }
        return res.status(200).json(response)
    },

    //funcao para obter todas as prestacoes de servico
    async getAllPrestacoesServico(req: Request, res: Response) {
        const prestacoesServico = await prestacaoServicoModel.getAllPrestacoesServicos()
        if (!prestacoesServico) {
            const response: ResponseType<null> = {
                status: "error",
                message: "erro ao obter prestacoes de servico",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<NovaprestacaoType> = {
            status: "success",
            message: "prestacoes de servico obtidas com sucesso",
            data: prestacoesServico
        }
        return res.status(200).json(response)
    },

    //funcao para obter prestacao de servico detalhada
    async getAllPrestacaoServicoDetalhada(req: Request, res: Response) {
        const { limit, offset } = req.query as { limit: string, offset: string }

        let LIMIT = 10
        let OFFSET = 0

        if (limit && parseInt(limit) > 10) LIMIT = parseInt(limit)
        if (offset && parseInt(offset) > 0) OFFSET = parseInt(offset)


        const getAllPrestacoesServicoResponse = await prestacaoServicoModel.getAllPrestacaoServicoDetalhada(LIMIT, OFFSET)

        if (!getAllPrestacoesServicoResponse) {
            const response: ResponseType<null> = {
                status: "error",
                message: "erro ao obter prestacoes de servicos",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<PrestacaoDeServicoDetalhadaType[]> = {
            status: "success",
            message: "prestacoes de servico obtidas com sucesso",
            data: getAllPrestacoesServicoResponse
        }
        return res.status(200).json(response)
    },

    //funcao para obter prestacao de servico detalhada por categoria
    async getAllPrestacaoServicoDetalhadaByCategoria(req: Request, res: Response) {
        const { categoria } = req.query as { categoria: string }
        if (!categoria) {
            const response: ResponseType<null> = {
                status: "error",
                message: "categoria invalida",
                data: null
            }
            return res.status(400).json(response)
        }
        const getAllPrestacoesServicoResponse = await prestacaoServicoModel.getAllPrestacaoServicoDetalhadaByCategoria(categoria)
        if (getAllPrestacoesServicoResponse === null) {
            const response: ResponseType<null> = {
                status: "error",
                message: "erro ao obter prestacoes de servicos por categoria",
                data: null
            }
            return res.status(500).json(response)
        }
        const response: ResponseType<PrestacaoDeServicoDetalhadaType[]> = {
            status: "success",
            message: "prestacoes de servico por categoria obtidas com sucesso",
            data: getAllPrestacoesServicoResponse
        }
        return res.status(200).json(response)
    }

}