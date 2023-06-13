import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacityBase,
  TouchableOpacity,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {Component} from 'react';
import {TodoContext} from '../../context/TodoContext';

interface IProps {
  navigation: any;
  task: any;
}

interface IState {}

export default class TodoScreen1 extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }

  static contextType = TodoContext;

  renderTodoList = (item: any) => {
    const {handleDelete} = this.context;
    console.log(item);
    return (
      <View style={styles.todoItem}>
        <Text style={{color: 'white'}}>{item.text}</Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#db0d0d',
            paddingHorizontal: 10,
            borderRadius: 5,
          }}
          onPress={() => handleDelete(item.id)}>
          <Text style={{color: 'white', marginTop: 4}}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {task, handleAddTodo, handleInputChange, todoList, error} =
      this.context;
    console.log(todoList);
    return (
      <>
        <StatusBar backgroundColor={'#755909'} />
        <View style={{flex: 1}}>
          <View style={styles.headerContainer}>
            <Text style={styles.todoHeading}>Todo App</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('TodoScreen1')}
                style={styles.nextButton}>
                <Text style={styles.nextButtonText}>{`<-- Prev`}</Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  marginLeft: 5,
                  backgroundColor: todoList.length < 1 ? '#db0d0d' :  '#019401',
                  padding: 10,
                  borderRadius: 100,
                }}>
                {todoList.length}
              </Text>
            </View>
          </View>

          <View style={styles.todoContainer}>
            <TextInput
              value={task}
              onChangeText={text => handleInputChange(text)}
              placeholder="Add a New Task"
              style={styles.input}
            />
            {error ? (
              <Text style={{color: 'red', paddingHorizontal: 20}}>
                *Invalid Input
              </Text>
            ) : null}
            <TouchableOpacity onPress={handleAddTodo} style={styles.addButton}>
              <Text style={styles.nextButtonText}>------++ ADD ++------</Text>
            </TouchableOpacity>
            <View style={{height: 600, }}>
              {!todoList.length ? (
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', height:400}}>
                <Text
                  style={{
                    color: '#9c918f',
                    fontWeight: '700',
                    fontSize: 25,
                   
                  }}>
                  Add Task
                </Text>
                </View>
              ) : (
                <FlatList
                  data={todoList}
                  renderItem={({item}) => this.renderTodoList(item)}
                  keyExtractor={item => item.id}
                />
              )}
            </View>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#755909',
    height: 70,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  todoHeading: {
    color: '#dbd8ce',
    fontWeight: '600',
    fontSize: 30,
  },
  nextButton: {
    backgroundColor: '#db0d0d',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 10,
  },
  nextButtonText: {color: 'white', textAlign: 'center'},
  todoContainer: {
    padding: 10,
  },
  input: {
    borderColor: '#b3b6ba',
    borderWidth: 1,
    padding: 10,
    margin: 20,
    borderRadius: 10,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#b5b1b1',
    margin: 10,
    borderRadius: 10,
    elevation: 10,
    height: 50,
  },
});
