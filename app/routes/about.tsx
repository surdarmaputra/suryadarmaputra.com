import dayjs from 'dayjs';
import { MetaFunction } from 'remix';

import { DefaultLayout } from '~/components/layouts/DefaultLayout';

const experiences = [
  {
    company: 'Kargo Technologies',
    link: 'https://kargo.tech/',
    role: 'Frontend Engineer',
    start: '2021-06-01',
    end: null,
    descriptions: [
      'In Kargo Technologies we are solving problems in trucking industry. Our mission is to re-imagine logistic in Indonesia through technology.',
    ],
  },
  {
    company: 'Bukalapak',
    link: 'https://www.bukalapak.com/',
    role: 'Frontend Engineer',
    start: '2018-07-01',
    end: '2021-06-01',
    descriptions: [
      'Apart from being an online marketplace, Bukalapak also provides various financial products for buyers, sellers and O2O (online-to-offline) partners, increasing their purchasing power or supporting their business growth.',
      'I am responsible for the development of many webview pages related to financial products as well as several web dashboards for our internal team and partners.',
    ],
  },
  {
    company: 'Artcak Technology',
    link: 'https://artcak.id/',
    role: 'Web Developer',
    start: '2017-02-01',
    end: '2018-07-01',
    descriptions: [
      'Artcak provided mobile and web development services for clients in various sectors, including but not limited to tours & travel, internet providers and state-owned companies.',
      'I am responsible for the development of REST API and web dashboard.',
    ],
  },
  {
    company: null,
    link: null,
    role: 'Freelance Web Developer',
    start: '2015-11-01',
    end: '2017-02-01',
    descriptions: [
      "Here's the starting point of my professional software development journey. During my college days, I worked on freelance projects from friends or lecturers.",
    ],
  },
];

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

export const meta: MetaFunction = () => {
  return {
    title: 'Surya Darma Putra - About me',
    description:
      "👋 Hello, I'm Surya, a software engineer based in Bali, Indonesia. I do web development using JavaScript, React and Vue ecosystems.",
    keywords: ['software engineer', 'javascript', 'react', 'vue'].join(', '),
  };
};

export default function About() {
  return (
    <DefaultLayout>
      <section className="flex flex-wrap-reverse mt-28 mb-24 md:mb-36 items-center text-2xl font-light">
        <div className="w-full md:w-1/2">
          <h2 className="mb-6 text-black dark:text-slate-100">
            Hi, you can call me{' '}
            <span className="text-orange-500 dark:text-amber-500">Surya</span>.
            I'm a software engineer based in Bali, Indonesia.
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            I do web development using JavaScript, React and Vue ecosystems, and
            help people to build product in various sectors including
            e-commerce, financial services, logistics and more.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="overflow-hidden h-40 w-40 mb-20 md:mb-0 md:h-80 md:w-72 rounded-full md:rounded-none md:rounded-tl-[8rem] md:rounded-tr-[0.5rem] md:rounded-bl-[0.5rem] md:rounded-br-[2rem] shadow-2xl">
            <img alt="My portrait" src="/me.jpeg" />
          </div>
        </div>
      </section>

      <section className="mb-12 md:mb-20 text-xl font-light">
        <h2 className="text-2xl font-normal tracking-wide text-black dark:text-slate-100 mb-6">
          Experiences
        </h2>
        {experiences.map(
          ({ company, link, role, start, end, descriptions }, index) => (
            <div className="pb-8 pl-6 relative" key={company}>
              <div className="absolute left-0 top-3 animate-ping inline-flex w-1.5 h-1.5 rounded-full bg-amber-500" />
              <div className="absolute left-0 top-3 inline-flex w-1.5 h-1.5 rounded-full bg-amber-500" />
              {index < experiences.length - 1 && (
                <div className="absolute left-0.5 top-4 -mb-10 h-full border-l-2 border-slate-100 dark:border-slate-800 -z-10" />
              )}
              <h3 className="mb-0 text-lg font-normal text-slate-700 dark:text-slate-300 pb-1">
                {role}
                {company && (
                  <>
                    <span> at </span>
                    <a className="animated-underline pb-0.5" href={link}>
                      {company}
                    </a>
                  </>
                )}
              </h3>
              <small className="block text-xs text-slate-500 mb-4">
                {formatWorkDuration(start, end)}
              </small>
              {descriptions.map((description, descriptionIndex) => (
                <p
                  className="mb-4 text-sm leading-loose"
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
