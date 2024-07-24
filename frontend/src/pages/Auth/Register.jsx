import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { useLogoutMutation, useRegisterMutation } from '../../redux/api/userApiSlice'
import { toast } from 'react-toastify'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { Link } from 'react-router-dom'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, { isLoading }] = useRegisterMutation()
    const { userInfo } = useSelector(state => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.info('Confirm Password do not match!')
        }
        try {
            const res = await register({ username, email, password }).unwrap()
            dispatch(setCredentials({ ...res }))
            toast.success('User registration successful')
            navigate(redirect)
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <section className='pl-[10rem] flex flex-wrap'>
            <div className='mr-[4rem] mt-[5rem]'>
                <h1 className='text-white text-2xl font-semibold mb-4'>Register</h1>

                <form onSubmit={submitHandler} className='container w-[40rem]'>
                    <div className='my-[2rem]'>
                        <label htmlFor='name' className='block text-sm font-medium text-white'>Name</label>
                        <input
                            type='text'
                            id='name'
                            placeholder='Enter name'
                            className='mt-1 p-2 border rounded w-full'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='my-[2rem]'>
                        <label htmlFor='email' className='block text-sm font-medium text-white'>Email</label>
                        <input
                            type='email'
                            id='email'
                            placeholder='Enter email'
                            className='mt-1 p-2 border rounded w-full'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='my-[2rem]'>
                        <label htmlFor='password' className='block text-sm font-medium text-white'>Password</label>
                        <input
                            type='password'
                            id='password'
                            placeholder='Enter password'
                            className='mt-1 p-2 border rounded w-full'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='my-[2rem]'>
                        <label htmlFor='confirmPassowrd' className='block text-sm font-medium text-white'>Confirm Password</label>
                        <input
                            type='password'
                            id='confirmPassowrd'
                            placeholder='Confirm Passowrd'
                            className='mt-1 p-2 border rounded w-full'
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button disabled={isLoading} type='submit' className='bg-pink-500 text-white px-4 rounded cursor-pointer my-[1rem]'>Register</button>
                </form>

                <div className='mt-4'>
                    <p className='text-white'>
                        Already have an account? {' '}
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}
                            className='text-pink-500 hover:underline'>Login</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Register