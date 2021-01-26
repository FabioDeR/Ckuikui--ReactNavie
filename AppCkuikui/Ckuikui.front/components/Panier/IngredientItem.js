import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

class IngredientItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: this.props.ingredient,
      onPress: this.props.onPress,
    };
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={this.state.onPress}
      >
        <Image
          style={{
            height: 100,
            width: 100,
            borderRadius: 30,
            backgroundColor: "gray",
          }}
        />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.nom_text}>{this.state.ingredient?.nom}</Text>
          </View>
          <View style={styles.types_container}>
            <Text style={styles.description_text}>
              {this.state.ingredient?.types}
            </Text>
            <Text style={styles.description_text}>
              {this.state.ingredient.cuisson}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({});

export default IngredientItem;
