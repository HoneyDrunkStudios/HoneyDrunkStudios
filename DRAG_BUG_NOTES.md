# Drag-and-Drop After Resize Bug

## Issue
When the browser window is resized on the `/nodes` page, dragging nodes becomes broken:
- Nodes move much faster than the mouse
- Nodes don't follow the cursor properly
- The drag delta calculations seem incorrect

## What We've Tried
1. ✗ Debouncing particle reinitialization (not related)
2. ✗ Resetting zoom to 1 after resize
3. ✗ Preventing auto-centering on resize
4. ✗ Using a ref to capture zoom at drag start
5. ✗ Clearing all node positions and localStorage on resize

## Files Involved
- `components/NodeGlyph.tsx` - Handles individual node dragging (lines 78-122)
- `components/TheGrid.tsx` - Manages grid transforms and zoom (lines 114-145)

## Next Steps to Debug
1. Add console.logs to track:
   - Actual mouse coordinates vs calculated deltas
   - Zoom value during drag
   - Transform matrix state
   - Container dimensions before/after resize

2. Check if issue is:
   - Transform scale getting corrupted
   - Pan offset calculations wrong
   - Event coordinate space mismatch

3. Consider simplifying:
   - Remove zoom from drag calculations entirely
   - Use getBoundingClientRect() for coordinate conversion
   - Rebuild drag logic from scratch

## Workaround
Users can refresh the page after resizing to restore normal drag behavior.
