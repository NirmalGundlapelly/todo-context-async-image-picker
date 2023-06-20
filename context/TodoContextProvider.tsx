import React, {Component, ReactNode, } from 'react';
import {TodoContext} from './TodoContext';
import {Alert, Keyboard, PermissionsAndroid,} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {launchImageLibrary,} from 'react-native-image-picker';




interface Options {
  title?: string;
  message?:string;
  cancelText?:string;
  mediaType:any;
  saveToPhotos:boolean
}

interface ITodo {
  id: string;
  fullname: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}

interface IProps {
  children: ReactNode;
}

interface IState {
  todoList: ITodo[];
  fullname: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
  tempId: string;
  error: boolean;
  showModal: boolean;
  validEmail: boolean;
}

export default class TodoContextProvider extends Component<IProps, IState> {
  state = {
    fullname: '',
    email: '',
    password: '',
    phone: '',
    tempId: '',
    validEmail: false,
    todoList: [],
    error: false,
    showModal: false,
    avatar: '',
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

  handleOpenModal = () => {
    this.setState({showModal: true});
  };

  handleOpenModalBack = () => {
    this.setState({
      showModal: false,
      error: false,
      fullname: '',
      email: '',
      tempId: '',
      password: '',
      phone: '',
      avatar: '',
    });
  };

  handleInputChange = (text: string, name: string) => {
    if (name === 'fullname') {
      this.setState({fullname: text});
    }
    if (name === 'email') {
      this.setState({email: text});
    }
    if (name === 'password') {
      this.setState({password: text});
    }
    if (name === 'phone') {
      this.setState({phone: text});
    }
  };

  // add
  handleAddTodo = () => {
    const {todoList, fullname, email, password, phone, avatar} = this.state;
    if (fullname && email && password && phone && avatar !== '') {
      let newTodo = {
        id: todoList.length + 1,
        fullname,
        email,
        password,
        phone,
        avatar: avatar,
      };

      this.setState(
        (prevState: any) => ({
          todoList: [...prevState.todoList, newTodo],
        }),
        () => {
          this.saveTodos();
        },
      );
      this.setState({
        fullname: '',
        email: '',
        avatar: '',
        tempId: '',
        password: '',
        phone: '',
        showModal: false,
        error: false,
      });
      Keyboard.dismiss();
    } else {
      this.setState({error: true});
    }
  };

  // delete
  handleDelete = (id: string) => {
    Alert.alert('Delete Todo', 'Are you sure you want to delete?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => this.deleteTodo(id)},
    ]);
  };

  deleteTodo = (id: string) => {
    const {todoList} = this.state;
    let fileteredItems = todoList.filter((eachTodo:{id:string}) => eachTodo.id !== id);
    this.setState({todoList: fileteredItems, }, () => this.saveTodos());
  };

  // Edit
  handleEditTodo = (eachTodo: ITodo) => {
    this.setState({
      tempId: eachTodo.id,
      fullname: eachTodo.fullname,
      email: eachTodo.email,
      password: eachTodo.password,
      phone: eachTodo.phone,
      avatar: eachTodo.avatar,
      showModal: !this.state.showModal,
    });
  };

  // Update
  handleUpdateTodo = () => {
    const {fullname, email, password, phone, tempId} = this.state;
    if ((fullname && email && password && phone !== '')) {
      this.state.todoList.map((each:{id:string, fullname:string, email:string, password:string, phone:string, avatar:string}) => {
        if (each.id === tempId) {
          return (
            (each.fullname = this.state.fullname),
            (each.email = this.state.email),
            (each.password = this.state.password),
            (each.phone = this.state.phone),
            (each.avatar = this.state.avatar)
          );
        }
      });
      this.setState(
        {
          fullname: '',
          avatar: '',
          email: '',
          password: '',
          phone: '',
          tempId: '',
          showModal: false,
        },
        () => {
          this.saveTodos();
        },
      );
    }
  };

  handleImagePicker = async () => {

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const options:Options = {
          title: 'Select an image',
          mediaType:'photo',
          saveToPhotos:true,
        };
        launchImageLibrary(options, (response:any) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            this.setState({avatar: response.assets[0].uri});
          }
        });
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }


    const options:Options = {
      title: 'Select an image',
      mediaType:'photo',
      saveToPhotos:true,
    };

   
  };

  render() {
    const values = {
      ...this.state,
      handleImagePicker: this.handleImagePicker,
      handleEditTodo: this.handleEditTodo,
      handleUpdateTodo: this.handleUpdateTodo,
      handleInputChange: this.handleInputChange,
      handleAddTodo: this.handleAddTodo,
      handleDelete: this.handleDelete,
      handleOpenModal: this.handleOpenModal,
      handleOpenModalBack: this.handleOpenModalBack,
    };
    return (
      <TodoContext.Provider value={values}>
        {this.props.children}
      </TodoContext.Provider>
    );
  }
}
