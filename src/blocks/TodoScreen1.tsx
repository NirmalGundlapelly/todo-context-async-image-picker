import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  Modal,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import {TodoContext} from '../../context/TodoContext';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ITodo {
  id: string;
  fullname: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}

interface IProps {}

interface IState {}

export default class TodoScreen1 extends Component<IProps, IState> {
  static contextType: React.Context<any> | undefined = TodoContext;
  declare context: React.ContextType<typeof TodoContext>;

  renderTodoList = (item: ITodo) => {
    const {handleDelete, handleEditTodo} = this.context;
    return (
      <>
        <View style={styles.todoItem}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 100, height: 100}}
              source={{uri: item.avatar}}
            />
            <View style={{marginLeft: 15}}>
              <Text style={{color: 'white'}}>Name: {item.fullname}</Text>
              <Text style={{color: 'white'}}>Email: {item.email}</Text>
              <Text style={{color: 'white'}}>Password: ********</Text>
              <Text style={{color: 'white'}}>Phone: {item.phone}</Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AntDesign
            style={{
              marginBottom: 5,
              backgroundColor: 'white',
              padding: 3,
              borderRadius: 3,
              marginLeft: 8,
            }}
            onPress={() => handleEditTodo(item)}
            name="edit"
            color={'black'}
            size={23}
          />
          <AntDesign
            style={{
              backgroundColor: '#7a1013',
              marginBottom: 5,
              marginLeft: 10,
              padding: 3,
              borderRadius: 3,
            }}
            onPress={() => handleDelete(item.id)}
            name="delete"
            color={'white'}
            size={23}
          />
        </View>
      </>
    );
  };

  render() {
    const {
      fullname,
      email,
      password,
      phone,
      tempId,
      showModal,
      handleOpenModal,
      handleAddTodo,
      handleUpdateTodo,
      handleOpenModalBack,
      handleInputChange,
      todoList,
      error,
      handleImagePicker,
      avatar,
    } = this.context;

    return (
      <>
        <StatusBar backgroundColor={'#755909'} />
        <View style={{flex: 1}}>
          <View style={styles.headerContainer}>
            <Text style={styles.todoHeading}>Todo App</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  marginLeft: 5,
                  backgroundColor: todoList.length < 1 ? '#ad1d00' : '#019401',
                  textAlign: 'center',
                  paddingTop: 4,
                  borderRadius: 15,
                  width: 30,
                  height: 30,
                }}>
                {todoList.length}
              </Text>
            </View>
          </View>

          <View style={styles.todoContainer}>
            <TouchableOpacity
              onPress={handleOpenModal}
              style={styles.addButton}>
              <Text style={styles.nextButtonText}>Add</Text>
            </TouchableOpacity>
            <View style={{height: Dimensions.get('window').height / 1.2}}>
              {!todoList.length ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 400,
                  }}>
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
                  scrollEventThrottle={16}
                  showsVerticalScrollIndicator={false}
                  //   onScroll={this._onScroll}
                  //   bounces={this.state.bounces}
                  data={todoList}
                  renderItem={({item}) => this.renderTodoList(item)}
                  keyExtractor={(item: ITodo) => item.id}
                />
              )}
            </View>
          </View>
          <Modal animationType="slide" visible={showModal}>
            <View>
              <Text style={styles.detailsHeading}>Add Details</Text>
              <TextInput
                value={fullname}
                onChangeText={text => handleInputChange(text, 'fullname')}
                placeholder="Full Name"
                style={styles.input}
              />
              {error ? (
                <Text style={{color: 'red', paddingHorizontal: 10}}>
                  *required name
                </Text>
              ) : null}
              <TextInput
                value={email}
                onChangeText={text => handleInputChange(text, 'email')}
                placeholder="Email"
                style={styles.input}
              />
              {!email.includes('gmail.com') && email.length > 1 ? (
                <Text style={{color: 'red', paddingHorizontal: 10}}>
                  *Invalid email
                </Text>
              ) : null}
              <TextInput
                value={password}
                onChangeText={text => handleInputChange(text, 'password')}
                placeholder="Password"
                style={styles.input}
              />
              {error ? (
                <Text style={{color: 'red', paddingHorizontal: 10}}>
                  *required password
                </Text>
              ) : null}
              <TextInput
                value={phone}
                keyboardType="number-pad"
                onChangeText={text => handleInputChange(text, 'phone')}
                placeholder="Phone Number"
                style={styles.input}
              />
              {phone.length >1 &&  phone.length<= 9 ? (
                <Text style={{color: 'red', paddingHorizontal: 10}}>
                  *Invalid Phone Number
                </Text>
              ) : null}

              <TouchableOpacity
                onPress={handleImagePicker}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 11,
                  backgroundColor: '#7a6f6e',
                  padding: 10,
                  width: 130,
                }}>
                <Text style={{color: 'white'}}>Select Image</Text>
                <Ionicons
                  color={'white'}
                  name="person"
                  style={{marginLeft: 8}}
                  size={22}
                />
              </TouchableOpacity>
              {avatar != '' && (
                <Image
                  style={{
                    height: 100,
                    width: 100,
                    marginHorizontal: 10,
                    marginTop: 10,
                  }}
                  source={{uri: avatar}}
                />
              )}
              {error ? (
                <Text style={{color: 'red', paddingHorizontal: 10}}>
                  *required
                </Text>
              ) : null}
              <TouchableOpacity
                onPress={handleOpenModalBack}
                style={styles.addButton}>
                <Text style={styles.nextButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={tempId !== '' ? handleUpdateTodo : handleAddTodo}
                style={{
                  backgroundColor: tempId != '' ? 'green' : 'black',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 5,
                  marginVertical: 2,
                  marginHorizontal: 10,
                }}>
                <Text style={styles.nextButtonText}>
                  {tempId !== '' ? 'Update' : 'Submit'}
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
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
    backgroundColor: '#019401',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 2,
    marginHorizontal: 10,
  },

  nextButtonText: {color: 'white', textAlign: 'center'},
  todoContainer: {
    padding: 10,
  },
  input: {
    borderColor: '#b3b6ba',
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    elevation: 10,
    backgroundColor: '#755909',
    margin: 5,
    borderRadius: 10,
  },
  detailsHeading: {
    fontWeight: '600',
    color: 'black',
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
