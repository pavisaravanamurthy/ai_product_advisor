pavithrasaravanamurthy: create a simple multiline text input and send button right to it..the ui should look minimal and modern

GitHub Copilot:

```


Made changes.


```

A minimal and modern multiline text input with a Send button aligned to the right has been added to your `HomeScreen`. The UI uses a clean style and is centered on the page. Let me know if you want to add functionality to the Send button or further customize the design.

pavithrasaravanamurthy: Keyboard should not overlap the input

GitHub Copilot:

```

```

Made changes.

The input UI is now wrapped in a `KeyboardAvoidingView`, so the keyboard will not overlap the input field. This works for both iOS and Android. Let me know if you need further adjustments or want to test the behavior.

pavithrasaravanamurthy: input should be fixed at bottom..and scrollable content like chat above it

GitHub Copilot:

```

```

Made changes.

The input is now fixed at the bottom, and a scrollable chat area appears above it. Example chat bubbles are included for demonstration. You can replace them with dynamic content as needed. Let me know if you want to connect the input to your chat logic or need further UI tweaks.

pavithrasaravanamurthy: wrap it in keyboardavoiding view

GitHub Copilot:

```

```

Made changes.

The entire screen is now wrapped in a `KeyboardAvoidingView`, ensuring the input stays above the keyboard and tab bar. This will prevent overlap and maintain a smooth user experience. Let me know if you need further adjustments.

pavithrasaravanamurthy: create a custom hook called useproductadvisor

GitHub Copilot: Made changes.

A custom hook called `useProductAdvisor` has been created in useProductAdvisor.ts. It manages chat messages, loading state, and provides a `sendMessage` function for simulating product advisor responses. Let me know if you want to connect it to a real API or integrate it into your UI.

pavithrasaravanamurthy: this hook should take user input and filter a given product catalog by name brand or category..if no matches found take whole array of products..then construct a prmpt for an ai modal using the filtered catalog and user input..then call the AI api to get the recommendations..parse the response and add console log

GitHub Copilot:

```

```

Made changes.

The `useProductAdvisor` hook now:

- Accepts a product catalog and an AI API function.
- Filters products by name, brand, or category based on user input.
- Uses the full catalog if no matches are found.
- Constructs a prompt for the AI model with the filtered catalog and user input.
- Calls the AI API for recommendations.
- Parses and logs the AI response, updating the messages state.

You can now use this hook to provide product recommendations powered by your AI API. Let me know if you need usage examples or further customization.

pavithrasaravanamurthy: integrat the hook in home screen and show the output at top like scrollable chat

GitHub Copilot:

```

```

Made changes.

The `useProductAdvisor` hook is now integrated into your HomeScreen. User and AI messages are displayed at the top in a scrollable chat view. The input remains fixed at the bottom, and sending a message will show recommendations from the AI API. Let me know if you want to connect to a real API or further customize the chat experience.

pavithrasaravanamurthy: const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=API_KEY`..add this url to aiApi..

GitHub Copilot:

```

```

Made changes.

The `aiApi` function now uses the Gemini API URL and sends the prompt via POST request. The response is parsed for recommendations. Replace `API_KEY` with your actual key to enable real AI-powered product advice. Let me know if you need help with authentication or error handling.

pavithrasaravanamurthy: add a loader for async calls

GitHub Copilot:

```

```

Made changes.

A loader (spinner) is now shown in the chat area during async calls when loading is true. This provides visual feedback while waiting for AI recommendations. For a more animated spinner, you can use a library like `react-native-activity-indicator` or add an animation to the style. Let me know if you want a more advanced loader.

pavithrasaravanamurthy: instead of activity indicatior add searching skeleton text

GitHub Copilot:

```

```

Made changes.

The loader is now replaced with a left-aligned skeleton text placeholder when searching. This gives a more natural "searching" effect in the chat UI. Let me know if you want to further customize the skeleton or add animation.

pavithrasaravanamurthy: add some animations to the searching text

GitHub Copilot:

```

```

Made changes.

The "Searching..." text now features a smooth fade-in/fade-out animation, making the loading state more dynamic and visually appealing. Let me know if you want to further customize the animation or add other effects!

pavithrasaravanamurthy: strict the prompt for ai to showcase products from the products I give and not hallucinate

GitHub Copilot:

```

```

Made changes.

The AI prompt is now strictly worded to instruct the model to only recommend products from your provided catalog and not hallucinate or invent any products. This should help ensure the AI's responses are limited to your actual product data.

pavithrasaravanamurthy: wrap the entire ui inside safeares

GitHub Copilot:

```

```

Made changes.

The entire UI in `ProductAdvisor.tsx` is now wrapped inside a `SafeAreaView`, ensuring proper handling of device safe areas (notches, status bar, etc.). This will keep your content visually safe and consistent across devices. Let me know if you need further layout adjustments!

