import dayjs from 'dayjs';

import DefaultLayout from '~/components/layouts/DefaultLayout';

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
      'My team provided various financial products for our buyers, sellers and (online-to-offline) O2O partners, improving their buying power or supporting their business growth.',
      'We also worked on several web dashboards to make managing loan applications easier for internal team and partners.',
    ],
  },
  {
    company: 'Artcak Technology',
    link: 'https://artcak.id/',
    role: 'Web Developer',
    start: '2017-02-01',
    end: '2018-07-01',
    descriptions: [
      'Artcak provided mobile and web development services for clients in various sectors, including but not limited to tour & travel, internet provider and state-owned enterprises',
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

export default function About() {
  return (
    <DefaultLayout>
      <section className="flex flex-wrap-reverse mt-28 mb-24 md:mb-36 items-center text-2xl font-light">
        <div className="w-full md:w-1/2">
          <h2 className="mb-6 text-black dark:text-slate-100">
            Hi, you can call me{' '}
            <span className="text-orange-500 dark:text-amber-500">Surya</span>.
            I'm a web developer based in Bali, Indonesia.
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            I’ve been working as a web developer in various sectors, including
            education, tour & travel, e-commerce, financial services and
            logistics.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="overflow-hidden h-40 w-40 mb-20 md:mb-0 md:h-80 md:w-72 rounded-full md:rounded-none md:rounded-tl-[8rem] md:rounded-br-[4rem] shadow-2xl">
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