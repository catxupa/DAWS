import { prestadorModel } from "../../models/prestador.models.js"
import type { NovoprestadorType } from "../../util/types.js"

// ********** resolvers para prestador **********
export const prestadorResolver = {
    Query: {
        getAllPrestadores: async () => {
            return await prestadorModel.getAllPrestadores()
        },
        getPrestadorById: async (_: any, args: { id: string }) => {
            return await prestadorModel.getPrestadorById(args.id)
        }
    },
    Mutation: {
        createPrestador: async (_: any, args: { prestador: NovoprestadorType }) => {
            return await prestadorModel.novoPrestador(args.prestador)
        },
        updatePrestador: async (_: any, args: { id: string, prestador: NovoprestadorType }) => {
            return await prestadorModel.updatePrestador(args.id, args.prestador)
        },
        deletePrestador: async (_: any, args: { id: string }) => {
            return await prestadorModel.deletePrestador(args.id)
        }
    },
    prestador: {
        empresa: async (parent: NovoprestadorType) => {
            return await prestadorModel.getPrestadorById(parent.id as any)
        },
        prestacoes: async (parent: NovoprestadorType) => {
            return await prestadorModel.getPrestadorById(parent.id as any)
        }
    }
}