import React, { useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import PlayerCard from './PlayerCard';
import Alert from 'react-bootstrap/Alert';
import Swal from 'sweetalert2';
import sound from './sound.mp3';

export default function App() {
	const audio = new Audio(sound);
	const [inputValue, setInputValue] = useState('');
	const [winningScore, setWinningScore] = useState(0);
	const [isValid, setIsValid] = useState(false);
	const [p1Score, setP1Score] = useState(0);
	const [p2Score, setP2Score] = useState(0);
	const [p1Turn, setP1Turn] = useState(true);
	const [p2Turn, setP2Turn] = useState(false);
	const [p1Disabled, setP1Disabled] = useState(false);
	const [p2Disabled, setP2Disabled] = useState(false);
	const [show, setShow] = useState(false);
	const [play1Name, setPlay1Name] = useState('Player One');
	const [play2Name, setPlay2Name] = useState('Player Two');
	const [playing, setPlaying] = useState(false);

	const checkValidation = (inputValue) => {
		let isError = false;
		if (inputValue === '') {
			isError = true;
			setIsValid(!isValid);
			toast.error('please provide necessary info');
		}
		if (inputValue <= 0) {
			isError = true;
			setIsValid(!isValid);
			toast.error('please enter valid number in input field');
		}
		if (Number(inputValue) !== Number(inputValue)) {
			isError = true;
			setIsValid(!isValid);
			toast.error('please provide price in number');
		}

		return isError;
	};

	const generateRandomNumber = () => {
		return Math.floor(Math.random() * 10 + 1);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setInputValue(' ');

		// check validation
		const isError = checkValidation(inputValue);
		if (isError) return;
		console.log(inputValue);

		// set winning score

		setWinningScore(inputValue);
	};
	const handleChange = (e) => {
		const value = +e.target.value;

		setInputValue(value);
	};
	const handlePlayerOne = () => {
		if (p1Turn) {
			setP1Score(generateRandomNumber);
			setP1Disabled(true);
			setP2Disabled(false);
			setP1Turn(false);
			setP2Turn(!p2Turn);
		}
		winnerMsg();
	};

	const handlePlayerTwo = () => {
		if (p2Turn) {
			setP2Score(generateRandomNumber);
			setP2Disabled(true);
			setP1Disabled(false);
			setP2Turn(false);
			setP1Turn(!p1Turn);
		}
		winnerMsg();
	};
	const winnerMsg = () => {
		const isWinnerScoreReached =
			winningScore === p1Score || winningScore === p2Score;
		if (isWinnerScoreReached) {
			setP1Disabled(true);
			setP2Disabled(true);
		}
		if (winningScore === p1Score) {
			Swal.fire(`WELL DONE,${play1Name}  WON!!`);
			setPlaying(!playing);
			audio.play();
		}
		if (winningScore === p2Score) {
			setPlaying(!playing);
			audio.play();
			Swal.fire(`WELL DONE,${play2Name}  WON!!`);
		}
	};

	const resetGame = () => {
		setInputValue('');
		setWinningScore(0);
		setIsValid(false);
		setP1Score(0);
		setP2Score(0);
		setP1Turn(true);
		setP2Turn(false);
		setP1Disabled(false);
		setP2Disabled(false);
		setPlay1Name('Player One');
		setPlay2Name('Player Two');
	};

	const handleEdit = () => {
		setShow(!show);
		setPlay1Name(prompt('set Player one name'));
		setPlay2Name(prompt('set Player two name'));
	};

	return (
		<div>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
			<h1>Player Vs Player</h1>
			<p className='win-sore'>winning score: {winningScore}</p>
			<form className='form-form' onSubmit={handleSubmit}>
				<input
					type='number'
					id='input'
					onChange={handleChange}
					value={inputValue}
				/>
				<button type='submit' id='submit'>
					submit
				</button>
			</form>
			<div className='row'>
				<div className='col-md-12  mb-5'>
					<div className='player-name d-flex justify-content-evenly mt-5'>
						<h6>
							{play1Name} <span>{p1Score}</span>
						</h6>
						<h6>
							{play2Name} <span>{p2Score}</span>
						</h6>
					</div>
				</div>

				<PlayerCard
					handlePlayerOne={handlePlayerOne}
					handlePlayerTwo={handlePlayerTwo}
					p1Disabled={p1Disabled}
					p2Disabled={p2Disabled}
					resetGame={resetGame}
					handleEdit={handleEdit}
				/>
			</div>
		</div>
	);
}
