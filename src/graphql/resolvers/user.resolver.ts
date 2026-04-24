import { prestacaoServicoModel } from "../../models/prestacao_servico.models.js"
import { userModel } from "../../models/user.models.js"
import type { utilizadorType } from "../../util/types.js"


// ********** resolver de user **********
export const userResolver = {
    // ********** query de user **********
    Query: {
        getAllUsers: async () => {
            return await userModel.getAll()
        },
        getUserById: async (_: any, args: { id: string }) => {
            return await userModel.getUserById(args.id)
        }
    },
    // ********** mutation de user **********
    Mutation: {
        createUser: async (_: any, args: { user: utilizadorType }) => {
            return await userModel.novoUtilizador(args.user)
        },
        updateUser: async (_: any, args: { id: string, user: utilizadorType }) => {
            return await userModel.updateuser(args.id, args.user)
        },
        deleteUser: async (_: any, args: { id: string }) => {
            return await userModel.deleteuser(args.id)
        }
    },
    utilizador: {
        orcamentos: async (parent: utilizadorType) => {
            return await userModel.getUserById(parent.id)
        },
        empresa: async (parent: utilizadorType) => {
            return await userModel.getUserById(parent.id)
        }
    }
}
