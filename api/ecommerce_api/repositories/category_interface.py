from abc import ABC, abstractmethod
from typing import List, Optional
from ecommerce_api.models.category_model import Category


class ICategoryRepository(ABC):
    @abstractmethod
    def get_all(self) -> List[Category]:
        pass

    @abstractmethod
    def get_by_id(self, category_id: int) -> Optional[Category]:
        pass

    @abstractmethod
    def add(self, category: Category) -> Category:
        pass

    @abstractmethod
    def update(self, category: Category) -> Category:
        pass

    @abstractmethod
    def delete(self, category: Category) -> None:
        pass