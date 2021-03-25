const Product = require('../models/product')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')

exports.getProductById = (req,res,next,id) => {
    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if(err){
            return res.status(400).json({
                error: 'Product Not Found!!'
            })
        }
        req.product = product;
        next();
    })
}

exports.createProduct = (req,res) =>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: 'Problem With image!!'
            })
        }
        //destructure the fields
        const {name, description,price, category, stock}  = fields;
        if(
            !name || !description ||!price || !category || !stock
        ){
            return res.status(400).json({
                error: 'Please include all the fields'
            })
        } 

        let product = new Product(fields)
        //handle file here

        if(file.photo){
            if(file.photo.size > 3000000)
            return res.stat(400).json({
                error: 'File Size Too Big!!'
            })
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        // console.log(product)

        //save to the DB
        product.save((err, product) =>{
            if(err){
                return res.status(400).json({
                    error: 'Saving tShirt Failed!!'
                })
            }
            res.json(product)
        })
    })
}

exports.getProduct = (req, res) =>{
    req.product.photo = undefined;
    return res.json(req.product)
}

//Middleware
exports.photo = (req,res,next) => {
    if(req.product.photo.data){
        res.set('Content-Type', req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
} 

exports.deleteProduct = (req,res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if(err) {
            return res.status(400).json({
                error: 'Failed to delete the Product!!'
            })
        }
        res.json({
            message: 'Deleted Product!!',
            deletedProduct
        })
    })
}

exports.updateProduct = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: 'Problem With image!!'
            })
        }
        //updation code
        let product = req.product;
        product = _.extend(product, fields)

        //handle file here

        if(file.photo){
            if(file.photo.size > 3000000)
            return res.stat(400).json({
                error: 'File Size Too Big!!'
            })
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        // console.log(product)

        //save to the DB
        product.save((err, product) =>{
            if(err){
                return res.status(400).json({
                    error: 'Updating tShirt Failed!!'
                })
            }
            res.json(product)
        })
    })
}

//listing product

exports.getAllProducts = (req,res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'

    Product.find()
    .select('-photo')   //negative sign means remove photo
    .populate('category')
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
        if(err){
            return res.status(400).json({
                error: 'No Product Found!!'
            })
        }
        res.json(products)
    })
}

exports.updateStock = (req,res, next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: {_id: prod._id},
                update: {$inc: {stock: -prod.count , sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if(err){
            res.status(400).json({
                error: 'Bulk operations Failed!!'
            })
        }
        next();
    })
}

exports.getAllUniqueCategories = (req,res,next) => {
    Product.distinct('category', {}, (err,categories) => {
        if(err){
            return res.status(400).json({
                error: 'No category found!!'
            })
        }
        res.json(category)
    })
}