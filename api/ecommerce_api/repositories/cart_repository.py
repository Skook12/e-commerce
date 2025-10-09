from typing import List, Optional
from ecommerce_api.models.cart_model import CartItem
from ecommerce_api.repositories.cart_interface import ICartRepository
from ..extensions import db

class SQLAlchemyCartRepository(ICartRepository):
    def find_by_user_and_product(self, user_id: int, product_id: int) -> Optional[CartItem]:
        return CartItem.query.filter_by(user_id=user_id, product_id=product_id).first()

    def get_all_by_user(self, user_id: int) -> List[CartItem]:
        return CartItem.query.filter_by(user_id=user_id).all()

    def add(self, cart_item: CartItem) -> CartItem:
        db.session.add(cart_item)
        db.session.commit()
        return cart_item

    def update(self, cart_item: CartItem) -> CartItem:
        db.session.commit()
        return cart_item

    def delete(self, cart_item: CartItem) -> None:
        db.session.delete(cart_item)
        db.session.commit()

    def clear_for_user(self, user_id: int) -> None:
        CartItem.query.filter_by(user_id=user_id).delete()
        db.session.commit()