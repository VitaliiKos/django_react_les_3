import React from 'react';
import {useDispatch} from "react-redux";

import {parkDelete} from "../../store";
import css from './park.module.css'
import {Cars} from "../Cars/Cars";

const Park = ({park}) => {
    const {id, name, cars} = park
    const dispatch = useDispatch();

    return (
        <div className={css.park}>
            <h4>Park Id: {id}</h4>
            <h4>Park name: {name}</h4>
            <Cars key={cars.id} auto_park_id={id}  />
            <button onClick={() => dispatch(parkDelete({id}))}>Delete</button>
        </div>
    );
};

export {Park};