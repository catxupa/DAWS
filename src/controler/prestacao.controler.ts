import type { NovaprestacaoType } from "../util/types.js"
import type { Request, Response } from "express"
import { prestacaoServicoModel } from "../models/prestacao_servico.models.js"
import { id } from "date-fns/locale"

 
//controlador para atualizar prestacao de servico
export const prestacaoControler = {
    async updatePrestacaoServico(req: Request, res: Response) {
        const prestacaoServico: NovaprestacaoType = req.body
        const id = req.params.id
        if (!prestacaoServico) {
            return res.status(400).json({
                status: "error",
                message: "dados invalidos",
                data: null
            })
        }
        const updatePrestacaoServicoResponse = await prestacaoServicoModel.updatePrestacaoServico(id as string, prestacaoServico)
        if (!updatePrestacaoServicoResponse) {
            return res.status(500).json({
                status: "error",
                message: "erro ao atualizar prestacao de servico",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "prestacao de servico atualizada com sucesso",
            data: updatePrestacaoServicoResponse
        })
    },

    //funcao para criar prestacao de servico
    async createPrestacaoServico(req: Request, res: Response) {
        const prestacaoServico: NovaprestacaoType = req.body
        if (!prestacaoServico) {
            return res.status(400).json({
                status: "error",
                message: "dados invalidos",
                data: null
            })
        }
        const createPrestacaoServicoResponse = await prestacaoServicoModel.createPrestacaoServico(prestacaoServico)
        if (!createPrestacaoServicoResponse) {
            return res.status(500).json({
                status: "error",
                message: "erro ao criar prestacao de servico",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "prestacao de servico criada com sucesso",
            data: createPrestacaoServicoResponse
        })
    },

    //funcao para apagar prestacao de servico
    async deletePrestacaoServico(req: Request, res: Response) {
        const id = req.params.id
        const prestacaoServico = await prestacaoServicoModel.deletePrestacaoServico(id as string)
        if (!prestacaoServico) {
            return res.status(500).json({
                status: "error",
                message: "erro ao apagar prestacao de servico",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "prestacao de servico apagada com sucesso",
            data: prestacaoServico
        })
    },

    //funcao para obter prestacao de servico por id
    async getPrestacaoServicoById(req: Request, res: Response) {
        const id = req.params.id
        const prestacaoServico = await prestacaoServicoModel.getPrestacaoServico(id as string)
        if (!prestacaoServico) {
            return res.status(500).json({
                status: "error",
                message: "erro ao obter prestacao de servico",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "prestacao de servico obtida com sucesso",
            data: prestacaoServico
        })
    },

    //funcao para obter todas as prestacoes de servico
    async getAllPrestacoesServico(req: Request, res: Response) {
        const prestacoesServico = await prestacaoServicoModel.getAllPrestacoesServicos()
        if (!prestacoesServico) {
            return res.status(500).json({
                status: "error",
                message: "erro ao obter prestacoes de servico",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "prestacoes de servico obtidas com sucesso",
            data: prestacoesServico
        })
    }
}