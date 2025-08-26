import { useProductAdvisor } from "@/src/hooks/useProductAdvisor";
import { API_KEY, PRODUCT_CATALOG } from "@/src/utils/Constants";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const mappedProducts = PRODUCT_CATALOG.map((p, idx) => ({
  id: String(idx + 1),
  name: p.product_name,
  brand: p.brand,
  category: p.category,
  description: p.description,
  price: p.price,
}));

const aiApi = async (prompt: string) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });
    const data = await response.json();
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No recommendation found."
    );
  } catch (error) {
    console.log("AI Error:", error);
    return "Sorry, there was an error getting recommendations.";
  }
};

function SkeletonText() {
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacityAnim]);

  return (
    <View style={styles.skeletonContainer}>
      <View style={styles.skeletonLine} />
      <View style={[styles.skeletonLine, { width: "60%" }]} />
      <Animated.Text style={[styles.skeletonLabel, { opacity: opacityAnim }]}>
        Searching...
      </Animated.Text>
    </View>
  );
}

export default function ProductAdvisor() {
  const [input, setInput] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const { messages, loading, sendMessage } = useProductAdvisor({
    products: mappedProducts,
    aiApi,
  });
  const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();
  const inputContainerPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        const keyboardHeight = event.endCoordinates.height;
        setKeyboardHeight(keyboardHeight);
        setIsKeyboardVisible(true);
        
        const transformValue = Platform.OS === 'ios' 
          ? -keyboardHeight + (insets.bottom || 0)
          : -keyboardHeight;
        
        Animated.timing(inputContainerPosition, {
          toValue: transformValue,
          duration: 250,
          useNativeDriver: true,
        }).start();

        setTimeout(() => {
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
          }
        }, 100);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
        setIsKeyboardVisible(false);
        
        Animated.timing(inputContainerPosition, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start();
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [insets.bottom, inputContainerPosition]);

  useEffect(() => {
    if (loading && scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [loading, messages]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Product Advisor</Text>
      </View>
      
      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={[
          styles.chatContent,
          { paddingBottom: 100 } // Space for input
        ]}
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
      >
        {messages.map((msg, idx) => (
          <View
            key={idx}
            style={[
              styles.messageBubble,
              msg.role === "user"
                ? styles.userBubble
                : styles.assistantBubble,
            ]}
          >
            <Text
              style={
                msg.role === "user" ? styles.userText : styles.assistantText
              }
            >
              {msg.content}
            </Text>
          </View>
        ))}
        {loading && (
          <View style={styles.loaderContainer}>
            <SkeletonText />
          </View>
        )}
      </ScrollView>

      <Animated.View
        style={[
          styles.inputContainer,
          { 
            paddingBottom: insets.bottom || 8,
            transform: [{ translateY: inputContainerPosition }]
          }
        ]}
      >
        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            multiline
            value={input}
            onChangeText={setInput}
            placeholder="Type your message..."
            placeholderTextColor="#888"
            editable={!loading}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSend}
            disabled={loading || !input.trim()}
          >
            <Text style={styles.sendButtonText}>
              {loading ? "..." : "Ask"}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 24,
    paddingBottom: 12,
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    letterSpacing: 1,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  chatContent: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  messageBubble: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    maxWidth: "80%",
  },
  userBubble: {
    backgroundColor: "#222",
    alignSelf: "flex-end",
  },
  assistantBubble: {
    backgroundColor: "#f5f5f7",
    alignSelf: "flex-start",
  },
  userText: {
    color: "#fff",
  },
  assistantText: {
    color: "#222",
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#f5f5f7",
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  textInput: {
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    fontSize: 16,
    color: "#222",
    backgroundColor: "transparent",
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  sendButton: {
    backgroundColor: "#222",
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  loaderContainer: {
    alignSelf: "flex-start",
    marginVertical: 12,
  },
  skeletonContainer: {
    marginVertical: 12,
    alignSelf: "flex-start",
    width: "80%",
  },
  skeletonLine: {
    height: 16,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 8,
    width: "90%",
  },
  skeletonLabel: {
    color: "#303030ff",
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
});