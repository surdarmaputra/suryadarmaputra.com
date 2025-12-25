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
        GoTo Financial provides wide range of financial services for consumers
        and merchants. I build and maintain web apps, mobile app, dashboards and
        frontend libraries to provide lending products across multiple mobile
        apps. Here I&apos;m challenged to deal with a{' '}
        <span className="font-semibold">complex system</span> that serves a{' '}
        <span className="font-semibold">huge traffic</span>, finding balance
        between <span className="font-semibold">beating time-to-market</span>,{' '}
        <span className="font-semibold">code quality</span> and{' '}
        <span className="font-semibold">comply with regulations</span>. Every
        steps we take will impacting a{' '}
        <span className="font-semibold">massive amount of users</span> and
        affect company reputation as a publicly traded entity.
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
        Kargo provides transportation solutions, especially trucks, for
        first-mile, mid-mile and last-mile logistic. Here I experienced working
        at a <span className="font-semibold">fast-growing - early stage</span>{' '}
        company. I contributed to{' '}
        <span className="font-semibold">core engineering</span> and{' '}
        <span className="font-semibold">product engineering</span> team. I
        initiated frontend testing, maintained NPM packages, optimized CI/CD,{' '}
        built and maintained dashboards, mobile webs, and mobile app, conducted
        A/B testing, optimized funnels, and integrated AI into our products.
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
        Bukalapak offers financial solutions to increase customers&apos; buying
        power and empower shop owners&apos; business. I built{' '}
        <span className="font-semibold">web apps</span> and{' '}
        <span className="font-semibold">dashboards</span> to support lending
        business. This role marked my first venture into building products in a{' '}
        <span className="font-semibold">tech startup</span> environment, gaining
        a ton of experiences I never thought before, including cloud
        infrastructure, architecture migration, being on-call engineer, and
        learn diverse tech stacks and workflows.
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
        <span className="font-semibold">REST APIs</span>,{' '}
        <span className="font-semibold">web dashboards</span>,{' '}
        <span className="font-semibold">project starters</span>,{' '}
        <span className="font-semibold">API testing</span>, and{' '}
        <span className="font-semibold">optimizing developer experience</span>.
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
            <div className="relative h-4 w-4 rounded-full bg-amber-500 md:h-8 md:w-8 dark:bg-slate-800">
              <SlUser className="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 md:h-10 md:w-10" />
            </div>
            <div>About</div>
          </>
        }
      />

      <AboutMeShortSection />

      <section className="container mx-auto mt-4 mb-12 pt-16 text-xl font-light md:mb-20 lg:max-w-3xl">
        <h2 className="mb-10 inline-flex items-center gap-4 text-2xl font-extrabold text-slate-800 dark:text-slate-200">
          <div className="relative h-8 w-8 rounded-full bg-amber-500 dark:bg-slate-800">
            <SlBriefcase className="absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div>Experience</div>
        </h2>
        {experiences.map(
          ({ company, link, role, start, end, descriptions }, index) => (
            <div className="relative pb-8 pl-6" key={company}>
              <div className="absolute top-2 left-0 inline-flex h-2 w-2 animate-ping rounded-full bg-amber-500" />
              <div className="absolute top-2 left-0 inline-flex h-2 w-2 rounded-full bg-amber-500" />
              {index < experiences.length - 1 && (
                <div className="absolute top-2 left-[3px] -z-10 -mb-10 h-full border-l-2 border-slate-100 dark:border-slate-800" />
              )}
              <h3 className="mb-0 pb-1 text-sm leading-6 font-bold text-slate-700 md:text-base dark:text-slate-300">
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
              <small className="mb-4 block text-sm leading-6 font-light text-slate-500">
                {formatWorkDuration(start, end)}
              </small>
              {descriptions.map((description, descriptionIndex) => (
                <p
                  className="mb-4 text-sm leading-6 font-light md:text-base"
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
