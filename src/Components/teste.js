import React from 'react'

const teste = (props) => 
{
    const removeSintoma = (sintomaRemovido) => {
        listaInputSintomas = listaInputSintomas.filter(sintoma => sintoma !== sintomaRemovido)
        
        
    }
    


    let listaInputSintomas = props.listaInputSintomas.split(', ')
    
    let listaSintomas = listaInputSintomas.map(
        sintoma => (
            
            
            <div className='Box' key={sintoma}>

            <div className='SubBox'>

                <h3 className='SintomaNome'>{sintoma}</h3>
                <h4 className='SintomaDesc'>Aqui estara uma breve descrição de cada sintoma </h4>
            </div>

            <button className='SelectButton' onClick={() => removeSintoma(sintoma)}>Selecionar</button>

        </div>

    ))



    return (
        <div className='ListaSelecionaveis'>
            {listaSintomas}
        </div>
    )
}

export default teste