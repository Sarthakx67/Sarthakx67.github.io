Plan

The portfolio header currently shows numbered navigation links: 01 Proof, 02 Work, 03 Contact, 04 Receipts, 05 Arc. The user wants those numbers removed.

Changes
- Edit `src/components/portfolio/Nav.tsx` to remove the `<span>` that renders each link's number (`{l.n}`) inside the nav map. Keep the label text and anchor behavior unchanged.
- Optionally remove the `n` field from the `links` array since it will no longer be used, but keep the array structure for the labels and hrefs.

No other components or data files need changes. Build will be verified after the edit.