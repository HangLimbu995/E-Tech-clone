import { useParams, useNavigate } from 'react-router'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../../redux/api/productApiSlice'
import Loader from '../../components/Loader'
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from 'react-icons/fa'
import moment from 'moment'
import HeartIcon from './HeartIcon'
import Ratings from './Ratings'
import ProductTabs from './ProductTabs'

const ProductDetails = () => {
    const { id: productId } = useParams()

    const navigate = useNavigate()

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId)

    const { userInfo } = useSelector(state => state.auth)

    const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation()

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            await createReview({
                productId,
                rating,
                comment,
            }).unwrap()
            setRating('')
            setComment('')
            refetch()
            toast.success('Review created successfully')
        } catch (error) {
            toast.error(error?.data || error.message)
        }
    }

    return (
        <>
            <div >
                <Link to='/'
                    className='text-whtie font-semibold hover:underline ml-[10rem]'
                >Go Back</Link>
            </div>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <div>{error?.data?.message || error.message}</div>
            ) : (
                <>
                    <div className='flex flex-wrap relative items-between mt-[2rem] ml-[10rem]'>
                        <div className="flex flex-1">
                            <img src={product.image}
                                alt={product.name}
                                className='absolute top-0 w-full xl:w-[50re] lg:w-[30rem] md:w-[30rem] sm:w-[20rem] max-h-[100vh] mr-[2rem] object-contain' />

                            <HeartIcon product={product} />
                        </div>

                        <div className='flex flex-1 flex-col justify-between'>
                            <h2 className='text-2xl font-semibold'>{product.name}</h2>
                            <p className='my-4 xl:w-[35rem] md:w-[30rem] text-[#B0B0B0]'>
                                {product.description}
                            </p>

                            <p className="text-5xl my-4 font-extrabold text-pink-700">$ {product.price}</p>

                            <div className='flex items-center justify-between w-[20rem]'>
                                <div className="one">
                                    <h1 className='flex items-center mb-6'>
                                        <FaStore className='mr-2 text-white' /> Brand:{" "}{product.brand}
                                    </h1>
                                    <h1 className='flex items-center mb-6'>
                                        <FaClock className='mr-2 text-white' /> Added:{" "}{moment(product.createdAt).fromNow()}
                                    </h1>
                                    <h1 className='flex items-center mb-6'>
                                        <FaStar className='mr-2 text-white' /> Reviews:{" "}{product.numReviews}
                                    </h1>
                                </div>
                                <div className="two">
                                    <h1 className='flex items-center mb-6'>
                                        <FaStar className='mr-2 text-white' /> Ratings:{" "}{rating}
                                    </h1>
                                    <h1 className='flex items-center mb-6'>
                                        <FaShoppingCart className='mr-2 text-white' /> Added:{" "}{product.quantity}
                                    </h1>
                                    <h1 className='flex items-center mb-6'>
                                        <FaBox className='mr-2 text-white' /> Reviews:{" "}{product.countInStock}
                                    </h1>
                                </div>
                            </div>

                            <div className='flex jsutify-between flex-wrap'>
                                <Ratings
                                    value={product.rating}
                                    text={`${product.numReviews} reviews`}
                                />

                                {product.countInStock > 0 && (
                                    <div className='ml-3'>
                                        <select value={qty}
                                            onChange={(e) => setQty(e.target.value)}
                                            className='p-2 w-[6rem] rounded-lg text-black'>
                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                            <div className='btn-container'>
                                <button
                                    // onClick={addToCartHandler}
                                    disabled={product.countInStock === 0}
                                    className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0">Add To Cart
                                </button>
                            </div>
                        </div>

                        <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
                            <ProductTabs
                                loadingProductReview={loadingProductReview}
                                userInfo={userInfo}
                                submitHandler={submitHandler}
                                rating={rating}
                                setRating={setRating}
                                comment={comment}
                                setComment={setComment}
                                product={product}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ProductDetails
