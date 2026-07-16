import { useId } from 'react';

export default function Interlude({ quote, caption, align = 'left', withArt = false }) {
  const captionId = useId();

  return (
    <section
      className={`interlude interlude--${align} ${withArt ? 'interlude--art' : ''}`.trim()}
      aria-labelledby={captionId}
    >
      <div className="interlude__inner">
        <p id={captionId} className="interlude__caption">{caption}</p>
        <p className="interlude__quote glare-title" data-text={quote}>
          {quote}
        </p>
      </div>
    </section>
  )
}
