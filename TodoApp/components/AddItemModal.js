import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../Colors";

class AddItemModal extends React.Component {
  state = {
    name: "",
  };

  addItem = () => {
    var item = this.state.name;

    this.props.addTodo(item);

    this.setState({ name: "" });

    this.props.closeModal();
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
          <Text style={styles.title}>Add List Item</Text>

          <TextInput
            style={styles.input}
            placeholder="Item Name"
            onChangeText={(text) => this.setState({ name: text })}
            value={this.state.text}
          />

          <TouchableOpacity
            style={[styles.create, { backgroundColor: colors.green }]}
            onPress={() => this.addItem()}
          >
            <Text
              style={{ color: colors.white, fontWeight: "600", fontSize: 20 }}
            >
              ADD
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.close, { backgroundColor: colors.red }]}
            onPress={this.props.closeModal}
          >
            <Text
              style={{ color: colors.white, fontWeight: "600", fontSize: 20 }}
            >
              CLOSE
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.darkBlue,
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.darkBlue,
    borderRadius: 50,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  close: {
    marginTop: 16,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});

export default AddItemModal;
