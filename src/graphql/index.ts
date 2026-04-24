import { typeDefs } from "./typedefs/typedef.js"
import { userResolver } from "./resolvers/user.resolver.js"
import { prestacaoResolver } from "./resolvers/prestacao.resolver.js"
import { empresaResolver } from "./resolvers/empresa.resolver.js"
import { categoriaResolver } from "./resolvers/categoria.resolver.js"
import { servicoResolver } from "./resolvers/servico.resolver.js"
import { propostaResolver } from "./resolvers/proposta.resolver.js"
import { prestadorResolver } from "./resolvers/prestador.resolver.js"


// ********** exportar todos os resolvers **********
export const resolvers = {
    Query: {
        ...userResolver.Query,
        ...prestacaoResolver.Query,
        ...empresaResolver.Query,
        ...categoriaResolver.Query,
        ...servicoResolver.Query,
        ...propostaResolver.Query, 
        ...empresaResolver.Query,
        ...prestadorResolver.Query

    },
    Mutation: {
        ...userResolver.Mutation,
        ...prestacaoResolver.Mutation,
        ...empresaResolver.Mutation,
        ...categoriaResolver.Mutation,
        ...servicoResolver.Mutation,
        ...propostaResolver.Mutation,
        ...empresaResolver.Mutation,
        ...prestadorResolver.Mutation
    }
}


export default { typeDefs }