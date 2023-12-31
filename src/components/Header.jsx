import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const options = ["POMODORO", "SHORT BREAK", "LONG BREAK"];

export default function Header({ setTime, currentTime, setCurrentTime }) {
  function handlePress(index) {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
    setCurrentTime(index);
    setTime(newTime * 60);
  }

  return (
    <View style={styles.header}>
      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handlePress(index)}
          style={[
            styles.title,
            currentTime !== index && { borderColor: "transparent" },
          ]}
        >
          <Text style={styles.text}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  title: {
    borderWidth: 2,
    borderColor: "#fff",
    padding: 10,
    borderRadius: 6,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
