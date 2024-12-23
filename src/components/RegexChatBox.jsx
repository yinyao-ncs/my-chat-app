import React from "react";
import BaseChatBox from "./BaseChatBox";
import { filterWithRegex } from "../utils/piiUtils";

const RegexChatBox = () => {
	return (
		<BaseChatBox
			title="Local Filter (Regex)"
			onMessageSubmit={filterWithRegex}
			method="regex"
		/>
	);
};

export default RegexChatBox;
