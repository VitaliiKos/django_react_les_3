import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import {parkCreate, parkGetAll} from "../../store";
import {Park} from "../Park/Park";
import css from "./parks.module.css";

const Parks = () => {
    const {parks, status, error} = useSelector(state => state['carReducer']);
    const {handleSubmit, reset, register} = useForm();

    const dispatch = useDispatch();
    const submit = (data) => {
        dispatch(parkCreate({data}))
        reset()
    }


    useEffect(() => {

        dispatch(parkGetAll())
    }, [dispatch])

    return (
        <div className={css.parks}>
            <div className={css.parks_form}>
                <h2>Create a new park</h2>

                <form onSubmit={handleSubmit(submit)}>
                    <div>
                        <label>Park name: <input type="text" {...register('name')}/></label>
                    </div>
                    <button>{'Create'}</button>
                </form>

            </div>


            {status === 'loading' && <h1>Loading...</h1>}
            {error && <h1>{error}</h1>}
            {parks.map(park => <Park key={park.id} park={park}/>)}
        </div>
    );
};

export {Parks};