import { useState } from 'react';
import bundle from '../bundler';
import CodeEditor from '../components/code-editor';
import Preview from '../components/preview';

const NodeCell = () => {
	const [code, setCode] = useState('');
	const [input, setInput] = useState('');

	const onClick = async () => {
		const output = await bundle(input);
		setCode(output);
	};

	return (
		<div>
			<CodeEditor
				initialValue='//Write your code here'
				onChange={(value) => setInput(value)}
			/>
			<div>
				<button
					style={{
						background: '#222',
						color: '#fff',
						outline: 'none',
						border: 'none',
						padding: '5px 10px',
						margin: '10px 0',
						borderRadius: '5px',
					}}
					onClick={onClick}
				>
					Submit
				</button>
			</div>
			<Preview code={code} />
		</div>
	);
};

export default NodeCell;
