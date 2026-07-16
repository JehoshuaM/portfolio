export default function Intro() {
  return (
    <section id="intro" className="intro section">
      <div className="intro__grid">
        <div>
          <p className="section-label">intro</p>
          <h2 className="intro__title">
            Just a <span className="stack__title-accent">developer</span> with a{" "}
            <span className="stack__title-accent">camera eye</span>
            <span className="stack__title-accent-muted">.</span>
          </h2>
        </div>

        <div className="intro__copy">
          <p>
            I'm <strong>Jehoshua M</strong>, a student software engineer from
            India building full stack applications, AI tools, and open source
            software.
          </p>

          <p>
            I spend more time deleting bad ideas than writing good code.
            Turns out that's usually the better investment.
          </p>
        </div>
      </div>
    </section>
  )
}