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
import { SlMagnifier } from 'react-icons/sl';

const GetInTouchSection = forwardRef<HTMLElement, GetInTouchSectionProps>(
  (props, ref) => {
    return (
      <section
        className={`flex flex-col gap-2 ${props.className}`}
        id="connect"
        ref={ref}
      >
        <h2 className="mx-auto inline-flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-slate-200">
          <div className="relative h-3 w-3 rounded-full bg-amber-500 dark:bg-slate-800">
            <SlMagnifier className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div>Find me on</div>
        </h2>
        <div className="mx-auto flex gap-2">
          {SOCIAL_LINKS.map(({ id, Icon, href, label }) => (
            <a
              aria-label={label}
              className="group rounded-xl bg-slate-50 p-5 transition hover:scale-105 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800"
              href={href}
              key={id}
              rel="noreferrer"
              target="_blank"
            >
              <Icon className="h-12 w-12 text-slate-400 transition-transform group-hover:scale-110 group-hover:text-slate-500 dark:group-hover:text-slate-300 md:h-20 md:w-20" />
            </a>
          ))}
        </div>
      </section>
    );
  },
);

GetInTouchSection.displayName = 'GetInTouchSection';

export default GetInTouchSection;
