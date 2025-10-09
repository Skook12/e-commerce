from typing import Optional
from ecommerce_api.models.user_model import User
from ecommerce_api.repositories.user_interface import IUserRepository

class SQLAlchemyUserRepository(IUserRepository):
    def find_by_username(self, username: str) -> Optional[User]:
        return User.query.filter_by(username=username).first()

    def find_by_id(self, user_id: int) -> Optional[User]:
        return User.query.get(user_id)