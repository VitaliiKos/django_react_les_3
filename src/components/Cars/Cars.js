import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Car} from "../Car/Car";
import {carGetAll} from "../../store";
import css from './cars.module.css'

const Cars = ({auto_park_id}) => {
    const {cars, status, error} = useSelector(state => state['carReducer']);
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(carGetAll())
    }, [dispatch])
    let park_cars = cars.filter(car => car.auto_park_id===auto_park_id)

    return (
        <div className={css.cars}>
            {status === 'loading' && <h1>Loading...</h1>}
            {error && <h1>{error}</h1>}
            {park_cars.map(car => <Car key={car.id} park_cars={car}/>)}
        </div>
    );
};

export {Cars};