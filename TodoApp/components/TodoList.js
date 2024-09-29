import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import colors from "../Colors";
import FindModal from "./FindModal";
import TodoModal from "./TodoModal";

class TodoList extends React.Component {
  state = {
    showListVisible: false,
    showFindModal: false,
  };

  toggleListModal() {
    this.setState({ showListVisible: !this.state.showListVisible });
  }

  toggleFindModal() {
    this.setState({ showListVisible: !this.state.showFindModal });
  }

  render() {
    const list = this.props.list;
    const completedCount = list.todos.filter((todo) => todo.completed).length;
    const remainingCount = list.todos.length - completedCount;

    return (
      <View>
        <Modal
          animationType="none"
          visible={this.state.showListVisible}
          onRequestClose={() => this.toggleListModal()}
        >
          <TodoModal
            list={list}
            closeModal={() => this.toggleListModal()}
            updateList={this.props.updateList}
          />
        </Modal>

        <TouchableOpacity
          style={[styles.listContainer, { backgroundColor: colors.darkBlue }]}
          onPress={() => this.toggleListModal()}
        >
          <Text style={styles.listTitle} numberOfLines={1}>
            {list.name}
          </Text>

          <View style={{ flexDirection: "row" }}>
            <View style={{ alignItems: "center", padding: 16 }}>
              <Text style={styles.count}>{remainingCount}</Text>
              <Text style={styles.subtitle}>Items Left</Text>
            </View>
            <View style={{ alignItems: "center", padding: 16 }}>
              <Text style={styles.count}>{completedCount}</Text>
              <Text style={styles.subtitle}>Items Found</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 120,
    paddingHorizontal: 16,
    borderRadius: 32,
    marginHorizontal: 12,
    marginTop: 72,
    alignItems: "center",
    width: 280,
    height: 400,
  },
  listTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 18,
  },
  count: {
    fontSize: 48,
    fontWeight: "200",
    color: colors.green,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
  },
});

export default TodoList;
