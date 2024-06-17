import React, { Component } from 'react'

function countCommonElements(list1, list2) {
    let count = 0;
    for (let i = 0; i < list1.length; i++) {
        for (let j = 0; j < list2.length; j++) {
            if (list1[i] == list2[j]) {
                count++;
            }
        }
    }
    return count;
}


class Counter extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            sintomasSelecionaveis: 
            [
                "aversao ao frio", "febre", "aversao ao vento", "vomito", "sede",
                "cefaleia", "obstrucao nasal", "coriza", "tosse",
                "febre alta", "desejo por frio", "face vermelha", "congestao conjuntival", "agitacao", "dor nas articulacoes",
                "corpo dolorido", "urina escura", "mialgia", "dor na garganta"

            ],
            sintomasSelecionados: [],

            sindromesPossiveis: 
            [
                {
                    nome: "Síndrome de Frio do Exterior",
                    sintomas: ["aversao ao frio", "febre", "cefaleia", "corpo dolorido"],
                    compatibilidade: 0, 
                },
                {
                    nome: "Síndrome de Calor por Excesso",
                    sintomas: ["febre", "desejo por frio", "face vermelha", "congestao conjuntival", "agitacao", "urina escura", ] ,
                    compatibilidade: 0,
                },
                {
                    nome: "Sindrome devido ao Frio",
                    sintomas: ["aversao ao frio", "cefaleia", "mialgia", "dor nas articulacoes"],
                    compatibilidade: 0, 
                },
                {
                    nome: "Síndrome devido ao Vento",
                    sintomas: ["obstrucao nasal", "tosse", "aversao ao vento", "febre"],
                    compatibilidade: 0, 
                },
                {
                    nome: "Síndrome devido ao Fogo",
                    sintomas: ["cefaleia", "aversao ao frio", "febre", "dor na garganta"],
                    compatibilidade: 0, 
                }, 
                               {
                    nome: "Síndrome devido à Secura",
                    sintomas: ["sede", "aversao ao vento", "aversao ao frio", "febre"],
                    compatibilidade: 0, 
                }
            ]
        }
    }

    selecionaSintoma(sintomaSelecionado) {
        this.setState(() => ({
            sintomasSelecionados: this.state.sintomasSelecionados.concat(sintomaSelecionado),
            sintomasSelecionaveis: this.state.sintomasSelecionaveis.filter(sintoma => sintoma !== sintomaSelecionado),

        })
        )

        for (let i = 0; i < this.state.sindromesPossiveis.length; i++)
        {
            this.state.sindromesPossiveis[i].compatibilidade = countCommonElements(this.state.sindromesPossiveis[i].sintomas, this.state.sintomasSelecionados) / this.state.sindromesPossiveis[i].sintomas.length
        }
        //sort sintomasSelecionaveis by alphabetical order
        this.state.sintomasSelecionaveis.sort()

        this.state.sindromesPossiveis.sort((a, b) => b.compatibilidade - a.compatibilidade)
    }
    
    removeSintoma(sintomaRemovido) {
        this.setState(() => ({
            sintomasSelecionaveis: this.state.sintomasSelecionaveis.concat(sintomaRemovido),
            sintomasSelecionados: this.state.sintomasSelecionados.filter(sintoma => sintoma !== sintomaRemovido)
        })
        )

        for (let i = 0; i < this.state.sindromesPossiveis.length; i++)
        {
            this.state.sindromesPossiveis[i].compatibilidade = countCommonElements(this.state.sindromesPossiveis[i].sintomas, this.state.sintomasSelecionados) / this.state.sindromesPossiveis[i].sintomas.length
        }

        this.state.sindromesPossiveis.sort((a, b) => b.compatibilidade - a.compatibilidade)
    }

    render() {
        return (

            <div className='ui'>


            <div className='ListaSelecionaveis'>

                <header className='Header'>
                    <h2>Sintomas Selecionaveis</h2>
                </header>

                {this.state.sintomasSelecionaveis.map(
                    sintoma => (
                        <div className='Box' key={sintoma}>

                            <div className='SubBox'>

                                <h3 className='SintomaNome'>{sintoma}</h3>
                                <h4 className='SintomaDesc'>Aqui estara uma breve descrição de cada sintoma </h4>
                            </div>

                            <button className='SelectButton' onClick={() => this.selecionaSintoma(sintoma)}>Selecionar</button>

                        </div>
                    )
                )}
            </div>
            

            <div className='ListaSelecionados'>

                <header className='Header'>
                    <h2>Sintomas Selecionados</h2>
                </header>

                {this.state.sintomasSelecionados.map(
                    sintoma => (
                        <div className='Box' key={sintoma}>

                            <div className='SubBox'>

                                <h3 className='SintomaNome'>{sintoma}</h3>
                                <h4 className='SintomaDesc'>Aqui estara uma breve descrição de cada sintoma </h4>
                            </div>

                            <button className='SelectButton' onClick={() => this.removeSintoma(sintoma)}>Remover</button>

                        </div>
                    )
                )}

            </div>

            <div className='diagnostico'>
                    
                    <header className='Header'>
                        <h2>Síndromes possíveis</h2>
                    </header>

                    {this.state.sindromesPossiveis.map(
                        sindrome => (
                            <div className='Box' key={sindrome.nome}>

                                <div className='DiagSubBox'>

                                    <h3 className='SintomaNome'>{sindrome.nome}</h3>
                                    <h4 className='SintomaDesc'>Aqui estara uma breve descrição de cada sintoma </h4>
                                </div>

                                <div className='CompatBox'>
                                    {(sindrome.compatibilidade * 100).toFixed(0) + "%"}
                                </div>

                            </div>
                        )
                    )}

            </div>

        </div>


        )
    }
}

export default Counter