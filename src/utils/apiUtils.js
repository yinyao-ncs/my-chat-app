// src/utils/apiUtils.js
import { API_KEYS } from "../config/config";

// Azure API configuration
const { endpoint: AZURE_ENDPOINT, key: AZURE_API_KEY } = API_KEYS.AZURE;
const AZURE_PATH = "/text/analytics/v3.2-preview.1/entities/recognition/pii";
const EXCEPTION_LIST = ["Person", "PersonType", "Organization"];

export const filterWithAzure = async (text) => {
	const startTime = performance.now();

	try {
		// Prepare request headers
		const headers = {
			"Ocp-Apim-Subscription-Key": AZURE_API_KEY,
			"Content-Type": "application/json",
			Accept: "application/json",
		};

		// Prepare request body
		const body = {
			documents: [
				{
					id: "1",
					language: "en",
					text: text,
				},
			],
		};

		// Make API call
		const response = await fetch(`${AZURE_ENDPOINT}${AZURE_PATH}`, {
			method: "POST",
			headers: headers,
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			throw new Error(`Azure API error: ${response.status}`);
		}

		const data = await response.json();

		// Process the response
		let filteredText = text;
		if (data.documents && data.documents[0] && data.documents[0].entities) {
			// Log detected entities for debugging
			console.log(
				"Detected entities:",
				data.documents[0].entities.map((entity) => ({
					category: entity.category,
					text: entity.text,
					confidenceScore: entity.confidenceScore,
				}))
			);

			// Sort entities by offset in descending order to replace from end to start
			const entities = data.documents[0].entities.sort(
				(a, b) => b.offset - a.offset
			);

			// Filter out entities in exception list and with confidence score <= 0.70
			const validEntities = entities.filter(
				(entity) =>
					!EXCEPTION_LIST.includes(entity.category) &&
					entity.confidenceScore > 0.7
			);

			// Replace entities with PII tags
			validEntities.forEach((entity) => {
				const beforeText = filteredText.slice(0, entity.offset);
				const afterText = filteredText.slice(
					entity.offset + entity.length
				);
				filteredText = `${beforeText}<${entity.category.toUpperCase()}>${afterText}`;
			});
		}

		const endTime = performance.now();

		return {
			originalText: text,
			filteredText: filteredText,
			processingTime: endTime - startTime,
			method: "azure",
		};
	} catch (error) {
		console.error("Error in Azure PII detection:", error);
		throw error;
	}
};
