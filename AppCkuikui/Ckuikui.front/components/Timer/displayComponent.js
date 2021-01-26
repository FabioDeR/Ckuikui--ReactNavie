import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";

function displayComponent(props) {
  const h = () => {
    if (props.time.h === 0) {
      return null;
    } else {
      return (
        <Text style={styles.text}>
          {props.time.h >= 10 ? props.time.h : "0" + props.time.h}
        </Text>
      );
    }
  };
  return (
    <View style={{ flexDirection: "row" }}>
      {h()}
      <Text style={styles.text}>
        {props.time.h >= 10 ? props.time.h : "0" + props.time.h}&nbsp;:&nbsp;
      </Text>
      <Text style={styles.text}>
        {props.time.m >= 10 ? props.time.m : "0" + props.time.m}&nbsp;:&nbsp;
      </Text>
      <Text style={styles.text}>
        {props.time.s >= 10 ? props.time.s : "0" + props.time.s}&nbsp;:&nbsp;
      </Text>
      <Text>
        {props.time.ms >= 10 ? props.time.ms : "0" + props.time.ms}&nbsp;:&nbsp;
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});
export default displayComponent;
