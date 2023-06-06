import math
from urllib import parse
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


def remove_localhost_prefix(link):
    if link is None:
        return None
    result = parse.urlsplit(link)
    return result.path + '?' + result.query


class DefaultPageNumberPagination(PageNumberPagination):
    page_size = 10000

    def get_paginated_response(self, data):
        total_pages = math.ceil(self.page.paginator.count / self.page_size)
        result = {
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'count': self.page.paginator.count,
            "total_pages": 1 if total_pages == 0 else total_pages ,
            'results': data,
        }
        return Response(result)

    def get_previous_link(self):
        link = super(DefaultPageNumberPagination, self).get_previous_link()
        return remove_localhost_prefix(link)

    def get_next_link(self):
        link = super(DefaultPageNumberPagination, self).get_next_link()
        return remove_localhost_prefix(link)
