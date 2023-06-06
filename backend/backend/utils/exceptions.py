from rest_framework import exceptions
from rest_framework import status

vague_message = 'Something went wrong, please try again later.'


class VagueException(exceptions.ValidationError):
    default_detail = (vague_message)


class CustomException(exceptions.ValidationError):
    message = None

    def __init__(self, message=vague_message, status_code=status.HTTP_400_BAD_REQUEST):
        self.message = message
        super().__init__(None, None)
        self.status_code = status_code

