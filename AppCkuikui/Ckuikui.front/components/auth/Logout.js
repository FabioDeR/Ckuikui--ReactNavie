import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import securStor from "./securStor";
import authContext from "../auth/authContext";

class Logout extends React.Component {
  static contextType = authContext;
  constructor(props) {
    super(props);
    this.state = {};
  }

  stop() {
    const { setUser } = this.context;
    securStor.removeToken();
    setUser(null);
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={(_) => {
          this.stop();
        }}
      >
        <Text Style={styles.btntext}>Log out</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    fontSize: 25,
    alignSelf: "stretch",
    alignItems: "center",
    padding: 20,
    backgroundColor: "orange",
    marginTop: 30,
  },
  btntext: {
    fontSize: 25,
    color: "orange",
    fontWeight: "bold",
  },
});

export default Logout;
