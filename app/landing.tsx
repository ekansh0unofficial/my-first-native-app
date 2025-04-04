import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import { AnimatePresence, MotiText, MotiView } from "moti";

const LandingScreen = () => {
  const router = useRouter();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/"); // Go back to login screen
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]} style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Animated Welcome Text */}
      <AnimatePresence>
        <MotiText 
          from={{ opacity: 0, translateY: -10 }} 
          animate={{ opacity: 1, translateY: 0 }} 
          transition={{ type: "timing", duration: 800 }}
          style={styles.title}
        >
          Welcome to Our App!
        </MotiText>
      </AnimatePresence>

      {/* Subtitle */}
      <MotiText 
        from={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 300, type: "spring" }}
        style={styles.subtitle}
      >
        Your journey starts here 🚀
      </MotiText>

      {/* Get Started Button */}
      <TouchableOpacity style={styles.button} onPress={() => alert("Welcome!")}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#ddd",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#ff7f50",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  logoutButton: {
    position: "absolute",
    bottom: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default LandingScreen;
