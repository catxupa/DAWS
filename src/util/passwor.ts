import { hash, compare } from "bcrypt"

// funcao para fazer o has da senha 
export async function hashpassword(passwordEmTexto:string) {
    return await hash (passwordEmTexto,12)
}

//funcao para comparar a senha 
export async function comparepassword(password: string, hash: string) {
    return await compare(password, hash)
} 