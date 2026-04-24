import { orcamentoModel } from "../../models/orcamento.models.js"
import type { NovoOrcamentoType } from "../../util/types.js"


export const orcamentoResolver = {
    Query: {
        getAllOrcamentos: async () => {
            return await orcamentoModel.getAllOrcamentos()
        },
        getOrcamentoById: async (_: any, args: { id: string }) => {
            return await orcamentoModel.getOrcamento(args.id)
        }
    },
    Mutation: {
        createOrcamento: async (_: any, args: { orcamento: NovoOrcamentoType }) => {
            return await orcamentoModel.createOrcamento(args.orcamento)
        },
        updateOrcamento: async (_: any, args: { id: string, orcamento: NovoOrcamentoType }) => {
            return await orcamentoModel.updateOrcamento(args.id, args.orcamento)
        },
        deleteOrcamento: async (_: any, args: { id: string }) => {
            return await orcamentoModel.deleteOrcamento(args.id)
        }
    },
    orcamento: {
        utilizador: async (parent: NovoOrcamentoType) => {
            return await orcamentoModel.getOrcamento(parent.id as any)
        },
        prestacao: async (parent: NovoOrcamentoType) => {
            return await orcamentoModel.getOrcamento(parent.id as any)
        }
    }
}