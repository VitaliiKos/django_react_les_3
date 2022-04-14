import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";

import {carCreate, updateCarById} from "../../store";
import css from './form.module.css';

const Form = () => {
    const {carForUpdate} = useSelector(state => state['carReducer']);
    const dispatch = useDispatch();
    const {handleSubmit, reset, setValue, register} = useForm();

    const submit = (data) => {
        if (carForUpdate) {
            dispatch(updateCarById({id: carForUpdate.id, car: data}))
            reset()
            return
        }
        dispatch(carCreate({data}))
        reset()
    }

    useEffect(() => {
        if (carForUpdate) {
            setValue('brand', carForUpdate.brand)
            setValue('price', carForUpdate.price)
            setValue('year', carForUpdate.year)
            setValue('park_id', carForUpdate.park_id)
        }
    }, [carForUpdate, setValue])

    return (
        <div className={css.form}>
            <div className={css.form_title}><h2>Create/Update car</h2></div>
            <form onSubmit={handleSubmit(submit)}>

                <div className={css.blockInput}>
                    <label>Model: <input type="text" {...register('brand')}/></label>
                    <label>Price: <input type="text" {...register('price')}/></label>
                    <label>Year: <input type="text" {...register('year')}/></label>
                    <label className={carForUpdate ? css.park_id_invisible : css.park_id_visible}>Park Id: <input type="text" {...register('park_id')} /></label>
                </div>

                <button>{carForUpdate ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
};

export {Form};