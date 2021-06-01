import React from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import AddCell from './add-cell';
import CellListItem from './cell-list-item';

const CellList: React.FC = () => {
	const cells = useTypedSelector(({ cells }) =>
		cells?.order.map((id) => cells.data[id])
	);

	const renderedCells = cells?.map((cell) => (
		<React.Fragment key={cell.id}>
			<AddCell nextCellId={cell.id} />
			<CellListItem cell={cell} />
		</React.Fragment>
	));
	return (
		<div>
			{renderedCells}
			<div className={cells?.length === 0 ? 'force-visible' : ''}></div>
			<AddCell nextCellId={null} />
		</div>
	);
};

export default CellList;
