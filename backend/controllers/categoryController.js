
import Category from '../models/categoryModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'

const createCatagory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        if (!name.trim()) {
            return res.json({ error: 'Name is required' })
        }

        const existingCategory = await Category.findOne({ name })

        if (existingCategory) {
            return res.json({ error: "Already exists" })
        }

        const category = await new Category({ name }).save()
        res.json(category)
    } catch (error) {
        console.error(error)
        return res.status(400).json(error)
    }
})

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const { categoryId } = req.params;

        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        category.name = name;
        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

const removeCategory = asyncHandler(async (req, res) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json({ message: 'Category removed successfully', category });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

const listCategory = asyncHandler(async(req,res) => {
    try {
        const categories = await Category.find({})

        if(!categories) {
            res.status(404).json({error:'No categories found'})
        }

        res.status(200).json(categories)
        
    } catch (error) {
        console.error(error)
        res.status(400).json(error.data.message || error.message)
    }
})

const getCategory = asyncHandler(async(req,res) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json( category );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
})

export { createCatagory, updateCategory, removeCategory,listCategory,getCategory }