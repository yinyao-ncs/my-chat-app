import React from "react";
import BaseChatBox from "./BaseChatBox";
import { filterWithPowerAutomate } from "../utils/powerAutomate";

const PowerAutomateChatBox = () => {
	return (
		<BaseChatBox
			title="Power Automate PII Filter"
			onMessageSubmit={filterWithPowerAutomate}
			method="power-automate"
		/>
	);
};

export default PowerAutomateChatBox;
