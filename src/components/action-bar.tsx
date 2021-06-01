import React, { Dispatch, SetStateAction } from 'react';
import { useActions } from '../hooks/use-actions';
import { CellTypes } from '../redux';
import '../styles/action-bar.css';

interface ActionBarProps {
	id: string;
	celltype: CellTypes;
	setLang: Dispatch<SetStateAction<string>>;
}

const ActionBar: React.FC<ActionBarProps> = ({ id, celltype, setLang }) => {
	const { moveCell, deleteCell } = useActions();
	return (
		<div className='action-bar'>
			{celltype === 'code' && (
				<div className='select is-info is-small'>
					<select onChange={(e) => setLang(e.target.value)}>
						<option>javascript</option>
						<option>python</option>
					</select>
				</div>
			)}
			<button
				className='button is-primary is-small up'
				onClick={() => moveCell(id, 'up')}
			>
				<i style={{ fontSize: '16px' }} className='fas fa-caret-up'></i>
			</button>
			<button
				className='button is-primary is-small down'
				onClick={() => moveCell(id, 'down')}
			>
				<i style={{ fontSize: '16px' }} className='fas fa-caret-down'></i>
			</button>
			<button
				className='button is-primary is-small del'
				onClick={() => deleteCell(id)}
			>
				<i style={{ fontSize: '14px' }} className='fas fa-trash-alt'></i>
			</button>
		</div>
	);
};

export default ActionBar;
