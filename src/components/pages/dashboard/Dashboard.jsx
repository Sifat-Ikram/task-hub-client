import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Dashboard = () => {

    const [tasks, setTasks] = useState(null);
    const [task, setTask] = useState([]);
    const [completedTask, setCompletedTask] = useState([]);

    useEffect(() => {
        axios.get('https://task-hub-server-de0be2i9t-md-sifat-ikrams-projects.vercel.app/task')
            .then(res => {
                setTasks(res.data);
            })
    }, [])

    if (!tasks) {
        return <span className="loading loading-dots loading-lg"></span>;
    }

    function handleOnDrag(e, task) {
        e.dataTransfer.setData("taskType", task.task_name);
    }

    function handleOnDrop(e) {
        const taskType = e.dataTransfer.getData("taskType");

        setTask([...task, taskType]);
    }

    function handleDragOver(e) {
        e.preventDefault();
    }



    function handleOnDragComplete(e, task) {
        e.dataTransfer.setData("taskType", JSON.stringify(task));
    }

    function handleOnDropComplete(e) {
        const taskType = JSON.parse(e.dataTransfer.getData("taskType"));

        const updatedTasks = task.filter(task => task == taskType);

        setCompletedTask([...completedTask, updatedTasks]);
    }

    function handleDragOverComplete(e) {
        e.preventDefault();
    }


    return (
        <div className='w-4/5 mx-auto space-y-10'>
            <div className='px-4 py-2 border-2 rounded-md w-[300px] mt-10 bg-[#47FC22] font-bold text-white'>
                <Link to={"/addTask"}>
                    <h1>Add A Task</h1>
                </Link>
            </div>
            <div className='flex justify-evenly'>
                <div className='space-y-8 mt-5' id='toDo'>
                    <div className='px-4 py-2 border-2 rounded-md w-[300px] bg-[#47FC22] font-bold text-white'>
                        <h1 className='text-xl font-semibold'>To Do Tasks</h1>
                    </div>

                    <div className='grid grid-cols-1 gap-5'>
                        {
                            tasks.map(task => <div key={task._id}
                                className='flex cursor-pointer justify-between w-11/12 mx-auto  border-2 rounded-md px-5'
                                draggable
                                onDragStart={(e) => handleOnDrag(e, task)}
                            >
                                <div>
                                    <h1 className='font-semibold'>{task.task_name}</h1>
                                </div>
                            </div>
                            )}
                    </div>

                </div>
                <div className='space-y-8 mt-5' onDrop={handleOnDrop} onDragOver={handleDragOver} id='ongoing'>
                    <div className='px-4 py-2 border-2 rounded-md w-[300px] bg-[#47FC22] font-bold text-white'>
                        <h1 className='text-xl font-semibold'>Ongoing Tasks</h1>
                    </div>
                    <div className='grid grid-cols-1 gap-5'>
                        {
                            task.map((task, index) => (
                                <div key={index}
                                    className='flex cursor-pointer justify-between w-11/12 mx-auto  border-2 rounded-md px-5'
                                    draggable
                                    onDragStart={(e) => handleOnDragComplete(e, task)}>
                                    {task}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='space-y-8 mt-5' onDrop={handleOnDropComplete} onDragOver={handleDragOverComplete} id='completed'>
                    <div className='px-4 py-2 border-2 rounded-md w-[300px] bg-[#47FC22] font-bold text-white'>
                        <h1 className='text-xl font-semibold'>Completed Tasks</h1>
                    </div>
                    <div className='grid grid-cols-1 gap-5'>
                        {
                            completedTask.map((task, index) => (
                                <div key={index}
                                    className='flex cursor-pointer justify-between w-11/12 mx-auto  border-2 rounded-md px-5'
                                >
                                    {task}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;