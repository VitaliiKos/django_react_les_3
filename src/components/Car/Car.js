import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";

import {carDelete, carToUpdate} from "../../store";
import css from './car.module.css'

const Car = ({park_cars}) => {
    // console.log(park_cars)
    const {id, brand, price, year} = park_cars
    // console.log(park_cars)
    const dispatch = useDispatch();
    useEffect(() => {
    }, [dispatch])

    return (
        <div className={css.car}>
                <h4>ID: {id}</h4>
                <h4>Model: {brand}</h4>
                <h4>Price: {price}</h4>
                <h4>Year: {year}</h4>
                <button onClick={() => dispatch(carDelete({id}))}>Delete</button>
                <button onClick={() => dispatch(carToUpdate({park_cars}))}>Update</button>
        </div>
    );
};

export {Car};