interface AlunosType {
    nome: string;
    endereco: string;
    contacto?: string | null;
}


const alunos: Array<AlunosType> = [
    {
        nome: "tiago ",
        endereco: "Rua A",
        contacto: "123456789"
    },
]

let horasTrabalhadas: number = 10;
let precoHora: number = 10;
let taxaUrgencia: number = 10;
let desconto: number = 10;
let total: number = 10;


let variavel: string = "variavel";

desconto === taxaUrgencia && desconto > taxaUrgencia ?

    taxaUrgencia += desconto : taxaUrgencia -= desconto;

total = (horasTrabalhadas + precoHora) + taxaUrgencia - desconto; 


