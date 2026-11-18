import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'HiringNow: AI Job Agent Guide & Pricing',
  description:
    'HiringNow (launched 16 Oct 2026, Product Hunt #1 on 14 Nov) is an AI job agent that scans 247,000+ company career sites, tailors your resume, and applies only with your approval. Pricing, the one independent review, and the AIApply comparison.',
  alternates: { canonical: '/hiringnow/' },
};

const faqs = [
  {
    q: 'What is HiringNow?',
    a: 'HiringNow is an AI job search agent. Instead of waiting for you to search job boards, it watches employers\u2019 own career pages, scores new openings against your profile, tailors your resume and cover letter for each one, and applies on the employer\u2019s own site once you approve. It also includes a resume builder and mock interviews. It launched on 16 October 2026 and topped Product Hunt\u2019s Product of the Day on 14 November 2026 \u2014 the Product Hunt win was a visibility moment, not the launch.',
  },
  {
    q: 'Does HiringNow apply to jobs without asking me?',
    a: 'No. Every application needs your approval before anything is submitted \u2014 that is HiringNow\u2019s own stated rule, and the one independent week-long review confirmed nothing went out without approval. Paid tiers differ in how many auto-applies you get per month, not in whether approval is required. Do not read \u201cauto-apply\u201d as fully automatic: the agent prepares the application, you approve it, then it submits.',
  },
  {
    q: 'How much does HiringNow cost?',
    a: 'As listed in the November 2026 independent review: Free is $0 with no card required and 10 auto-applies in total; Pro is $29 a month for 100 auto-applies a month; Autopilot is $49 a month for 300; Autopilot Max is $99 a month for 1,000. Every plan includes job matching and a tailored resume and cover letter per application. HiringNow also lists quarterly billing at a 33% saving. Prices change \u2014 confirm on HiringNow\u2019s pricing page before paying.',
  },
  {
    q: 'What did the one independent review find?',
    a: 'Resumup ran its own job search through HiringNow for a week in November 2026. Of its top 30 recommendations, 28 were the data roles it asked for, and 18 had been posted within the past day. Match scores were modest rather than flattering \u2014 its best match scored 64 \u2014 which made strong fits easy to tell from stretches. Every application came back with a receipt showing the six steps (started, resume tailored, form opened, form read, details filled, submitted) with the employer\u2019s confirmation quoted back. Its one hesitation was the platform\u2019s age: mock interviews were still in beta.',
  },
  {
    q: 'How is HiringNow different from AIApply?',
    a: 'AIApply is the better-known incumbent in the same category: it says it serves 2 million+ job seekers and holds a 4.3 rating on Trustpilot. HiringNow\u2019s pitch is timing rather than scale \u2014 it reads jobs straight from employers\u2019 career pages and applicant tracking systems, aiming to surface roles in the hours before they reach LinkedIn and Indeed, and it shows a receipt for exactly what was submitted. AIApply has the larger user base and review history; HiringNow has the fresher, narrower claim. Compare them on the receipt and the approval flow, not on marketing copy.',
  },
  {
    q: 'What are the 247,000+ sites and the 5-minute scans?',
    a: 'HiringNow says it monitors 247,000+ company career sites every 5 minutes and reads 65+ applicant tracking systems, including Greenhouse, Workday, Lever, Ashby, SmartRecruiters and Taleo. Those are the vendor\u2019s own figures, repeated on its Product Hunt page and in directory listings. No independent source has verified the site count, the scan interval, or how many of those sites actually produce fresh postings. Treat them as the company\u2019s claim about its coverage, not as a measured fact.',
  },
];

const faqJson = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const articleJson = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'HiringNow: AI Job Agent Guide & Pricing',
  description:
    'What HiringNow is, how its find-first apply-with-approval loop works, what it costs, what the one independent week-long review found, and how it compares with AIApply.',
  author: { '@type': 'Organization', name: 'Agent Tools' },
  publisher: { '@type': 'Organization', name: 'Agent Tools' },
  datePublished: '2026-11-15',
  dateModified: '2026-11-15',
};

export default function Page() {
  return (
    <div className="shell page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }} />
      <p className="eyebrow">AI job search agent · 15 Nov 2026</p>
      <h1>HiringNow: Find Jobs First, Apply With Approval</h1>
      <p className="lead">
        HiringNow is an AI job search agent that watches employers&rsquo; own career pages
        instead of waiting for you to search job boards. It launched on 16 October 2026
        and topped Product Hunt&rsquo;s Product of the Day on 14 November 2026 \u2014 the
        Product Hunt win was a visibility moment, not the launch. The pitch is timing:
        find a role in the hours before it reaches LinkedIn or Indeed, get a resume
        tailored to it, and apply on the employer&rsquo;s own site \u2014 but only after you
        approve. This page covers how the loop works, what it costs, what the one
        independent review actually found, and where the vendor&rsquo;s numbers are
        unproven.
      </p>

      <div className="prose">
        <h2>What it is, and what it is not</h2>
        <p>
          HiringNow is built for active job seekers who are applying to many roles. The
          loop has four steps: monitor, match, tailor, apply. It reads job postings
          straight from the applicant tracking systems employers use \u2014 Greenhouse,
          Workday, Lever, Ashby, SmartRecruiters and Taleo, among 65+ systems it says it
          covers \u2014 scores each opening against your profile, rewrites your resume
          and cover letter for that specific job using your real experience, and submits
          the application on the employer&rsquo;s own career site. Every application gets a
          receipt in a job tracker, so you can see exactly what was submitted. A resume
          builder and mock interviews are bundled in; the mock interviews were still in
          beta when the independent review ran in November 2026.
        </p>
        <ul>
          <li><strong>Find first.</strong> HiringNow says it checks 247,000+ company career sites every 5 minutes, so a new posting can reach you before it appears on the big aggregators. Its own FAQ puts the delay before a new job reaches LinkedIn and other boards at six hours to a day. Both numbers are the vendor&rsquo;s claims, not independently measured.</li>
          <li><strong>Apply with approval.</strong> Nothing is submitted without your approval. That is the product&rsquo;s stated rule and the one thing the independent review verified in practice. Paid tiers buy more auto-applies per month, not a waiver of approval.</li>
          <li><strong>Receipts, not black boxes.</strong> Each application returns a receipt showing the six steps \u2014 started, resume tailored, form opened, form read, details filled, submitted \u2014 with the employer&rsquo;s own confirmation message quoted back to you.</li>
          <li><strong>Free to try, no card.</strong> The free plan gives 10 auto-applies in total and never asks for a card at signup, according to the review. Paid plans start at $29 a month.</li>
          <li><strong>Not a recruiter.</strong> It does not negotiate, follow up with hiring managers, or guarantee interviews. It finds roles, tailors applications, and submits them with your approval. The rest of the job search is still yours.</li>
        </ul>

        <h2>How the loop works</h2>
        <ol>
          <li><strong>Set up your profile.</strong> Sign up on the free plan and start from the resume you already have. The AI resume builder rewrites it into an ATS-friendly template for each job description.</li>
          <li><strong>Get matched jobs.</strong> New postings are scored against your skills, experience and location. In the independent review, 28 of the top 30 recommendations were the data roles the reviewer asked for, and 18 had been posted within the past day. Match scores were honest rather than flattering \u2014 the reviewer&rsquo;s best was a 64.</li>
          <li><strong>Review the queue.</strong> The Auto Apply queue shows every application with its resume version (tailored or original) and its live status. Approve the ones you want submitted; skip or edit the rest.</li>
          <li><strong>Apply and keep the receipt.</strong> HiringNow fills out the form on the employer&rsquo;s site and submits it. The receipt shows all six steps plus the employer&rsquo;s confirmation. Every job you saved or applied to flows into a tracker board with Saved, Applied, Interviewing and Negotiating columns.</li>
          <li><strong>Prepare for interviews.</strong> Mock interviews with AI feedback are included, but were still in beta in November 2026 \u2014 expect rough edges there before the core apply loop.</li>
        </ol>

        <h2>Pricing</h2>
        <p>
          Prices below are as listed in the November 2026 independent review. HiringNow
          also lists quarterly billing at a 33% saving. Confirm the current numbers on
          HiringNow&rsquo;s pricing page before paying \u2014 a one-month-old product can
          reprice quickly.
        </p>
        <table>
          <thead>
            <tr><th>Plan</th><th>Price</th><th>Auto-applies</th><th>Notes</th></tr>
          </thead>
          <tbody>
            <tr><td>Free</td><td>$0, no card</td><td>10, one time</td><td>Job matching, tailored resume and cover letter, tracker, Chrome autofill, ATS score</td></tr>
            <tr><td>Pro</td><td>$29 / month</td><td>100 a month</td><td>Unlimited resumes and cover letters, all premium templates, top-up packs</td></tr>
            <tr><td>Autopilot</td><td>$49 / month</td><td>300 a month</td><td>Approve each one or approve by your rules, 3 search profiles, instant alerts</td></tr>
            <tr><td>Autopilot Max</td><td>$99 / month</td><td>1,000 a month</td><td>10 search profiles, highest queue priority, priority support</td></tr>
          </tbody>
        </table>
        <p>
          The free plan is the sensible first step: 10 auto-applies is enough to test
          whether the matches are on-topic for your roles before spending $29. If you
          are applying to more than 100 roles a month, Autopilot is the tier that
          matches that volume; Autopilot Max only makes sense if you are running several
          search profiles in parallel.
        </p>

        <h2>What the one independent review found</h2>
        <p>
          As of 15 November 2026 there is exactly one substantive independent review:
          Resumup ran its own job search through HiringNow for a week, from signup to
          approving applications. Its findings, in its own words:
        </p>
        <ul>
          <li><strong>Matches stayed on topic.</strong> 28 of the top 30 recommendations were the data roles it asked for, and 18 had been posted in the past day.</li>
          <li><strong>Scores were modest.</strong> Its best match scored 64, which made it easy to tell a strong fit from a stretch \u2014 the scores are not inflated to flatter you.</li>
          <li><strong>Approval held.</strong> Nothing went out without approval, and every application came back with a receipt showing exactly what was submitted.</li>
          <li><strong>Setup was quick.</strong> Signup took a few minutes and never asked for a card.</li>
          <li><strong>The caveat is age.</strong> HiringNow is a new platform, and a few tools, like mock interviews, are still in beta. There is no long review history to lean on yet.</li>
        </ul>
        <p>
          One week, one reviewer, one role type. That is a useful smoke test, not a
          verdict. Treat the review as evidence that the core loop works as described,
          and treat everything else \u2014 coverage, accuracy at scale, interview
          prep quality \u2014 as unproven until more reviewers run it.
        </p>

        <h2>HiringNow vs AIApply, and the rest of the new field</h2>
        <p>
          HiringNow is not alone. AIApply is the incumbent in the same category: it says
          it serves 2 million+ job seekers and holds a 4.3 rating on Trustpilot. Two more
          launched on Product Hunt in the same two weeks \u2014 Hira, a free personal job
          search agent you talk to over text or calls, and Talenry, which adds recruiter
          emails and E-Verify and visa-sponsorship status for international candidates.
          The category is crowded and moving fast, so compare on mechanics, not slogans:
        </p>
        <table>
          <thead>
            <tr><th></th><th>HiringNow</th><th>AIApply</th></tr>
          </thead>
          <tbody>
            <tr><td>Pitch</td><td>Find roles before the big boards; apply with approval and a receipt</td><td>Established auto-apply agent with a large user base</td></tr>
            <tr><td>Users / reviews</td><td>Launched Oct 2026; one week-long independent review</td><td>Claims 2M+ job seekers; 4.3 on Trustpilot</td></tr>
            <tr><td>Approval</td><td>Required for every application</td><td>Check the plan \u2014 approval rules vary by product</td></tr>
            <tr><td>Receipts</td><td>Six-step receipt with employer confirmation quoted back</td><td>Not the headline feature</td></tr>
            <tr><td>Free tier</td><td>10 auto-applies, no card</td><td>Check current terms</td></tr>
            <tr><td>Paid from</td><td>$29 / month</td><td>Check current terms</td></tr>
          </tbody>
        </table>
        <p>
          The honest comparison is this: AIApply has the track record, HiringNow has the
          fresher timing claim and the more transparent receipt. If you are applying
          right now, the free 10 auto-applies on HiringNow cost nothing to test \u2014
          run both free tiers on the same roles and compare which one surfaces better
          matches first.
        </p>

        <h2>What this page does not claim</h2>
        <ul>
          <li>247,000+ sites, 5-minute scans and 65+ ATS integrations are HiringNow&rsquo;s own figures. No independent source has verified them.</li>
          <li>The 14 November 2026 Product Hunt #1 was a launch-day win for a product that had already been live for about a month, not a launch.</li>
          <li>Prices are as listed in the November 2026 review ($29 / $49 / $99 a month, free 10 auto-applies). Confirm them before paying.</li>
          <li>The Resumup findings are one reviewer&rsquo;s week with one role type. They do not prove accuracy or coverage for other roles, regions, or volumes.</li>
          <li>AIApply&rsquo;s 2 million+ users and 4.3 Trustpilot rating are the vendor&rsquo;s and the platform&rsquo;s figures, not this site&rsquo;s measurements. Hira and Talenry details come from their Product Hunt pages, not from hands-on testing.</li>
          <li>Mock interviews are in beta. Do not judge the product on them yet.</li>
        </ul>

        <h2>Frequently asked questions</h2>
        {faqs.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}

        <h2>Sources</h2>
        <ul>
          <li>Product Hunt, &ldquo;HiringNow: AI job agent that finds &amp; apply for jobs before anyone else&rdquo; (product page created 2 November 2026, updated 14 November 2026): 247,000+ career sites checked every 5 minutes, resume and cover letter tailored from real experience, applies on company career sites only with approval, resume builder and mock interviews, free with 10 auto-applies, paid plans from $29 a month. See <a href="https://www.producthunt.com/products/hiringnow" target="_blank" rel="noreferrer">producthunt.com</a>.</li>
          <li>Resumup, &ldquo;HiringNow Review 2026: I Ran My Job Search on It for a Week&rdquo; (read 15 November 2026): 28 of top 30 recommendations on-topic, 18 posted within the past day, best match score 64, six-step receipts, free plan signup without a card, pricing table (Free $0 / 10 one-time, Pro $29 / 100 a month, Autopilot $49 / 300, Autopilot Max $99 / 1,000), quarterly billing at a 33% saving, mock interviews in beta. See <a href="https://www.resumup.com/hiringnow-review" target="_blank" rel="noreferrer">resumup.com</a>.</li>
          <li>Visalytica, &ldquo;HiringNow&rdquo; (read 15 November 2026): launched 16 October 2026, monitors 247,000+ company career sites, matches jobs to profile, tailors resume and cover letter, applies with approval, job tracker with receipts. See <a href="https://www.visalytica.com/tool/hiringnow-1278628" target="_blank" rel="noreferrer">visalytica.com</a>.</li>
          <li>twelve.tools, &ldquo;HiringNow&rdquo; (published 3 November 2026): 247,000+ career sites and 65+ applicant tracking systems every 5 minutes, resume and cover letter tailored from experience you actually have, free plan with 10 auto-applies, paid plans from $29 a month. See <a href="https://www.twelve.tools/hiringnow-ai" target="_blank" rel="noreferrer">twelve.tools</a>.</li>
          <li>Unconfirmed and deliberately not asserted here: the 247,000+ site count and 5-minute scan interval (vendor claims only); HiringNow&rsquo;s current pricing beyond the November 2026 review; AIApply&rsquo;s user count and Trustpilot rating beyond the vendor and platform figures; any hands-on results for Hira or Talenry.</li>
        </ul>
        <p><em>Data checked: 2026-11-15. This is a launch-month page: re-check the pricing page and the Product Hunt discussion before relying on it.</em></p>

        <h2>Related tools</h2>
        <p>
          If you like the idea of an agent that works for you while you do other things,
          read the{' '}
          <Link href="/nod-by-n8n">Nod by n8n setup guide</Link> \u2014 a personal agent
          that runs on your own machine with 200+ connections. And if your job search
          involves coding agents, keep their memory consistent with the{' '}
          <Link href="/beacon-agent-memory">Beacon agent memory guide</Link>.
        </p>
      </div>
    </div>
  );
}
