export const ModalWindow = new class ModalWindow{
    show($window, type, $windowTittle, tittle){
        $window.classList.remove("hidden")
        $window.dataset.modalType = type
        $windowTittle.innerText = tittle
        return this
    }
    hide($window, name, description, parrent, form){
        $window.classList.add("hidden")
        name.placeholder = "Name"
        description.placeholder = "Description"
        parrent.classList.remove("invalid")
        form.forEach(element => {
            element.value = ''
        })
        return this
    }
    disable(formFields){
        formFields.forEach(element => {
            element.disabled = true
        })
    }
    enable(formFields){
        formFields.forEach(element => {
            element.disabled = false
        })
    }
    invalid(name, description, parrent){
        name.placeholder = "Enter task name"
        description.placeholder = "Enter task description"
        parrent.classList.add("invalid")
    }
}