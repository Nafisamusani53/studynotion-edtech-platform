import React , {useState, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {toast} from 'react-hot-toast'
import { GoUpload } from "react-icons/go";
import { updatePhoto } from '../../../../services/operations/profileOperatins';
import Buttons from '../Buttons';

const UpdateProfie = () => {

    const [file, setFile] = useState(null);
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const fileRef = useRef();
    const dispatch = useDispatch();

    const changeHandler = (e) => {
        const selectedFile = e.target.files[0];
        console.log('Selected File:', selectedFile);
        setFile(selectedFile);
    };

    const uploadHandler = (e) => {
        e.preventDefault();
        console.log(file)
        if (file) {
            dispatch(updatePhoto(file, token, user))
            setFile(null);
        }
        else{
            toast.error("Please select a file")
        }
       

    }

    const selectFileHandler = () => {
        fileRef.current.click();
    }
    return (
        <section className='flex flex-col sm:flex-row items-center gap-6 bg-richblack-800 rounded-lg p-8 md:px-12 border-[1px] border-richblack-700'>
            <img src={user?.image} alt={`profile-${user?.firstName}`}
                className='w-20 h-20 rounded-full'
            />

            <div className='flex flex-col gap-2 text-lg tracking-wide'>
                <p className='max-sm:text-center'>Change Profile Picture</p>
                <form onSubmit={uploadHandler} className='flex gap-4'>
                
                    <div className='bg-richblack-700 rounded-md cursor-pointer' onClick={selectFileHandler}>
                        <p className='py-1.5 px-5 text-richblack-100 font-bold '>Select</p>
                        <input type='file'
                            accept='image/png, image/jpg, image/jpeg'
                            onChange={changeHandler}
                            className='hidden'
                            ref={fileRef}
                        />
                    </div>

                    <Buttons content={"Upload"} yellow={true} type={"submit"}>
                        <GoUpload />
                    </Buttons>

                </form>
            </div>

            </section>
    )
}

export default UpdateProfie
