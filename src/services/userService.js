import axios from "../axios";

export const handleLogin = (userEmail, userPassword) => {
    return axios.post('/api/login', {email: userEmail, password: userPassword});
}

export const getAllUser = (inputID) => {
    return axios.get('/api/get-all-user', { params: { id: inputID } })
}

export const addNewUser = (data) => {
    return axios.post('/api/create-user', 
    {
        email: data.email, 
        password: data.password, 
        firstName: data.firstName, 
        lastName: data.lastName,
        address: data.address,
        gender: data.gender,
        phoneNumber: data.phoneNumber,
    })
}

export const handleDeleteUser = (id) => {
    return axios.delete('/api/delete-user',  {params: { id: id } })
}

export const handleUpdateUser = (data) => {
    return axios.put('/api/edit-user', {...data})
}