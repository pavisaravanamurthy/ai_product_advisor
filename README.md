# Running the App

1. Install dependencies:
   npm i

2. Start the Metro bundler:
   npm start

3. Run on Android device or emulator:
   npm run android


## Architecture
This project uses a component-based architecture in React Native. The main screen (`ProductAdvisor.tsx`) hosts the UI components, including:

- A scrollable chat area displaying messages from the user and AI product advisor.
- A multiline text input fixed at the bottom with a button.
- A custom hook `useProductAdvisor` manages filtering the product catalog, constructing prompts, making async calls to an AI API, and managing loading and chat state.

Data flow follows a unidirectional pattern:
User input → `useProductAdvisor` filters products and calls AI API → receives AI recommendations → updates chat messages displayed in scrollable view.

## Approach
- **Minimal and Modern UI:** The design uses a clean, minimal style with a multiline input that expands, a send button right-aligned, and a smooth chat interface.
- **Keyboard Management:** Using `KeyboardAvoidingView` and fixed input at the bottom ensures UI is not overlapped by the keyboard.
- **Custom Hook for Logic:** `useProductAdvisor` abstracts chat state, AI communication, and product filtering for separation of concerns and reusability.
- **Strict AI Prompt:** The prompt to the AI is carefully phrased to prevent hallucination and only recommend products from the given catalog.
- **Async Loading UI:** Instead of a spinner, a subtle animated "Searching..." skeleton text shows during async calls to improve UX.

## File Structure
```
ai_product-advisor/
├── app/
│   ├── index.tsx                  # Entry point, renders ProductAdvisor
├── src/
│   ├── ProductAdvisor.tsx         # Main screen: UI
│   ├── hooks/
│   │   └── useProductAdvisor.ts   # Custom hook: product filtering, AI API calls, chat state
│   ├── utils/
│   │   └── Constants.ts           # Product catalog and API key constants
├── assets/
│   └── fonts/                     # Custom fonts
├── .github/
│   └── copilot-instructions.md    # AI agent instructions
├── eas.json                       # EAS build configuration
├── README.md                      # Project documentation
├── package.json                   # Project dependencies and scripts
```
