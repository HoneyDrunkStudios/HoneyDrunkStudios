# Drag-and-Drop Bug - FIXED ✅

## Issue (RESOLVED)
~~When the browser window is resized on the `/nodes` page, dragging nodes becomes broken:~~
- ~~Nodes move much faster than the mouse~~
- ~~Nodes don't follow the cursor properly~~
- ~~The drag delta calculations seem incorrect~~

## Root Cause
The bug was in the cumulative delta calculation in `NodeGlyph.tsx` (lines 94-115):
- The code was both **accumulating deltas** AND **updating the drag start position**
- This caused double-counting: `cumulativeDelta += (currentPos - updatedStartPos)`
- Each mouse move would add more displacement than intended

## Fix Applied
Changed the drag calculation to:
1. Keep the original `dragStart` position throughout the entire drag
2. Calculate delta from original start to current mouse position (not incremental)
3. Don't update `dragStart` during the drag
4. This gives accurate total displacement from the start point

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

## Changes Made
**File: `honeydrunk-website/components/NodeGlyph.tsx`**

Before (buggy):
```javascript
const deltaX = (e.clientX - dragStart.x) / currentZoom;
const deltaY = (e.clientY - dragStart.y) / currentZoom;
cumulativeDeltaRef.current.x += deltaX;  // Accumulating
cumulativeDeltaRef.current.y += deltaY;
setDragStart({ x: e.clientX, y: e.clientY });  // Updating start
```

After (fixed):
```javascript
const deltaX = (e.clientX - dragStart.x) / currentZoom;
const deltaY = (e.clientY - dragStart.y) / currentZoom;
cumulativeDeltaRef.current = { x: deltaX, y: deltaY };  // Direct assignment
// dragStart is NOT updated - keeps original position
```

## Status: ✅ RESOLVED
Drag and drop now works correctly even after window resize.
