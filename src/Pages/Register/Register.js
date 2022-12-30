import React, { useContext } from 'react';
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { GoogleAuthProvider } from 'firebase/auth';

const Register = () => {

    const imageHostKey = "f68ce6832ff6fff2293396eec75259d1";
    const { createUser, updateUser, providerLogin } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSignup = e => {
        e.preventDefault();

        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const university = form.university.value;
        const address = form.address.value;
        const password = form.password.value;
        const postedImage = form.image.files[0];
        const image = postedImage;

        console.log(name, email, university , address)

        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`


        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('User registered Successfully');
                const userInfo = {
                    displayName: name
                }

                updateUser(userInfo)
                    .then(() => {
                        saveUser(name, email, university, address);
                    })

                navigate('/')

            })
            .catch(err => {
                console.error(err.message)
            })
            .catch(error => {
                console.log(error)
            });


        const saveUser = (name, email, university, address) => {

            fetch(url, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())

                .then(imgData => {
                    console.log(imgData);
                    if (imgData.success) {
                        axios.post(`http://localhost:5000/users`, {
                            name: name,
                            email: email,
                            profileImage: imgData?.data.url,
                            university: university,
                            address: address
                        })
                            .then(function (response) {
                                console.log(response);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }

                });


        }        

    }

    const saveUser = (name, email) => {

        axios.post(`http://localhost:5000/users`, {
            name: name,
            email: email,
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });


    }

    const HandleGoogleSignIn = ({ name, email }) => {
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate('/')
                toast.success('User Created Successfully')
                const userInfo = {
                    email: user.email,
                    name: user.displayName,
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(name = user.displayName, email = user.email);
                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                console.log(error)
            });



    }

    return (
        <div className="m-auto 
        mb-20 flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-50 text-gray-800">
            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
                <p className="text-md text-gray-600">It's Quick and Easy</p>
            </div>
            <form onSubmit={handleSignup} className="space-y-12 ng-untouched ng-pristine ng-valid">
                <div className="space-y-4">
                    <div>
                        <label for="name" className="block mb-2 text-sm">Name</label>
                        <input type="text" name="name" id="name" placeholder="Enter your name" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
                    </div>
                    <div>
                        <label for="email" className="block mb-2 text-sm">Email</label>
                        <input type="text" name="email" id="email" placeholder="Enter your email" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" required/>
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label for="password" className="text-sm">Password</label>
                        </div>
                        <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" required/>
                    </div>
                    <div>
                        <label htmlFor="image" className="block mb-2 text-sm">Profile Picture</label>
                        <input type="file" name="image" id="image" placeholder="Upload your profile image" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" required />
                    </div>
                    <div>
                        <label htmlFor="university" className="block mb-2 text-sm">University</label>
                        <input type="text" name="university" id="university" placeholder="Enter your university name" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" required />
                    </div>
                    <div>
                        <label htmlFor="address" className="block mb-2 text-sm">Address</label>
                        <input type="text" name="address" id="address" placeholder="Enter your address" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" required />
                    </div>
                </div>
                <div className="space-y-2">
                    <div>
                        <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-orange-500 text-gray-50">Sign Up</button>
                    </div>
                    {/* <div className='mt-5'>
                        <button onClick={HandleGoogleSignIn} className="btn w-full px-8 py-3 font-semibold rounded-md bg-blue-500 text-gray-50">SignIn With Google <span className='text-red-400 ml-4'><FaGoogle></FaGoogle></span> </button>
                    </div> */}
                    <p className="px-6 text-sm text-center text-gray-600">Already Medditor ?
                        <Link to="/login" rel="noopener noreferrer" href="#" className="hover:underline text-sky-600"> Sign In</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;