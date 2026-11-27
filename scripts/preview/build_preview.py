"""Build a static, clickable preview of the site for review inside Claude.

Usage (with the production build running on http://localhost:3100):
    npm run build && npx next start -p 3100 &
    python3 scripts/preview/build_preview.py

Writes .preview/ — one index.html with every page as a hash-routed view
(#home, #about, #legal-privacy-policy …), plus the CSS fonts and logo files it
uses. Next.js scripts are removed; a small script handles page switching, the
mobile menu and form submission (forms are disabled in the preview).
"""
import html as htmllib
import os
import re
import shutil
import urllib.request

BASE = "http://localhost:3100"
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, ".preview")

LEGAL = [
    "privacy-policy", "terms-and-conditions", "refund-and-cancellation", "assessment-disclaimer",
    "counselling-disclaimer", "job-posting-guidelines", "employer-verification", "data-protection",
]
PAGES = ["/", "/about", "/career-counselling", "/career-assessment", "/training", "/jobs", "/mentorship",
         "/resources", "/contact", "/book", "/login"] + [f"/legal/{s}" for s in LEGAL]


def get(path):
    with urllib.request.urlopen(BASE + path) as r:
        return r.read()


def page_id(path):
    path = path.split("#")[0].split("?")[0].rstrip("/")
    return "home" if path == "" else path.strip("/").replace("/", "-")


def rewrite_links(html):
    def href(m):
        url = m.group(1)
        if url.startswith(("http", "mailto:", "tel:")):
            return m.group(0)
        if url.startswith("#"):
            return m.group(0)
        if url.startswith("/"):
            path, _, frag = url.partition("#")
            target = frag if frag else page_id(path)
            return f'href="#{target}"'
        return m.group(0)

    html = re.sub(r'href="([^"]*)"', href, html)
    html = re.sub(r'(src|srcSet|srcset)="/brand/', r'\1="brand/', html)
    return html


def extract(html, start_pat, tag):
    """Return the outer HTML of the first element matching start_pat (balanced on `tag`)."""
    m = re.search(start_pat, html)
    if not m:
        return ""
    i, depth = m.start(), 0
    for t in re.finditer(rf"<(/?){tag}\b[^>]*>", html[i:]):
        depth += -1 if t.group(1) else 1
        if depth == 0:
            return html[i: i + t.end()]
    return ""


def main():
    shutil.rmtree(OUT, ignore_errors=True)
    os.makedirs(os.path.join(OUT, "media"))
    shutil.copytree(os.path.join(ROOT, "public", "brand"), os.path.join(OUT, "brand"),
                    ignore=shutil.ignore_patterns("*.png"))

    home = get("/").decode()
    css_hrefs = re.findall(r'<link rel="stylesheet" href="([^"]+)"', home)
    css = ""
    for h in css_hrefs:
        css += get(h).decode()

    def font(m):
        url = m.group(1).strip("'\"")
        name = os.path.basename(url.split("?")[0])
        if url.startswith("../media/"):
            url = "/_next/static/media/" + url[len("../media/"):]
        if url.startswith("/"):
            with open(os.path.join(OUT, "media", name), "wb") as f:
                f.write(get(url))
            return f"url(media/{name})"
        return m.group(0)

    css = re.sub(r"url\(([^)]+)\)", font, css)
    with open(os.path.join(OUT, "site.css"), "w") as f:
        f.write(css)

    header = rewrite_links(extract(home, r"<header\b", "header"))
    footer = rewrite_links(extract(home, r"<footer\b", "footer"))

    views, titles = [], {}
    for p in PAGES:
        html = get(p).decode()
        pid = page_id(p)
        t = re.search(r"<title>(.*?)</title>", html, re.S)
        titles[pid] = htmllib.unescape(t.group(1)) if t else "The Mentorium"
        main_inner = re.search(r'<main id="main"[^>]*>(.*)</main>', html, re.S).group(1)
        main_inner = re.sub(r"<script\b.*?</script>", "", main_inner, flags=re.S)
        views.append(f'<div class="view" data-page="{pid}" hidden>{rewrite_links(main_inner)}</div>')

    nav = re.findall(r'<nav aria-label="Main".*?</nav>', header, re.S)
    nav_links = re.findall(r'<a [^>]*href="(#[^"]+)"[^>]*>([^<]+)</a>', nav[0]) if nav else []
    full = {
        "#about": "About Us", "#career-counselling": "Career Counselling", "#career-assessment": "Career Assessment",
        "#training": "Training", "#jobs": "Jobs &amp; Internships", "#mentorship": "Mentorship",
        "#resources": "Resources", "#contact": "Contact",
    }
    item = ('<li><a href="{h}" class="block py-4 font-heading text-lg font-medium text-navy-900" '
            'data-close>{t}</a></li>')
    mobile_items = item.format(h="#home", t="Home") + "".join(
        item.format(h=h, t=full.get(h, t)) for h, t in nav_links)
    mobile_menu = (
        '<div id="mobile-menu" hidden style="position:fixed;left:0;right:0;top:106px;bottom:0;z-index:40" '
        'class="overflow-y-auto border-t border-line bg-white xl:hidden"><div class="mx-auto w-full max-w-7xl px-5 sm:px-8 py-6">'
        f'<ul class="divide-y divide-line">{mobile_items}</ul><div class="mt-8 grid gap-3">'
        '<a href="#book" data-close class="inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 '
        'font-heading text-sm font-semibold bg-gold-500 text-navy-950">Book a Consultation</a>'
        '<a href="#login" data-close class="inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 '
        'font-heading text-sm font-semibold border border-navy-900/25 text-navy-900">Register / Login</a>'
        "</div></div></div>")

    titles_js = "{" + ",".join(f'"{k}":{v!r}' for k, v in titles.items()) + "}"
    doc = f"""<!DOCTYPE html>
<html lang="en" class="h-full"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mentorium site preview</title>
<link rel="stylesheet" href="site.css">
<style>
.preview-bar{{position:sticky;top:0;z-index:60;background:#0c1a2e;color:#e3e9f1;font:13px/1.4 system-ui,sans-serif;
height:33px;padding:0 16px;display:flex;gap:10px;align-items:center;justify-content:center;white-space:nowrap;overflow:hidden}}
.preview-bar b{{color:#e3c98f}}
.preview-toast{{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:70;background:#142b49;color:#fff;
padding:12px 18px;border-radius:8px;font:14px system-ui,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.25)}}
header.sticky{{top:33px}}
</style></head>
<body class="flex min-h-full flex-col">
<div class="preview-bar"><b>Preview</b> <span>Review copy · forms switched off</span></div>
{header}
{mobile_menu}
<main id="main" class="flex-1">{''.join(views)}</main>
{footer}
<div class="preview-toast" id="toast" hidden></div>
<script>{{
const titles={titles_js};
const views=[...document.querySelectorAll('.view')];
const menu=document.getElementById('mobile-menu');
const btn=document.querySelector('header button[aria-controls="mobile-menu"]');
function show(){{
  let h=decodeURIComponent(location.hash.slice(1))||'home';
  let view=views.find(v=>v.dataset.page===h), target=null;
  if(!view){{target=document.getElementById(h);view=target?target.closest('.view'):views[0];}}
  views.forEach(v=>v.hidden=v!==view);
  const page=view.dataset.page;
  document.title=titles[page]||'The Mentorium';
  document.querySelectorAll('header nav a').forEach(a=>{{
    const on=a.getAttribute('href')==='#'+page;
    a.classList.toggle('text-gold-700',on);a.classList.toggle('text-navy-900',!on);
  }});
  if(target){{target.scrollIntoView();}}else{{window.scrollTo(0,0);}}
  setMenu(false);
}}
function setMenu(open){{
  if(!menu||!btn)return;
  menu.hidden=!open;btn.setAttribute('aria-expanded',String(open));
  btn.setAttribute('aria-label',open?'Close menu':'Open menu');
  btn.querySelector('path').setAttribute('d',open?'M6 6l12 12 M18 6L6 18':'M4 7h16 M4 12h16 M4 17h16');
  document.body.style.overflow=open?'hidden':'';
}}
if(btn)btn.addEventListener('click',()=>setMenu(menu.hidden));
document.querySelectorAll('[data-close]').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
const toast=document.getElementById('toast');
document.querySelectorAll('form').forEach(f=>f.addEventListener('submit',e=>{{
  e.preventDefault();toast.textContent='Preview only — forms are not connected in this preview.';
  toast.hidden=false;setTimeout(()=>toast.hidden=true,3500);
}}));
window.addEventListener('hashchange',show);
show();
}}</script>
</body></html>"""
    with open(os.path.join(OUT, "index.html"), "w") as f:
        f.write(doc)
    n = sum(len(fs) for _, _, fs in os.walk(OUT))
    print(f"Preview written to {OUT} ({n} files, {len(views)} pages)")


if __name__ == "__main__":
    main()
