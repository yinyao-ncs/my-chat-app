import React from "react";
import RegexChatBox from "./components/RegexChatBox";
import API1ChatBox from "./components/API1ChatBox";

function App() {
	return (
		<div className="min-h-screen bg-white text-black">
			<div className="flex flex-col items-center p-4">
				<h1 className="text-2xl font-bold mb-4">
					PII Filter Chat Application
				</h1>
				<div className="flex flex-wrap justify-center gap-4">
					<RegexChatBox />
					<API1ChatBox />
					{/* Add more chat boxes as needed */}
				</div>
			</div>
		</div>
	);
}

export default App;
