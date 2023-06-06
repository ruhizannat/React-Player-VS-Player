import React from 'react';

export default function PlayerCard({
	handlePlayerOne,
	handlePlayerTwo,
	p1Disabled,
	p2Disabled,
	resetGame,
	handleEdit
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
			>
				Player Two
			</button>
			<button type='submit' id='submit' onClick={resetGame}>
				Reset
			</button>
			<button type='submit' id='submit' onClick={handleEdit}>
				Edit Name
			</button>
		</div>
	);
}
