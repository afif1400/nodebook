import '../styles/cell-list-item.css';
import React, { useState } from 'react';
import { Cell } from '../redux';
import TextEditor from './text-editor';
import NodeCell from './node-cell';
import ActionBar from './action-bar';

interface CellListItemProps {
	cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
	const [language, setLanguage] = useState('javascript');

	let child: JSX.Element;
	if (cell.type === 'code') {
		child = (
			<>
				<div className='action-bar-wrapper'>
					<ActionBar id={cell.id} setLang={setLanguage} celltype={cell.type} />
				</div>
				<NodeCell cell={cell} language={language} />
			</>
		);
	} else {
		child = (
			<>
				<TextEditor cell={cell} />
				<ActionBar id={cell.id} setLang={setLanguage} celltype={cell.type} />
			</>
		);
	}
	return <div className='cell-list-item'>{child}</div>;
};

export default CellListItem;
