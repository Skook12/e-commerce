class ApplicationException(Exception):
    """Base exception class for the application."""
    

class NotFound(ApplicationException):
    """Raised when an item is not found in the database."""
    

class InvalidData(ApplicationException):
    """Raised when incoming data is invalid."""
    