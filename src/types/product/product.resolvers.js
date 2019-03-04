import { Product } from './product.model'
import { User, roles } from '../user/user.model'
import { AuthenticationError } from 'apollo-server'
import mongoose from 'mongoose'

const productsTypeMatcher = {
    GAMING_PC: 'GamingPc',
    BIKE: 'Bike',
    DRONE: 'Drone'
}

const products = () => {
    return Product.find()
}

const product = (_, args) => {
    return Product.findById(args.id)
}

const newProduct = (_, args, ctx) => {
    // use this fake ID for createdBy for now until we talk auth
    const createdBy = mongoose.Types.ObjectId()
    return Product.create({...args.input, createdBy })
}

const updateProduct = (_, args, ctx) => {
    return Product.findByIdAndUpdate(args.id, args.input, { new: 'true' })
}

const removeProduct = (_, args) => {
    return Product.findByIdAndRemove(args.id);
}

export default {
    Query: { products, product },
    Mutation: { newProduct, updateProduct, removeProduct },
    Product: {
        __resolveType(product) {},
        createdBy(product) {
            return User.findById(product.createdBy)
        }
    }
}