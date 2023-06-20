
Conversation opened. 1 unread message.

Skip to content
Using Gmail with screen readers
1 of 19,766
(no subject)
Inbox
SivaTeja
	
12:10 (23 minutes ago)
	
to Nirmalgoud2103@gmail.com, vasavi
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
  Pressable,
  TouchableHighlight,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {}
interface IState {
  modalVisible: boolean;
  modalVisible1: boolean;
  title: string;
  description: string;
  tempId: string;

  todoList: {
    title: string;
    description: string;
    tempId: string;
  }[];
}

class Todo extends Component<IProps, IState> {
  state = {
    title: '',
    tempId: '',
    modalVisible: false,
    modalVisible1: false,
    description: '',
    todoList: [],
  };

  componentDidMount() {
    this.loadTodos();
  }

  loadTodos = async () => {
    try {
      const todos = await AsyncStorage.getItem('todos');
      if (todos !== null) {
        this.setState({todoList: JSON.parse(todos)});
      }
    } catch (error) {
      console.log(error);
    }
  };
  saveTodos = async () => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(this.state.todoList));
    } catch (error) {
      console.log(error);
    }
  };

  clearAsyncStorage = async () => {
    this.setState({todoList: []});
    AsyncStorage.clear();
    this.loadTodos();
  };
  handleEditTodo = (eachTodo: {
    id: string;
    title: string;
    description: string;
  }) => {
    this.setState({
      tempId: eachTodo.id,
      title: eachTodo.title,
      description: eachTodo.description,
      modalVisible: !this.state.modalVisible,
    });
  };
  handleDeleteTodo = (todoId: string) => {
    if (this.state.tempId === '') {
      const {todoList} = this.state;
      this.setState(
        (prevState: any) => ({
          todoList: prevState.todoList.filter(
            (todo: any) => todo.id !== todoId,
          ),
        }),
        () => {
          this.saveTodos();
        },
      );
    }
  };
  handleUpdateTodo = (tempId: string) => {
    let updatecheck = this.state.todoList.some((each: any) => {
      if (each.title === this.state.title) {
        return true;
      } else false;
    });

    if (this.state.title.length !== 0) {
      this.setState({
        modalVisible: !this.state.modalVisible,
        title: '',
      });
    }
    if (updatecheck) {
      Alert.alert('Todo already exists');
    }
    console.log(this.state.tempId, tempId, 'ids');
    this.state.todoList.map(
      (each: {id: string; title: string; description: string}) => {
        if (each.id === tempId) {
          return (
            (each.title = this.state.title),
            (each.description = this.state.description)
          );
        }
      },
    );
    this.setState(
      {
        title: '',
        description: '',
        tempId: '',
        modalVisible: !this.state.modalVisible,
      },
      () => {
        this.saveTodos();
      },
    );
  };
  handleTodo = () => {
    let result = this.state.todoList.some((each: any) => {
      if (each.title === this.state.title) {
        return true;
      } else false;
    });

    if (this.state.title.length !== 0) {
      this.setState({
        modalVisible: !this.state.modalVisible,
        title: '',
        description: '',
      });
    }
    if (result) {
      Alert.alert('Todo already exists');
    }
    let todo = {
      id: Date.now(),
      title: `${this.state.title}`,
      description:
        this.state.description !== '' ? this.state.description : 'N/A',
      iscredited: true,
    };
    if (this.state.title.length !== 0 && !result) {
      this.setState(
        (prevState: any) => ({
          todoList: [...prevState.todoList, todo],
        }),
        () => {
          this.saveTodos();
        },
      );
      //   this.setState({
      //     todoList: [...this.state.todoList, todo],
      //   });
    }
  };
  render() {
    const {modalVisible, modalVisible1} = this.state;
    let result = this.state.todoList.some((each: any) => {
      each.title === this.state.title;
    });

    return (
      <SafeAreaView style={styles.bgMainContainer}>
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.expenseText}> T O D O</Text>
          </View>
          <View style={styles.historyContainer}>
            <Image
              style={{
                width: 150,
                height: 150,
                alignSelf: 'center',
              }}
              source={require('./images/todo.jpg')}
            />
            {this.state.todoList.length !== 0 ? (
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={this.state.todoList}
                renderItem={({
                  item,
                }: {
                  item: {
                    id: string;
                    iscredited: boolean;
                    title: string;
                    description: string;
                  };
                }) => {
                  return (
                    <View
                      style={[
                        styles.expenseCard,
                        item?.iscredited
                          ? {borderColor: 'green'}
                          : {borderColor: 'red'},
                      ]}>
                      <Text
                        style={[
                          styles.credited,
                          item?.iscredited ? {color: 'green'} : {color: 'red'},
                        ]}>
                        {item?.title}
                      </Text>
                      <Text
                        style={[
                          styles.creditedReason,
                          item?.iscredited ? {color: 'green'} : {color: 'red'},
                        ]}>
                        {item?.description}
                      </Text>
                      <View style={styles.editDelete}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => this.handleEditTodo(item)}>
                          <Text>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.button2}
                          onPress={() => this.handleDeleteTodo(item.id)}>
                          <Text>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              />
            ) : (
              <Text style={styles.transactionHistory}>
                {' '}
                No Tasks were added
              </Text>
            )}
          </View>

          <View style={styles.transactionContainer}>
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  this.setState({modalVisible: !modalVisible});
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Submit</Text>
                    <TextInput
                      maxLength={10}
                      style={styles.input}
                      value={this.state.title}
                      onChangeText={value => this.setState({title: value})}
                      placeholder="Title"
                      placeholderTextColor={'black'}
                    />
                    {this.state.title.length === 0 ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                        }}>
                        <Text
                          style={{
                            color: 'red',
                            textAlign: 'right',
                            padding: 0,
                            marginLeft: 7,
                          }}>
                          *Required
                        </Text>
                      </View>
                    ) : null}
                    <TextInput
                      maxLength={60}
                      style={styles.input}
                      value={this.state.description}
                      onChangeText={value =>
                        this.setState({description: value})
                      }
                      placeholder=" Description"
                      placeholderTextColor={'black'}
                    />
                    <TouchableOpacity
                      style={styles.button5}
                      onPress={
                        this.state.tempId !== ''
                          ? () => this.handleUpdateTodo(this.state.tempId)
                          : this.handleTodo
                      }>
                      <Text>{this.state.tempId !== '' ? 'Update' : 'Add'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <View style={{flexDirection: 'row'}}>
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => this.setState({modalVisible: true})}>
                  <Text style={styles.textStyle}>Add</Text>
                </Pressable>

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={this.clearAsyncStorage}>
                  <Text style={styles.textStyle}>Clear</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  bgMainContainer: {
    flex: 1,
    backgroundColor: '#C3B1DB',
  },
  subContainer: {
    height: '95%',
    margin: 20,
    borderRadius: 9,
    backgroundColor: '#ffffff',
    elevation: 20,
    shadowColor: '#52006A',
  },
  expenseText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '800',
    margin: 10,
    padding: 30,
  },
  balance: {
    color: 'black',
    fontSize: 18,
  },
  historyContainer: {
    height: '70%',
  },
  walletAmount: {
    color: 'black',
    fontSize: 28,
  },
  walletContainer: {
    marginLeft: 16,
  },
  expenseCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    alignItems: 'center',
    margin: 15,
    padding: 6,
    borderRadius: 12,
    borderWidth: 1,
    width: '90%',
    // marginTop: 15,
  },
  historyText: {
    borderBottomWidth: 2,
    color: 'black',
    borderBottomColor: '#C3B1DB',
    fontSize: 22,
    fontWeight: '700',
    margin: 16,
  },
  button2: {
    alignItems: 'center',
    backgroundColor: 'red',
    marginLeft: 8,
    padding: 10,
    width: 60,
    borderRadius: 9,
    color: '#ffffff',
  },
  editDelete: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#57eb83',
    padding: 10,
    width: 50,
    borderRadius: 8,
  },
  button5: {
    alignItems: 'center',
    backgroundColor: '#57eb83',
    padding: 10,
    width: 70,
    borderRadius: 8,
  },
  button1: {
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    width: 100,
    borderRadius: 8,
  },
  transactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 3,
    borderRadius: 12,
    margin: 13,
    padding: 13,
    backgroundColor: 'black',
  },
  centeredView: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#ffffff',
    margin: 50,
    padding: 40,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  button3: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#57eb83',
    width: 100,
    marginRight: 20,
  },
  buttonClose: {
    backgroundColor: 'red',
    width: 100,
  },
  buttonOpen1: {
    backgroundColor: 'red',
    width: 100,
  },
  buttonClose1: {
    backgroundColor: 'red',
    width: 100,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    width: '100%',
    borderWidth: 1,
    padding: 10,
    borderColor: 'black',
    color: 'black',
  },
  credited: {
    fontSize: 18,
    width: 100,
  },
  creditedReason: {
    fontSize: 18,
    width: 50,
  },
  transactionHistory: {
    fontSize: 20,
    color: 'red',
    margin: 10,
  },
});

export default Todo;

	
