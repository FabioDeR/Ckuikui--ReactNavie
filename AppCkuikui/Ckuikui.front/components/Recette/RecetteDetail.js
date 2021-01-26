import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import moment from "moment";

// import { getRecetteById } from "../../API/CkuikuiDb";
//création d'un Component Detail de la recette par rapport a son Id
class RecetteDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recette: undefined,
      isLoading: true,
      isUpdate: true,
      refreshing: false,
    };
    this.onRefresh = this.onRefresh.bind(this);
  }

  //au moment de l'affichage d'u screen afficher le détails de la recette par rapport à son id
  componentDidMount() {
    this.getRecetteDetails();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevProps.route.params.params.update !==
  //     this.props.route.params?.params.update
  //   ) {
  //     this.getRecetteDetails();
  //   }
  // }

  async getRecetteDetails() {
    await fetch(
      "http://192.168.0.5:9000/recettes/" +
        this.props.route.params.params.idRecette
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          recette: data,
          isLoading: false,
          isUpdate: false,
        });
      })
      .catch((error) => console.error(error));
  }
  onRefresh() {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this.getRecetteDetails();
      }
    );
    this.setState({
      refreshing: false,
    });
  }

  render() {
    // const  idRecette  = this.props.navigation.state.params.idRecette;
    const recette = this.state.recette;
    // console.log(this.state.recette?.data.Ingredients);
    return (
      <View style={styles.main_container}>
        <View style={styles.scrollVieuw_container}>
          <Image style={styles.image} />
          <Text style={styles.title_nom}>{recette?.data.nom}</Text>
          <Text style={styles.desciption_text}>
            {recette?.data.description}
          </Text>
          <View>
            <FlatList
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
              data={this.state.recette?.data.Ingredients}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={(_) => {
                    this.props.navigation.navigate("IngredientDetail", {
                      params: { IdIngredient: item.id },
                    });
                  }}
                >
                  <Text style={styles.nom_text}>{item.nom}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
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
  scrollview_container: {
    flex: 1,
    flexDirection: "row",
  },
  image: {
    height: 169,
    margin: 5,
    backgroundColor: "gray",
  },
  title_nom: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 50,
  },
  nom_text: {
    fontWeight: "bold",
    fontSize: 35,
    flexWrap: "wrap",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    textAlign: "left",
    borderWidth: 1,
  },
  description_text: {
    fontStyle: "italic",
    color: "#666666",
    margin: 5,
    marginBottom: 15,
    textAlign: "center",
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  ingredient_container: {
    marginTop: 20,
    flexDirection: "column",
    flex: 1,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "gray",
  },
});

export default RecetteDetail;
