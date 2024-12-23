import React from "react";
import BaseChatBox from "./BaseChatBox";
import { filterWithAPI1 } from "../utils/apiUtils";

const API1ChatBox = () => {
	return (
		<BaseChatBox
			title="API Filter (Service 1)"
			onMessageSubmit={filterWithAPI1}
			method="api1"
		/>
	);
};

export default API1ChatBox;
