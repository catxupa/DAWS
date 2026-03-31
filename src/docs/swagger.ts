import swaggerJsdoc from "swagger-jsdoc"
import path from "path"
//configuracao do swagger
const options: swaggerJsdoc.Options = {
    //informacoes da api
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API servidor-local",
            description: "Plataforma de gestao de prestadores e servicos",
            version: "1.0.0",
        },
        //servidores
        servers: [
            {
                url: "http://localhost:8080",
                description: "dev",
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    //rotas 
    apis: [
        path.join(process.cwd(), "./src/docs/schemas/*.yaml"),
        path.join(process.cwd(), "./src/docs/paths/*.yaml")
    ]
}


export const swaggerSpec = swaggerJsdoc(options);