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

const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isAtive, setIsAtive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isAtive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            playAlarm();
            setIsAtive(false);
            // Establecer el tiempo inicial nuevamente
            return 5 * 60;
          }
          return prevTime - 1;
        });
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isAtive, time]);

  function handleStart() {
    playSound();
    setIsAtive(!isAtive);
  }

  async function playSound() {
    const {sound} = await Audio.Sound.createAsync(
      require("./assets/click.mp3")
    );
    await sound.playAsync();
  }

  async function playAlarm() {
    const {sound} = await Audio.Sound.createAsync(
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
          <Text style={styles.buttonTitle}>{isAtive ? "STOP" : "START"}</Text>
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
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
    padding: 20,
  },
  buttonTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
