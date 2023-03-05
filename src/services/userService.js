import axios from "../axios";

export const handleLogin = (userEmail, userPassword) => {
    return axios.post('/api/login', {email: userEmail, password: userPassword});
}

export const getAllUser = (inputID) => {
    return axios.get('/api/get-all-user', { params: { id: inputID } })
}

export const addNewUser = (data, avatar) => {
    return axios.post('/api/create-user', 
    {
        email: data.email, 
        password: data.password, 
        firstName: data.firstName, 
        lastName: data.lastName,
        address: data.address,
        gender: data.gender,
        phoneNumber: data.phoneNumber,
        roleId: data.roleId, 
        positionId: data.positionId,
        image: avatar,
    })
}

export const handleDeleteUser = (id) => {
    return axios.delete('/api/delete-user',  {params: { id: id } })
}

export const handleUpdateUser = (data, avatar) => {
    return axios.put('/api/edit-user', {...data, image: avatar})
}

export const getAllCodeService = (typeInput) => {
    return axios.get('/api/allcodes', {params: {type: typeInput}})
}

export const getTopDocTorService = (limit = 10) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

export const getAllDoctor = () => {
    return axios.get('/api/get-all-doctors')
}

export const saveInfoDoctor = (data) => {
    return axios.post('api/save-info-doctor', {...data})
}

export const getDetailDocTor = (idDoctor) => {
    return axios.get('/api/get-detail-doctor-by-id', { params: {id: idDoctor}})
}

export const postBulkCreateSchedule = (data) => {
    return axios.post('/api/bulk-create-schedule', [...data]);
}

export const getScheduleByDate = (doctorId, date) => {
    return axios.get('/api/get-schedule-by-date', {params: {doctorId, date}})
}