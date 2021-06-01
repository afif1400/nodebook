import '../styles/add-cell.css';
import React from 'react';
import { useActions } from '../hooks/use-actions';

interface AddCellProps {
	prviousCellId: string | null;
	forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ prviousCellId, forceVisible }) => {
	const { insertCellAfter } = useActions();
	return (
		<div className={`add-cell ${forceVisible && 'force-visible'}`}>
			<div className='add-buttons'>
				<button
					className='button is-rounded is-primary is-small'
					onClick={() => insertCellAfter(prviousCellId, 'code')}
				>
					<span className='icon is-small'>
						<i className='fas fa-plus'></i>
					</span>
					<span>code</span>
				</button>
				<button
					className='button is-rounded is-primary is-small'
					onClick={() => insertCellAfter(prviousCellId, 'text')}
				>
					<span className='icon is-small'>
						<i className='fas fa-plus'></i>
					</span>
					<span>text</span>
				</button>
			</div>
			<div className='divider'></div>
		</div>
	);
};

export default AddCell;
