from ecommerce_api.models.user_model import User
from ecommerce_api.repositories.user_interface import IUserRepository
from ..common.exceptions import InvalidData

class AuthService:
    def __init__(self, user_repo: IUserRepository):
        self.user_repo = user_repo

    def login(self, username: str, password: str) -> User:
        user = self.user_repo.find_by_username(username)
        if not user or user.password != password:
            raise InvalidData("Invalid username or password")
        
        return user