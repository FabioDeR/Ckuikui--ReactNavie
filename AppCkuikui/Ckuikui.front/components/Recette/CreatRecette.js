import React from "react";
import {
  Alert,
  View,
  TextInput,
  StyleSheet,
  Modal,
  Text,
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
} from "react-native";

import authContext from "../auth/authContext";
import IngredientItem from "../Panier/IngredientDetail";

class CreatRecette extends React.Component {
  static contextType = authContext;
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      nom: "",
      photo: "",
      description: "",
      categorie: "",
      ingredients: [],
      Ingredient: [],
    };
  }

  componentDidMount() {
    this.getIngredientUserId();
  }
  async getIngredientUserId() {
    const { user } = this.context;

    await fetch("http://192.168.0.5:9000/ingredients/users/" + user.id)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          ingredients: data,
          isLoading: false,
        });
      })
      .catch((error) => console.error(error));
  }
  async createRecette(value) {
    console.log("je suis ici", value);
    await fetch("http://192.168.0.5:9000/recettes/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom: value.nom,
        photo: value.photo,
        description: value.description,
        categorie: value.categorie,
        Ingredient: value.Ingredient,
      }),
    })
      .then((response) => response.json())
      .then((data) => alert(`la recette ${data.data.nom} a été créé`))
      .catch((error) => console.error(error));
  }

  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible,
    });
  };

  pushItem(id) {
    let tab = this.state.Ingredient.concat(id);
    this.setState({
      Ingredient: tab,
    });
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.recetteForm}>
        <Text style={styles.header}>Creer votre recette</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Name Recette"
          value={this.state.nom}
          onChangeText={(text) => {
            this.setState({
              nom: text,
            });
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Make Photo"
          value={this.state.photo}
          onChangeText={(text) => {
            this.setState({
              photo: text,
            });
          }}
        />
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            multiline={true}
            numberOfLines={6}
            placeholderTextColor="grey"
            placeholder="Decription"
            value={this.state.description}
            onChangeText={(text) => {
              this.setState({
                description: text,
              });
            }}
          />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Catégorie"
          value={this.state.categorie}
          onChangeText={(text) => {
            this.setState({
              categorie: text,
            });
          }}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={(_) => {
            Alert.alert("Modal has been closed");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FlatList
                data={this.state.ingredients?.data?.Ingredients}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={(_) => {
                      this.pushItem(item.id);
                    }}
                  >
                    <Text>{item.nom}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>

          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={() => {
              this.setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </TouchableHighlight>
        </Modal>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text>Show My Ingredient</Text>
        </TouchableHighlight>
        <TouchableOpacity
          style={styles.button}
          onPress={(_) => {
            this.createRecette(this.state);
          }}
        >
          <Text Style={styles.btntext}>Create</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textAreaContainer: {
    borderWidth: 1,
    borderColor: "orange",
    padding: 5,
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start",
  },
  recetteForm: {
    flex: 1,
    justifyContent: "center",
    padding: 34,
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
    marginBottom: 20,
    color: "#FFAE00",
    borderBottomColor: "orange",
    borderBottomWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,

    shadowColor: "#000",
    shadowOffset: {
      width: 100,
      height: 100,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default CreatRecette;
