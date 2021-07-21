import { useState, useEffect } from 'react';
import bundle from '../bundler';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizeable';
// import axios from 'axios';
import { Cell } from '../redux';
import { useActions } from '../hooks/use-actions';

interface NodeCellProps {
	cell: Cell;
	language: string;
}

const NodeCell: React.FC<NodeCellProps> = ({ cell, language }) => {
	const [code, setCode] = useState('');
	const [errStatus, setErrStatus] = useState('');
	const { updateCell } = useActions();

	useEffect(() => {
		if (language === 'javascript') {
			const timer = setTimeout(async () => {
				const output = await bundle(cell.content);
				setCode(output.code);
				setErrStatus(output.err);
			}, 1000);
			return () => {
				clearTimeout(timer);
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cell.content]);

	// const getExecutedCode = () => {
	// 	axios
	// 		.post(
	// 			'http://localhost:5000/execute',
	// 			JSON.stringify({ code: cell.content }),
	// 			{
	// 				headers: {
	// 					'Content-Type': 'application/json',
	// 				},
	// 			}
	// 		)
	// 		.then((response) => {
	// 			console.log(response.data);
	// 			setCode(response.data);
	// 		});
	// };

	return (
		<div>
			<Resizable direction='vertical'>
				{/* <button onClick={getExecutedCode}>RUN</button> */}
				<div
					style={{
						height: 'calc(100% - 10px)',
						display: 'flex',
						flexDirection: 'row',
					}}
				>
					<Resizable direction='horizontal'>
						<CodeEditor
							language={language}
							initialValue={cell.content}
							onChange={(value) => updateCell(cell.id, value)}
						/>
					</Resizable>
					{language === 'javascript' ? (
						<Preview code={code} bundlingStatus={errStatus} />
					) : (
						<pre style={{ width: '100%' }}>{code}</pre>
					)}
				</div>
			</Resizable>
		</div>
	);
};

export default NodeCell;
