import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Platform,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";

import Header from "./src/components/Header";
import Timer from "./src/components/Timer";

const colors = ["#689550", "#ef9421", "#5482ab"];

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 10);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      playAlarm();
      setIsActive(false);
      setIsWorking((prev) => !prev);
      setTime(isWorking ? 300 : 1500);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  function handleStart() {
    playSound();
    setIsActive(!isActive);
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/click.mp3")
    );
    await sound.playAsync();
  }

  async function playAlarm() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/alarm.mp3")
    );
    await sound.playAsync();
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View style={{ paddingTop: Platform.OS === "android" && 30 }}>
        <Text style={styles.title}>Pomodoro</Text>

        <Header
          isWorking={isWorking}
          setIsWorking={setIsWorking}
          time={time}
          setTime={setTime}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
        />

        <Timer
          isWorking={isWorking}
          setIsWorking={setIsWorking}
          time={time}
          setTime={setTime}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
        />

        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonTitle}>{isActive ? "STOP" : "START"}</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
    padding: 20,
  },
  buttonTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
