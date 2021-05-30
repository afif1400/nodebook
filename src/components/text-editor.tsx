import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import '../styles/text-editor.css';

import React from 'react';

const TextEditor: React.FC = () => {
	const [editing, setEditing] = useState(false);
	const [value, setValue] = useState('# Header');
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const listener = (event: MouseEvent) => {
			if (
				ref.current &&
				event.target &&
				ref.current.contains(event.target as Node)
			) {
				return;
			}
			setEditing(false);
		};

		document.addEventListener('click', listener, { capture: true });

		return () => {
			document.removeEventListener('click', listener, { capture: true });
		};
	});
	if (editing) {
		return (
			<div ref={ref} className='text-editor'>
				<MDEditor value={value} onChange={(v) => setValue(v || '')} />
			</div>
		);
	}

	return (
		<div onClick={() => setEditing(true)} className='text-editor card'>
			<div className='card-content'>
				<MDEditor.Markdown source={value} />
			</div>
		</div>
	);
};

export default TextEditor;
