import { Link } from 'react-router-dom'
import moment from 'moment'
import { useAllProductsQuery } from '../../redux/api/productApiSlice'
import AdminMenu from './AdminMenu'
import { useEffect } from 'react'

const AllProducts = () => {

    const { data: products, isLoading, isError, refetch } = useAllProductsQuery()

    useEffect(() => {
        refetch()
    },[refetch])
    
    if (isLoading) {
        return <div>isLoading</div>
    }

    if (isError) {
        return <div> Error loading products</div>
    }

    return (
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-col lg:flex-row'>
                <div className='w-full  p-3'>
                    <div className='text-xl font-bold h-12 mb-4'>
                        All Products ({products.length})
                    </div>

                    <div className='space-y-4'>
                        {products.map((product) => (
                            <div key={product._id} className='flex flex-col sm:flex-row bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg border border-gray-700'>
                                <img src={product.image} alt={product.name} className='w-full sm:w-48 h-48 object-cover' />
                                <div className='flex-grow p-4 flex flex-col justify-between'>
                                    <div>
                                        <h3 className='text-lg font-semibold text-white mb-2'>{product.name}</h3>
                                        <p className='text-gray-300 text-sm mb-2 line-clamp-2'>{product.description}</p>
                                        <p className='text-xs text-gray-400'>
                                            {moment(product.createdAt).format("MMM DD, YYYY")}
                                        </p>
                                    </div>
                                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 sm:mt-0'>
                                        <span className='text-xl font-bold text-pink-500 mb-2 sm:mb-0'>${product.price.toFixed(2)}</span>
                                        <Link 
                                            to={`/admin/product/update/${product._id}`} 
                                            className='w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-pink-600 rounded hover:bg-pink-700 transition-colors duration-300 text-center'
                                        >
                                            Update
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full lg:w-1/4 p-3 mt-2">
                    <AdminMenu />
                </div>
            </div>
        </div>
    )
}

export default AllProducts
