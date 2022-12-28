import React from 'react';
import { useForm } from 'react-hook-form';


const Home = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <textarea {...register("textData", { required: true, maxLength: 200 })}></textarea>
            
            
            <input type="submit" />
        </form>
    );
};

export default Home;