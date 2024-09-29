import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "./Colors";
import tempData from "./tempData";
import TodoList from "./components/TodoList";
import AddListModal from "./components/AddListModal";
import { Dimensions } from "react-native";

var width = Dimensions.get("window").width;

export default class App extends React.Component {
  state = {
    addTodoVisible: false,
    lists: tempData,
    user: {},
  };

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  renderList = (list) => {
    return <TodoList list={list} updateList={this.updateList} />;
  };

  addList = (item) => {
    var shoppingLists = this.state.lists;

    this.setState({
      lists: [
        ...shoppingLists,
        { ...item, id: shoppingLists.length + 1, todos: [] },
      ],
    });
  };

  updateList = (list) => {
    this.setState({
      lists: this.state.lists.map((item) => {
        return item.id === list.id ? list : item;
      }),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}
        >
          <AddListModal
            closeModal={() => this.toggleAddTodoModal()}
            addList={this.addList}
          />
        </Modal>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Shopping Lists</Text>
        </View>

        <View style={{ height: "100%" }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>

        <View style={styles.addContainer}>
          <View style={styles.blank}></View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => this.toggleAddTodoModal()}
          >
            <AntDesign name="plus" size={48} color={colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.footer}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    backgroundColor: colors.darkBlue,
    fontSize: 40,
    fontWeight: "800",
    color: colors.white,
    width: width,
    paddingTop: 56,
    paddingBottom: 24,
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 80,
    backgroundColor: colors.darkBlue,
  },
  addContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: 40,
    zIndex: 10,
  },
  addButton: {
    backgroundColor: colors.green,
    borderRadius: 56,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  blank: {
    position: "absolute",
    backgroundColor: colors.white,
    width: 128,
    height: 128,
    borderRadius: 72,
  },
});
