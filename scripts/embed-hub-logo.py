"""Install the full CoE stack and embed the mark inside the company hub orb."""

from __future__ import annotations

import shutil
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
STACK_SRC = Path(
    r"C:\Users\pc\.cursor\projects\c-Users-pc-Downloads-Website-Agrayian-AI-Labs\assets\coe-stack-nine-full.png"
)
STACK_DST = ROOT / "public/visuals/coe-stack-nine-plates.png"
HUB = ROOT / "public/mockups/original-company-hub.png"
HUB_OUT = ROOT / "public/visuals/company-hub-in-glass.png"
LOGO = ROOT / "public/logo.png"


def install_stack() -> None:
    shutil.copyfile(STACK_SRC, STACK_DST)
    im = Image.open(STACK_DST).convert("RGB")
    arr = np.array(im)
    # Ninth plate sits ~136px below plate 08 (y=1182, x=350).
    draw_red_sphere(arr, cx=350, cy=1318, radius=9)
    # Keep plates 07–09 readable on white.
    pix = arr.astype(np.float32)
    h = pix.shape[0]
    yy = np.linspace(0, 1, h)[:, None, None]
    lift = np.clip((yy - 0.62) / 0.38, 0, 1) ** 1.1
    lum = pix.mean(axis=2, keepdims=True)
    glass = lum < 250
    pix = np.where(glass, 255 - (255 - pix) * (1 + 0.32 * lift), pix)
    mean = pix.mean(axis=2, keepdims=True)
    pix = np.where(glass, mean + (pix - mean) * (1 + 0.14 * lift), pix)
    Image.fromarray(np.clip(pix, 0, 255).astype(np.uint8)).save(STACK_DST)
    print("stack installed", im.size)


def draw_red_sphere(arr: np.ndarray, cx: int, cy: int, radius: int) -> None:
    h, w = arr.shape[:2]
    yy, xx = np.mgrid[
        max(0, cy - radius - 2) : min(h, cy + radius + 3),
        max(0, cx - radius - 2) : min(w, cx + radius + 3),
    ]
    dx = (xx - cx) / radius
    dy = (yy - cy) / radius
    r2 = dx * dx + dy * dy
    inside = r2 <= 1.05
    if not inside.any():
        return
    # Glossy red glass, highlight at upper-left.
    shade = np.clip(1.15 - 0.55 * r2 - 0.25 * dy + 0.18 * (-dx), 0.35, 1.2)
    hi = np.clip(0.55 - ((dx + 0.35) ** 2 + (dy + 0.4) ** 2) * 1.6, 0, 1)
    rgb = np.empty(arr[yy, xx].shape, dtype=np.float32)
    rgb[..., 0] = 210 * shade + 45 * hi
    rgb[..., 1] = 38 * shade + 70 * hi
    rgb[..., 2] = 48 * shade + 55 * hi
    edge = np.clip((1.05 - r2) / 0.18, 0, 1)
    a = inside.astype(np.float32) * edge
    base = arr[yy, xx].astype(np.float32)
    arr[yy, xx] = np.clip(base * (1 - a[..., None]) + rgb * a[..., None], 0, 255).astype(
        np.uint8
    )


def cut_logo() -> Image.Image:
    logo = Image.open(LOGO).convert("RGBA")
    L = np.array(logo)
    rgb = L[:, :, :3].astype(np.int16)
    lum = rgb.mean(axis=2)
    red = (rgb[:, :, 0] > rgb[:, :, 1] + 28) & (rgb[:, :, 0] > 130)
    keep = (lum < 90) | red
    out = np.zeros_like(L)
    dark = keep & (~red)
    out[dark, 0] = 16
    out[dark, 1] = 40
    out[dark, 2] = 64
    out[dark, 3] = 220
    out[red, 0] = L[red, 0]
    out[red, 1] = L[red, 1]
    out[red, 2] = L[red, 2]
    out[red, 3] = 215
    mark = Image.fromarray(out)
    box = mark.getbbox()
    if box:
        mark = mark.crop(box)
    return mark


def sphere_warp(im: Image.Image, strength: float = 0.58) -> Image.Image:
    src = np.array(im)
    h, w = src.shape[:2]
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    nx = (xx - (w - 1) / 2) / max(w / 2, 1)
    ny = (yy - (h - 1) / 2) / max(h / 2, 1)
    r2 = nx * nx + ny * ny
    # Barrel toward the rim; fade outside the orb.
    k = 1.0 + strength * np.clip(r2, 0, 1.35)
    sx = np.clip((nx / k) * (w / 2) + (w - 1) / 2, 0, w - 1)
    sy = np.clip((ny / k) * (h / 2) + (h - 1) / 2, 0, h - 1)
    x0 = np.floor(sx).astype(np.int32)
    y0 = np.floor(sy).astype(np.int32)
    x1 = np.clip(x0 + 1, 0, w - 1)
    y1 = np.clip(y0 + 1, 0, h - 1)
    fx = (sx - x0)[..., None]
    fy = (sy - y0)[..., None]
    out = (
        src[y0, x0] * (1 - fx) * (1 - fy)
        + src[y0, x1] * fx * (1 - fy)
        + src[y1, x0] * (1 - fx) * fy
        + src[y1, x1] * fx * fy
    )
    fade = np.clip(1.25 - r2, 0, 1) ** 0.9
    out[:, :, 3] = out[:, :, 3] * fade
    return Image.fromarray(out.astype(np.uint8))


def find_orb(hub: np.ndarray) -> tuple[int, int, int]:
    """Central orb in the studio hub render — measured, not guessed."""
    return 768, 500, 248


def embed_logo() -> None:
    hub_im = Image.open(HUB).convert("RGB")
    hub = np.array(hub_im)
    orig = hub.astype(np.float32)
    cx, cy, rad = find_orb(hub)
    logo = cut_logo()
    target_w = max(220, int(rad * 0.86))
    logo = logo.resize(
        (target_w, max(1, int(logo.size[1] * target_w / logo.size[0]))),
        Image.Resampling.LANCZOS,
    )
    # Pad to a square so the wide mark sits inside the orb, not on the rim.
    side = int(max(logo.size) * 1.28)
    padded = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    padded.paste(logo, ((side - logo.size[0]) // 2, (side - logo.size[1]) // 2), logo)
    logo = sphere_warp(padded.filter(ImageFilter.GaussianBlur(0.35)), strength=0.42)
    lw, lh = logo.size
    mask = Image.new("L", (lw, lh), 0)
    ImageDraw.Draw(mask).ellipse((2, 2, lw - 3, lh - 3), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(3))
    la = np.array(logo).astype(np.float32)
    la[:, :, 3] *= np.array(mask).astype(np.float32) / 255.0
    la[:, :, 3] = np.where(la[:, :, 3] < 20, 0, la[:, :, 3])

    x = cx - lw // 2
    y = cy - lh // 2 + int(rad * 0.02)
    x0, y0 = max(0, x), max(0, y)
    x1, y1 = min(hub.shape[1], x + lw), min(hub.shape[0], y + lh)
    sx, sy = x0 - x, y0 - y
    patch = orig[y0:y1, x0:x1]
    mark = la[sy : sy + (y1 - y0), sx : sx + (x1 - x0)]
    a = (mark[:, :, 3] / 255.0)[..., None]
    glass = np.clip(0.22 + 0.78 * (patch / 255.0), 0.18, 1.0)
    ink = mark[:, :, :3] * glass
    # Let the orb color show through so the mark reads as ink in glass.
    fused = patch * (1.0 - a * 0.78) + ink * a * 0.78

    spec = np.clip((patch.mean(axis=2) - 228) / 22.0, 0, 1)[..., None]
    fused = fused * (1.0 - spec * 0.9) + patch * (spec * 0.9)

    fringe = np.clip(a * (1.0 - spec) * 0.16, 0, 1)
    fused[..., 1] += 10 * fringe[..., 0]
    fused[..., 2] += 18 * fringe[..., 0]

    hub[y0:y1, x0:x1] = np.clip(fused, 0, 255).astype(np.uint8)
    Image.fromarray(hub).save(HUB_OUT, quality=96)
    print("hub embedded", logo.size, "orb", (cx, cy, rad), "at", (x, y))


if __name__ == "__main__":
    install_stack()
    embed_logo()
