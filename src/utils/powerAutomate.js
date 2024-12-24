// src/utils/powerAutomate.js
import { API_KEYS } from "../config/config";

export const filterWithPowerAutomate = async (text) => {
	const startTime = performance.now();

	try {
		const POWER_AUTOMATE_URL = API_KEYS.POWER_AUTOMATE.endpoint;

		if (!POWER_AUTOMATE_URL) {
			throw new Error("Power Automate URL not configured");
		}

		const response = await fetch(POWER_AUTOMATE_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ text }),
		});

		if (!response.ok) {
			throw new Error(`Power Automate API error: ${response.status}`);
		}

		const data = await response.json();

		// Verify the response structure and get the redacted text
		if (
			data.status !== "success" ||
			!data.content?.documents?.[0]?.redactedText
		) {
			throw new Error("Invalid response format from Power Automate");
		}

		const endTime = performance.now();

		return {
			originalText: text,
			filteredText: data.content.documents[0].redactedText,
			processingTime: endTime - startTime,
			method: "power-automate",
			// Optionally include detected entities for debugging or additional features
			entities: data.content.documents[0].entities,
		};
	} catch (error) {
		console.error("Error in Power Automate PII detection:", error);
		throw error;
	}
};
