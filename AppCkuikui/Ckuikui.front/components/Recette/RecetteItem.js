import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import moment from "moment";

//création d'un component afin de l'afficher dans le searchRecette
class RecetteItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recette: this.props.recette,
    };
  }

  // _playDetailsRecette = (idRecette) => {
  //   this.props.navigation.navigate("RecetteDetail", { idRecette: idRecette });

  // };

  render() {
    return (
      <TouchableOpacity style={styles.main_container}>
        <Image style={styles.image} />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.nom_text}>{this.state.recette.nom}</Text>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.description_text} numberOfLines={4}>
              {this.state.recette.description}
            </Text>
          </View>
          <View style={styles.date_container}>
            <Text style={styles.date_text}>
              Créer le{" "}
              {moment(new Date(this.state.recette.createdAt)).format(
                "DD/MM/YYYY"
              )}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flex: 1,
    flexDirection: "row",
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: "gray",
  },
  content_conainer: {
    flex: 1,
    margin: 5,
  },
  header_container: {
    flex: 3,
    flexDirection: "row",
  },
  nom_text: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    paddingRight: 5,
  },
  type_text: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#666666",
  },
  description_container: {
    flex: 7,
  },
  description_text: {
    fontStyle: "italic",
    color: "#666666",
  },
  date_container: {
    flex: 1,
  },
  date_text: {
    textAlign: "right",
    fontSize: 14,
  },
});

export default RecetteItem;
