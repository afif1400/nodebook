import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDom from 'react-dom';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

const App = () => {
	const ref = useRef<any>();
	const [input, setInput] = useState('');
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [code, setCode] = useState('');

	const startService = async () => {
		ref.current = await esbuild.startService({
			worker: true,
			wasmURL: '/esbuild.wasm',
		});
	};

	useEffect(() => {
		startService();
	}, []);

	const onClick = async () => {
		if (!ref.current) {
			return;
		}

		const result = await ref.current.build({
			entryPoints: ['index.js'],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin()],
		});

		// console.log(result);

		setCode(result.outputFiles[0].text);
	};

	return (
		<div>
			<textarea
				onChange={(e) => setInput(e.target.value)}
				value={input}
			></textarea>
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
			<pre>{code}</pre>
		</div>
	);
};

ReactDom.render(<App />, document.querySelector('#root'));