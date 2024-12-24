// PII patterns for Singapore context
const patterns = {
	// Singapore NRIC/FIN
	nric: /[STFG]\d{7}[A-Z]/g,

	// Unified name pattern for Asian and Western names
	// Handles:
	// - Western names: John Smith, Mary-Jane Wilson
	// - Chinese names: Tan Wei Ming, wei ming, Lee Wei
	// - Malay names: Abdul Rahman bin Mohammed, Siti Aminah
	// - Indian names: Kumar s/o Raman, Raj Kumar
	name: /\b(?:[A-Z][a-z]+|[a-z]+)(?:(?:\s+(?:bin|binte|s\/o|d\/o)\s+)|[-\s])(?:[A-Z][a-z]+|[a-z]+)(?:\s+(?:[A-Z][a-z]+|[a-z]+))*\b/g,

	// Email addresses
	email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,

	// Credit Card Numbers
	creditCard: /\b(?:\d[ -]*?){13,16}\b/g,

	// Singapore Phone Numbers (with or without country code)
	phone: /(?:\+65|65)?[\s-]?(?:6|8|9|3|7)(?:\d[\s-]*){7}\b/g,
};

// Common words and phrases to exclude from name detection
const commonWords = new Set([
	"worker",
	"foreign",
	"patient",
	"name",
	"hello",
	"please",
	"about",
	"above",
	"after",
	"again",
	"water",
	"under",
	// Add more common words as needed
]);

export const filterWithRegex = (text) => {
	const startTime = performance.now();
	let filteredText = text;

	// Process NRIC first to avoid interference
	filteredText = filteredText.replace(patterns.nric, "<NRIC>");

	// Process names with additional checks
	filteredText = filteredText.replace(patterns.name, (match) => {
		// Check if it's a common phrase or single word
		if (commonWords.has(match.toLowerCase()) || !match.includes(" ")) {
			return match;
		}

		// Check word count (2-4 words including bin/binte/s/o/d/o)
		const wordCount = match.split(/\s+/).length;
		if (wordCount < 2 || wordCount > 4) {
			return match;
		}

		return "<NAME>";
	});

	// Process remaining patterns
	["email", "creditCard", "phone"].forEach((type) => {
		filteredText = filteredText.replace(
			patterns[type],
			`<${type.toUpperCase()}>`
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
