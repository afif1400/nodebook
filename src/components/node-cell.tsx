import { useState, useEffect } from 'react';
import bundle from '../bundler';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizeable';

const NodeCell = () => {
	const [code, setCode] = useState('');
	const [input, setInput] = useState('');
	const [errStatus, setErrStatus] = useState('');

	useEffect(() => {
		const timer = setTimeout(async () => {
			const output = await bundle(input);
			setCode(output.code);
			setErrStatus(output.err);
		}, 1000);

		return () => {
			clearTimeout(timer);
		};
	}, [input]);

	return (
		<div>
			<Resizable direction='vertical'>
				<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
					<Resizable direction='horizontal'>
						<CodeEditor
							initialValue='//Write your code here'
							onChange={(value) => setInput(value)}
						/>
					</Resizable>
					<Preview code={code} bundlingStatus={errStatus} />
				</div>
			</Resizable>
		</div>
	);
};

export default NodeCell;
