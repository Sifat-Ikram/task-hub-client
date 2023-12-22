import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../provider/AuthProvider';
import axios from 'axios';

const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const SignUp = () => {
    const { createUser, googleSignUp } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleGoogle = () => {
        googleSignUp()
            .then(res => {
                console.log(res.user);
                updateProfile(res.user, {
                    displayName: res.user.name,
                    email: res.user.email
                })

                const userInfo = {
                    name: res.user.name,
                    email: res.user.email,
                    image: data.image
                }

                // axiosPublic.post("/user", userInfo)
                //     .then(res => {

                //         if (res.data.insertedId) {
                //             navigate(location?.state ? location.state : '/');
                //             Swal.fire({
                //                 position: "top-end",
                //                 icon: "success",
                //                 title: "You signed up successfully!",
                //                 showConfirmButton: false,
                //                 timer: 1500
                //             });
                //         }
                //     })
            })
            .catch(err => {
                console.error(err.message);
            })
    }

    const onSubmit = async (data) => {

        const imageFile = { image: data.image[0] }
        const res = await axios.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        const regex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (data.password.length < 6) {
            return <p>Your password should not be less than 6 characters</p>
        }
        else if (regex.test(data.password)) {
            return <p>You can not use any capital letter or any special characters</p>
        }

        setError('');
        setSuccess('');

        createUser(data.email, data.password)
            .then(res => {

                updateProfile(res.user, {
                    displayName: data.name,
                    email: data.email,
                    profession: data.profession,
                    image: data.image
                })

                const userInfo = {
                    name: data.name,
                    email: data.email,
                    profession: data.profession,
                    image: data.image
                }

                // axiosPublic.post("/user", userInfo)
                //     .then(res => {

                //         if (res.data.insertedId) {
                //             
                //             Swal.fire({
                //                 position: "top-end",
                //                 icon: "success",
                //                 title: "You signed up successfully!",
                //                 showConfirmButton: false,
                //                 timer: 1500
                //             });
                //         }
                //     })

                navigate(location?.state ? location.state : '/');
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
            })
    }


    return (
        <div className='w-5/6 mx-auto'>
            <div className="w-3/5 min-h-screen mx-auto mt-14">
                <div className="flex-col space-y-12 hero-content">
                    <div className="text-center bg-[#47FC22] w-full py-10">
                        <h1 className="text-5xl font-bold text-white">Sign up now!</h1>
                    </div>
                    <div className="w-full shadow-2xl card shrink-0">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input type="text" {...register("name")} placeholder="Full Name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email")} placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className='flex-1'>
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <input {...register("image")} type="file" placeholder="Your photo url" className="w-full input input-bordered" />
                            </div>
                            <div className='flex-1'>
                                <label className="label">
                                    <span className="label-text">Profession</span>
                                </label>
                                <input {...register("profession")} type="text" placeholder="Type your profession here" className="w-full input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password")} placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="mt-6 form-control">
                                <button className="btn font-btn bg-[#47FC22] hover:bg-[#47FC22] border-white">Sign up</button>
                            </div>
                            {
                                error && <p className="text-base text-red-800">{error}</p>
                            }
                            <div className='flex justify-center'>
                                <Link to={'/signIn'}><p>Already have account? <span className='text-[#47FC22]'>Sign in</span></p></Link>
                            </div>
                        </form>

                        <div className='flex items-center justify-center mb-10 bg-white'>
                            <button onClick={handleGoogle} className='btn btn-outline border-[#47FC22] hover:bg-[#47FC22] w-1/2 flex justify-center gap-5 text-black text-2xl font-bold'><FcGoogle></FcGoogle> Google</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;