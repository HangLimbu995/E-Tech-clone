import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { useProfileMutation } from '../../redux/api/userApiSlice'
import { toast } from 'react-toastify'
import { setCredentials } from '../../redux/features/auth/authSlice'

const Profile = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { userInfo } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation()

    useEffect(() => {
        if (userInfo) {
            setUsername(userInfo.username)
            setEmail(userInfo.email)
        }
    }, [userInfo.email, userInfo.username])

    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error("Confirm Password doesn't match")
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    username,
                    email,
                    password
                }).unwrap();
                dispatch(setCredentials({ ...res }))
                toast.success('Profile update success')
            } catch (error) {
                toast.error(error)
            }
        }
    }

    return (
        <div className='container mx-auto p-4 mt-[10rem]'>
            <div className='flex justify-center align-center md:flex md:space-x-4'>
                <div className='md:w-1/3'>
                    <h2 className='text-2xl font-semibold mb-4'>Update Profile</h2>

                    <form onSubmit={submitHandler}>
                        <div className='mb-4'>
                            <label className='block text-white mb-2'>Name</label>
                            <input type='text' className='form-input p-4 rounded-sm w-full'
                                placeholder='Enter name'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-white mb-2'>Email</label>
                            <input type='email' className='form-input p-4 rounded-sm w-full'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-white mb-2'>Password</label>
                            <input type='password' className='form-input p-4 rounded-sm w-full'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-white mb-2'>Confirm Password</label>
                            <input type='password' className='form-input p-4 rounded-sm w-full'
                                placeholder='Confirm Password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button type='submit' className='bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600'>Update</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Profile