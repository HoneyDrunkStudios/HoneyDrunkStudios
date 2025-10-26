# Sector Header Images

This directory contains header images for sector detail pages.

## Required Images
Each sector needs a header image that captures its essence in cyberpunk realism style:

- `core.jpg` - Core sector (violet/purple theme)
- `ops.jpg` - Ops sector (cyber orange theme)
- `honeynet.jpg` - HoneyNet sector (matrix green theme)
- `creator.jpg` - Creator sector (chrome teal theme)
- `market.jpg` - Market sector (aurum gold theme)
- `honeyplay.jpg` - HoneyPlay sector (neon pink theme)
- `cyberware.jpg` - Cyberware sector (electric blue theme)
- `meta.jpg` - Meta sector (neon yellow theme)
- `ai.jpg` - AI sector (synth magenta theme)

## Image Specifications
- **Dimensions**: 1920x1080 (recommended minimum)
- **Format**: JPG (optimized for web)
- **Style**: Cyberpunk realism with sector-appropriate color palette
- **Opacity**: Images display at 30% opacity with sector-colored gradient overlay
- **Content**: Abstract, atmospheric visuals that evoke the sector's philosophy

## Usage
Images are referenced in `data/schema/sectors.json` via the `headerImage` field:
```json
"headerImage": "/sectors/core.jpg"
```

The hero section on `/sectors/[id]` pages displays the header image as a background layer beneath the gradient overlay.
