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

class AddListModal extends React.Component {
  state = {
    name: "",
    color: colors.darkBlue,
  };

  createTodo = () => {
    const { name, color } = this.state;

    const item = { name, color };

    this.props.addList(item);

    this.setState({ name: "" });
    this.props.closeModal();
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
          <Text style={styles.title}>Create Shopping List</Text>

          <TextInput
            style={styles.input}
            placeholder="List Name"
            onChangeText={(text) => this.setState({ name: text })}
          />

          <TouchableOpacity
            style={[styles.create, { backgroundColor: colors.green }]}
            onPress={this.createTodo}
          >
            <Text
              style={{ color: colors.white, fontWeight: "600", fontSize: 20 }}
            >
              CREATE
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

export default AddListModal;
