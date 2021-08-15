import Axios from 'axios';
import { URL } from '../constant';

const UserService = {
    create(data) {
        return Axios.request({
            method: 'post',
            url: `${URL}/api/users`,
            data
        })
    },
    read(page) {
        return Axios.request({
            method: 'get',
            url: `${URL}/api/users?page=${page}`
        })
    },
    update(id, data) {
        return Axios.request({
            method: 'put',
            url: `${URL}/api/users/${id}`,
            data
        })
    },
    delete(id) {
        return Axios.request({
            method: 'delete',
            url: `${URL}/api/users/${id}`
        })
    }
}

export { UserService };