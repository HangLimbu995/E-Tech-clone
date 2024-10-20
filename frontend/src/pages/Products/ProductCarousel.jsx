import { useGetTopProductsQuery } from "../../redux/api/productApiSlice"
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import moment from 'moment'
import {
    FaBox, FaClock, FaShoppingCart, FaStar, FaStore
} from 'react-icons/fa'

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useGetTopProductsQuery()

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
    }

    return (
        <div className="mb-4 xl:block lg:block md:block">
            {isLoading ? null : error ? (
                <div>
                    {error?.data?.message || error.message}
                </div>
            ) : <Slider {...settings} className='xl:w-[50rem] lg:w-[45rem] md:w-[50rem] sm:w-[40rem] sm:block' >
                {
                    products.map(({ image, _id, name, price, description, brand, createdAt, numReviews, rating, quantity, countInStock }) => (
                        <div key={_id} className="p-4">
                            <img src={image} alt={name} className="w-full rounded-lg object-cover h-[30rem] md:h-[25rem] sm:h-[20rem]" />

                            <div className='flex flex-col md:flex-row justify-between mt-4 gap-4'>
                                <div className='one w-full md:w-1/2'>
                                    <h2 className="text-xl font-semibold">{name}</h2>
                                    <p className='text-pink-700 font-semibold text-2xl mt-2'>$ {price}</p>
                                    <p className='mt-2'>
                                        {description.substring(0, 170)}...
                                    </p>
                                </div>

                                <div className='flex flex-col sm:flex-row justify-between w-full md:w-1/2 mt-4 md:mt-0'>
                                    <div className='one mb-4 sm:mb-0'>
                                        <h1 className='flex items-center mb-2'>
                                            <FaStore className='mr-2 text-pink-700' /> Brand: {brand}
                                        </h1>
                                        <h1 className='flex items-center mb-2'>
                                            <FaClock className='mr-2 text-pink-700' /> Added: {moment(createdAt).fromNow()}
                                        </h1>
                                        <h1 className='flex items-center mb-2'>
                                            <FaStar className='mr-2 text-pink-700' /> Reviews: {numReviews}
                                        </h1>
                                    </div>
                                    <div className='two'>
                                        <h1 className='flex items-center mb-2'>
                                            <FaStar className='mr-2 text-pink-700' /> Ratings: {Math.round(rating)}
                                        </h1>
                                        <h1 className='flex items-center mb-2'>
                                            <FaShoppingCart className='mr-2 text-pink-700' /> Quantity: {quantity}
                                        </h1>
                                        <h1 className='flex items-center mb-2'>
                                            <FaBox className='mr-2 text-pink-700' /> In Stock: {countInStock}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </Slider>
            }

        </div>
    )
}

export default ProductCarousel
