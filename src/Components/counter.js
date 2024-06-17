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
                'agitacao',              'aversao ao frio',
                'aversao ao vento',      'cefaleia',
                'congestao conjuntival', 'coriza',
                'corpo dolorido',        'desejo por frio',
                'dor na garganta',       'dor nas articulacoes',
                'face vermelha',         'febre',
                'febre alta',            'mialgia',
                'obstrucao nasal',       'sede',
                'tosse',                 'urina escura',
                'vomito'
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
        
        this.setState(prevState => ({
            sintomasSelecionados: prevState.sintomasSelecionados.concat(sintomaSelecionado).sort(),
            sintomasSelecionaveis: prevState.sintomasSelecionaveis.filter(sintoma => sintoma !== sintomaSelecionado).sort(),
            sindromesPossiveis: prevState.sindromesPossiveis.map(sindrome => ({
                nome: sindrome.nome,
                sintomas: sindrome.sintomas,
                compatibilidade: sindrome.compatibilidade += countCommonElements(sindrome.sintomas, [sintomaSelecionado]) / sindrome.sintomas.length
            })).sort((a, b) => b.compatibilidade - a.compatibilidade)
        }));
    }
    


    removeSintoma(sintomaRemovido) {
        this.setState(prevState => ({
            sintomasSelecionaveis: prevState.sintomasSelecionaveis.concat(sintomaRemovido).sort(),
            sintomasSelecionados: prevState.sintomasSelecionados.filter(sintoma => sintoma !== sintomaRemovido).sort(),
            sindromesPossiveis: prevState.sindromesPossiveis.map(sindrome => ({
                nome: sindrome.nome,
                sintomas: sindrome.sintomas,
                compatibilidade: sindrome.compatibilidade -= countCommonElements(sindrome.sintomas, [sintomaRemovido] ) / sindrome.sintomas.length
            })).sort((a, b) => b.compatibilidade - a.compatibilidade)
        })
        )
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