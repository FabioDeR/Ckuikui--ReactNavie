import React, { Component, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import authContext from "../auth/authContext";

import securStor from "../auth/securStor";

class Login extends Component {
  static contextType = authContext;
  constructor(props) {
    super(props);
    this.state = {
      pseudo: "admin",
      password: "test1234",
    };
  }

  _register(value) {
    const { user, setUser } = this.context;
    fetch("http://192.168.0.5:9000/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pseudo: value.pseudo,
        password: value.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data.User);
        securStor.storeToken(data.User);
      })
      .catch((error) => console.error(error));
  }

  render() {
    return (
      <View style={styles.loginform}>
        <Text style={styles.header}>Login</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Your Pseudo"
          value={this.state.pseudo}
          onChangeText={(text) => {
            this.setState({
              pseudo: text,
            });
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your Password"
          value={this.state.password}
          secureTextEntry
          onChangeText={(text) => {
            this.setState({
              password: text,
            });
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={(_) => {
            this._register(this.state);
          }}
        >
          <Text Style={styles.btntext}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={(_) => this.props.navigation.navigate("Register")}
        >
          <Text Style={styles.btntext}>S'Enregistrer</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginform: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 35,
    color: "#FFAE00",
    paddingBottom: 10,
    marginBottom: 40,
  },
  textInput: {
    fontSize: 30,
    alignSelf: "stretch",
    height: 45,
    marginBottom: 30,
    color: "#FFAE00",
    borderBottomColor: "orange",
    borderBottomWidth: 1,
  },
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

export default Login;
