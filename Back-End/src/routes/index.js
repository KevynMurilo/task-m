const express = require('express');
const toDoList = require('./toDoList.js');

module.exports = app => {
    app.use(
        express.json(),
            toDoList
    )
}