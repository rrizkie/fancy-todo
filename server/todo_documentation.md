Todo server

## Todo  is an application that help you to manage your activity. This app has :
    1.RESTful endpoint CRUD operations
    2.JSON formatted response

## RESTful endpoint

    1. get/todos
    2. get/todos/:id
    3. post/todos
    4. put/todos/:id
    5. delete/todos/:id


## get/todos (get all todos list)



    Request Body
        not needed


   Response (200)
    
    {
        "id": 1,
        "title": "<todo name>",
        "description": "<todo description>",
        "due_date": "2020-01-29",
        "createdAt": "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z",
    },
    {
        "id": 2,
        "title": "<todo name>",
        "description": "<todo description>",
        "due_date": "2020-01-29",
        "createdAt": "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z",
    }


    Response (400)
    {
    "message": "Invalid request"
    }




## get/todos/:id (get todos by id)

    Request Header
    {
        "jwt_token"
    }

    Request Body
        not needed

    Response (200)
    {
        "id": 1,
        "title": "<todo name>",
        "description": "<todo description>",
        "due_date": "2020-01-29",
        "createdAt": "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z",
    }
    

    Response (404)
    {
    "message": "cant find"
    }


## post/todos (create new todos)

    Request Header
    {
        "jwt token"
    }

    Request body
    {
    "title": "<title to get insert into>",
    "description": "<description to get insert into>",
    "status":"<default>"
    "due_date": "<date to get insert into>",
    }

    Response (201 - created)
    {
    "id": <given id by system>,
    "title": "<posted name>",
    "description": "<posted description>",
    "due_date": "2020-01-29",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
    }

    Response (400- bad request)
    {
    "message": "error"
    }


## put/todos/:id (update todos by id)

    Request Header
    {
        "jwt token"
    }

    Request body
    {
    "title": "<title from todo database>",
    "description": "<description from user database>",
    "status":"<status from user database>"
    "due_date": "<date from user database>",
    }
    
    response(200)
    {
    "title": "<title from input>",
    "description": "<description from input>",
    "status":"<status from input>"
    "due_date": "<date from input>",
    }

    respon(304)
    {
        "message": "not updated"
    }


## delete/todos/:id (deleting todo by id)


    Request Header
    {
        "jwt token"
    }

    Request Body
        not needed

    response(200)
    {}

    response(404)
    {
        "message":"not deleted data not found"
    }


## post/register (create new user)

    Request body
    {
    "username": "<username from input>",
    "email": "<email from input>",
    "password":"<password from input>"
    }

    response(200)
    {
    "username": "<username from input>",
    "email": "<email from input>",
    "password":"<password from input>"
    }

    response(400)
    {
        "message":"something error"
    }

## post/login (login into user)

    Request body
    {
    "email": "<email from input>",
    "password":"<password from input>"
    }

    response(200)
    {
        "jwt token"
    }

    response(400)
    {
        "message":"email / password salah"
    }