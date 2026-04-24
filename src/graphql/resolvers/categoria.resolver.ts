import { categoriaModel } from "../../models/categoria.models.js"
import type { NovaCategoriaType } from "../../util/types.js"


export const categoriaResolver = {
    Query: {
        getAllCategorias: async () => {
            return await categoriaModel.getAllCategoria()
        },
        getCategoriaById: async (_: any, args: { id: string }) => {
            return await categoriaModel.getCategoriaById(args.id)
        }
    },
    Mutation: {
        createCategoria: async (_: any, args: { categoria: NovaCategoriaType }) => {
            return await categoriaModel.createCategoria(args.categoria)
        },
        updateCategoria: async (_: any, args: { id: string, categoria: NovaCategoriaType }) => {
            return await categoriaModel.updateCategoria(args.id, args.categoria)
        },
        deleteCategoria: async (_: any, args: { id: string }) => {
            return await categoriaModel.deleteCategoria(args.id)
        }
    },
    categoria: {
        servicos: async (parent: NovaCategoriaType) => {
            return await categoriaModel.getCategoriaById(parent.id as any)
        }
    }
}