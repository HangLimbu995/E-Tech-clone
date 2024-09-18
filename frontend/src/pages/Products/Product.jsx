import React from 'react'
import { Link } from 'react-router-dom'
import HeartIcon from './HeartIcon'

const Product = ({ product }) => {
    return (
        <div className="w-64 bg-gray-800 shadow-sm rounded-md overflow-hidden m-2 transition-transform duration-300 hover:shadow-lg hover:scale-105">
            <div className='relative'>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                />
                <HeartIcon product={product} />
            </div>
            <Link to={`/product/${product._id}`} className="block">
                <div className="p-3">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-200 truncate flex-1">{product.name}</h3>
                        <p className="text-lg font-semibold text-pink-500 ml-2">${product.price.toFixed(2)}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Product
