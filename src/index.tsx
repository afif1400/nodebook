import 'bulmaswatch/slate/bulmaswatch.min.css';
import ReactDom from 'react-dom';
import NodeCell from './components/node-cell';
const App = () => {
	return (
		<div>
			<NodeCell />
		</div>
	);
};

ReactDom.render(<App />, document.querySelector('#root'));
