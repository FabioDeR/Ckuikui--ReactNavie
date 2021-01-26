import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

function BtnComponent(props) {
  return (
    <View>
      {props.status === 0 ? (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={props.start}
            style={[styles.button, { backgroundColor: "green" }]}
            activeOpacity={0.7}
          >
            <Text style={styles.text}>Start</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {props.status === 1 ? (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={props.stop}
            style={[styles.button, { backgroundColor: "red" }]}
            activeOpacity={0.7}
          >
            <Text style={styles.text}>Stop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={props.reset}
            style={[styles.button, { backgroundColor: "blue" }]}
            activeOpacity={0.7}
          >
            <Text style={styles.text}>Reset</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {props.status === 2 ? (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={props.resume}
            style={[styles.button, { backgroundColor: "yellow" }]}
            activeOpacity={0.7}
          >
            <Text style={styles.text}>Resume</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={props.reset}
            style={[styles.button, { backgroundColor: "blue" }]}
            activeOpacity={0.7}
          >
            <Text style={styles.text}>Reset</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "red",
    margin: 10,
    padding: 5,
  },
  text: {
    fontSize: 50,
  },
});
export default BtnComponent;
