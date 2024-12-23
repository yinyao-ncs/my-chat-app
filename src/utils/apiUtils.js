// Simulated API calls for different services

export const filterWithAPI1 = async (text) => {
	const startTime = performance.now();

	// Simulate API delay and processing
	await new Promise((resolve) => setTimeout(resolve, 500));

	// Simulate API response
	const filteredText = text.replace(
		/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g,
		"<PII:NAME>"
	);

	const endTime = performance.now();

	return {
		originalText: text,
		filteredText,
		processingTime: endTime - startTime,
		method: "api1",
	};
};

export const filterWithAPI2 = async (text) => {
	const startTime = performance.now();

	// Different API simulation with different delay
	await new Promise((resolve) => setTimeout(resolve, 800));

	// Different API might have different filtering logic
	const filteredText = text.replace(/[STFG]\d{7}[A-Z]/g, "<PII:NRIC>");

	const endTime = performance.now();

	return {
		originalText: text,
		filteredText,
		processingTime: endTime - startTime,
		method: "api2",
	};
};
