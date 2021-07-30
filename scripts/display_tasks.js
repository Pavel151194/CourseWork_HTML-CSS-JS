import editIcon from '../assets/icons/edit.svg'
import deleteIcon from '../assets/icons/delete.svg'
import sendIcon from '../assets/icons/send.svg'
import doneIcon from '../assets/icons/done.svg'
import returnIcon from '../assets/icons/return.svg'

export const Tasks = new class createTasks{
    init(key){
        let mass = JSON.parse(localStorage.getItem(key))
        if(mass === null) mass = []
        return mass
    }
    display(mass, toDoSpace, inProgressSpace, completeSpace){
        toDoSpace.innerHTML = ''
        inProgressSpace.innerHTML = ''
        completeSpace.innerHTML = ''
        
        mass.forEach((element, index) => {
            if(element.type === 0){
                toDoSpace.innerHTML +=`<div class='task' data-id="${index}">
                <p>${element.name}</p>
                <p>${element.description}</p>
                <button class='edit'><img class='edit' src="${editIcon}" alt=""></button>
                <button class='delete'><img class='delete' src="${deleteIcon}" alt=""></button>
                <button class='send'><img class='send' src="${sendIcon}" alt=""></button>
                <span class='date'>${element.date}</span>
                </div>`
            }
            if(element.type === 1){
                inProgressSpace.innerHTML +=`<div class='task' data-id="${index}">
                <p>${element.name}</p>
                <p>${element.description}</p>
                <button class='edit'><img class='edit' src="${editIcon}" alt=""></button>
                <button class='return'><img class='return' src="${returnIcon}" alt=""></button>
                <button class='done'><img class='done' src="${doneIcon}" alt=""></button>
                <span class='date'>${element.date}</span>
                </div>`
            }
            if(element.type === 2){
                completeSpace.innerHTML +=`<div class='task' data-id="${index}">
                <p>${element.name}</p>
                <p>${element.description}</p>
                <button class='return'><img class='return' src="${returnIcon}" alt=""></button>
                <button class='delete'><img class='delete' src="${deleteIcon}" alt=""></button>
                <span></span>
                <span class='date'>${element.date}</span>
                </div>`
            }
        })
        return this
    }
    toLocalStorage(massKey, mass){localStorage.setItem(massKey, JSON.stringify(mass))}
    sortBy(mass, select){
        if(select.value === 'a-z') mass.sort((a, b) => a['name'] > b['name'] ? 1 : -1)
        if(select.value === 'z-a') mass.sort((a, b) => a['name'] > b['name'] ? -1 : 1)
        if(select.value === 'old-new') mass.sort((a, b) => a['date'] > b['date'] ? 1 : -1)
        if(select.value === 'new-old') mass.sort((a, b) => a['date'] > b['date'] ? -1 : 1)
        return this
    }
}