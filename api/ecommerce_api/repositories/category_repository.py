from typing import List, Optional
from ecommerce_api.models.category_model import Category
from ecommerce_api.repositories.category_interface import ICategoryRepository
from ..extensions import db



class SQLAlchemyCategoryRepository(ICategoryRepository):
    def get_all(self) -> List[Category]:
        return Category.query.all()

    def get_by_id(self, category_id: int) -> Optional[Category]:
        return Category.query.get(category_id)

    def add(self, category: Category) -> Category:
        db.session.add(category)
        db.session.commit()
        return category

    def update(self, category: Category) -> Category:
        db.session.commit()
        return category

    def delete(self, category: Category) -> None:
        db.session.delete(category)
        db.session.commit()