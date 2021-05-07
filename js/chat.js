const val = document.getElementById('val')
const form = document.querySelector('form')
const listMsg = document.querySelector('.list-msg')

const profileInfoName = document.querySelector('.profile-info p')
profileInfoName.textContent = 'Johnny'

import {fetchReq} from './fetch.js'

let url = 'http://localhost:3000/sentMessages'
fetchReq('GET', url)
.then(response => genereteM(response))
.catch(err => console.log(err))



function genereteM(data) {
    data.forEach(obj => {
    const li = document.createElement('li')
    li.setAttribute('data', obj.id)
    const btnProfile = document.createElement('button')
    btnProfile.classList.add('btnProfile')

    li.appendChild(btnProfile)

    const pName = document.createElement('p')
    pName.classList.add('pName')
    pName.textContent = obj.name

    const p = document.createElement('p')
    p.classList.add('messages')
    p.textContent = obj.message

    const div = document.createElement('div')
    div.classList.add('pMessages')

    div.appendChild(pName)
    div.appendChild(p)


    const btn = document.createElement('button')
    btn.classList.add('btnExclude')

    const divDelete = document.createElement('div')
    divDelete.appendChild(btn)
    divDelete.classList.add('box-delete')
    const iDelete = document.createElement('i')
    iDelete.className = 'fas fa-trash'

    const iEdit = document.createElement('i')
    iEdit.className = 'fas fa-edit'

    btn.appendChild(iEdit)
    btn.appendChild(iDelete)
    div.appendChild(divDelete)

    li.appendChild(div)

    listMsg.appendChild(li)

    return li
    })
}



function send(name, message, age, renderMsg){
   fetchReq('POST', url, JSON.stringify({name, message, age}))
   .then(response => renderMsg(response))
   .catch(err => console.log(err))
}



function excludeMsg(id, render) {
    fetchReq('DELETE', `${url}/${id}`)
    .then(data => render(data))
    .catch(err => console.log(err))
}



function updateMsg(message, updateMessages) {
    fetchReq('PATCH', `${url}/${message.id}`, JSON.stringify(message))
    .then(response => updateMessages(response))
    .catch(err => console.log(err))
}

function ulEvent(e) {
    let current = e.target
    let li = current

    while(li.nodeName !== 'LI'){
        li = li.parentElement
    }
    
    if(current.className === 'fas fa-trash') {
        excludeMsg(li.getAttribute('data'), msg => {
            listMsg.innerHTML = ''
            genereteM(msg)
        })

    } else if (current.className === 'fas fa-edit') {
        const editBox = document.createElement('div')
        editBox.classList.add('edit')

        const editInput = document.createElement('input')
        editInput.classList.add('editMessage')

        editBox.appendChild(editInput)

        const editButton = document.createElement('button')
        editButton.classList.add("edit-btn")
        editButton.textContent = 'Edit'
        editButton.addEventListener('click', function(){
           listMsg.innerHTML = ''
           const message = li.querySelector('.editMessage').value
           const id = li.getAttribute('data')
           updateMsg({message, id}, renderUpdated => genereteM(renderUpdated))
        })

        editBox.appendChild(editButton)

        const cancel = document.createElement('button')
        cancel.classList.add('cancel-btn')
        cancel.textContent = 'Cancel'

        editBox.appendChild(cancel)
        cancel.addEventListener('click', function(){ editBox.remove()})
        const div = li.querySelector('.pMessages')

        div.appendChild(editBox)
    }
}


form.addEventListener('submit', function(e){
    e.preventDefault()

    if(val.value){
        listMsg.innerHTML = ''
        send('Johnny',val.value,34, data =>  genereteM(data))
    }
    val.value = ''
    val.focus()
})


listMsg.addEventListener('click', ulEvent)

