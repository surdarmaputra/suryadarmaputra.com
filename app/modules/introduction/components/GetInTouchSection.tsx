import { IconType } from 'react-icons';
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si';

interface SocialLink {
  id: string;
  Icon: IconType;
  href: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'linkedin',
    Icon: SiLinkedin,
    href: 'https://www.linkedin.com/in/surdarmaputra',
  },
  {
    id: 'github',
    Icon: SiGithub,
    href: 'https://github.com/surdarmaputra',
  },
  {
    id: 'x',
    Icon: SiX,
    href: 'https://x.com/surdarmaputra',
  },
];

export interface GetInTouchSectionProps {
  className?: string;
}
import { forwardRef } from 'react';

const GetInTouchSection = forwardRef<HTMLElement, GetInTouchSectionProps>((props, ref) => {
  return (
    <section className={`flex flex-col gap-10 ${props.className}`} ref={ref}>
      <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-200 mx-auto">
        Let&apos;s Get In Touch
      </h2>
      <div className="flex gap-4 mx-auto">
        {SOCIAL_LINKS.map(({ id, Icon, href }) => (
          <a
            className="group rounded-xl dark:bg-slate-900 hover:dark:bg-slate-800 hover:scale-105 transition p-5"
            href={href}
            key={id}
            rel="noreferrer"
            target='_blank'
          >
            <Icon className="w-12 h-12 md:w-20 md:h-20 group-hover:scale-110 group-hover:text-slate-300 transition-transform" />
          </a>
        ))}
      </div>
    </section>
  );
});

GetInTouchSection.displayName = 'GetInTouchSection';

export default GetInTouchSection;