# PII Filter Chat Application

A React-based chat application that filters Personally Identifiable Information (PII) using multiple methods: local regex, Azure API, and Power Automate.

## Quick Start

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a config file:
```bash
cp src/config/config.template.js src/config/config.js
```

4. Update `src/config/config.js` with your API keys:
```javascript
export const API_KEYS = {
    AZURE: {
        endpoint: "https://ncsgpt-textanalyser.cognitiveservices.azure.com/",
        key: "your-azure-api-key-here"
    },
    POWER_AUTOMATE: {
        endpoint: "your-power-automate-flow-url-here"
    }
};
```

5. Start the application:
```bash
npm run dev
```

## Test Examples

Copy and paste these examples to test different PII detection capabilities:

```text
# Example 1: Customer Support Query
Hi, my name is Tan Mei Ling, and I need assistance with my account. My NRIC number is S1234567D, and you can contact me at 9123 4567. Alternatively, email me at meiling.tan@example.com for follow-up.

# Example 2: Receipt Information
Receipt #3248901
Customer: Ahmad Bin Hamzah
Email: ahmad.hamzah@example.sg
Phone: 9876 5432
Credit Card: 4111 1111 1111 1111 (Exp: 12/26)

# Example 3: Delivery Details
Name: Lim Jia Wei
NRIC: T7654321B
Email: lim.jiawei1990@samplemail.com
Phone: +65 8234 5678
Payment Method: 5500 0000 0000 0004 (Exp: 01/25)

# Example 4: Transaction Issue
This is Goh Wei Lun. I want to report an issue with my recent transaction.
NRIC: F9998887A
Email: weiwl.goh@feedback.sg
Phone: 9001 1234

# Example 5: Account Access
Dear team,
I have a problem logging into my account.
My registered email is priscilla.ng@gmail.com, and my phone number is 8555 1122.
If needed, you can verify using my NRIC G1234567T.
Regards, Priscilla Ng.
```

## Features

- Local regex-based PII filtering
- Azure Cognitive Services integration
- Power Automate workflow integration
- Real-time processing time comparison
- Support for Singapore-specific PII formats:
  - NRIC/FIN
  - Phone numbers
  - Names (Western, Chinese, Malay, Indian formats)
  - Email addresses
  - Credit card numbers

## Architecture

The application uses a component-based architecture with three filtering methods:
- RegexChatBox: Local pattern matching
- API1ChatBox: Azure API integration
- PowerAutomateChatBox: Power Automate integration

Each filtering method extends the BaseChatBox component for consistent UI and behavior.