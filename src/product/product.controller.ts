import { Controller, Get, Post, Res, HttpStatus, Body, Param, Put, Query, NotFoundException, Delete } from '@nestjs/common';
import { Response } from 'express';
import { CreateProductDTO } from './dto/product.dto'
import { ProductService } from './product.service'

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) { }

    @Post('/create')
    async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
        const product = await this.productService.createProduct(createProductDTO)
        res.status(HttpStatus.OK).json({
            message: 'received',
            product
        })
    }

    @Get()
    async getAll(@Res() res) {
        const product = await this.productService.getProducts()
        return res.status(HttpStatus.OK).json({
            message: "All our products:",
            product
        })
    }

    @Get("/:productId")
    async getProduct(@Res() res: Response, @Param("productId") productId: string) {
        const product = await this.productService.getProduct(productId)
        if (!product) {
            throw new NotFoundException('Product does not exists')
        }
        return res.status(HttpStatus.OK).json({
            message: "We found the product!",
            product
        })
    }

    @Put("/update")
    async editProduct(@Res() res: Response, @Body() createProductDTO: CreateProductDTO, @Query('productID') productId: string) {
        const updatedProduct = await this.productService.updateProduct(productId, createProductDTO)
        if (!updatedProduct) {
            throw new NotFoundException('Product does not exists')
        }
        return res.status(HttpStatus.OK).json({
            message: 'Product updated successfully',
            updatedProduct
        })
    }

    @Delete("/delete")
    async deleteProduct(@Res() res: Response, @Query('id') id: string) {
        const deleteProduct = await this.productService.removeProduct(id)
        if (!deleteProduct) {
            throw new NotFoundException('Product does not exists')
        }
        return res.status(HttpStatus.OK).json({
            message: 'Product successfully removed',
            deleteProduct
        })
    }

}
