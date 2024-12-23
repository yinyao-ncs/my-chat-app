// Basic PII patterns
const patterns = {
	// Singapore NRIC pattern
	nric: /[STFG]\d{7}[A-Z]/g,

	// Basic name pattern (two capitalized words)
	name: /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g,

	// Basic email pattern
	email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,

	// Basic phone number pattern (Singapore)
	phone: /\b\d{4} ?\d{4}\b/g,
};

export const filterWithRegex = (text) => {
	const startTime = performance.now();
	let filteredText = text;

	// Replace each pattern with a placeholder
	Object.entries(patterns).forEach(([type, pattern]) => {
		filteredText = filteredText.replace(
			pattern,
			`<PII:${type.toUpperCase()}>`
		);
	});

	const endTime = performance.now();

	return {
		originalText: text,
		filteredText,
		processingTime: endTime - startTime,
		method: "regex",
	};
};


