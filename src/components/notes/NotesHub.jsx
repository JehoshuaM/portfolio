import { Link } from 'react-router-dom';
import {
    getLanguages,
    getResearches,
} from '../../utils/notesLoader';

export default function NotesHub() {
    const languages = getLanguages();
    const researches = getResearches();

    return (
        <div className="notes-page">
            <header className="notes-header">
                <Link
                    to="/"
                    className="notes-back"
                    aria-label="Back to portfolio"
                    viewTransition
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>

                    <span>Portfolio</span>
                </Link>
            </header>

            <section className="notes-hub section">
                <div className="notes-hub__top">
                    <p className="section-label">Study Hub</p>

                    <h1 className="notes-hub__title">
                        Notes
                        <span className="notes-hub__title-accent">
                            {' '}& Research
                        </span>
                    </h1>

                    <p className="notes-hub__subtitle">
                        A growing collection of notes, concepts,
                        research projects, micro courses and code
                        snippets.
                    </p>
                </div>

                {researches.length > 0 && (
                    <>
                        <p className="section-label">
                            Research
                        </p>

                        <div className="notes-hub__grid">
                            {researches.map((research) => (
                                <Link
                                    to={`/research/${research.id}`}
                                    key={research.id}
                                    className="notes-card research-card"
                                    style={{
                                        '--card-accent': research.color,
                                        '--card-accent-2': research.accentColor,
                                    }}
                                    viewTransition
                                >
                                    <div className="notes-card__glow" />

                                    <div className="notes-card__emoji">
                                        {research.icon && (
                                            <research.icon size={32} />
                                        )}
                                    </div>

                                    <h2 className="notes-card__name">
                                        {research.name}
                                    </h2>

                                    <p className="notes-card__count">
                                        {research.count}{' '}
                                        {research.count === 1
                                            ? 'paper'
                                            : 'papers'}
                                    </p>

                                    <div className="notes-card__arrow">
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}

                <p className="section-label">
                    Notes
                </p>

                <div className="notes-hub__grid">
                    {languages.map((lang) => (
                        <Link
                            to={`/notes/${lang.id}`}
                            key={lang.id}
                            className="notes-card"
                            style={{
                                '--card-accent': lang.color,
                                '--card-accent-2': lang.accentColor,
                            }}
                            viewTransition
                        >
                            <div className="notes-card__glow" />

                            <div className="notes-card__emoji">
                                {lang.icon && (
                                    <lang.icon size={32} />
                                )}
                            </div>

                            <h2 className="notes-card__name">
                                {lang.name}
                            </h2>

                            <p className="notes-card__count">
                                {lang.count}{' '}
                                {lang.count === 1
                                    ? 'note'
                                    : 'notes'}
                            </p>

                            <div className="notes-card__arrow">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
