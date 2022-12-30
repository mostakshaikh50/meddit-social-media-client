import axios from 'axios';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import SortedPost from './SortedPost/SortedPost';



const Home = () => {
    const { userData } = useContext(AuthContext);
    const imageHostKey = "f68ce6832ff6fff2293396eec75259d1";
    const postedTime = new Date().toLocaleTimeString();

    const handlePostSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const userName = form.name.value;
        const address = form.address.value;
        const userImage = form.image.value;
        const post = form.post.value;
        const postedImage = form.posted_img.files[0];
        const image = postedImage;

        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`


        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())

            .then(imgData => {
                console.log(imgData);
                if (imgData.success) {


                    axios.post(`http://localhost:5000/userpost`, {
                        userName: userName,
                        address: address,
                        userImage: userImage,
                        image: imgData?.data.url,
                        post: post,
                        posted: postedTime
                    })
                        .then(function (response) {
                            console.log(response);
                            toast.success(`posted successfully`);
                            form.reset();
                        })
                        .catch(function (error) {
                            console.log(error);
                        });


                }
            })

    }

    return (
        <div className='mb-16'>

            <div className="heading text-center font-bold text-2xl m-5 text-gray-800">Add Post</div>

            {
                userData.map(user => <form
                    key={user?._id}
                    onSubmit={handlePostSubmit}>
                        <div className='hidden lg:hidden md:hidden'>
                        <input defaultValue={user?.name} id="name" name='name' type='text'></input>
                        <input defaultValue={user?.address} id="address" name='address' type='text'></input>
                        <input defaultValue={user?.image} id="image" name='image' type='text'></input>
                    </div>
                    <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
                        <textarea type="text" name="post" id="post" className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" spellCheck="false" placeholder="Whats on your mind?" required></textarea>
                        <div className="icons flex text-gray-500 m-2">                            
                            <input id="posted_img" name='posted_img' type='file' />
                            <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
                        </div>

                        <div className="buttons flex justify-end">
                            <button type='submit' className="btn border border-orange-800 font-semibold cursor-pointer text-gray-200 ml-2 bg-orange-500">Post</button>
                        </div>
                    </div>
                </form>)
            }
            <SortedPost></SortedPost>
        </div>
        
    );
};

export default Home;