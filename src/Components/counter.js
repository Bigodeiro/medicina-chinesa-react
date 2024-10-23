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
                ' Agitação',              ' Aversão ao frio',
                ' Aversão ao vento',      ' Cefaleia',
                ' Congestão conjuntival', ' Coriza',
                ' Corpo dolorido',        ' Desejo por frio',
                ' Dor na garganta',       ' Dor nas articulações',
                ' Face vermelha',         ' Febre',
                ' Febre alta',            ' Mialgia',
                ' Obstrução nasal',       ' Sede',
                ' Tosse',                 ' Urina escura',
                ' Vômito'
            ],
            sintomasSelecionados: [],

            sindromesPossiveis: 
            [
                {
                    nome: " Síndrome de Frio do Exterior",
                    sintomas: [" Aversão ao frio", " Febre", " Cefaleia", " Corpo dolorido"],
                    compatibilidade: 0, 
                },
                {
                    nome: " Síndrome de Calor por Excesso",
                    sintomas: [" Febre", " Desejo por frio", " Face vermelha", " Congestão conjuntival", " Agitação", " Urina escura", ] ,
                    compatibilidade: 0,
                },
                {
                    nome: " Síndrome devido ao Frio",
                    sintomas: [" Aversão ao frio", " Cefaleia", " Mialgia", " Dor nas articulações"],
                    compatibilidade: 0, 
                },
                {
                    nome: " Síndrome devido ao Vento",
                    sintomas: [" Obstrução nasal", " Tosse", " Aversão ao vento", " Febre"],
                    compatibilidade: 0, 
                },
                {
                    nome: " Síndrome devido ao Fogo",
                    sintomas: [" Cefaleia", " Aversão ao frio", " Febre", " Dor na garganta"],
                    compatibilidade: 0, 
                }, 
                {
                    nome: " Síndrome devido à Secura",
                    sintomas: [" Sede", " Aversão ao vento", " Aversão ao frio", " Febre"],
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
                                    <h4 className='SintomaDesc'>{sindrome.sintomas.toString()}</h4>
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