import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Animated,
  Modal,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colors from "../Colors";
import { Swipeable } from "react-native-gesture-handler";
import AddItemModal from "./AddItemModal";

class FindModal extends React.Component {
  state = {
    newTodo: "",
    addVisible: false,
  };

  toggleTodoCompleted = (todo) => {
    let list = this.props.list;
    var index = 0;

    for (var i = 0; i < list.todos.length; i++) {
      if (list.todos[i].title == todo.title) {
        index = i;
      }
    }

    list.todos[index].completed = !list.todos[index].completed;

    this.props.updateList(list);
  };

  addTodo = (item) => {
    let list = this.props.list;
    list.todos.push({
      title: item,
      completed: false,
      number: Math.floor(Math.random() * 10) + 1,
    });

    this.props.updateList(list);
    this.setState({ newTodo: "" });

    Keyboard.dismiss();
  };

  deleteTodo = (todo) => {
    let list = this.props.list;
    var index = 0;

    for (var i = 0; i < list.todos.length; i++) {
      if (list.todos[i].title == todo.title) {
        index = i;
      }
    }

    list.todos.splice(index, 1);

    this.props.updateList(list);
  };

  renderTodo = (todo, index) => {
    return (
      <Swipeable
        renderRightActions={(_, dragX) => this.rightActions(dragX, index, todo)}
      >
        <View
          style={[
            styles.todoContainer,
            {
              backgroundColor: todo.completed
                ? colors.lightGray
                : colors.lightestGray,
            },
          ]}
        >
          <TouchableOpacity onPress={() => this.toggleTodoCompleted(todo)}>
            <Ionicons
              name={todo.completed ? "ios-square" : "ios-square-outline"}
              size={24}
              color={colors.gray}
              style={{ width: 32 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.toggleTodoCompleted(todo)}>
            <Text
              style={[
                styles.todo,
                {
                  color: todo.completed ? colors.gray : colors.black,
                  textDecorationLine: todo.completed ? "line-through" : "none",
                  width: 200,
                },
              ]}
            >
              {todo.title}
            </Text>
          </TouchableOpacity>

          <View style={{ width: 88 }}></View>
          <Text
            style={[
              styles.todo,
              {
                color: todo.completed ? colors.gray : colors.black,
                textDecorationLine: todo.completed ? "line-through" : "none",
              },
            ]}
          >
            {todo.number}
          </Text>
        </View>
      </Swipeable>
    );
  };

  toggleAddModal() {
    this.setState({ addVisible: !this.state.addVisible });
  }

  rightActions = (dragX, index, todo) => {
    const scale = dragX.interpolate({
      inputRange: [-180, 0],
      outputRange: [1, 0.9],
      extrapolate: "clamp",
    });

    const opacity = dragX.interpolate({
      inputRange: [-180, -20, 0],
      outputRange: [1, 0.9, 0],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity onPress={() => this.deleteTodo(todo)}>
        <Animated.View style={[styles.deleteButton, { opacity: opacity }]}>
          <Animated.Text
            style={{
              color: colors.white,
              fontWeight: "800",
              transform: [{ scale }],
            }}
          >
            Delete
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  render() {
    var list = this.props.list;

    const taskCount = list.todos.length;
    const completedCount = list.todos.filter((todo) => todo.completed).length;

    var newList = [];
    for (var i = 0; i < list.todos.length; i++) {
      newList.push(list.todos[i]);
    }

    var newList = newList.sort((a, b) => a.number - b.number);

    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addVisible}
          onRequestClose={() => this.toggleAddModal()}
        >
          <AddItemModal
            list={list}
            closeModal={() => this.toggleAddModal()}
            addTodo={this.addTodo}
            updateList={this.props.updateList}
          />
        </Modal>

        <View style={[styles.section, styles.header]}>
          <View>
            <Text style={styles.title}>Find</Text>
            <Text style={styles.taskCount}>
              {completedCount} of {taskCount} items
            </Text>
          </View>
        </View>

        <View style={[styles.section, { flex: 3, marginVertical: 16 }]}>
          <View style={{ flexDirection: "row", paddingBottom: 16 }}>
            <Text
              style={[
                styles.columnTitle,
                {
                  paddingLeft: 32,
                  width: 200,
                },
              ]}
            >
              Item
            </Text>
            <View style={{ width: 72 }}></View>
            <Text style={[styles.columnTitle]}>Aisle #</Text>
          </View>
          <FlatList
            data={newList}
            renderItem={({ item, index }) => this.renderTodo(item, index)}
            keyExtractor={(item) => item.title}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={styles.addContainer}>
          <View style={styles.blank}></View>
          <TouchableOpacity
            style={styles.add}
            onPress={() => this.toggleAddModal()}
          >
            <AntDesign name="plus" size={48} color={colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.cart} onPress={this.props.goHome}>
            <Ionicons name="home" size={40} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profile}
            onPress={this.props.closeModal}
          >
            <Ionicons name="list" size={48} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    alignItems: "center",
  },
  header: {
    backgroundColor: colors.darkBlue,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 56,
    width: "100%",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    color: colors.white,
  },
  taskCount: {
    paddingLeft: 10,
    marginTop: 4,
    marginBottom: 16,
    color: colors.gray,
    fontWeight: "600",
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 24,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 50,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  todoContainer: {
    width: 384,
    marginBottom: 16,
    borderRadius: 50,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 32,
  },
  todo: {
    color: colors.black,
    fontWeight: "700",
    fontSize: 16,
  },
  columnTitle: {
    color: colors.darkBlue,
    fontWeight: "700",
    fontSize: 24,
  },
  deleteButton: {
    flex: 1,
    marginLeft: 8,
    marginBottom: 16,
    borderRadius: 50,
    backgroundColor: colors.red,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
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
  cart: {
    position: "absolute",
    left: 48,
    bottom: 26,
  },
  profile: {
    position: "absolute",
    right: 48,
    bottom: 20,
  },
  addContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: 40,
    zIndex: 10,
  },
  add: {
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

export default FindModal;
