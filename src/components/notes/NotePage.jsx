import { useParams, Link } from 'react-router-dom';
import { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getNote, getLanguageMeta } from '../../utils/notesLoader';

const codeTheme = {
    ...oneLight,
    'pre[class*="language-"]': {
        ...oneLight['pre[class*="language-"]'],
        background: 'transparent',
        margin: 0,
        padding: '1.2rem 1rem',
        fontSize: '0.88rem',
        lineHeight: '1.65',
    },
    'code[class*="language-"]': {
        ...oneLight['code[class*="language-"]'],
        background: 'transparent',
        fontSize: '0.88rem',
        fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
    },
};

function CopyButton({ code }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, [code]);

    return (
        <button className="notes-code__copy" onClick={handleCopy} aria-label="Copy code">
            {copied ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                </svg>
            ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
            )}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
    );
}

function CodeBlock({ children, language }) {
    const code = String(children).replace(/\n$/, '');

    return (
        <div className="notes-code__wrapper">
            <div className="notes-code__header">
                {language && <span className="notes-code__lang">{language}</span>}
                <CopyButton code={code} />
            </div>
            <SyntaxHighlighter
                language={language || 'text'}
                style={codeTheme}
                customStyle={{
                    background: 'transparent',
                    margin: 0,
                    borderRadius: 0,
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
}

export default function NotePage() {
    const { language, slug } = useParams();
    const note = getNote(language, slug);
    const meta = getLanguageMeta(language);

    if (!note) {
        return (
            <div className="notes-page">
                <header className="notes-header">
                    <Link to={`/notes/${language}`} className="notes-back" viewTransition>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        <span>Back</span>
                    </Link>
                </header>
                <section className="notes-empty section">
                    <p className="notes-empty__emoji">🔍</p>
                    <h2>Note not found</h2>
                    <p>The note <strong>{slug}</strong> doesn't exist in {language}.</p>
                    <Link to={`/notes/${language}`} className="notes-empty__link">← Back to {language}</Link>
                </section>
            </div>
        );
    }

    return (
        <div className="notes-page">
            <header className="notes-header">
                <Link to={`/notes/${language}`} className="notes-back" viewTransition>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        {meta.icon && <meta.icon size={18} />}
                        {meta.name}
                    </span>
                </Link>
            </header>

            <article className="notes-article">
                <div className="notes-article__header">
                    <h1 className="notes-article__title">{note.title}</h1>
                    <div className="notes-article__meta">
                        {note.level !== 'unknown' && (
                            <span className="notes-topic__level" style={{ '--level-color': note.level === 'beginner' ? '#10b981' : note.level === 'intermediate' ? '#f59e0b' : '#ef4444' }}>
                                {note.level}
                            </span>
                        )}
                        {note.tags
                            .filter((tag) => tag !== note.level)
                            .map((tag) => (
                                <span key={tag} className="notes-topic__tag">{tag}</span>
                            ))}
                    </div>
                </div>

                <div className="notes-article__body">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            pre({ children }) {
                                return <pre className="notes-pre">{children}</pre>;
                            },
                            code({ children, className }) {
                                const match = /language-(\w+)/.exec(className || '');

                                const codeString = Array.isArray(children)
                                    ? children.join('')
                                    : String(children);

                                if (match) {
                                    return (
                                        <CodeBlock language={match[1]}>
                                            {codeString}
                                        </CodeBlock>
                                    );
                                }

                                return <code className="notes-inline-code">{codeString}</code>;
                            },
                            table({ children }) {
                                return (
                                    <div className="notes-table__wrapper">
                                        <table className="notes-table">{children}</table>
                                    </div>
                                );
                            },
                        }}
                    >
                        {note.content}
                    </ReactMarkdown>
                </div>
            </article>
        </div>
    );
}
