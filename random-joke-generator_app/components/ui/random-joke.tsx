"use client";
import { useState, useEffect } from "react";
import {Button} from "@/components/ui/button";

// Define a TypeScript interface for the joke response
interface JokeResponse {
    setup:string;
    punchline:string;
}
// Default export of the RandomJokeComponent function
export default function RandomJokeComponent() {
// State hook for managing the current joke
const[joke, setJoke] = useState<string>("");

// Effect hook to fetch a joke when the component mounts
useEffect(() => {
      fetchJoke();
}, []); // Empty dependency array ensures this runs once on mount

// Async function to fetch a random joke from the API
async function fetchJoke() : Promise<void> {
    try {
         // Make a GET request to the joke API
        const response = await fetch("https://official-joke-api.appspot.com/random_joke");
        const data: JokeResponse = await response.json();
        // Update state with the fetched joke
        setJoke(`${data.setup} - ${data.punchline}`);

    } catch(error){
        console.error("Error fetching joke:", error); // Log any errors
        // Set an error message if the fetch fails
        setJoke("Failed to fetch joke. Please try again.");

    }
}
return(
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#877aaa] to-[#5090daee] p-4">
        <div className="bg-slate-100 rounded-2xl shadow-lg p-8 w-full max-w-md">
            <h1 className="text-3xl font-bold mb-4 text-[#333]">😂 Random Joke 👈</h1>
            <div className="bg-[#c8e3eb] rounded-lg p-6 mb-6 text-[#555] text-lg">{joke || "Loading..."}</div>
            <Button
                onClick={fetchJoke}
                className="bg-[#4c98af] hover:bg-[#437ea0] text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
                >
                     😂 Get New Joke 😂
                </Button>
        </div>
    </div>
);
}