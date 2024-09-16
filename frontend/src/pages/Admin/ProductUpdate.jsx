import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import {
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetProductByIdQuery,
    useUplaodProductImageMutation,
} from '../../redux/api/productApiSlice'
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice"
import { toast } from 'react-toastify'
import AdminMenu from "./AdminMenu"

const ProductUpdate = () => {
    const params = useParams()

    const { data: productData, refetch } = useGetProductByIdQuery(params._id)

    const [image, setImage] = useState(productData?.image || "")
    const [name, setName] = useState(productData?.name || "")
    const [description, setDescription] = useState(productData?.description || "")
    const [price, setPrice] = useState(productData?.price || "")
    const [category, setCategory] = useState(productData?.category || "")
    const [quantity, setQuantity] = useState(productData?.quantity || "")
    const [brand, setBrand] = useState(productData?.brand || "")
    const [stock, setStock] = useState(productData?.countInStock || "")


    const navigate = useNavigate()

    const { data: categories = [] } = useFetchCategoriesQuery()
    const [uploadProductImage] = useUplaodProductImageMutation()
    const [updateProduct] = useUpdateProductMutation()
    const [deleteProduct] = useDeleteProductMutation()

    useEffect(() => {
        if (productData && productData._id) {
            setName(productData.name)
            setDescription(productData.description)
            setPrice(productData.price)
            setCategory(productData.category)
            setQuantity(productData.quantity)
            setBrand(productData.brand)
            setStock(productData.countInStock)
            setImage(productData.image)
        }
    }, [productData])

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0])
        try {
            const res = await uploadProductImage(formData).unwrap()
            toast.success('Image uploaded successfully')
            setImage(res.image)

        } catch (error) {
            toast.error('Image upload failed.')
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const formData = new FormData()

            formData.append('image', image)
            formData.append('name', name)
            formData.append('description', description)
            formData.append('price', price)
            formData.append('category', category)
            formData.append('quantity', quantity)
            formData.append('brand', brand)
            formData.append('countInStock', stock)

            const { data } = await updateProduct({ productId: params._id, formData })

            if (data.error) {
                return toast.error(data.error)
            } else {
                toast.success(`Product successfull  updated`)
                navigate('/admin/allproductslist')
                refetch()
            }

        } catch (error) {
            console.log(error)
            return toast.error('Product update failed, Try again !')
        }
    }

    const handleDelete = async () => {
        try {
            let answer = window.confirm('Are you sure you want to delete this product ?')

            if (!answer) return;

            const { data } = await deleteProduct(params._id)
            toast.success(`${data.name} is deleted`)
            navigate('/admin/allproductslist')
            refetch()
        } catch (error) {
            console.error(error)
            toast.error('Delete failed. Try again.')
        }
    }

    return (
        <div className="container lg:ml-[9rem] ml-0">
            <div className="flex flex-col md:flex-row">
                <AdminMenu />
                <div className="md:w-3/4 p-3">
                    <h2 className="text-2xl font-semibold mb-4">Create Product</h2>

                    {image && (
                        <div className="text-center mb-4">
                            <img src={image}
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
                            className='py-3 px-6 mt-4 rounded-lg text-lg font-bold bg-green-600 hover:bg-green-700 transition duration-300 text-white mr-4'>
                            Update
                        </button>
                        <button
                            onClick={handleDelete}
                            className='py-3 px-6 mt-4 rounded-lg text-lg font-bold bg-pink-600 hover:bg-pink-700 transition duration-300 text-white'>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate
