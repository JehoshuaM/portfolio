import { useParams, Link } from 'react-router-dom';
import { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
    FaRegCopy,
    FaCheck,
    FaFlask,
    FaFilePdf,
    FaBolt,
} from 'react-icons/fa';

import {
    getResearch,
    getResearches,
} from '../../utils/notesLoader';

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
        fontFamily:
            "'JetBrains Mono', 'Fira Code', Consolas, monospace",
    },
};

function CopyButton({ code }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        });
    }, [code]);

    return (
        <button
            className="notes-code__copy"
            onClick={handleCopy}
            aria-label="Copy code"
        >
            {copied ? (
                <>
                    <FaCheck size={14} />
                    <span>Copied</span>
                </>
            ) : (
                <>
                    <FaRegCopy size={14} />
                    <span>Copy</span>
                </>
            )}
        </button>
    );
}

function CodeBlock({ children, language }) {
    const code = String(children).replace(/\n$/, '');

    return (
        <div className="notes-code__wrapper">
            <div className="notes-code__header">
                {language && (
                    <span className="notes-code__lang">
                        {language}
                    </span>
                )}

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

const TLDRS = [
    "AI speeds up simple, scoped tasks. It struggles the moment context gets messy.",
    "Most “productivity gains” are about speed, not code quality.",
    "Long context doesn’t mean the model remembers everything. It drops key info in the middle.",
    "AI adoption data shows correlation with faster delivery, not fewer bugs.",
    "The real skill shift is reviewing code, not generating it."
];

const INSIGHTS = [
    {
        n: '01',
        title: 'Speed is the only thing AI consistently improves.',
        body: "AI is great at boilerplate, migrations, tests, and repetitive code. The moment the task needs real system understanding, the gains drop fast.",
        tension: 'Velocity ↑ — Quality unmeasured',
    },
    {
        n: '02',
        title: 'Correctness and throughput are competing metrics.',
        body: "Speed and correctness are not the same thing. One goes up easily. The other doesn’t follow.",
        tension: 'Throughput ≠ Correctness',
    },
    {
        n: '03',
        title: 'Context windows are not memory.',
        body: "Long context doesn’t behave like memory. Important details still get ignored, especially in the middle.",
        tension: 'Long context ≠ Recall',
    },
    {
        n: '04',
        title: 'Industry adoption data is correlation, not causation.',
        body: "AI adoption correlates with faster delivery. It does not prove better software quality.",
        tension: 'Adoption ≠ Outcome',
    },
    {
        n: '05',
        title: 'Human review is the bottleneck AI cannot remove.',
        body: "The bottleneck moves from writing code to reviewing it. More AI means more to check, not less work.",
        tension: 'Generation ↓ Cost — Review ↑ Cost',
    },
];

const TAKEAWAYS = [
    {
        n: "01",
        title: "Treat AI output like code you didn’t write.",
        body: "Read it before you trust it. Fluency doesn’t mean correctness."
    },
    {
        n: "02",
        title: "Smaller context wins.",
        body: "Give only what matters. More input doesn’t mean better output."
    },
    {
        n: "03",
        title: "Use it for repetitive work.",
        body: "Boilerplate, tests, small refactors. Not system design."
    },
    {
        n: "04",
        title: "Measure what you ship, not what you generate.",
        body: "Acceptance rate doesn’t mean quality if you’re not reviewing properly."
    },
    {
        n: "05",
        title: "Confidence is not correctness.",
        body: "The smoother the answer, the more you should verify it."
    }
];

export default function ResearchPage() {
    const { slug } = useParams();

    const research = getResearch(slug);

    const meta = getResearches().find(
        (r) => r.id === slug
    );

    if (!research) {
        return (
            <div className="notes-page">
                <header className="notes-header">
                    <Link
                        to="/notes"
                        className="notes-back"
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

                        <span>Research</span>
                    </Link>
                </header>

                <section className="notes-empty section">
                    <p className="notes-empty__emoji">
                        <FaFlask size={32} />
                    </p>

                    <h2>Research not found</h2>

                    <p>
                        The research paper{' '}
                        <strong>{slug}</strong>{' '}
                        could not be found.
                    </p>

                    <Link
                        to="/notes"
                        className="notes-empty__link"
                    >
                        ← Back to Notes Hub
                    </Link>
                </section>
            </div>
        );
    }

    return (
        <div className="notes-page">
            <header className="notes-header">
                <Link
                    to="/notes"
                    className="notes-back"
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

                    <span
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                    >
                        {meta?.icon ? (
                            <meta.icon size={18} />
                        ) : (
                            <FaFlask size={18} />
                        )}

                        Research
                    </span>
                </Link>
            </header>

            <article className="notes-article research-article">
                <div className="notes-article__header research-article__header">
                    <h1 className="notes-article__title">
                        {research.title}
                    </h1>

                    <p className="research-article__dek">
                        AI makes you faster at writing code.
                        It doesn’t prove you’re writing better code.
                        Here’s what the data actually shows, minus the hype.
                    </p>

                    <div className="research-article__meta">
                        {research.level !== 'unknown' && (
                            <span
                                className="notes-topic__level"
                                style={{
                                    '--level-color':
                                        research.level === 'beginner'
                                            ? '#10b981'
                                            : research.level ===
                                              'intermediate'
                                            ? '#f59e0b'
                                            : '#ef4444',
                                }}
                            >
                                {research.level}
                            </span>
                        )}

                        {research.tags
                            .filter(
                                (tag) => tag !== research.level
                            )
                            .map((tag) => (
                                <span
                                    key={tag}
                                    className="notes-topic__tag"
                                >
                                    {tag}
                                </span>
                            ))}

                        <span className="research-article__read">
                            ~12 min read
                        </span>
                    </div>

                    {research.pdf && (
                        <div className="research-article__actions">
                            <a
                                href={research.pdf}
                                download
                                className="research-action research-action--primary"
                                >
                                <FaFilePdf size={14} />
                                Download PDF
                            </a>
                        </div>
                    )}
                </div>

                <section className="research-tldr">
                    <div className="research-tldr__label">
                        <FaBolt size={11} />
                        <span>TL;DR</span>
                    </div>
                    <ul className="research-tldr__list">
                        {TLDRS.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </section>

                <div className="notes-article__body research-article__body">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            pre({ children }) {
                                return (
                                    <pre className="notes-pre">
                                        {children}
                                    </pre>
                                );
                            },

                            code({
                                children,
                                className,
                            }) {
                                const match =
                                    /language-(\w+)/.exec(
                                        className || ''
                                    );

                                const codeString =
                                    Array.isArray(children)
                                        ? children.join('')
                                        : String(children);

                                if (match) {
                                    return (
                                        <CodeBlock
                                            language={
                                                match[1]
                                            }
                                        >
                                            {codeString}
                                        </CodeBlock>
                                    );
                                }

                                return (
                                    <code className="notes-inline-code">
                                        {codeString}
                                    </code>
                                );
                            },

                            table({ children }) {
                                return (
                                    <div className="notes-table__wrapper">
                                        <table className="notes-table">
                                            {children}
                                        </table>
                                    </div>
                                );
                            },
                        }}
                    >
                        {research.content}
                    </ReactMarkdown>
                </div>

                <section className="research-section">
                    <h2 className="research-section__title">
                        What the Data Actually Says
                    </h2>
                    <p className="research-section__intro">
                        Five claims the evidence supports, and the
                        tension each one quietly hides.
                    </p>

                    <ol className="research-insights">
                        {INSIGHTS.map((ins) => (
                            <li
                                key={ins.n}
                                className="research-insight"
                            >
                                <div className="research-insight__num">
                                    {ins.n}
                                </div>
                                <div className="research-insight__body">
                                    <h3 className="research-insight__title">
                                        {ins.title}
                                    </h3>
                                    <p>{ins.body}</p>
                                    <span className="research-insight__tension">
                                        {ins.tension}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                <section className="research-section research-section--takeaway">
                    <h2 className="research-section__title">
                        Developer Takeaway
                    </h2>
                    <p className="research-section__intro">
                        What you should actually change in your
                        workflow.
                    </p>

                    <ol className="research-takeaways">
                        {TAKEAWAYS.map((t) => (
                            <li
                                key={t.n}
                                className="research-takeaway"
                            >
                                <span className="research-takeaway__num">
                                    {t.n}
                                </span>
                                <div className="research-takeaway__body">
                                    <h3>{t.title}</h3>
                                    <p>{t.body}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                <section className="research-bottomline">
                    <div className="research-bottomline__label">
                        The Bottom Line
                    </div>

                    <p className="research-bottomline__lead">
                        AI helps a lot with the easy 80%. The remaining 20% is where real engineering lives, and that part doesn’t get magically solved.
                    </p>

                    <p className="research-bottomline__body">
                        You don’t get “less work,” you get different work. More output means more review. Teams that don’t adjust for that just end up shipping faster with the same mistakes.
                    </p>
                </section>
                <p className="research-limitations">
                    This is a synthesis of existing work, not a definitive answer. Different studies measure different things, so take it as context, not truth.
                </p>
            </article>
        </div>
    );
}