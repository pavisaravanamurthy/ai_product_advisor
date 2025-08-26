import { useState } from "react";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  [key: string]: any;
}

interface UseProductAdvisorOptions {
  products: Product[];
  aiApi: (prompt: string) => Promise<string>;
}

export function useProductAdvisor({
  products,
  aiApi,
}: UseProductAdvisorOptions) {
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (userInput: string) => {
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);

    // Filter products by name, brand, or category
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(userInput.toLowerCase()) ||
        p.brand.toLowerCase().includes(userInput.toLowerCase()) ||
        p.category.toLowerCase().includes(userInput.toLowerCase())
    );
    const catalog = filtered.length > 0 ? filtered : products;

    // Construct prompt for AI model
    const prompt = `You are a product advisor. Only recommend products from the following catalog and do not invent or hallucinate any products.\nUser input: ${userInput}\nProduct catalog: ${JSON.stringify(
      catalog,
      null,
      2
    )}\nRecommend the best products for the user from this catalog only.`;

    try {
      const aiResponse = await aiApi(prompt);
      // Parse response (assume plain text for now)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: aiResponse },
      ]);
      console.log("AI Response:", aiResponse);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, there was an error getting recommendations.",
        },
      ]);
      console.log("AI Error:", err);
    }
    setLoading(false);
  };

  return {
    messages,
    loading,
    sendMessage,
  };
}
