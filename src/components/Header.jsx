import { Link } from 'react-router-dom';

const links = [
  { label: 'Intro', href: '#intro' },
  { label: 'Scenes', href: '#positions' },
  { label: 'Stack', href: '#stack' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

export default function Header({ className = '' }) {
  return (
    <header className={`header ${className}`.trim()}>
      <a className="header__brand" href="#hero">
        Jehoshua
      </a>

      <nav className="header__nav" aria-label="Primary">
        {links.map((item) => (
          <a key={item.label} href={item.href} className="header__link">
            {item.label}
          </a>
        ))}
        <Link to="/notes" className="header__link" viewTransition>
          Notes
        </Link>
      </nav>
    </header>
  )
}