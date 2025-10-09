from abc import ABC, abstractmethod
from typing import Optional
from ..models.user_model import User

class IUserRepository(ABC):
    @abstractmethod
    def find_by_username(self, username: str) -> Optional[User]:
        pass

    @abstractmethod
    def find_by_id(self, user_id: int) -> Optional[User]:
        pass