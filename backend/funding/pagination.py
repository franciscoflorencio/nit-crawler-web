from rest_framework.pagination import PageNumberPagination


class LargeResultsSetPagination(PageNumberPagination):
    page_size = 10  # Number of items per page
    page_size_query_param = (
        "page_size"  # Optional: Allow clients to override the page size
    )
    max_page_size = 100  # Maximum page size allowed

