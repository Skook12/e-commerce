from typing import List, Dict
from ecommerce_api.models.cart_model import CartItem
from ecommerce_api.repositories.cart_interface import ICartRepository
from ecommerce_api.repositories.product_interface import IProductRepository
from ..common.exceptions import NotFound, InvalidData

class CartService:
    def __init__(self, cart_repo: ICartRepository, product_repo: IProductRepository):
        self.cart_repo = cart_repo
        self.product_repo = product_repo

    def get_cart_contents(self, user_id: int) -> List[Dict]:
        cart_items = self.cart_repo.get_all_by_user(user_id)
        cart_details = []
        for item in cart_items:
            product = self.product_repo.get_by_id(item.product_id)
            if product:
                cart_details.append({
                    "id": item.id,
                    "quantity": item.quantity,
                    "product": {
                        "id": product.id,
                        "name": product.name,
                        "price": product.price,
                        "image": product.image
                    }
                })
        return cart_details

    def add_to_cart(self, user_id: int, product_id: int) -> None:
        product = self.product_repo.get_by_id(product_id)
        if not product:
            raise NotFound("Product not found")
        
        cart_item = self.cart_repo.find_by_user_and_product(user_id, product_id)
        if cart_item:
            cart_item.quantity += 1
            self.cart_repo.update(cart_item)
        else:
            new_item = CartItem(user_id=user_id, product_id=product_id, quantity=1)
            self.cart_repo.add(new_item)
    
    def remove_item_from_cart(self, user_id: int, product_id: int) -> None:
        product = self.product_repo.get_by_id(product_id)
        if not product:
            raise NotFound("Product not found")
        
        cart_item = self.cart_repo.find_by_user_and_product(user_id, product_id)
        if cart_item and cart_item.quantity > 1:
            cart_item.quantity -= 1
            self.cart_repo.update(cart_item)
        else:
            self.cart_repo.delete(cart_item)

    def remove_from_cart(self, user_id: int, product_id: int) -> None:
        cart_item = self.cart_repo.find_by_user_and_product(user_id, product_id)
        if not cart_item:
            raise NotFound("Item not found in cart")
        self.cart_repo.delete(cart_item)

    def checkout(self, user_id: int) -> None:
        items = self.cart_repo.get_all_by_user(user_id)
        if not items:
            raise InvalidData("Cart is empty")
        self.cart_repo.clear_for_user(user_id)