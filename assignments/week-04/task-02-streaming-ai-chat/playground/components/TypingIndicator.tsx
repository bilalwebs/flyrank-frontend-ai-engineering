/**
 * Animated "thinking" indicator shown while the assistant is generating
 * its first token. Decorative dots are hidden from assistive tech; the
 * status is announced via the visually hidden live text.
 */
const TypingIndicator = () => (
  <div role="status" aria-live="polite" className="flex items-center gap-1">
    <span className="sr-only">Assistant is thinking</span>
    <span className="typing-dot" aria-hidden="true" />
    <span className="typing-dot [animation-delay:150ms]" aria-hidden="true" />
    <span className="typing-dot [animation-delay:300ms]" aria-hidden="true" />
  </div>
);

export default TypingIndicator;
