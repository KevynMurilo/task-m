const Controller = require('./Controller.js');
const ToDoListServices = require('../services/ToDoListServices.js');

const toDoListServices = new ToDoListServices();

class ToDoListController extends Controller{
    constructor(){
        super(toDoListServices)
    }
}

module.exports = ToDoListController;