import "dotenv/config"
import express from "express";
import { router } from "./routs/servico.routs.js";
import { rOuter } from "./routs/user.routs.js";
import { ruter } from "./routs/prestador.routs.js";
import { ruters } from "./routs/orcamento.routs.js";
import { ruterss } from "./routs/proposta.routs.js";
import { ruterrs } from "./routs/prestacao_servico.routs.js";
import { rota } from "./routs/categoria.routs.js";
import { rotaa } from "./routs/empresa.routs.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";
import { ApolloServer } from "@apollo/server";
import { resolvers } from "./graphql/index.js";
import { typeDefs } from "./graphql/typedefs/typedef.js";
import { expressMiddleware } from "@as-integrations/express5";

// ***************** express ***************** //
const app = express(); // cria a aplicação
app.use(express.json()); // para interpretar o corpo das requisições como JSON

// rota inicial do express
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// rotas do express
app.use("/servico", router)
app.use("/user", rOuter)
app.use("/prestador", ruter)
app.use("/orcamento", ruters)
app.use("/proposta", ruterss)
app.use("/prestacao_servico", ruterrs)
app.use("/categoria", rota)
app.use("/empresa", rotaa)

// rota da documentação swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ***************** graphql ***************** //
//cria o servidor graphql
const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers
})

//cria a rota graphql
await graphqlServer.start();
app.use("/graphql",
    expressMiddleware(graphqlServer, {
        context: async ({ req }) => ({
            //verificar se o header de autorizacao existe
            token: req.headers.authorization,
            DB_HOST: process.env.DB_HOST,
            DB_USER: process.env.DB_USER,
            DB_PASSWORD: process.env.DB_PASSWORD,
            DB_NAME: process.env.DB_NAME,
        }),
    }))


// inicia o servidor na porta 8080
app.listen(8080, () => {
    console.log("Servidor rodando em http://localhost:8080");
});