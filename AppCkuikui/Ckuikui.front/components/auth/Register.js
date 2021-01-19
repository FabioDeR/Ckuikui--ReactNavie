import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pseudo: "",
      email: "",
      password: "",
    };
  }

  //   _test() {
  //     fetch("http://192.168.0.5:9000/users/all")
  //       .then((response) => response.json())
  //       .then((data) => console.log(data))
  //       .catch((error) => console.error(error));
  //   }

  _register(value) {
    fetch("http://192.168.0.5:9000/users/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pseudo: value.pseudo,
        email: value.email,
        password: value.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  render() {
    return (
      <View style={styles.regisForm}>
        <Text style={styles.header}>Enregistrer</Text>
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
          placeholder="Your Email"
          value={this.state.email}
          onChangeText={(text) => {
            this.setState({
              email: text,
            });
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your Password"
          value={this.state.password}
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
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  regisForm: {
    alignSelf: "stretch",
    padding : 10,
  },
  header: {
    fontSize: 35,
    color: "#FFAE00",
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: "orange",
    borderBottomWidth: 1,
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

export default Register;
