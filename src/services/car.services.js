import {axiosServices} from "./axios.serices";
import {urls} from "../urls";

export const carServices = {
    getAll: () => axiosServices.get(urls.cars).then(value => value.data),
    deleteByID: (id) => axiosServices.delete(`${urls.cars}/${id}/delete`),
    create: (car) => axiosServices.post(`${urls.parks}/${car.park_id}/add_car`, car).then(value => value.data),
    updateById: (id, car) => axiosServices.patch(`${urls.cars}/${id}/update`, car).then(value => value.data),


    getAllParks: () => axiosServices.get(urls.parks).then(value => value.data),
    deleteParkByID: (id) => axiosServices.delete(`${urls.parks}/${id}/delete`),
    createPark: (name) => axiosServices.post(`${urls.parks}`, name).then(value => value.data),

}