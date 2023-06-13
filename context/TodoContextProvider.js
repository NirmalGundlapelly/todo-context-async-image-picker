import React, { Component } from 'react'
import { TodoContext } from './TodoContext'
import { Alert, Keyboard } from 'react-native'


export default class TodoContextProvider extends Component {
    constructor(props) {
        super(props)
        this.state = { task: '', todoList: [], error: false }
    }

    handleInputChange = (text) => {
        this.setState({ task: text })
    }


    // add
    handleAddTodo = () => {
        const { todoList, task } = this.state;
        if (task !== "") {
            this.setState({ error: false })
            let newTodo = {
                id: todoList.length + 1,
                text: task,
            };
            this.setState({ todoList: [...todoList, newTodo], task: "" });
            Keyboard.dismiss()
        } else {
            this.setState({ error: true })
        }
    };

    // delete
    handleDelete = (id) => {
        Alert.alert('Delete Todo', 'Are you sure you want to delete?', [
            {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
            },
            { text: 'YES', onPress: () => this.deleteTodo(id) },
        ]);
    }

    deleteTodo = (id) => {
        const { todoList } = this.state;
        let fileteredItems = todoList.filter((eachTodo) => eachTodo.id !== id);
        this.setState({ todoList: fileteredItems, task:'' });
    }

    render() {
        return (
            <TodoContext.Provider value={{ ...this.state, handleInputChange: this.handleInputChange, handleAddTodo: this.handleAddTodo, handleDelete: this.handleDelete }}>
                {this.props.children}
            </TodoContext.Provider>
        )
    }
}