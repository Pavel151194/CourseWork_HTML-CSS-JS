export const Task = new class changeTask{
    setDate(){
        const date = new Date()
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        if(day < 10) day = `0${day}`
        if(month < 10) month = `0${month}`
        if(hours < 10) hours = `0${hours}`
        if(minutes < 10) minutes = `0${minutes}`
        return `${day}.${month}.${year} ${hours}:${minutes}`
    }
    create(taskName, taskDescription){
        this.name = taskName.value
        this.description = taskDescription.value
        this.date = Task.setDate()
        this.type = 0
    }
    setId(event){return event.target.closest('.task').dataset.id}
    getId($window){return $window.dataset.selectId}

    add(obj, mass){mass.push(obj)}
    delete(mass, $window){mass.splice(Task.getId($window), 1)}

    call($window, mass, taskName, taskDescription, event){
        $window.dataset.selectId = Task.setId(event)
        taskName.value = mass[Task.setId(event)].name
        taskDescription.value = mass[Task.setId(event)].description
    }
    send(mass, event){
        mass[Task.setId(event)].type += 1
        mass[Task.setId(event)].date = Task.setDate()
    }
    undo(mass, event){
        mass[Task.setId(event)].type -= 1
        mass[Task.setId(event)].date = Task.setDate()
    }
    change(mass, $window, taskName, taskDescription){
        mass[Task.getId($window)].name = taskName.value
        mass[Task.getId($window)].description = taskDescription.value
        mass[Task.getId($window)].date = Task.setDate()
    }
}

export const BtnName = new class createBtnName{
    setСoordinates(event, element){
        element.style.top = `${event.pageY + 18}px`
        element.style.left = `${event.pageX}px`
    }
    show(element, name){
        element.innerText = name
        element.style.opacity = 1
    }
    hide(element){
        element.style.opacity = 0
    }
}