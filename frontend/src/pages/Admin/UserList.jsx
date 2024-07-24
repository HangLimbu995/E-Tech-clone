import React, { useEffect, useState } from 'react'
import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from '../../redux/api/userApiSlice'
import Loader from '../../components/Loader'
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'

const UserList = () => {

    const { data: users, refetch, isLoading, error } = useGetUsersQuery()
    const [deleteUser] = useDeleteUserMutation()
    const [updateUser] = useUpdateUserMutation()

    const [editableUserId, setEditableUserId] = useState(null)
    const [editableUsername, setEditableUsername] = useState('')
    const [editableUserEmail, setEditableUserEmail] = useState('')

    useEffect(() => {
        refetch()
    }, [refetch])

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure to delete user data ?')) {
            try {
                await deleteUser(id)
                toast.info('User data deleted')
                refetch()
            } catch (error) {
                toast.error(error.data.message || error.message)
            }
        }
    }

    const toogleEdit = async (id, username, email) => {
        setEditableUserId(id)
        setEditableUsername(username)
        setEditableUserEmail(email)
    }

    const updateHandler = async (id) => {
        console.log('id is', id)
        try {
            await updateUser({
                userId: id,
                username: editableUsername,
                email: editableUserEmail
            }).unwrap()
            toast.success('User data updated')
            setEditableUserId(null)
            refetch()
        } catch (error) {
            toast.error(error.data.message || error.message)
        }
    }

    return (
        <div className='p-4' >
            <h1 className='text-2xl font-semibold mb-4'>Users</h1>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <div>
                    {error.data.message || error.message}
                </div>
            ) : (
                <div className='flex flex-col md:flex-row'>
                    {/* <AdminMenu /> */}
                    <table className='w-full md:w-4/5 mx-auto'>
                        <thead>
                            <tr>
                                <th className='px-4 py-2 text-left'>ID</th>
                                <th className='px-4 py-2 text-left'>NAME</th>
                                <th className='px-4 py-2 text-left'>EMAIL</th>
                                <th className='px-4 py-2 text-left'>ADMIN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((user) => (
                                <tr key={user._id} >
                                    <td className='px-4 py-2'>{user._id}</td>
                                    <td className='px-4 py-2'>
                                        {editableUserId === user._id ? (
                                            <div className='flex items-center'>
                                                <input type='text'
                                                    value={editableUsername}
                                                    onChange={e => setEditableUsername(e.target.value)}
                                                    className='w-full p-2 border rounded-lg'
                                                />
                                                <button className='ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg'
                                                    onClick={() => updateHandler(user._id)}
                                                >
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className='px-4 py-2'>{user.username}{' '}
                                                <button onClick={() => toogleEdit(user._id, user.username, user.email)}
                                                >
                                                    {!user.isAdmin && (
                                                        <FaEdit className='ml-[1rem]' />
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className='px-4 py-2'>
                                        {editableUserId === user._id ? (
                                            <div className='flex items-center'>
                                                <input type='text'
                                                    value={editableUserEmail}
                                                    onChange={e => setEditableUserEmail(e.target.value)}
                                                    className='w-full p-2 border rounded-lg' />
                                                <button className='ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg'
                                                    onClick={() => updateHandler(user._id)}>
                                                    <FaCheck />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className='px-4 py-2'>{user.email}{' '}
                                                <button onClick={() => toogleEdit(user._id, user.username, user.email)}>
                                                    {!user.isAdmin && (
                                                        <FaEdit className='ml-[1rem]' />
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className='px-4 py-2'>
                                        {user.isAdmin ? (
                                            <FaTimes style={{ color: 'green' }} />
                                        ) : (
                                            <FaTrash style={{ color: 'red' }} />
                                        )}
                                    </td>
                                    <td >
                                        {!user.isAdmin && (
                                            <button onClick={() => deleteHandler(user._id)} className='py-2 px-4 bg-red-600 hover:bg-red-700 rounded'>
                                                <FaTrash />
                                            </button>
                                        )}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default UserList