import { FaPython, FaJava } from 'react-icons/fa';
import { SiC } from 'react-icons/si';
import { SiJavascript, SiGnubash } from "react-icons/si";
import { FaFlask, FaBrain } from 'react-icons/fa';

const markdownModules = import.meta.glob('/src/content/notes/**/*.md', {
    query: '?raw',
    eager: true,
});

const researchModules = import.meta.glob('/src/content/researches/**/*.md', {
    query: '?raw',
    eager: true,
});

function parseFrontmatter(raw) {
    const match = raw.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);

    if (!match) return { data: {}, content: raw };

    const frontmatterBlock = match[1];
    const content = match[2];

    const data = {};

    for (const line of frontmatterBlock.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        const colonIdx = trimmed.indexOf(':');
        if (colonIdx === -1) continue;

        const key = trimmed.slice(0, colonIdx).trim();
        let value = trimmed.slice(colonIdx + 1).trim();

        if (value.startsWith('[') && value.endsWith(']')) {
            value = value
                .slice(1, -1)
                .split(',')
                .map(v => v.trim().replace(/^['"]|['"]$/g, ''))
                .filter(Boolean);
        }

        else if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
        ) {
            value = value.slice(1, -1);
        }

        data[key] = value;
    }

    return { data, content };
}

function parseCollection(modules, basePath) {
    const items = [];

    for (const [path, mod] of Object.entries(modules)) {
        const raw = mod.default || mod;
        const { data: frontmatter, content } = parseFrontmatter(raw);

        const segments = path
            .replace(basePath, '')
            .replace('.md', '')
            .split('/');

        const language = segments[0];
        const slug = segments[segments.length - 1];

        items.push({
            slug,
            language,
            title: frontmatter.title || slug.replace(/-/g, ' '),
            tags: Array.isArray(frontmatter.tags)
                ? frontmatter.tags
                : [],
            level: frontmatter.level || 'unknown',
            pdf: frontmatter.pdf || null,
            content,
            path,
        });
    }

    return items;
}

const allNotes = parseCollection(markdownModules, '/src/content/notes/');
const allResearches = parseCollection(researchModules, '/src/content/researches/');

const LANGUAGE_META = {
    python: { name: 'Python', icon: FaPython, color: '#3776AB', accentColor: '#FFD43B' },
    c: { name: 'C', icon: SiC, color: '#A8B9CC', accentColor: '#555555' },
    java: { name: 'Java', icon: FaJava, color: '#ED8B00', accentColor: '#5382A1' },
    javascript: { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', accentColor: '#20232A' },
    bash: { name: 'Bash', icon: SiGnubash, color: '#4EAA25', accentColor: '#89C35C' },
};

const RESEARCH_META = {
    "ai-assisted-development": {
        name: "AI-Assisted Development",
        icon: FaBrain,
        color: '#8B5CF6',
        accentColor: '#EC4899',
    },
};

export function getLanguages() {
    const languageSet = new Set(allNotes.map((n) => n.language));
    return [...languageSet].map((lang) => ({
        id: lang,
        ...(LANGUAGE_META[lang] || { name: lang, icon: null, color: '#6a3cb6', accentColor: '#c48a3a' }),
        count: allNotes.filter((n) => n.language === lang).length,
    }));
}

export function getNotesByLanguage(language) {
    return allNotes.filter((n) => n.language === language);
}

export function getNote(language, slug) {
    return allNotes.find((n) => n.language === language && n.slug === slug) || null;
}

export function getLanguageMeta(language) {
    return LANGUAGE_META[language] || { name: language, icon: null, color: '#6a3cb6', accentColor: '#c48a3a' };
}

export function getResearches() {
    return allResearches.map((research) => ({
        id: research.slug,
        ...(RESEARCH_META[research.slug] || {
            name: research.title,
            icon: FaFlask,
            color: '#6a3cb6',
            accentColor: '#c48a3a',
        }),
        count: 1,
    }));
}

export function getResearch(slug) {
    return (allResearches.find((r) => r.slug === slug) || null);
}
