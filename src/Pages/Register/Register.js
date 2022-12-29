import React from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";

const Register = () => {
    return (
        <div className="m-auto 
        mb-20 flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800">
            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
                <p className="text-md text-gray-600">It's Quick and Easy</p>
            </div>
            <form novalidate="" action="" className="space-y-12 ng-untouched ng-pristine ng-valid">
                <div className="space-y-4">
                    <div>
                        <label for="name" className="block mb-2 text-sm">Name</label>
                        <input type="email" name="name" id="name" placeholder="Enter your name" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
                    </div>
                    <div>
                        <label for="email" className="block mb-2 text-sm">Email</label>
                        <input type="email" name="email" id="email" placeholder="Enter your email" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label for="password" className="text-sm">Password</label>
                        </div>
                        <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
                    </div>
                </div>
                <div className="space-y-2">
                    <div>
                        <button type="button" className="w-full px-8 py-3 font-semibold rounded-md bg-orange-500 text-gray-50">Sign Up</button>
                    </div>
                    <div className='mt-5'>
                        <button onClick="" className="btn w-full px-8 py-3 font-semibold rounded-md bg-blue-500 text-gray-50">SignIn With Google <span className='text-red-400 ml-4'><FaGoogle></FaGoogle></span> </button>
                    </div>
                    <p className="px-6 text-sm text-center text-gray-600">Already Medditor ?
                        <Link to="/login" rel="noopener noreferrer" href="#" className="hover:underline text-sky-600"> Sign In</Link>.
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;