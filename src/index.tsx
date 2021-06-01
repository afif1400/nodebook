import 'bulmaswatch/cerulean/bulmaswatch.min.css';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import CellList from './components/cell-list';
import { store } from './redux';

const App = () => {
	return (
		<Provider store={store}>
			<div>
				<CellList />
			</div>
		</Provider>
	);
};

ReactDom.render(<App />, document.querySelector('#root'));
