import {$modalWindow, $taskForm, $taskFormFields, $taskName, $taskDescription, $btnOk, $toDoSpace, $inProgressSpace, $completeSpace, $windowTittle, $btnName, $select} from "./DOM_elements"
import {ModalWindow} from "./modal_windows.js"
import {Task, BtnName} from "./create_task"
import {Tasks} from "./display_tasks.js"

const tasks = Tasks.init("tasks")
Tasks.display(tasks, $toDoSpace, $inProgressSpace, $completeSpace)

document.addEventListener('click', event => {
    const target = event.target.classList
    if(target.contains('newTask')){
        ModalWindow.show($modalWindow,'new_task', $windowTittle,'New task')
    }
    if(target.contains('modal_windows') || target.contains('reset')){
        ModalWindow.hide($modalWindow, $taskName, $taskDescription, $taskForm, $taskFormFields).enable($taskFormFields)
    }
    if(target.contains('edit')){
        Task.call($modalWindow, tasks, $taskName, $taskDescription, event)
        ModalWindow.show($modalWindow,'edit_task', $windowTittle,'Edit task')
        BtnName.hide($btnName)
    }
    if(target.contains('delete')){
        Task.call($modalWindow, tasks, $taskName, $taskDescription, event)
        ModalWindow.show($modalWindow,'delete_task', $windowTittle,'Are you sure to delete this task?').disable($taskFormFields)
        BtnName.hide($btnName)
    }
    if(target.contains('send') || target.contains('done')){
        Task.send(tasks, event)
        Tasks.display(tasks, $toDoSpace, $inProgressSpace, $completeSpace).toLocalStorage("tasks", tasks)
        BtnName.hide($btnName)
    }
    if(target.contains('return')){
        Task.undo(tasks, event)
        Tasks.display(tasks, $toDoSpace, $inProgressSpace, $completeSpace).toLocalStorage("tasks", tasks)
        BtnName.hide($btnName)
    }
})

$btnOk.addEventListener('click', () => {
    const task = new Task.create($taskName, $taskDescription)
    if(task.name.length < 1 || task.description.length < 1){
        ModalWindow.invalid($taskName, $taskDescription, $taskForm)
        return false
    }
    if($modalWindow.dataset.modalType === 'new_task'){
        Task.add(task, tasks)
        Tasks.display(tasks, $toDoSpace, $inProgressSpace, $completeSpace).toLocalStorage("tasks", tasks)
        ModalWindow.hide($modalWindow, $taskName, $taskDescription, $taskForm, $taskFormFields)
    }
    if($modalWindow.dataset.modalType === 'edit_task'){
        Task.change(tasks, $modalWindow, $taskName, $taskDescription)
        Tasks.display(tasks, $toDoSpace, $inProgressSpace, $completeSpace).toLocalStorage("tasks", tasks)
        ModalWindow.hide($modalWindow, $taskName, $taskDescription, $taskForm, $taskFormFields)
    }
    if($modalWindow.dataset.modalType === 'delete_task'){
        Task.delete(tasks, $modalWindow)
        Tasks.display(tasks, $toDoSpace, $inProgressSpace, $completeSpace).toLocalStorage("tasks", tasks)
        ModalWindow.hide($modalWindow, $taskName, $taskDescription, $taskForm, $taskFormFields).enable($taskFormFields)
    }
})

$select.addEventListener('change', () => {
    Tasks.sortBy(tasks, $select).display(tasks, $toDoSpace, $inProgressSpace, $completeSpace).toLocalStorage("tasks", tasks)
})

document.addEventListener('mouseover', event => {
    document.addEventListener('mousemove', event => {BtnName.setСoordinates(event, $btnName)})
    const target = event.target.classList
    if(target.contains('edit')) BtnName.show($btnName, 'Edit')
    if(target.contains('delete')) BtnName.show($btnName, 'Delete')
    if(target.contains('send')) BtnName.show($btnName, 'Start')
    if(target.contains('return')) BtnName.show($btnName, 'Undo')
    if(target.contains('done')) BtnName.show($btnName, 'Done')
})

document.addEventListener('mouseout', event => {
    const target = event.target.classList
    if(target.contains('edit') || target.contains('delete') || target.contains('send') || target.contains('return') || target.contains('done')) BtnName.hide($btnName)
})