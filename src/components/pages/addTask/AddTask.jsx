import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';

const AddTask = () => {
    const [ success, setSuccess ] = useState("");
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        setSuccess("");
        const taskInfo = {
            name: data.title,
            assigned: data.assigned,
            deadline: data.deadline,
            details: data.details,
            profession: data.profession
        }

        const taskRes = await axios.post('https://task-hub-server-de0be2i9t-md-sifat-ikrams-projects.vercel.app/task', taskInfo);
        console.log(taskRes.data);
        if (taskRes.data.insertedId) {
            setSuccess(taskRes);
            Swal.fire("Task added successfully");
        }
    }

    return (
        <div className='w-11/12 mx-auto py-5'>
            <div className="text-center bg-[#47FC22] w-full py-10">
                <h1 className="text-5xl font-bold text-white">Add A Task</h1>
            </div>
            <div className="min-h-screen w-11/12 mx-auto mt-20">
                <div className="hero-content flex-col w-11/12 mx-auto">
                    <div className="card w-full">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body w-full">
                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Task Title</span>
                                </label>
                                <input type="text" {...register("title", { required: true })} placeholder="title" className="input input-bordered" required />
                            </div>
                            <div className="gap-10 md:flex">
                                <div className='w-1/2'>
                                    <label className="label">
                                        <span className="label-text">Due Date</span>
                                    </label>
                                    <input type="date" {...register("deadline")} placeholder="Type a Due Date" className="input input-bordered w-full" required />
                                </div>
                            </div>
                            <div className="gap-10 md:flex">
                                <div className='w-1/2'>
                                    <label className="label">
                                        <span className="label-text">Assigned to</span>
                                    </label>
                                    <input type="text" {...register("assigned")} placeholder="Type a Assigned to" className="input input-bordered w-full" required />
                                </div>
                            </div>
                            <div className="gap-10 md:flex">
                                <div className='w-1/2'>
                                    <label className="label">
                                        <span className="label-text">Profession</span>
                                    </label>
                                    <input type="text" {...register("profession")} placeholder="Type a profession to" className="input input-bordered w-full" required />
                                </div>
                            </div>
                            <div className="form-control mb-10">
                                <label className="label">
                                    <span className="label-text">Task Details</span>
                                </label>
                                <textarea className="textarea textarea-bordered" {...register("details")} placeholder="Task Details"></textarea>
                            </div>
                            <div>
                                <button type='submit' className='text-white font-semibold text-lg flex gap-1 items-center px-5 py-2 bg-[#47FC22]'>Add Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTask;