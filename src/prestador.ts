
export class prestador {
    nome: string
    precoHora: number
    profissao: string
    minimoParaDesconto: number
    percentagemDesconto: number
    taxaUrgencia: number


    constructor(nomeDoPrestador: string,
        precoHoraDoPrestador: number,
        profissaoDoPrestador: string,
        minimoParaDescontoDoPrestador: number,
        percentagemDescontoDoPrestador: number,
        taxaUrgenciaDoPrestador: number
    ) {
        this.nome = nomeDoPrestador
        this.precoHora = precoHoraDoPrestador
        this.profissao = profissaoDoPrestador
        this.minimoParaDesconto = minimoParaDescontoDoPrestador
        this.percentagemDesconto = percentagemDescontoDoPrestador
        this.taxaUrgencia = taxaUrgenciaDoPrestador
    }
    alterarPrecoHora(novoPrecoHora: number) {
        this.precoHora = novoPrecoHora
    }
    alterarNome(novoNome: string) {
        this.nome = novoNome
    }
}

const prestador1 = new prestador("Bruno", 100,
    "Desenvolvedor de Software",
    1000, 0.1,
    0.3,)

console.log(prestador1.precoHora)// preco hora do prestador, 100

prestador1.alterarPrecoHora(150)
prestador1.alterarNome("Bruno Monteiro")

console.log(prestador1.precoHora)// preco hora do prestador, 150
console.log(prestador1.nome)// nome do prestador, Tiago Soares