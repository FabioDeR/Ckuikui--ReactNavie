import React from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import authContext from "../auth/authContext";

class IngredientCreate extends React.Component {
  static contextType = authContext;
  constructor(props) {
    super(props);
    this.state = {
      nom: "",
      types: "",
      cuisson: "",
      photo: "",
      UserId: "",
    };
  }

  componentDidMount() {
    const { user } = this.context;
    this.setState({
      UserId: user.id,
    });
  }
  async createIngredient(value) {
    await fetch("http://192.168.0.5:9000/ingredients/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom: value.nom,
        types: value.types,
        cuisson: value.cuisson,
        photo: value.photo,
        UserId: value.UserId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.restorField();
        alert(`l'ingredient ${data.data.nom} a bien été crée `);
      })
      .catch((error) => console.error(error));
  }

  restorField() {
    this.setState({
      nom: "",
      types: "",
      cuisson: "",
      photo: "",
    });
  }

  render() {
    return (
      <View style={styles.regisForm}>
        <Text style={styles.header}>Enregistrer Votre Ingredient</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Name Ingredient"
          value={this.state.nom}
          onChangeText={(text) => {
            this.setState({
              nom: text,
            });
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Type of Ingredient"
          value={this.state.types}
          onChangeText={(text) => {
            this.setState({
              types: text,
            });
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Type of Cuisson "
          value={this.state.cuisson}
          onChangeText={(text) => {
            this.setState({
              cuisson: text,
            });
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Photo"
          value={this.state.photo}
          onChangeText={(text) => {
            this.setState({
              photo: text,
            });
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={(_) => {
            this.createIngredient(this.state);
            //console.log("bonjour");
          }}
        >
          <Text Style={styles.btntext}>Create</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  regisForm: {
    flex: 1,
    justifyContent: "center",
    padding: 35,
  },
  header: {
    fontSize: 25,
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

export default IngredientCreate;
