import React, { Component } from "react";

type ITodo = {
  id: string,
  fullname: string,
  email: string,
  password: string,
  phone: string,
  avatar: string
}


export const TodoContext = React.createContext({
  todoList: [],
  fullname: '',
  email: '',
  password: '',
  phone: '',
  tempId: '',
  error: false,
  showModal: false,
  avatar: '',
  handleImagePicker: () => { },
  handleEditTodo: (eachTodo: ITodo) => { },
  handleUpdateTodo: () => { },
  handleInputChange: (text: string, name: string) => { },
  handleAddTodo: () => { },
  handleDelete: (id: string) => { },
  handleOpenModal: () => { },
  handleOpenModalBack: () => { },
});