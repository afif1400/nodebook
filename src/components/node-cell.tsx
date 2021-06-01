import { useState, useEffect } from 'react';
import bundle from '../bundler';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizeable';
import axios from 'axios';

const NodeCell = () => {
	const [code, setCode] = useState('');
	const [input, setInput] = useState('');
	const [errStatus, setErrStatus] = useState('');
	const [language, setLanguage] = useState('javascript');

	useEffect(() => {
		if (language === 'javascript') {
			const timer = setTimeout(async () => {
				const output = await bundle(input);
				setCode(output.code);
				setErrStatus(output.err);
			}, 1000);
			return () => {
				clearTimeout(timer);
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [input]);

	const getExecutedCode = () => {
		axios
			.post('http://localhost:5000/execute', JSON.stringify({ code: input }), {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((response) => {
				console.log(response.data);
				setCode(response.data);
			});
	};

	return (
		<div>
			<Resizable direction='vertical'>
				<button onClick={getExecutedCode}>RUN</button>
				<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
					<Resizable direction='horizontal'>
						<CodeEditor
							language={language}
							initialValue='#Write your code here'
							onChange={(value) => setInput(value)}
						/>
					</Resizable>
					{language === 'javascript' ? (
						<Preview code={code} bundlingStatus={errStatus} />
					) : (
						<div>{code}</div>
					)}
				</div>
			</Resizable>
		</div>
	);
};

export default NodeCell;
