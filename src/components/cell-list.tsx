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
			<CellListItem cell={cell} />
			<AddCell prviousCellId={cell.id} />
		</React.Fragment>
	));
	return (
		<div>
			<AddCell forceVisible={cells?.length === 0} prviousCellId={null} />
			{renderedCells}
		</div>
	);
};

export default CellList;
