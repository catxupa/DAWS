import { prestacaoServicoModel } from "../../models/prestacao_servico.models.js"
import type { NovaprestacaoType } from "../../util/types.js"


export const prestacaoResolver = {
    Query: {
        getAllPrestacaoServico: async () => {
            return await prestacaoServicoModel.getAllPrestacoesServicos()
        },
        getPrestacaoServicoById: async (_: any, args: { id: string }) => {
            return await prestacaoServicoModel.getPrestacaoServico(args.id)
        }
    },
    Mutation: {
        createPrestacao: async (_: any, args: { prestacao: NovaprestacaoType }) => {
            return await prestacaoServicoModel.createPrestacaoServico(args.prestacao)
        },
        updatePrestacao: async (_: any, args: { id: string, prestacao: NovaprestacaoType }) => {
            return await prestacaoServicoModel.updatePrestacaoServico(args.id, args.prestacao)
        },
        deletePrestacao: async (_: any, args: { id: string }) => {
            return await prestacaoServicoModel.deletePrestacaoServico(args.id)
        }
    },
    prestacao: {
        prestador: async (parent: NovaprestacaoType) => {
            return await prestacaoServicoModel.getPrestacaoServico(parent.id)
        },
        utilizador: async (parent: NovaprestacaoType) => {
            return await prestacaoServicoModel.getPrestacaoServico(parent.id)
        },
        empresa: async (parent: NovaprestacaoType) => {
            return await prestacaoServicoModel.getPrestacaoServico(parent.id)
        },
        servico: async (parent: NovaprestacaoType) => {
            return await prestacaoServicoModel.getPrestacaoServico(parent.id)
        },
        orcamento: async (parent: NovaprestacaoType) => {
            return await prestacaoServicoModel.getPrestacaoServico(parent.id)
        }
    }
}