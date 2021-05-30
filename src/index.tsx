import 'bulmaswatch/slate/bulmaswatch.min.css';
import ReactDom from 'react-dom';
// import NodeCell from './components/node-cell';
import TextEditor from './components/text-editor';
const App = () => {
	return (
		<div>
			{/* <NodeCell /> */}
			<TextEditor />
		</div>
	);
};

ReactDom.render(<App />, document.querySelector('#root'));
