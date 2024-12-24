import React from "react";
import BaseChatBox from "./BaseChatBox";
import { filterWithAzure } from "../utils/apiUtils";

const AzureChatBox = () => {
	return (
		<BaseChatBox
			title="Azure PII Filter"
			onMessageSubmit={filterWithAzure}
			method="azure"
		/>
	);
};

export default AzureChatBox;
