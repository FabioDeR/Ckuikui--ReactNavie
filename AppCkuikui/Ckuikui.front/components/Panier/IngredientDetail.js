import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Button,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";

class IngredientDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: undefined,
      isLoading: true,
      isUpdate: true,
    };
  }

  componentDidMount() {
    this._getIngredient();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.route.params.params.update !==
      this.props.route.params?.params.update
    ) {
      this._getIngredient();
    }
  }

  async _getIngredient() {
    await fetch(
      "http://192.168.0.5:9000/ingredients/" +
        this.props.route.params.params.IdIngredient
    )
      .then((response) => response.json())

      .then((data) => {
        this.setState({
          ingredient: data.data,
          isLoading: false,
          isUpdate: false,
        });
      })
      .catch((error) => console.error(error));
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

  render() {
    const ingredient = this.state.ingredient;
    return (
      <View style={styles.main_container}>
        <ScrollView>
          <Image style={styles.image} />
          <Text style={styles.nom_text}>{ingredient?.nom}</Text>
          <View style={styles.description}>
            <Text style={styles.types_text}>types : {ingredient?.types}</Text>
            <Text style={styles.types_text}>
              Cuisson : {ingredient?.cuisson}
            </Text>
          </View>
          <View>
            {ingredient?.Timers.length == 0 ? (
              <TouchableOpacity
                onPress={(_) => {
                  this.props.navigation.navigate("MakeTimer", {
                    params: { IdIngredient: ingredient?.id },
                  });
                }}
              >
                <Text>Go Start</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Timer", {
                    params: { IdIng: ingredient?.id },
                  });
                }}
              >
                <Text style={styles.timer}>
                  {moment.utc(ingredient?.Timers[0].time).format("mm : ss")}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
        {this._displayLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    padding: 15,
  },
  image: {
    height: 169,
    margin: 5,
    backgroundColor: "gray",
  },
  nom_text: {
    fontWeight: "bold",
    fontSize: 45,
    flex: 1,
    flexWrap: "wrap",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: "#000000",
    textAlign: "center",
  },
  types_text: {
    fontSize: 23,
  },
  description: {
    flexDirection: "row",
    flex: 2,
    alignItems: "center",
    justifyContent: "space-around",
  },
  timer: {
    flex: 1,
    alignSelf: "center",
    fontSize: 30,
  },
});

export default IngredientDetail;
