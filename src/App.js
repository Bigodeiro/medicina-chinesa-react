import './App.css';
import React, { useState, useEffect } from 'react';
import SINTOMAS from './SINTOMAS';
import SINDROMES from './SINDROMES';

const getFilteredSintomas = (sintomas, query) => {
	if (!query) {
		return sintomas;
	}

	return sintomas.filter((sintoma) => {
		const sintomaName = sintoma.name.toLowerCase();
		return sintomaName.includes(query.toLowerCase());
	});
}

function App() {
	const [query, setQuery] = useState('');
	const [SintomasSelecionaveis, setSintomasSelecionaveis] = useState(SINTOMAS);
	const [SintomasSelecionados, setSintomasSelecionados] = useState([]);
    const [SindromesPossiveis, setSindromesPossiveis] = useState(SINDROMES);
	const [expandedDescriptions, setExpandedDescriptions] = useState({});
	const [expandedSymptoms, setExpandedSymptoms] = useState({});

	// Função para selecionar um sintoma
	const selecionarSintoma = (sintoma) => {
		setSintomasSelecionaveis((prevSintomas) => 
			prevSintomas.filter((s) => s !== sintoma)
		);
		setSintomasSelecionados((prevSelecionados) => [...prevSelecionados, sintoma]);
	};

	// Função para remover um sintoma da lista de selecionados
	const removerSintomaSelecionado = (sintoma) => {
		setSintomasSelecionados((prevSelecionados) => 
			prevSelecionados.filter((s) => s !== sintoma)
		);
		setSintomasSelecionaveis((prevSintomas) => [...prevSintomas, sintoma]);
	};

	// Calcular a compatibilidade das síndromes
	useEffect(() => {
		const calcularCompatibilidade = () => {
			const atualizaSindromes = SINDROMES.map(sindrome => {
				const sintomasSindrome = sindrome.symptoms;
				const sintomasEmComum = sintomasSindrome.filter(sintoma => 
					SintomasSelecionados.some(s => s.name === sintoma)
				);

				// Calcular porcentagem
				const compatibilidade = (sintomasEmComum.length / sintomasSindrome.length) * 100;

				return {
					...sindrome,
					compatibilidade: compatibilidade.toFixed(2) // Exibir duas casas decimais
				};
			});
			
			// Ordenar por compatibilidade (maior para menor)
			const ordenadasPorCompatibilidade = atualizaSindromes.sort((a, b) => b.compatibilidade - a.compatibilidade);
			setSindromesPossiveis(ordenadasPorCompatibilidade);
		};

		calcularCompatibilidade();
	}, [SintomasSelecionados]); // Recalcular sempre que os sintomas selecionados mudarem

	// Função para alternar entre descrição curta e completa
	const toggleDescription = (id) => {
		setExpandedDescriptions(prevState => ({
			...prevState,
			[id]: !prevState[id]
		}));
	};

	// Função para alternar entre lista curta e completa de sintomas
	const toggleSymptoms = (id) => {
		setExpandedSymptoms(prevState => ({
			...prevState,
			[id]: !prevState[id]
		}));
	};

	const truncateText = (text, maxLength) => {
		return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
	};

	const filteredSintomas = getFilteredSintomas(SintomasSelecionaveis, query);

	// Ordenar sintomas por "count" (maior para menor)
	const sortedSintomasSelecionaveis = filteredSintomas.sort((a, b) => b.count - a.count);
	const sortedSintomasSelecionados = SintomasSelecionados.sort((a, b) => b.count - a.count);

	return (	
		<div className="App">
			{/* Lista de sintomas selecionáveis */}
			<div className='ListaSintomas'>
				<h2>Sintomas Disponíveis</h2>
				<input 
					className='search-bar' 
					type="text" 
					value={query} 
					onChange={(e) => setQuery(e.target.value)} 
				/>
				<ul>
					{sortedSintomasSelecionaveis.map((sintoma, index) => (
						<div className='Box' key={index}>
							<div className='SubBox'>
								<h3 className='SintomaNome'>{sintoma.name}</h3>
								<h4 className='SintomaDesc'>Aqui estara uma breve descrição de cada sintoma</h4>
								<p>Numero de ocorrências: {sintoma.count}</p>
							</div>
							<button 
								className='SelectButton' 
								onClick={() => selecionarSintoma(sintoma)}>
								Selecionar
							</button>
						</div>
					))}
				</ul>
			</div>

			{/* Lista de sintomas selecionados */}
			<div className='SintomasSelecionados'>
				<h2>Sintomas Selecionados</h2>
				<ul>
					{sortedSintomasSelecionados.map((sintoma, index) => (
						<div className='Box' key={index}>
							<div className='SubBox'>
								<h3 className='SintomaNome'>{sintoma.name}</h3>
								<h4 className='SintomaDesc'>Aqui estara uma breve descrição de cada sintoma</h4>
								<p>Numero de ocorrências: {sintoma.count}</p>
							</div>
							<button 
								className='RemoveButton' 
								onClick={() => removerSintomaSelecionado(sintoma)}>
								Remover
							</button>
						</div>
					))}
				</ul>
			</div>

			{/* Lista de síndromes possíveis */}
			<div className='PossiveisSindromes'>
				<h2>Síndromes Possíveis</h2>
                <ul>
                    {SindromesPossiveis.map((sindrome, index) => (
                        <div className='Box' key={index}>
                            <div className='SubBox'>
                                <h3 className='SindromeNome'>{sindrome.name}</h3>
								
								{/* Descrição da Síndrome */}
                                <h4 className='SindromeDesc'>
									{expandedDescriptions[sindrome.id] 
										? sindrome.description 
										: truncateText(sindrome.description, 30)}
								</h4>
								<button onClick={() => toggleDescription(sindrome.id)}>
									{expandedDescriptions[sindrome.id] ? 'Colapsar' : 'Expandir'}
								</button>

								{/* Lista de sintomas da Síndrome */}
								<h5>Sintomas:</h5>
								<ul>
									{expandedSymptoms[sindrome.id]
										? sindrome.symptoms.map((sintoma, i) => (
												<li key={i}>{sintoma}</li>
											))
										: sindrome.symptoms.slice(0, 2).map((sintoma, i) => (
												<li key={i}>{truncateText(sintoma, 30)}</li>
											))}
								</ul>
								<button onClick={() => toggleSymptoms(sindrome.id)}>
									{expandedSymptoms[sindrome.id] ? 'Colapsar Sintomas' : 'Expandir Sintomas'}
								</button>

                                <p>Compatibilidade: {sindrome.compatibilidade}%</p>
                            </div>
                        </div>
                    ))}
                </ul>
			</div>
		</div>
	);
}

export default App;
