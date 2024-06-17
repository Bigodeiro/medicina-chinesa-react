import logo from './logo.svg';
import './App.css';
import Counter from './Components/counter';
import teste from './Components/teste';
import Teste from './Components/teste';

let sintomasSelecionados = ["Febre", "Tosse", "Cansaco", "Vomito"]

function App() 
{

	return (	
		<div className="App">

			{/* <Teste/> */}
			<Counter/>

		</div>
	);
} 

export default App;