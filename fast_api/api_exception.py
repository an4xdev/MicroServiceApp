class ApiException(Exception):
    def __init__(self, status_code: int, message: str):
        self.status_code = status_code
        self.message = message