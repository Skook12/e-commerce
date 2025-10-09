from typing import List, Optional
from ecommerce_api.repositories.product_interface import IProductRepository
from ..extensions import db
from ..models.product_model import Product


class SQLAlchemyProductRepository(IProductRepository):
    def get_all(self) -> List[Product]:
        return Product.query.all()

    def get_by_id(self, product_id: int) -> Optional[Product]:
        return Product.query.get(product_id)

    def add(self, product: Product) -> Product:
        db.session.add(product)
        db.session.commit()
        return product

    def update(self, product: Product) -> Product:
        db.session.commit()
        return product

    def delete(self, product: Product) -> None:
        db.session.delete(product)
        db.session.commit()