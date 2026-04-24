import { categoriaModel } from "../../models/categoria.models.js"
import { servicoModel } from "../../models/servico.models.js"
import type { NovoservicoType } from "../../util/types.js"


export const servicoResolver = {
    Query: {
        getAllServicos: async () => {
            return await servicoModel.getAll()
        },
        getServicoById: async (_: any, args: { id: string }) => {
            return await servicoModel.get(args.id)
        }
    },
    Mutation: {
        createServico: async (_: any, args: any) => {
            return await servicoModel.create(args)
        },
        updateServico: async (_: any, args: any) => {
            const { id, ...data } = args
            return await servicoModel.update(id, data)
        },
        deleteServico: async (_: any, args: any) => {
            return await servicoModel.deleteService(args.id)
        }
    },
    servico: {
        categoria: async (parent: NovoservicoType) => {
            return await categoriaModel.getCategoriaById(parent.id as any)
        },
        prestacoes: async (parent: NovoservicoType) => {
            return await servicoModel.get(parent.id as any)
        }
    }
}