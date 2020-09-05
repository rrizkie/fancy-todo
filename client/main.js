
const menu = (event)=>{
    $('#Todo').hide()
    $('#login-form').hide()
    $('#register-form').hide()
    $('#addtodo-form').hide()
}

const register = (event)=>{
    $('#Todo').hide()
    $('#login-form').hide()
    $('#register-form').show()
    $('#addtodo-form').hide()
}

const login = (event)=>{
    $('#Todo').hide()
    $('#login-form').show()
    $('#register-form').hide()
    $('#addtodo-form').hide()
}

const list = (event)=>{
    $('#Todo').show()
    $('#login-form').hide()
    $('#register-form').hide()
    $('#addtodo-form').hide()

    $.ajax({
        method:'GET',
        url:'http://localhost:3000/todos',
        headers:{
            access_token:localStorage.getItem('access_token')
        }
    })
    .done((response)=>{
        console.log(response)
        $('#list-card').empty()
        response.forEach(i=>{
            $('#list-card').append(`
            <div class="card-body">
                        <h5 class="card-title" id ="title-${i.id}">${i.title}</h5>
                        <p class="card-text">${i.description}</p>
                        <p class="card-text">${i.due_date.split("T")[0]}</p>
                        <a href="#" class="btn btn-primary" data-id="${i.id}" onClick="edit(event)">Edit</a>
                        <a href="#" class="btn btn-primary" data-id="${i.id}" onClick="deleteTodo(event)">Delete</a>
                        <a href="#" class="btn btn-primary" data-id="${i.id}" onClick="status(event)">Done</a>
                      </div>
            `)
            
        })
    })

}
const updateStatus = (event)=>{
    console.log(event.srcElement.dataset.id)
    event.preventDefault()
    menu()

    $.ajax({
        method:'GET',
        url:`http://localhost:3000/todos/${event.srcElement.dataset.id}`,
        headers:{
            access_token:localStorage.getItem('access_token')
        }
    })
    .done((response)=>{
        console.log(response)
        localStorage.setItem('id',response.id)
        let date = response.due_date.split("T")[0]
        $('#tampung-edit').append(
            `
            <div>
      <h4>Edit Todo</h4>
    </div>
    <br>
  <form id="edit-todo">
    <div class="form-group">
      <label for="exampleInputEmail1" style="font-weight: bold;">Title</label>
      <input type="text" class="form-control" value="${response.title}" id="title-edit" aria-describedby="emailHelp" style="transform: rotateY(-50%);color: #777;padding: 2px 15px 2px 35px;border: none;border-radius: 50px;text-align: center;">
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1" style="font-weight: bold;">Description</label>
      <input type="text" class="form-control" value="${response.description}" id="desc-edit" aria-describedby="emailHelp" style="transform: rotateY(-50%);color: #777;padding: 2px 15px 2px 35px;border: none;border-radius: 50px;text-align: center;">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1" style="font-weight: bold;">Due Date</label>
      <input type="date" class="form-control" value="${date}" id="date-edit" style="transform: rotateY(-50%);color: #777;padding: 2px 15px 2px 35px;border: none;border-radius: 50px;text-align: center;">
    </div>
    <button id="edit-button" onClick="status(event)" type="submit" class="btn btn-primary" style="border-radius: 50px;">Edit</button>
  </form>
  <br>
            `
        )
    })
    .fail((err)=>{
        console.log(err)
    })
}

const status = (event)=>{
    event.preventDefault()
    $.ajax({
        method:'PUT',
        url:`http://localhost:3000/todos/${localStorage.getItem('id')}`,
        data:{
            title:$('#title-edit').val(),
            description:$('#desc-edit').val(),
            due_date:$('#date-edit').val(),
            status:true
        },
        headers:{
            access_token:localStorage.getItem('access_token')
        }
    })
    .done(response=>{
        console.log(response,'iini status')
        event.preventDefault()
        list()
    })
    .fail(err=>{
        console.log(err)
})
}


const edit = (event)=>{
    console.log(event.srcElement.dataset.id)
    event.preventDefault()
    menu()

    $.ajax({
        method:'GET',
        url:`http://localhost:3000/todos/${event.srcElement.dataset.id}`,
        headers:{
            access_token:localStorage.getItem('access_token')
        }
    })
    .done((response)=>{
        console.log(response)
        localStorage.setItem('id',response.id)
        let date = response.due_date.split("T")[0]
        $('#tampung-edit').append(
            `
            <div>
      <h4>Edit Todo</h4>
    </div>
    <br>
  <form id="edit-todo">
    <div class="form-group">
      <label for="exampleInputEmail1" style="font-weight: bold;">Title</label>
      <input type="text" class="form-control" value="${response.title}" id="title-edit" aria-describedby="emailHelp" style="transform: rotateY(-50%);color: #777;padding: 2px 15px 2px 35px;border: none;border-radius: 50px;text-align: center;">
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1" style="font-weight: bold;">Description</label>
      <input type="text" class="form-control" value="${response.description}" id="desc-edit" aria-describedby="emailHelp" style="transform: rotateY(-50%);color: #777;padding: 2px 15px 2px 35px;border: none;border-radius: 50px;text-align: center;">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1" style="font-weight: bold;">Due Date</label>
      <input type="date" class="form-control" value="${date}" id="date-edit" style="transform: rotateY(-50%);color: #777;padding: 2px 15px 2px 35px;border: none;border-radius: 50px;text-align: center;">
    </div>
    <button id="edit-button" onClick="update(event)" type="submit" class="btn btn-primary" style="border-radius: 50px;">Edit</button>
  </form>
  <br>
            `
        )
    })
    .fail((err)=>{
        console.log(err)
    })

}
const update = (event)=>{
    // edit todo submit
        event.preventDefault()
        $.ajax({
            method:'PUT',
            url:`http://localhost:3000/todos/${localStorage.getItem('id')}`,
            data:{
                title:$('#title-edit').val(),
                description:$('#desc-edit').val(),
                due_date:$('#date-edit').val()
            },
            headers:{
                access_token:localStorage.getItem('access_token')
            }
        })
        .done(response=>{
            console.log(response,'iini put')
            event.preventDefault()
            list()
        })
        .fail(err=>{
            console.log(err)
    })
}

const deleteTodo = (event)=>{
    console.log(event.srcElement.dataset.id)
    $.ajax({
        method:'DELETE',
        url:`http://localhost:3000/todos/${event.srcElement.dataset.id}`,
        headers:{
            access_token:localStorage.getItem('access_token')
        }

    })
    .done((response)=>{
        console.log('deleted')
        list()
    })
    .fail((err)=>{
        console.log(err)
    })
}

const logout = (event)=>{
    $('#Todo').hide()
    $('#login-form').show()
    $('#register-form').hide()
    $('#addtodo-form').hide()
}

const add = (event)=>{
    $('#Todo').hide()
    $('#login-form').hide()
    $('#register-form').hide()
    $('#addtodo-form').show()
}


const beforeLogin = (event)=>{
    $('#login-form').show()
    $('#Todo').hide()
    $('#register-form').hide()
    $('#addtodo-form').hide()
    $('#logout-nav').hide()

}

const afterLogin = (event)=>{

}

function onSignIn(googleUser) {
    var google_access_token = googleUser.getAuthResponse().id_token;
    console.log(google_access_token)

    $.ajax({
        method:'POST',
        url:"http://localhost:3000/google",
        headers:{
            google_access_token
        }
    })
    .done((response)=>{
        console.log(response)
        localStorage.setItem('access_token',response.access_token)
        list()
    })
    .fail((err)=>{
        console.log(err)
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}
  

$(document).ready(()=>{
    if (localStorage.getItem('access_token')){
        list()
    }else{
        beforeLogin()
    }



    // submit login form
    $('#form-login').submit(()=>{
        event.preventDefault()
        const email = $('#email-login').val()
        const password = $('#password-login').val()
        console.log(email,password)
        $.ajax({
            method:'POST',
            url:'http://localhost:3000/login',
            data:{
                email,
                password
            }
            
        })

        .done((response)=>{
            console.log(response)
            $('#email-login').val('')
            $('password-login').val('')
            localStorage.setItem('access_token',response.access_token)
            list()
        })
        .fail((err)=>{
            console.log(err)
        })
    })

    // submit register form
    $('#register').submit(()=>{
        event.preventDefault()
        const username = $('#username-register').val()
        const email = $('#email-register').val()
        const password = $('#password-register').val()
        console.log(email,password)
        $.ajax({
            method:'POST',
            url:'http://localhost:3000/register',
            data:{
                username,
                email,
                password
            }
        })
        .done((response)=>{
            console.log(response)
            $('#username-register').val('')
            $('#email-register').val('')
            $('#password-register').val('')
            login()
        })
        .fail((err)=>{
            console.log(err)
        })

    })

    // submit add todo
    $('#addtodo').click(()=>{
        event.preventDefault()
        add()
    })
    $('#add').submit(()=>{
        event.preventDefault()
        let title = $('#title-add').val()
        let description = $('#desc-add').val()
        let due_date = $('#date-add').val()

        $.ajax({
            method:'POST',
            url:'http://localhost:3000/todos',
            data:{
                title,
                description,
                due_date
            },
            headers:{
                access_token:localStorage.getItem('access_token')
            }
        })
        .done((response)=>{
            console.log(response)
            $('#title-add').val("")
            $('#desc-add').val("")
            $('#date-add').val("")
            list()
        })
        .fail((err)=>{
            console.log(err)
        })
    })

    

    $('#logout-but').click(()=>{
        event.preventDefault()
        localStorage.removeItem('access_token')
        beforeLogin()
        signOut()

    })

})