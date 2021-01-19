import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";

import { getRecetteById } from "../../API/CkuikuiDb";

class RecetteDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recette: undefined,
      isLoading: true,
    };
  }

  componentDidMount() {
    fetch(
      "http://192.168.0.5:9000/recettes/" +
        this.props.route.params.params.idRecette
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          recette: data,
          isLoading: false,
        });
      })
      .catch((error) => console.error(error));
  }

  // _displayRecette() {
  //   const recette = this.state.recette;
  //   if (recette != undefined) {
  //     return (
  //       <ScrollView style={styles.scrollVieuw_container}>
  //         <Image style={styles.image} />
  //         <Text style={styles.nom_text}>
  //           {this.state.recette.nom}
  //           {console.log("srer", recette.description)}
  //         </Text>
  //         <Text style={styles.desciption_text}>{recette.desciption}</Text>
  //         <Text style={styles.listeIngredient}>
  //           {recette.ingredients
  //             .map((ingredient) => {
  //               return ingredient.nom;
  //             })
  //             .join("/")}
  //         </Text>
  //       </ScrollView>
  //     );
  //   }
  // }

  // _displayLoading() {
  //   if (this.state.isLoading) {
  //     return (
  //       <View style={styles.loading_container}>
  //         <ActivityIndicator size="large" />
  //       </View>
  //     );
  //   }
  // }

  render() {
    // const  idRecette  = this.props.navigation.state.params.idRecette;
    const recette = this.state.recette;
    return (
      <View style={styles.main_container}>
        <ScrollView style={styles.scrollVieuw_container}>
          <Image style={styles.image} />
          <Text style={styles.nom_text}>{recette?.data.nom}</Text>
          <Text style={styles.desciption_text}>
            {recette?.data.description}
          </Text>
          <Text style={styles.listeIngredient}>
            {recette?.data.Ingredients.map((Ingredients) => {
              return (
                Ingredients.nom +
                " " +
                Ingredients.Timers.map((timer) => {
                  return timer.time;
                })
              );
            }).join(" ")}
          </Text>
          <Text>{console.log("eererer", recette?.data.Ingredients.nom)}</Text>
        </ScrollView>
        {/* {this._displayLoading()} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    padding: 15,
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollview_container: {
    flex: 1,
  },
  image: {
    height: 169,
    margin: 5,
    backgroundColor: "gray",
  },
  nom_text: {
    fontWeight: "bold",
    fontSize: 35,
    flex: 1,
    flexWrap: "wrap",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: "#000000",
    textAlign: "center",
  },
  description_text: {
    fontStyle: "italic",
    color: "#666666",
    margin: 5,
    marginBottom: 15,
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  listeIngredient: {
    flexDirection: "row",
  },
});

export default RecetteDetail;
