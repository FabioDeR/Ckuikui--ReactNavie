import React from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  StatusBar,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { getallRecetteBySearch } from "../../API/CkuikuiDb";
import RecetteItem from "./RecetteItem";

class SearchRecette extends React.Component {
  constructor(props) {
    super(props);
    this.searchedText = "";
    this.state = {
      recettes: [],
      isLoading: false,
    };
  }

  _loading() {
    if (this.searchedText.length > 0) {
      getallRecetteBySearch(this.searchedText)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ recettes: data });
        })
        .catch((error) => console.error(error));
    }
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

  _searchTextInputChanged(text) {
    this.searchedText = text;
  }

  _searchrecette() {
    this.setState({
      recettes: [],
    });
  }

  render() {
    console.log(this.props);
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder="Nom de Recette"
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={(_) => this._searchrecette()}
        />
        <Button
          style={styles.button}
          style={{ height: 50 }}
          title="Rechercher"
          onPress={(_) => this._loading()}
        />
        <FlatList
          data={this.state.recettes.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("RecetteDetail", {
                  params: { idRecette: item.id },
                })
              }
            >
              <RecetteItem recette={item} />
            </TouchableOpacity>
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
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    paddingLeft: 5,
  },
});

export default SearchRecette;
