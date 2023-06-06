from rest_framework import permissions

class IsAuthenticated(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user_id is not None

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.is_admin