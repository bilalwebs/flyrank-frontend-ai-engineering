# Fix Log

| Issue | Before | Fix Applied | Result |
|-------|--------|-------------|--------|
| No aria-live for status changes | Screen readers silent on state changes | Added aria-live="assertive" region with requestAnimationFrame | Status changes announced |
| Color picker not keyboard accessible | Mouse only | Added arrow key navigation with tabIndex management | Full keyboard support |
| Heading hierarchy incorrect | h3 under h1 | Changed to h2 for proper hierarchy | Valid document outline |
| Scene loader not announced | Visual only | Added role="status" and aria-live="polite" | Announced to screen readers |
| Canvas not focusable | No tabIndex | Added tabIndex={0} with visible focus ring | Focusable with visible indicator |
| Instructions not accessible | Visual overlay only | Added aria-hidden and descriptive aria-label | Decorative, not in a11y tree |
| WebGL fallback not announced | Static error message | Added aria-live="assertive" | Immediately announced |
| Canvas renders continuously | Always on | Added frameloop="never" for reduced motion | Respects user preference |
| Scene components re-render | No memoization | Wrapped with React.memo | Prevents unnecessary re-renders |
| High polygon geometry | 128 tubular segments | Reduced to 64 segments | ~75% polygon reduction |
| Excessive star particles | 3000 particles | Reduced to 2500 particles | 17% reduction |
| Unused state in FloatingShape | clicked state tracked | Removed unused state | Cleaner component logic |
