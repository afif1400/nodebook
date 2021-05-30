import 'bulmaswatch/cyborg/bulmaswatch.min.css';
import ReactDom from 'react-dom';
import NodeCell from './components/nodecell';
const App = () => {
	return (
		<div>
			<NodeCell />
		</div>
	);
};

ReactDom.render(<App />, document.querySelector('#root'));
