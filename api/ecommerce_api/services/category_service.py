from typing import List, Dict
from ecommerce_api.models.category_model import Category
from ecommerce_api.repositories.category_interface import ICategoryRepository
from ..common.exceptions import InvalidData, NotFound

class CategoryService:
    def __init__(self, repository: ICategoryRepository):
        self.repository = repository

    def get_all_categories(self) -> List[Category]:
        return self.repository.get_all()
    
    def get_category_by_id(self, product_id: int) -> Category:
        product = self.repository.get_by_id(product_id)
        if not product:
            raise NotFound("Category not found")
        return product

    def create_category(self, data: Dict) -> Category:
        if not data or "name" not in data:
            raise InvalidData("Invalid category data")
        
        new_category = Category(
            name=data['name'],
        )
        return self.repository.add(new_category)

    def update_category(self, product_id: int, data: Dict) -> Category:
        product = self.get_category_by_id(product_id)
        
        if not data or "name" not in data:
            raise InvalidData("Invalid category data for update")
        
        product.name = data['name']
        return self.repository.update(product)

    def delete_category(self, product_id: int) -> None:
        product = self.get_category_by_id(product_id)
        self.repository.delete(product)