import React from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import authContext from "../auth/authContext";

class MakeTimer extends React.Component {
  static contextType = authContext;
  constructor(props) {
    super(props);

    this.state = {
      time: "",
      ingredientId: this.props.route.params.params.IdIngredient,
      UserId: "",
    };
  }

  //recuperer l'id du User dans ce context
  componentDidMount() {
    const { user } = this.context;
    this.setState({
      UserId: user.id,
    });
  }

  //methode permettant la création d'un Timer
  addTimer(value) {
    fetch("http://192.168.0.5:9000/timers/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        time: value.time,
        ingredientId: value.ingredientId,
        userId: value.UserId,
      }),
    })
      .then((response) => {
        if (response.status == 200) {
          this.props.navigation.navigate("IngredientDetail", {
            params: { IdIngredient: this.state.ingredientId, update: 1 },
          });
        }
        return response.json();
      })
      .then((data) => alert(`le Timer ${data.data.time} a bien été crée `))
      .catch((error) => console.error(error));
  }

  render() {
    return (
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="Timer number"
          value={this.state.time}
          onChangeText={(text) => {
            this.setState({
              time: text,
            });
          }}
        />
        <Button
          title="Create"
          onPress={(_) => {
            this.addTimer(this.state);
          }}
        ></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 30,
    alignSelf: "stretch",
    height: 45,
    marginBottom: 30,
    color: "#FFAE00",
    borderBottomColor: "orange",
    borderBottomWidth: 1,
  },
});

export default MakeTimer;
