import React from "react";
import RegexChatBox from "./components/RegexChatBox";
import AzureChatBox from "./components/AzureChatBox";
import PowerAutomateChatBox from "./components/PowerAutomateChatBox";

function App() {
	return (
		<div className="min-h-screen bg-white text-black">
			<div className="flex flex-col items-center p-4">
				<h1 className="text-2xl font-bold mb-4">
					PII Filter Chat Application
				</h1>
				<div className="flex flex-wrap justify-center gap-4">
					<RegexChatBox />
					<AzureChatBox />
					<PowerAutomateChatBox />
					{/* Add more chat boxes as needed */}
				</div>
			</div>
		</div>
	);
}

export default App;
