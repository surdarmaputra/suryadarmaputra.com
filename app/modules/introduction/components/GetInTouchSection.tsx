import { IconType } from 'react-icons';
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si';

interface SocialLink {
  id: string;
  Icon: IconType;
  href: string;
  label: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'linkedin',
    Icon: SiLinkedin,
    href: 'https://www.linkedin.com/in/surdarmaputra',
    label: "Visit Surya's LinkedIn",
  },
  {
    id: 'github',
    Icon: SiGithub,
    href: 'https://github.com/surdarmaputra',
    label: "Visit Surya's GitHub",
  },
  {
    id: 'x',
    Icon: SiX,
    href: 'https://x.com/surdarmaputra',
    label: "Visit Surya's X",
  },
];

export interface GetInTouchSectionProps {
  className?: string;
}
import { forwardRef } from 'react';

const GetInTouchSection = forwardRef<HTMLElement, GetInTouchSectionProps>((props, ref) => {
  return (
    <section className={`flex flex-col gap-10 ${props.className}`} id="connect" ref={ref}>
      <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-200 mx-auto">
        Let&apos;s Get In Touch
      </h2>
      <div className="flex gap-4 mx-auto">
        {SOCIAL_LINKS.map(({ id, Icon, href, label }) => (
          <a
            aria-label={label}
            className="group rounded-xl bg-slate-50 hover:bg-slate-200 dark:bg-slate-900 hover:dark:bg-slate-800 hover:scale-105 transition p-5"
            href={href}
            key={id}
            rel="noreferrer"
            target='_blank'
          >
            <Icon className="w-12 h-12 md:w-20 md:h-20 group-hover:scale-110 text-slate-400 group-hover:text-slate-500 group-hover:dark:text-slate-300 transition-transform" />
          </a>
        ))}
      </div>
    </section>
  );
});

GetInTouchSection.displayName = 'GetInTouchSection';

export default GetInTouchSection;