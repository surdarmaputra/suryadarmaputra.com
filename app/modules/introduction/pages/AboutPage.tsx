import dayjs from 'dayjs';

import { ArrowRight } from '~/modules/core/components/base/Icon';
import { DefaultLayout } from '~/modules/core/components/layouts/DefaultLayout';
import { links } from '~/modules/core/components/sections/Footer';
import OptimizedImage from '~/modules/image-optimizer/components/OptimizedImage/OptimizedImage';

const experiences = [
  {
    company: 'Kargo Technologies',
    link: 'https://kargo.tech/',
    role: 'Frontend Engineer',
    start: '2021-06-01',
    end: null,
    descriptions: [
      'Working in this growing company provides an opportunity for me to become a researcher and product engineer. I did research on deployment strategies, testing tools, library management, and design system. Also contributed to the development of our SaaS products.',
    ],
  },
  {
    company: 'Bukalapak',
    link: 'https://www.bukalapak.com/',
    role: 'Frontend Engineer',
    start: '2018-07-01',
    end: '2021-06-01',
    descriptions: [
      'Apart from being an online marketplace, Bukalapak also provides financial products for our users to increase their purchasing power or support their business growth.',
      'I was responsible for the development of webview pages and web dashboards related to financial products. Here I learned to use various tech stacks, workflows and got my first experience building products in tech startup.',
    ],
  },
  {
    company: 'Artcak Technology',
    link: 'https://artcak.id/',
    role: 'Web Developer',
    start: '2017-02-01',
    end: '2018-07-01',
    descriptions: [
      'Artcak provides mobile and web development services for clients in various sectors, including but not limited to tours & travel, internet providers and state-owned companies. I was responsible for the development of REST API and web dashboard.',
    ],
  },
  {
    company: null,
    link: null,
    role: 'Freelance Web Developer',
    start: '2015-11-01',
    end: '2017-02-01',
    descriptions: [
      "Here's the starting point of my professional software development journey. In college, I worked on freelance projects from friends or lecturers.",
    ],
  },
];

const socialLinks = links.filter(({ href }) => href !== '/');

function formatWorkDuration(start: string, end: string | null): string {
  const formattedStart = dayjs(start).format('MMM YYYY');
  const formattedEnd = end ? dayjs(end).format('MMM YYYY') : null;
  const durationMonth = end
    ? dayjs(end).diff(dayjs(start), 'month')
    : dayjs(new Date()).diff(dayjs(start), 'month');
  const duration =
    durationMonth >= 12
      ? `${Math.floor(durationMonth / 12)} years ${durationMonth % 12} months`
      : `${durationMonth} months`;

  if (end === null) {
    return `${formattedStart} - present (${duration})`;
  }

  return `${formattedStart} - ${formattedEnd} (${duration})`;
}

export default function AboutPage() {
  return (
    <DefaultLayout>
      <section className="mb-24 mt-28 flex flex-wrap-reverse items-center text-2xl font-light md:mb-36">
        <div className="absolute left-0 top-96 -z-10 h-72 w-72 rounded-full bg-blue-500 opacity-5 blur-3xl dark:bg-blue-700"></div>
        <div className="absolute right-0 top-24 -z-10 h-72 w-72 rounded-full bg-amber-500 opacity-5 blur-3xl dark:bg-amber-800"></div>

        <div className="w-full md:w-1/2">
          <h2 className="mb-6 leading-tighter text-black dark:text-slate-100">
            Hi 👋🏽, you can call me{' '}
            <span className="text-orange-500 dark:text-amber-500 font-bold">Surya</span>.
            I&apos;m a software engineer based in Indonesia.
          </h2>
          <p className="mb-10 leading-tighter text-slate-500 dark:text-slate-400">
            I build websites using
          </p>
          <ul className="flex flex-col space-y-6 sm:flex-row sm:space-x-10 sm:space-y-0">
            {socialLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  className="animated-underline inline-flex items-center text-base"
                  href={href}
                  rel="noreferrer"
                  target="_blank"
                >
                  Visit my {label} <ArrowRight className="ml-2" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-full justify-center md:w-1/2 md:justify-end">
          <div className="mb-20 h-60 w-60 overflow-hidden rounded-full shadow-2xl md:mb-0 md:h-96 md:w-96 md:rounded-2xl">
            <OptimizedImage alt="Me" src="/me.jpeg" />
          </div>
        </div>
      </section>

      <section className="mb-12 text-xl font-light md:mb-20">
        <h2 className="mb-6 text-2xl font-normal tracking-wide text-black dark:text-slate-100">
          Experiences
        </h2>
        {experiences.map(
          ({ company, link, role, start, end, descriptions }, index) => (
            <div className="relative pb-8 pl-6" key={company}>
              <div className="absolute left-0 top-3 inline-flex h-2 w-2 animate-ping rounded-full bg-amber-500" />
              <div className="absolute left-0 top-3 inline-flex h-2 w-2 rounded-full bg-amber-500" />
              {index < experiences.length - 1 && (
                <div className="absolute left-[3px] top-4 -z-10 -mb-10 h-full border-l-2 border-slate-100 dark:border-slate-800" />
              )}
              <h3 className="mb-0 pb-1 text-lg font-normal text-slate-700 dark:text-slate-300">
                {role}
                {company && (
                  <>
                    <span> at </span>
                    <a
                      className="animated-underline pb-0.5"
                      href={link}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {company}
                    </a>
                  </>
                )}
              </h3>
              <small className="mb-4 block text-sm text-slate-500">
                {formatWorkDuration(start, end)}
              </small>
              {descriptions.map((description, descriptionIndex) => (
                <p
                  className="mb-4 text-base leading-loose"
                  key={descriptionIndex}
                >
                  {description}
                </p>
              ))}
            </div>
          ),
        )}
      </section>
    </DefaultLayout>
  );
}
