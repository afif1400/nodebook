import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDom from 'react-dom';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const App = () => {
	const ref = useRef<any>();
	const iframe = useRef<any>();
	const [input, setInput] = useState('');

	const startService = async () => {
		ref.current = await esbuild.startService({
			worker: true,
			wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm ',
		});
	};

	useEffect(() => {
		startService();
	}, []);

	const onClick = async () => {
		if (!ref.current) {
			return;
		}

		iframe.current.srcDoc = html;

		const result = await ref.current.build({
			entryPoints: ['index.js'],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin(), fetchPlugin(input)],
			define: {
				'process.env.NODE_ENV': '"production"',
				global: 'window',
			},
		});

		// setCode(result.outputFiles[0].text);
		iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
	};

	const html = `
    <html lang="en">
    <head>    
    </head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message', (event) => {
          try{
            eval(event.data)
          }
          catch (err) {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color:red;"><h4>Runtime Error</h4>' + err + '</div>'
            console.error(err);
          }
        },false)
      </script>
    </body>
    </html>
  `;

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
			<iframe
				ref={iframe}
				srcDoc={html}
				sandbox='allow-scripts'
				title='preview'
			/>
		</div>
	);
};

ReactDom.render(<App />, document.querySelector('#root'));
