import React, { useState } from "react";
import PropTypes from "prop-types";

// Base ChatBox component that handles common UI and state
const BaseChatBox = ({ title, onMessageSubmit, method }) => {
	const [messages, setMessages] = useState([]);
	const [inputText, setInputText] = useState("");
	const [isProcessing, setIsProcessing] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!inputText.trim() || isProcessing) return;

		setIsProcessing(true);

		try {
			const result = await onMessageSubmit(inputText);
			setMessages((prev) => [
				...prev,
				{
					...result,
					timestamp: new Date().toISOString(),
				},
			]);
		} catch (error) {
			console.error("Error processing message:", error);
		} finally {
			setIsProcessing(false);
			setInputText("");
		}
	};

	return (
		<div className="border border-gray-300 rounded-lg p-4 m-4 w-96 bg-white shadow-sm">
			<h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>

			<div className="h-64 overflow-y-auto mb-4 border border-gray-200 rounded p-2 bg-gray-50">
				{messages.map((msg, index) => (
					<div
						key={index}
						className="mb-2 p-2 bg-blue-50 rounded border border-blue-100"
					>
						<div className="text-gray-800">
							<div className="text-xs font-semibold">
								Original:
							</div>
							{msg.originalText}
						</div>
						<div className="text-gray-800 mt-1">
							<div className="text-xs font-semibold">
								Filtered:
							</div>
							{msg.filteredText}
						</div>
						<div className="text-xs text-gray-500 mt-1">
							Processing Time: {msg.processingTime.toFixed(2)}ms
							<br />
							Method: {method}
							<br />
							{new Date(msg.timestamp).toLocaleTimeString()}
						</div>
					</div>
				))}
			</div>

			<form onSubmit={handleSubmit} className="flex gap-2">
				<input
					type="text"
					value={inputText}
					onChange={(e) => setInputText(e.target.value)}
					className="flex-1 border border-gray-300 rounded p-2 text-gray-800 bg-white"
					placeholder="Type a message..."
					disabled={isProcessing}
				/>
				<button
					type="submit"
					className={`${
						isProcessing
							? "bg-gray-400"
							: "bg-blue-500 hover:bg-blue-600"
					} text-white px-4 py-2 rounded`}
					disabled={isProcessing}
				>
					{isProcessing ? "Processing..." : "Send"}
				</button>
			</form>
		</div>
	);
};

BaseChatBox.propTypes = {
	title: PropTypes.string.isRequired,
	onMessageSubmit: PropTypes.func.isRequired,
	method: PropTypes.string.isRequired,
};

export default BaseChatBox;
