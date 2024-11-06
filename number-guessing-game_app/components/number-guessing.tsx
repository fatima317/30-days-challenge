'use client';
import { useState, useEffect, ChangeEvent} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

interface NumberGuessingState {
    gameStarted:boolean;
    gameOver:boolean;
    paused:boolean;
    targetNumber:number;
    userGuess:number | string;
    attempts:number;
}
// Defining the NumberGuessingComponent function component
export default function NumberGuessing(): JSX.Element {
const[gameStarted, setGameStarted] = useState<boolean>(false);
const[gameOver, setGameOver] = useState<boolean>(false);
const[paused, setPaused] = useState<boolean>(false);
const[targetNumber, setTargetNumber] = useState<number>(0);
const[userGuess, setUserGuess] = useState<number | string>("");
const[attempts, setAttempts] = useState<number>(0);

// useEffect to generate a new target number when the game starts or resumes
useEffect(() => {
    if(gameStarted && !paused){
        const randomNumber:number = Math.floor(Math.random() * 10) + 1;
        setTargetNumber(randomNumber);// Set the target number
    }
}, [gameStarted, paused]);

// Function to handle the start of the game
const handleStartGame = () : void => {
    setGameStarted(true); // Start the game
    setGameOver(false); // Reset the game over state
    setAttempts(0); // Reset the attempts counter
    setPaused(false); // Ensure the game is not paused
};
// Function to handle pausing the game
const handlePauseGame = () : void => {
    setPaused(true);
};
// Function to handle resuming the game
const handleResumeGame = () : void => {
    setPaused(false);
};
// Function to handle the user's guess
const handleGuess = () : void => {
    if (typeof userGuess === 'number' && userGuess === targetNumber){
        setGameOver(true);
    } else {
        setAttempts(attempts + 1); // Increment the attempts counter
    }
};
// Function to handle restarting the game
const handleTryAgain = () : void => {
    setGameStarted(false);
    setGameOver(false);
    setUserGuess("");
    setAttempts(0);
};
// Function to handle input change for user's guess
const handleUserGuessChange = (e: ChangeEvent<HTMLInputElement>) : void => {
    const guess = parseInt(e.target.value);
    setUserGuess(isNaN(guess) ? "" : guess); // Sets an empty string if the guess is NaN
};
// JSX to render the game UI
return(
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-black">
         {/* Main container for the game */}
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h1 className="text-3xl font-bold text-center mb-2 text-black">Number Guessing Game</h1>
            <p className="text-center text-black mb-4"> Try to guess the number between 1 and 10!</p>
            {!gameStarted && (
                <div className="flex justify-center mb-4">
                    <Button
                    onClick={handleStartGame}
                    className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Start Game
                    </Button>
                </div>
            )}
            {/* Conditional rendering: show game controls if game started and not over */}
            {gameStarted && !gameOver && (
                <div>
                    <div className="flex justify-center mb-4">
                         {/* Button to resume the game if paused */}
                        {paused ? (
                            <Button
                            onClick={handleResumeGame}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Resume
                            </Button>
                        ) : (
                            /* Button to pause the game */
                            <Button
                            onClick={handlePauseGame}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Pause
                            </Button>
                        )}
                    </div>
                    <div className="flex justify-center mb-4">
                        {/* Input field for user's guess */}
                        <Input
                        type="number"
                        value={userGuess}
                        onChange={handleUserGuessChange}
                        className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 w-full max-w-xs"
                        placeholder="Enter your guess"
                        />
                        {/* Button to submit the guess */}
                        <Button
                        onClick={handleGuess}
                        className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded ml-4"
                        >
                            Guess
                        </Button>
                    </div>
                    <div className="text-center text-black">
                        <p>Attempts: {attempts}</p>
                    </div>
                </div>
            )}
            {/* Conditional rendering: show game over message if game is over */}
            {gameOver && (
                <div>
                    <div className="text-center text-black mb-4">
                        <h2 className="text-2xl font-bold">Game Over!</h2>
                        <p>You guessed the number in {attempts} attempts.</p>
                    </div>
                    <div className="flex justify-center">
                         {/* Button to try the game again */}
                        <Button
                        onClick={handleTryAgain}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                        >
                            Try Again
                        </Button>
                    </div>
                </div>
            )}
        </div>
    </div>
);
}