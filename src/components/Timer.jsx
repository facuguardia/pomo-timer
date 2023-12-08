import {Text, View, StyleSheet} from "react-native";

export default function Timer({time}) {

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(time)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    borderRadius: 30,
    backgroundColor: "#000",
  },
  timer: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#fff",
  },
});