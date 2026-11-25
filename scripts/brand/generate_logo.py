"""Generate The Mentorium logo set.

Run from the repository root:
    pip install fonttools uharfbuzz cairosvg pillow
    python3 scripts/brand/generate_logo.py

All outputs are vector-first: SVGs with the lettering converted to outlines,
so they render identically everywhere without needing the fonts installed.
Fonts: Cinzel (wordmark) and Montserrat (tagline), both SIL Open Font Licence.
"""
import io
import math
import os

import cairosvg
import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
FONTS = os.path.join(ROOT, "scripts", "brand", "fonts")
OUT = os.path.join(ROOT, "public", "brand")
APP = os.path.join(ROOT, "src", "app")
os.makedirs(OUT, exist_ok=True)

NAVY = "#142B49"
GOLD = "#C29A50"
LIGHT_GOLD = "#E3C98F"
OFF_WHITE = "#F3F5F8"
WHITE = "#FFFFFF"

WORDMARK = "MENTORIUM"
TAGLINE = "Your Gateway to Career Excellence"


# ---------------------------------------------------------------- text → paths
class Face:
    def __init__(self, filename):
        font = TTFont(os.path.join(FONTS, filename))
        font.flavor = None
        buf = io.BytesIO()
        font.save(buf)
        data = buf.getvalue()
        self.tt = TTFont(io.BytesIO(data))
        self.glyphs = self.tt.getGlyphSet()
        self.order = self.tt.getGlyphOrder()
        self.upm = self.tt["head"].unitsPerEm
        self.cap = self.tt["OS/2"].sCapHeight or int(self.upm * 0.7)
        self.hb_font = hb.Font(hb.Face(hb.Blob(data)))

    def shape(self, text, tracking=0.0):
        buf = hb.Buffer()
        buf.add_str(text)
        buf.guess_segment_properties()
        hb.shape(self.hb_font, buf, {"kern": True, "liga": True})
        out, x = [], 0.0
        for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
            out.append((self.order[info.codepoint], x + pos.x_offset))
            x += pos.x_advance + tracking * self.upm
        width = x - tracking * self.upm  # no tracking after the last letter
        return out, width

    def width(self, text, size, tracking=0.0):
        return self.shape(text, tracking)[1] * size / self.upm

    def path(self, text, size, x, baseline, tracking=0.0):
        s = size / self.upm
        glyphs, _ = self.shape(text, tracking)
        parts = []
        for name, gx in glyphs:
            pen = SVGPathPen(self.glyphs)
            self.glyphs[name].draw(TransformPen(pen, (s, 0, 0, -s, x + gx * s, baseline)))
            d = pen.getCommands()
            if d:
                parts.append(d)
        return " ".join(parts)

    def cap_height(self, size):
        return self.cap * size / self.upm


CINZEL = Face("cinzel-latin-500-normal.woff")
MONT = Face("montserrat-latin-500-normal.woff")


# ---------------------------------------------------------------- the emblem
# Emblem drawn in a 240 × 320 box; the shield, compass ring and star follow the
# original Mentorium mark.
def shield_path(d):
    """Shield outline inset by d units."""
    l, r = d, 240 - d
    peak = d * 1.15
    corner = 34 + d * 0.55
    side = 178
    bottom = 320 - d * 1.55
    cy = 262 - d * 0.35
    return (f"M{l:.2f},{corner:.2f} L120,{peak:.2f} L{r:.2f},{corner:.2f} L{r:.2f},{side} "
            f"Q{r:.2f},{cy:.2f} 120,{bottom:.2f} Q{l:.2f},{cy:.2f} {l:.2f},{side} Z")


CX, CY = 120, 166


def ring_path(r=66, gap_deg=12):
    arcs = []
    for q in range(4):
        a0 = math.radians(q * 90 + gap_deg)
        a1 = math.radians(q * 90 + 90 - gap_deg)
        x0, y0 = CX + r * math.cos(a0), CY + r * math.sin(a0)
        x1, y1 = CX + r * math.cos(a1), CY + r * math.sin(a1)
        arcs.append(f"M{x0:.2f},{y0:.2f} A{r},{r} 0 0 1 {x1:.2f},{y1:.2f}")
    return " ".join(arcs)


def star_polys(long_v=114, long_h=100, short=52, w=19, w2=8, diagonals=True):
    """Returns (light_faces, dark_faces) as lists of point strings."""
    light, dark = [], []
    rays = [(270, long_v, w), (0, long_h, w), (90, long_v, w), (180, long_h, w)]
    if diagonals:
        rays = [(a, short, w2) for a in (45, 135, 225, 315)] + rays
    for ang, length, width in rays:
        r = math.radians(ang)
        dx, dy = math.cos(r), math.sin(r)
        px, py = -dy, dx
        tip = (CX + dx * length, CY + dy * length)
        s1 = (CX + px * width, CY + py * width)
        s2 = (CX - px * width, CY - py * width)
        pts = lambda a, b: f"{CX},{CY} {a[0]:.2f},{a[1]:.2f} {b[0]:.2f},{b[1]:.2f}"
        light.append(pts(tip, s1))
        dark.append(pts(tip, s2))
    return light, dark


def emblem(c, simplified=False):
    """SVG group for the emblem in its 240 × 320 box. c = colour scheme dict."""
    g = []
    g.append(f'<path d="{shield_path(0)}" fill="{c["outline"]}"/>')
    g.append(f'<path d="{shield_path(11)}" fill="{c["interior"]}"/>')
    if not simplified:
        g.append(f'<path d="{shield_path(19)}" fill="none" stroke="{c["rule"]}" stroke-width="4.5" stroke-linejoin="round"/>')
        g.append(f'<path d="{ring_path()}" fill="none" stroke="{c["ring"]}" stroke-width="6" stroke-linecap="butt"/>')
        light, dark = star_polys()
    else:
        light, dark = star_polys(long_v=112, long_h=96, w=24, diagonals=False)
    for p in light:
        g.append(f'<polygon points="{p}" fill="{c["star_light"]}"/>')
    for p in dark:
        g.append(f'<polygon points="{p}" fill="{c["star_dark"]}"/>')
    return "".join(g)


SCHEMES = {
    "primary": dict(outline=NAVY, interior=WHITE, rule=GOLD, ring=GOLD, star_light=GOLD,
                    star_dark=NAVY, word=NAVY, tag=NAVY),
    "reversed": dict(outline=GOLD, interior=NAVY, rule=LIGHT_GOLD, ring=GOLD, star_light=OFF_WHITE,
                     star_dark=GOLD, word=LIGHT_GOLD, tag=OFF_WHITE),
    "mono-navy": dict(outline=NAVY, interior=WHITE, rule=NAVY, ring=NAVY, star_light=NAVY,
                      star_dark=NAVY, word=NAVY, tag=NAVY),
    "mono-white": dict(outline=WHITE, interior=NAVY, rule=WHITE, ring=WHITE, star_light=WHITE,
                       star_dark=WHITE, word=WHITE, tag=WHITE),
}


def svg_doc(w, h, body, title, bg=None):
    rect = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" '
            f'role="img" aria-label="{title}"><title>{title}</title>{rect}{body}</svg>')


WORD_TRACK = 0.06
TAG_TRACK = 0.01


def stacked(c, bg=None):
    W = 640
    word_w_target = 560
    ws = 100 * word_w_target / CINZEL.width(WORDMARK, 100, WORD_TRACK)
    word_w = CINZEL.width(WORDMARK, ws, WORD_TRACK)
    ts = 100 * (word_w * 0.84) / MONT.width(TAGLINE, 100, TAG_TRACK)
    tag_w = MONT.width(TAGLINE, ts, TAG_TRACK)
    em_h = 300
    sc = em_h / 320
    em_x = (W - 240 * sc) / 2
    top = 24
    word_base = top + em_h + 44 + CINZEL.cap_height(ws)
    tag_base = word_base + 26 + MONT.cap_height(ts)
    H = int(tag_base + 30)
    body = (f'<g transform="translate({em_x:.2f},{top}) scale({sc:.4f})">{emblem(c)}</g>'
            f'<path d="{CINZEL.path(WORDMARK, ws, (W - word_w) / 2, word_base, WORD_TRACK)}" fill="{c["word"]}"/>'
            f'<path d="{MONT.path(TAGLINE, ts, (W - tag_w) / 2, tag_base, TAG_TRACK)}" fill="{c["tag"]}"/>')
    return svg_doc(W, H, body, "Mentorium — Your Gateway to Career Excellence", bg)


def horizontal(c, bg=None):
    em_h = 160
    sc = em_h / 320
    pad = 16
    gap = 28
    ws = 64
    word_w = CINZEL.width(WORDMARK, ws, WORD_TRACK)
    ts = 100 * (word_w * 0.92) / MONT.width(TAGLINE, 100, TAG_TRACK)
    text_x = pad + 240 * sc + gap
    cap_w, cap_t = CINZEL.cap_height(ws), MONT.cap_height(ts)
    block = cap_w + 18 + cap_t
    H = em_h + 2 * pad
    word_base = (H - block) / 2 + cap_w
    tag_base = word_base + 18 + cap_t
    W = int(text_x + word_w + pad)
    body = (f'<g transform="translate({pad},{pad}) scale({sc:.4f})">{emblem(c)}</g>'
            f'<path d="{CINZEL.path(WORDMARK, ws, text_x, word_base, WORD_TRACK)}" fill="{c["word"]}"/>'
            f'<path d="{MONT.path(TAGLINE, ts, text_x, tag_base, TAG_TRACK)}" fill="{c["tag"]}"/>')
    return svg_doc(W, H, body, "Mentorium — Your Gateway to Career Excellence", bg)


def emblem_only(c, simplified=False, size=320, bg=None):
    sc = (size * 0.92) / 320
    x = (size - 240 * sc) / 2
    y = (size - 320 * sc) / 2
    body = f'<g transform="translate({x:.2f},{y:.2f}) scale({sc:.4f})">{emblem(c, simplified)}</g>'
    return svg_doc(size, size, body, "Mentorium emblem", bg)


def write(name, svg):
    with open(os.path.join(OUT, name), "w") as f:
        f.write(svg)
    return svg


def png(svg, path, width):
    cairosvg.svg2png(bytestring=svg.encode(), write_to=path, output_width=width)


def main():
    files = {}
    for key in ("primary", "reversed", "mono-navy", "mono-white"):
        files[f"mentorium-logo-{key}.svg"] = write(f"mentorium-logo-{key}.svg", stacked(SCHEMES[key]))
    for key in ("primary", "reversed"):
        files[f"mentorium-logo-horizontal-{key}.svg"] = write(
            f"mentorium-logo-horizontal-{key}.svg", horizontal(SCHEMES[key]))
        files[f"mentorium-emblem-{key}.svg"] = write(f"mentorium-emblem-{key}.svg", emblem_only(SCHEMES[key]))

    fav_scheme = dict(SCHEMES["primary"], interior=NAVY, star_light=GOLD, star_dark="#A8823F")
    fav = write("mentorium-favicon.svg", emblem_only(fav_scheme, simplified=True, size=64))

    # Transparent PNG exports
    for key in ("primary", "reversed", "mono-navy", "mono-white"):
        for w in (1024, 2048):
            png(files[f"mentorium-logo-{key}.svg"], os.path.join(OUT, f"mentorium-logo-{key}-{w}.png"), w)
    for key in ("primary", "reversed"):
        png(files[f"mentorium-logo-horizontal-{key}.svg"], os.path.join(OUT, f"mentorium-logo-horizontal-{key}-1200.png"), 1200)
        png(files[f"mentorium-emblem-{key}.svg"], os.path.join(OUT, f"mentorium-emblem-{key}-512.png"), 512)

    # App icons (Next.js file conventions in src/app)
    with open(os.path.join(APP, "icon.svg"), "w") as f:
        f.write(fav)
    apple = emblem_only(fav_scheme, simplified=True, size=180, bg=WHITE)
    png(apple, os.path.join(APP, "apple-icon.png"), 180)
    tmp = os.path.join(OUT, "_fav.png")
    png(fav, tmp, 256)
    Image.open(tmp).save(os.path.join(APP, "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)])
    os.remove(tmp)

    # Social sharing image 1200 × 630, reversed logo on navy
    s = horizontal(SCHEMES["reversed"])
    import re
    vw, vh = map(float, re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"', s).groups())
    inner = s[s.index("</title>") + 8: s.rindex("</svg>")]
    scale = 900 / vw
    og = svg_doc(1200, 630, f'<g transform="translate({(1200 - vw * scale) / 2:.1f},{(630 - vh * scale) / 2:.1f}) scale({scale:.4f})">{inner}</g>'
                 f'<rect x="0" y="618" width="1200" height="12" fill="{GOLD}"/>', "Mentorium", NAVY)
    png(og, os.path.join(APP, "opengraph-image.png"), 1200)
    png(og, os.path.join(OUT, "mentorium-social-1200x630.png"), 1200)

    # Square avatar for social profiles
    avatar = emblem_only(SCHEMES["reversed"], size=400, bg=NAVY)
    png(avatar, os.path.join(OUT, "mentorium-avatar-400.png"), 400)
    print("Logo set written to", OUT)


if __name__ == "__main__":
    main()
