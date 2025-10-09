from typing import List, Dict
from ecommerce_api.models.product_model import Product
from ecommerce_api.repositories.product_interface import IProductRepository
from ..common.exceptions import InvalidData, NotFound

class ProductService:
    def __init__(self, repository: IProductRepository):
        self.repository = repository

    def get_all_products(self) -> List[Product]:
        return self.repository.get_all()

    def get_product_by_id(self, product_id: int) -> Product:
        product = self.repository.get_by_id(product_id)
        if not product:
            raise NotFound("Product not found")
        return product

    def create_product(self, data: Dict) -> Product:
        if not data or "name" not in data or "price" not in data:
            raise InvalidData("Invalid product data")
        
        new_product = Product(
            name=data['name'],
            description=data.get('description', ''),
            price=data['price']
        )
        return self.repository.add(new_product)

    def update_product(self, product_id: int, data: Dict) -> Product:
        product = self.get_product_by_id(product_id)
        
        if not data or "name" not in data or "price" not in data:
            raise InvalidData("Invalid product data for update")
        
        product.name = data['name']
        product.description = data.get('description', product.description)
        product.price = data['price']
        return self.repository.update(product)

    def delete_product(self, product_id: int) -> None:
        product = self.get_product_by_id(product_id)
        self.repository.delete(product)