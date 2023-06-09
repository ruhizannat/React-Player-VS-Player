import React from 'react';

export default function PlayerCard({
	handlePlayerOne,
	handlePlayerTwo,
	p1Disabled,
	p2Disabled,
	resetGame,
	handleEdit,
}) {
	return (
		<div>
			<button
				type='submit'
				id='submit'
				onClick={handlePlayerOne}
				disabled={p1Disabled}
			>
				Player One
			</button>
			<button
				type='submit'
				id='submit'
				onClick={handlePlayerTwo}
				disabled={p2Disabled}
				className='ms-2'
			>
				Player Two
			</button>
			<button type='submit' id='submit' onClick={resetGame} className='ms-2'>
				Reset
			</button>
			<button type='submit' id='submit' onClick={handleEdit}>
				Edit Name
			</button>
		</div>
	);
}
