import { useState } from "react"
import { useNavigate } from "react-router"
import {
    useCreateProductMutation,
    useUplaodProductImageMutation,
} from '../../redux/api/productApiSlice'
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice"
import { toast } from "react-toastify"
import AdminMenu from "./AdminMenu"

const ProductList = () => {

    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState('')
    const [brand, setBrand] = useState('')
    const [stock, setStock] = useState(0)
    const [imageUrl, setImageUrl] = useState(null)

    const navigate = useNavigate()

    const [uploadProductImage] = useUplaodProductImageMutation()
    const [createProduct] = useCreateProductMutation()
    const { data: categories } = useFetchCategoriesQuery()

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0])

        try {
            const res = await uploadProductImage(formData).unwrap()
            toast.success(res.message)
            setImage(res.image)
            setImageUrl(res.image)
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const productData = new FormData()

            productData.append('image', image)
            productData.append('name', name)
            productData.append('description', description)
            productData.append('price', price)
            productData.append('category', category)
            productData.append('quantity', quantity)
            productData.append('brand', brand)
            productData.append('countInStock', stock)

            const { data } = await createProduct(productData)

            if (data.error) {
                return toast.error('Product creation failed, Try again !')
            } else {
                toast.success(`${data.name} is create`)
                navigate('/')
            }

        } catch (error) {
            console.log(error)
            return toast.error('Product creation failed, Try again !')
        }
    }

    return (
        <div className="container lg:ml-[9rem] ml-0">
            <div className="flex flex-col md:flex-row">
                <AdminMenu />
                <div className="md:w-3/4 p-3">
                    <h2 className="text-2xl font-semibold mb-4">Create Product</h2>

                    {imageUrl && (
                        <div className="text-center mb-4">
                            <img src={imageUrl}
                                alt='Product'
                                className="mx-auto max-h-[200px] object-contain"
                            />
                            
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="border border-gray-300 text-gray-300 px-4 py-6 block w-full text-center rounded-lg cursor-pointer font-semibold hover:bg-gray-700 transition duration-300">
                            {image ? image.name : 'Upload Image'}
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={uploadFileHandler}
                                className={!image ? "hidden" : 'text-white'}
                            />
                        </label>
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-wrap -mx-2">
                            <div className="w-full md:w-1/2 px-2 mb-4">
                                <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="p-3 w-full border border-gray-300 rounded-lg bg-[#101011] text-white focus:outline-none focus:border-pink-500"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter product name"
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-2 mb-4">
                                <label htmlFor="price" className="block mb-2 font-medium">Price</label>
                                <input
                                    type="text"
                                    id="price"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    className="p-3 w-full border border-gray-300 rounded-lg bg-[#101011] text-white focus:outline-none focus:border-pink-500"
                                    value={price}
                                    onChange={(e) => {
                                        const re = /^[0-9\b]+$/;
                                        if (e.target.value === '' || re.test(e.target.value)) {
                                            setPrice(e.target.value);
                                        }
                                    }}
                                    placeholder="Enter price"
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-2">
                            <div className="w-full md:w-1/2 px-2 mb-4">
                                <label htmlFor="quantity" className="block mb-2 font-medium">Quantity</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    className="p-3 w-full border border-gray-300 rounded-lg bg-[#101011] text-white focus:outline-none focus:border-pink-500"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    placeholder="Enter quantity"
                                    min="0"
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-2 mb-4">
                                <label htmlFor="brand" className="block mb-2 font-medium">Brand</label>
                                <input
                                    type="text"
                                    id="brand"
                                    className="p-3 w-full border border-gray-300 rounded-lg bg-[#101011] text-white focus:outline-none focus:border-pink-500"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    placeholder="Enter brand name"
                                />
                            </div>
                        </div>

                        <div className="w-full mb-4">
                            <label htmlFor="description" className="block mb-2 font-medium">Description</label>
                            <textarea
                                id="description"
                                className="p-3 w-full border border-gray-300 rounded-lg bg-[#101011] text-white resize-vertical focus:outline-none focus:border-pink-500"
                                rows="4"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter product description"
                            ></textarea>
                        </div>

                        <div className="flex flex-wrap -mx-2">
                            <div className="w-full md:w-1/2 px-2 mb-4">
                                <label htmlFor='stock' className="block mb-2 font-medium">Count In Stock</label>
                                <input
                                    type='number'
                                    id='stock'
                                    className="p-3 w-full border border-gray-300 rounded-lg bg-[#101011] text-white focus:outline-none focus:border-pink-500"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    placeholder="Enter stock count"
                                    min="0"
                                />
                            </div>

                            <div className="w-full md:w-1/2 px-2 mb-4">
                                <label htmlFor='category' className="block mb-2 font-medium">Category</label>
                                <select
                                    id='category'
                                    className="p-3 w-full border border-gray-300 rounded-lg bg-[#101011] text-white focus:outline-none focus:border-pink-500"
                                    onChange={(e) => setCategory(e.target.value)}
                                    value={category}
                                >
                                    <option value="" disabled>Choose Category</option>
                                    {categories?.map((c) => (
                                        <option key={c._id} value={c._id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className='py-3 px-6 mt-4 rounded-lg text-lg font-bold bg-pink-600 hover:bg-pink-700 transition duration-300 text-white'>
                            Create Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList
