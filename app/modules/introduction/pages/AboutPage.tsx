import dayjs from 'dayjs';
import { SlBriefcase, SlUser } from 'react-icons/sl';

import HeroSection from '~/modules/core/components/base/HeroSection';
import { DefaultLayout } from '~/modules/core/components/layouts/DefaultLayout';

import { AboutMeShortSection } from '../components/AboutMeShortSection';
import GetInTouchSection from '../components/GetInTouchSection';

const experiences = [
  {
    company: 'GoTo Financial',
    link: 'https://www.gotocompany.com/en/products/goto-financial',
    role: 'Frontend Lead',
    start: '2024-07-01',
    end: null,
    descriptions: [
      <div key={0}>
        At GoTo Financial, I <span className="font-semibold">lead</span> the
        Merchant Lending team, delivering financing solutions to{' '}
        <span className="font-semibold">empower</span> our merchant ecosystem
        and support their business <span className="font-semibold">growth</span>
        . I&apos;ve gained experience managing{' '}
        <span className="font-semibold">high-usage</span> products,{' '}
        collaborating with <span className="font-semibold">global teams</span>{' '}
        to integrate multiple subsystems, and focusing on{' '}
        <span className="font-semibold">cost efficiency</span> and{' '}
        <span className="font-semibold">profitability</span>.
      </div>,
      <div key={1}>
        My first project involved rebranding our flagship product with a new
        service and user experience. We successfully delivered it{' '}
        <span className="font-semibold">on time</span> with{' '}
        <span className="font-semibold">zero downtime</span>,{' '}
        <span className="font-semibold">improved testing coverage</span> by over
        50%, and developed a{' '}
        <span className="font-semibold">standardized UI</span> library with
        design tokens.
      </div>,
    ],
  },
  {
    company: 'Kargo Technologies',
    link: 'https://kargo.tech/',
    role: 'Senior Frontend Engineer',
    start: '2021-06-01',
    end: '2024-07-01',
    descriptions: [
      <div key={0}>
        Working at a <span className="font-semibold">fast-growing</span>{' '}
        logistic company has offered valuable learning opportunities.
      </div>,
      <div key={1}>
        I <span className="font-semibold">initiated</span> frontend unit
        testing, <span className="font-semibold">published</span> NPM packages,{' '}
        <span className="font-semibold">improved</span> CI/CD, built{' '}
        <span className="font-semibold">growth-focused</span> features in web
        and mobile apps, <span className="font-semibold">optimized</span>{' '}
        funnels, conducted A/B testing, and{' '}
        <span className="font-semibold">integrated AI</span> to enhance
        operations.
      </div>,
    ],
  },
  {
    company: 'Bukalapak',
    link: 'https://www.bukalapak.com/',
    role: 'Frontend Engineer',
    start: '2018-07-01',
    end: '2021-06-01',
    descriptions: [
      <div key={0}>
        Bukalapak, beyond being an online marketplace, also offers financial
        products to empower users by increasing their purchasing power and
        supporting business growth.
      </div>,
      <div key={1}>
        I developed <span className="font-semibold">webview</span> pages and{' '}
        <span className="font-semibold">dashboards</span> for financial
        products, doing <span className="font-semibold">cloud migration</span>{' '}
        to GCP, gaining hands-on experience with{' '}
        <span className="font-semibold">diverse tech stacks and workflows</span>
        . This role marked my first venture into building products in a tech
        startup environment.
      </div>,
    ],
  },
  {
    company: 'Artcak Technology',
    link: 'https://artcak.id/',
    role: 'Web Developer',
    start: '2017-02-01',
    end: '2018-07-01',
    descriptions: [
      <div key={0}>
        Artcak offers mobile and web development services across various
        industries, including tours and travel, internet providers, and
        state-owned enterprises. My responsibilities included developing{' '}
        <span className="font-semibold">REST APIs</span> and{' '}
        <span className="font-semibold">web dashboards</span>, creating{' '}
        <span className="font-semibold">project starters</span>, implementing{' '}
        <span className="font-semibold">API testing</span>, and{' '}
        <span className="font-semibold">integrating Docker</span> into our
        workflow.
      </div>,
    ],
  },
  {
    company: null,
    link: null,
    role: 'Freelance Web Developer',
    start: '2015-11-01',
    end: '2017-02-01',
    descriptions: [
      <div key={0}>
        This marked <span className="font-semibold">the beginning</span> of my
        professional software development journey. During college, I took on{' '}
        <span className="font-semibold">freelance projects</span> referred by
        friends and lecturers.
      </div>,
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

export default function AboutPage() {
  return (
    <DefaultLayout isFooterLinksVisible={false}>
      <HeroSection
        description="Who is Surya and what he does"
        title={
          <>
            <div className="relative h-4 w-4 rounded-full bg-amber-500 dark:bg-slate-800 md:h-8 md:w-8">
              <SlUser className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 md:h-10 md:w-10" />
            </div>
            <div>About</div>
          </>
        }
      />

      <AboutMeShortSection />

      <section className="container mx-auto mb-12 mt-4 pt-16 text-xl font-light md:mb-20 lg:max-w-5xl">
        <h2 className="mb-10 inline-flex items-center gap-4 text-2xl font-extrabold text-slate-800 dark:text-slate-200">
          <div className="relative h-8 w-8 rounded-full bg-amber-500 dark:bg-slate-800">
            <SlBriefcase className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div>Experience</div>
        </h2>
        {experiences.map(
          ({ company, link, role, start, end, descriptions }, index) => (
            <div className="relative pb-8 pl-6" key={company}>
              <div className="absolute left-0 top-2 inline-flex h-2 w-2 animate-ping rounded-full bg-amber-500" />
              <div className="absolute left-0 top-2 inline-flex h-2 w-2 rounded-full bg-amber-500" />
              {index < experiences.length - 1 && (
                <div className="absolute left-[3px] top-2 -z-10 -mb-10 h-full border-l-2 border-slate-100 dark:border-slate-800" />
              )}
              <h3 className="mb-0 pb-1 text-sm font-bold leading-6 text-slate-700 dark:text-slate-300 md:text-base">
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
              <small className="mb-4 block text-sm font-light leading-6 text-slate-500">
                {formatWorkDuration(start, end)}
              </small>
              {descriptions.map((description, descriptionIndex) => (
                <p
                  className="mb-4 text-sm font-light leading-6 md:text-base"
                  key={descriptionIndex}
                >
                  {description}
                </p>
              ))}
            </div>
          ),
        )}
      </section>

      <GetInTouchSection className="py-16" />
    </DefaultLayout>
  );
}
