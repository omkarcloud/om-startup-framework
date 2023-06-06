import os
from django.http import HttpResponse, Http404

from backend.models import *
from backend.utils.model_utils import save_action


def relative_path(path, goback=0):
    levels = [".."] * (goback + -1)
    return os.path.abspath(os.path.join(os.getcwd(), *levels, path))


def download_file(request, filename):
    file_path = os.path.join(relative_path('downloads'), filename)
    has_file = os.path.exists(file_path)
    if has_file:
        with open(file_path, 'rb') as fh:
            response = HttpResponse(fh.read(), content_type="application/octet-stream")
            response['Content-Disposition'] = 'attachment; filename=' + os.path.basename(file_path)

            save_action(request, UserAction.file_download, {"filename": filename})

            return response
    raise Http404