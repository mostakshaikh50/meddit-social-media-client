import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="m-auto 
        mb-20 flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800">
            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Sign in</h1>
                <p className="text-sm text-gray-600">Sign in to access your account</p>
            </div>
            <form novalidate="" action="" className="space-y-12 ng-untouched ng-pristine ng-valid">
                <div className="space-y-4">
                    <div>
                        <label for="email" className="block mb-2 text-sm">Email address</label>
                        <input type="email" name="email" id="email" placeholder="Enter your email here" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label for="password" className="text-sm">Password</label>
                            <Link rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-600">Forgot password?</Link>
                        </div>
                        <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
                    </div>
                </div>
                <div className="space-y-2">
                    <div>
                        <button type="button" className="w-full px-8 py-3 font-semibold rounded-md bg-sky-600 text-gray-50">Sign in</button>
                    </div>
                    <p className="px-6 text-sm text-center text-gray-600">Don't have an account yet?
                        <Link rel="noopener noreferrer" href="#" className="hover:underline text-sky-600">Sign up</Link>.
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;