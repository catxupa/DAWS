import { empresaModel } from "../../models/empresa.models.js"
import { prestacaoServicoModel } from "../../models/prestacao_servico.models.js"
import type { NovaEmpresaType } from "../../util/types.js"


export const empresaResolver = {
    Query: {
        getAllEmpresas: async () => {
            return await empresaModel.getAllEmpresas()
        },
        getEmpresaById: async (_: any, args: { id: string }) => {
            return await empresaModel.getEmpresaById(args.id)
        }
    },
    Mutation: {
        createEmpresa: async (_: any, args: { empresa: NovaEmpresaType }) => {
            return await empresaModel.createEmpresa(args.empresa)
        },
        updateEmpresa: async (_: any, args: { id: string, empresa: NovaEmpresaType }) => {
            return await empresaModel.updateEmpresa(args.id, args.empresa)
        },
        deleteEmpresa: async (_: any, args: { id: string }) => {
            return await empresaModel.deleteEmpresa(args.id)
        }
    },
    empresa: {
        utilizador: async (parent: NovaEmpresaType) => {
            return await empresaModel.getEmpresaById(parent.id as any);
        },
        prestador: async (parent: NovaEmpresaType) => {
            return await empresaModel.getEmpresaById(parent.id as any);
        }
    }
}  