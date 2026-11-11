"""Preview the site locally, the way GitHub Pages serves it.

Same as `python3 -m http.server`, except that:
  - addresses without .html work, e.g. /publication opens publication.html
  - a missing page shows our own 404.html instead of Python's plain error page

Run it from this folder:  python3 serve.py        (then open http://localhost:8000)
Pick another port with:   python3 serve.py 8080
"""
import http.server
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
NOT_FOUND = ROOT / "404.html"


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def translate_path(self, path):
        # Like GitHub Pages, let /publication open publication.html
        real = super().translate_path(path)
        if not Path(real).exists() and Path(real + ".html").is_file():
            return real + ".html"
        return real

    def send_error(self, code, message=None, explain=None):
        # For a missing page, send our 404.html (with the proper 404 status) like GitHub Pages does
        if code == 404 and NOT_FOUND.exists():
            body = NOT_FOUND.read_bytes()
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            if self.command != "HEAD":
                self.wfile.write(body)
            return
        super().send_error(code, message, explain)


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    print(f"Serving on http://localhost:{port}  (Ctrl+C to stop)")
    http.server.ThreadingHTTPServer(("", port), Handler).serve_forever()
