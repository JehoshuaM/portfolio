import { ArrowUpRight } from 'lucide-react'

const links = [
  {
    label: 'Discord',
    value: 'FabledRuns',
    href: 'https://discord.com/users/938728668820295710',
  },
  {
    label: 'GitHub',
    value: 'FabledRuns',
    href: 'https://github.com/fabledruns',
  },
  {
    label: 'LinkedIn',
    value: 'Jehoshua M',
    href: 'https://linkedin.com/in/jehoshua-m',
  },
]

export default function Contact() {
  return (
    <section id="contact" className="contact section" aria-labelledby="contact-heading">
      <div className="contact__intro">
        <p className="section-label section-label--light">Contact</p>
        <p className="contact__aside">online somewhere, probably debugging</p>
      </div>

      <div className="contact__title">
        <h2 id="contact-heading">
          Contact &
          <span> enquiries</span>
        </h2>
      </div>

      <div className="contact__list">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="contact__link"
            aria-label={`${link.label}: ${link.value} (opens in new tab)`}
          >
            <div>
              <p className="contact__label">{link.label}</p>
              <p className="contact__value" aria-hidden="true">{link.value}</p>
            </div>
            <span className="contact__icon" aria-hidden="true">
              <ArrowUpRight size={18} />
            </span>
          </a>
        ))}
      </div>

      <div className="contact__footer">
        <span>discord / github / linkedin</span>
        <span>built somewhere past midnight</span>
      </div>
    </section>
  )
}
