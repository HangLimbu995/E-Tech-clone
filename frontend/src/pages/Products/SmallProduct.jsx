import React from 'react'
import { Link } from 'react-router-dom'
import HeartIcon from './HeartIcon'

const SmallProduct = ({ product }) => {

    return (
        <div className="w-full sm:w-64 md:w-72 lg:w-80 m-2 p-4 bg-gray-800 shadow-md rounded-lg transition-transform duration-300 hover:scale-105">
            <div className="relative overflow-hidden rounded-t-lg">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <HeartIcon product={product} /> 
            </div>

            <div className="p-4">
                <Link to={`/product/${product._id}`} className="block">
                    <h2 className="text-lg font-semibold text-gray-200 mb-2 truncate hover:text-blue-400 transition-colors duration-300">
                        {product.name}
                    </h2>
                    <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-green-400">
                            ${product.price.toFixed(2)}
                        </span>
                        <span className="bg-blue-900 text-blue-200 text-xs font-medium px-2.5 py-1 rounded-full">
                            View Details
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default SmallProduct
