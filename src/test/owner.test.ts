import { isOwner } from "../security/auth.middelware.js";
import { jest, describe, beforeEach, it, expect } from "@jest/globals";


describe("Unit test: isOwner Middleware", () => {
    let mockRequest: any;
    let mockResponse: any;
    let mockFunction: any = jest.fn();

    beforeEach(() => {
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });
    it("deve retornar 403 quanmdo o utilizador nao for o dono do recurso", async () => {
        //1. Simulacao de um usuario logado (id: "user_123")
        mockRequest = {
            user: {
                id: "user_123"
            },
            params: {
                id: "servico_999"
            },
        }

        //2. Simulacao do modelo de dados (id do dono na bd e `outro_user_id`)
        const mockModel = {
            get: jest.fn<any>().mockResolvedValue({
                id_utilizador: "outro_user",
            })
        }
        const middleware = isOwner(mockModel, "id_utilizador");
        await middleware(mockRequest, mockResponse, mockFunction);

        //3. Verificacoes
        expect(mockResponse.status).toHaveBeenCalledWith(403);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "permicao insuficiente",
        });
        expect(mockFunction).not.toHaveBeenCalled();
    }
    )
}
);
