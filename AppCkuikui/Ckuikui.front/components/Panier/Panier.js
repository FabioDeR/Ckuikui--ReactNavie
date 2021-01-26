import React from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import authContext from "../auth/authContext";
import IngredientItem from "./IngredientItem";

class Panier extends React.Component {
  static contextType = authContext;
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      isLoading: false,
      refreshing: false,
    };
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    this.getIngredientUserId();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.ingredients !== this.state.ingredients) {
  //     // console.log("Aurevoir");
  //     return this.getIngredientUserId();
  //     // console.log("phrase", prevState);
  //     // this.setState({
  //     //   isUpdate: true,
  //     // });
  //   }
  // }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

  async getIngredientUserId() {
    const { user } = this.context;
    // this.setState({
    //   isUpdate: false,
    // });
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

  //permet de raffraichir la page
  onRefresh() {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this.getIngredientUserId();
      }
    );
    this.setState({
      refreshing: false,
    });
  }

  render() {
    return (
      <View style={styles.main_container}>
        <FlatList
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          data={this.state.ingredients?.data?.Ingredients}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <IngredientItem
              ingredient={item}
              onPress={(_) => {
                this.props.navigation.navigate("IngredientDetail", {
                  params: { IdIngredient: item.id },
                });
              }}
            />
          )}
        />

        {this._displayLoading()}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main_container: {
    marginTop: 20,
    flex: 1,
    padding: 10,
  },
});

export default Panier;
