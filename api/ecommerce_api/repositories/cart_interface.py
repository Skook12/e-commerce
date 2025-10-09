from abc import ABC, abstractmethod
from typing import List, Optional
from ..models.cart_model import CartItem

class ICartRepository(ABC):
    @abstractmethod
    def find_by_user_and_product(self, user_id: int, product_id: int) -> Optional[CartItem]:
        pass

    @abstractmethod
    def get_all_by_user(self, user_id: int) -> List[CartItem]:
        pass
    
    @abstractmethod
    def add(self, cart_item: CartItem) -> CartItem:
        pass
    
    @abstractmethod
    def update(self, cart_item: CartItem) -> CartItem:
        pass

    @abstractmethod
    def delete(self, cart_item: CartItem) -> None:
        pass
    
    @abstractmethod
    def clear_for_user(self, user_id: int) -> None:
        pass