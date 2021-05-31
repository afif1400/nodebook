import 'bulmaswatch/slate/bulmaswatch.min.css';
import ReactDom from 'react-dom';
// import NodeCell from './components/node-cell';
import { Provider } from 'react-redux';
import { store } from './redux';
import TextEditor from './components/text-editor';

const App = () => {
	return (
		<Provider store={store}>
			{/* <NodeCell /> */}
			<div>
				<TextEditor />
			</div>
		</Provider>
	);
};

ReactDom.render(<App />, document.querySelector('#root'));
