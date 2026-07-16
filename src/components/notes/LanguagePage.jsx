import { Link, useParams } from 'react-router-dom';
import { getNotesByLanguage, getLanguageMeta } from '../../utils/notesLoader';

const LEVEL_COLORS = {
    beginner: '#10b981',
    intermediate: '#f59e0b',
    advanced: '#ef4444',
};

export default function LanguagePage() {
    const { language } = useParams();
    const notes = getNotesByLanguage(language);
    const meta = getLanguageMeta(language);

    if (notes.length === 0) {
        return (
            <div className="notes-page">
                <header className="notes-header">
                    <Link to="/notes" className="notes-back" viewTransition>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        <span>All Notes</span>
                    </Link>
                </header>
                <section className="notes-empty section">
                    <p className="notes-empty__emoji">📭</p>
                    <h2>No notes found</h2>
                    <p>No notes exist for <strong>{language}</strong> yet.</p>
                    <Link to="/notes" className="notes-empty__link">← Back to all notes</Link>
                </section>
            </div>
        );
    }

    return (
        <div className="notes-page">
            <header className="notes-header">
                <Link to="/notes" className="notes-back" viewTransition>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    <span>All Notes</span>
                </Link>
            </header>

            <section className="notes-lang section">
                <div className="notes-lang__top">
                    <p className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        {meta.icon && <meta.icon size={16} style={{ marginRight: 6 }} />}{meta.name}
                    </p>
                    <h1 className="notes-lang__title">{meta.name} Notes</h1>
                    <p className="notes-lang__count">
                        {notes.length} {notes.length === 1 ? 'topic' : 'topics'} available
                    </p>
                </div>

                <div className="notes-lang__list">
                    {notes.map((note) => (
                        <Link
                            to={`/notes/${language}/${note.slug}`}
                            key={note.slug}
                            className="notes-topic"
                            viewTransition
                        >
                            <div className="notes-topic__content">
                                <h2 className="notes-topic__title">{note.title}</h2>
                                <div className="notes-topic__meta">
                                    {note.level !== 'unknown' && (
                                        <span
                                            className="notes-topic__level"
                                            style={{ '--level-color': LEVEL_COLORS[note.level] || '#6a3cb6' }}
                                        >
                                            {note.level}
                                        </span>
                                    )}
                                    {note.tags
                                        .filter((tag) => tag !== note.level)
                                        .slice(0, 3)
                                        .map((tag) => (
                                            <span key={tag} className="notes-topic__tag">
                                                {tag}
                                            </span>
                                        ))}
                                </div>
                            </div>
                            <div className="notes-topic__arrow">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
