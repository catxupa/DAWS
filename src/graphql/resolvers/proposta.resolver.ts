import { propostaModel } from "../../models/proposta.models.js"
import type { NovapropostaType } from "../../util/types.js"


export const propostaResolver = {
    Query: {
        getAllPropostas: async () => {
            return await propostaModel.getAllPropostas()
        },
        getPropostaById: async (_: any, args: { id: string }) => {
            return await propostaModel.getPropostaById(args.id)
        }
    },
    Mutation: {
        createProposta: async (_: any, args: { proposta: NovapropostaType }) => {
            return await propostaModel.createProposta(args.proposta)
        },
        updateProposta: async (_: any, args: { id: string, proposta: NovapropostaType }) => {
            return await propostaModel.updateProposta(args.id, args.proposta)
        },
        deleteProposta: async (_: any, args: { id: string }) => {
            return await propostaModel.deleteProposta(args.id)
        }
    },
    proposta: {
        prestacao: async (parent: NovapropostaType) => {
            return await propostaModel.getPropostaById(parent.id as any)
        },
        prestador: async (parent: NovapropostaType) => {
            return await propostaModel.getPropostaById(parent.id as any)
        }
    }
}  