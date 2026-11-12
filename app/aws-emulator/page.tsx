import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AWS Emulator: Local AWS Testing Guide',
  description:
    'AWS Emulator (11 Nov 2026) runs 200+ AWS services on your laptop, free and CC0-licensed, built by AI agents. Install, limits, and the LocalStack comparison.',
  alternates: { canonical: '/aws-emulator/' },
};

const faqs = [
  {
    q: 'What is AWS Emulator?',
    a: 'A local emulator of the AWS APIs, released by AWS on 11 November 2026. The AWS CLI, SDKs and coding agents talk to it over a local HTTPS endpoint (127.0.0.1:9297) using the same APIs they use in the cloud. You need no AWS account and pay no service fee — you pay only for AWS resources when you deploy. It is written in Rust, has no graphical interface, and is released under a CC0 public-domain dedication.',
  },
  {
    q: 'Was it really written entirely by AI agents?',
    a: 'That is AWS\u2019s own wording. Senior Principal Engineer Matthew Goldberg writes: \u201cThe emulator was written entirely by autonomous agents. Our team hasn\u2019t written or reviewed any of the code.\u201d Three teams of agents build it — one writes fidelity tests, one finds divergences, one fixes them — and every change passes a merge gate that includes security agents doing adversarial review. Humans built the scaffolding, the guardrails and the gate; the emulator code itself is agent-written, which is not the same as \u201cno humans were involved.\u201d',
  },
  {
    q: 'What happens when an operation isn\u2019t implemented yet?',
    a: 'It returns HTTP 501 Not Implemented, so your test fails loudly instead of passing silently. AWS publishes a per-service fidelity score with each release, and known gaps are tracked as files in the repository\u2019s issues/things-that-do-not-work/ folder — 6,545 tracked files when checked on 12 November 2026. Check the fidelity scores and that folder before assuming your workload runs locally.',
  },
  {
    q: 'Can I use it to test IAM permissions?',
    a: 'No. AWS is explicit: the emulator does not evaluate IAM policies or resource-based policies the way AWS does, so a request AWS would deny can succeed locally. Requests signed with the emulator\u2019s own keys are never denied. It also acts as a single account, with no cross-account or cross-Region behavior. Do not use it for security testing or production workloads — keep permission tests on real AWS.',
  },
  {
    q: 'How is it different from LocalStack?',
    a: 'AWS Emulator is official, written in Rust, and built from AWS\u2019s own Smithy API models; LocalStack is a third-party Python project started in October 2016 that grew to about 65,000 stars. AWS Emulator is free with no tiers and publishes per-release fidelity scores plus a public gap folder. LocalStack\u2019s open-source repository has since been archived as the project consolidates into a single unified image, with a free Hobby plan for non-commercial use. The two are not drop-in replacements for each other: fidelity varies by service on both, so check the scores for the services you use.',
  },
  {
    q: 'Does AWS Emulator send telemetry back to AWS?',
    a: 'Yes, by default. The README says it collects usage data with strict data minimization: records never include what is in your requests or responses, your code, your credentials, or personal data, and telemetry is not shared with third parties. Turn it off with aws-emulator --telemetry off, EMULATOR_TELEMETRY=off, a config.toml setting, or the embedded configuration API.',
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
  headline: 'AWS Emulator: Local AWS Testing Guide',
  description:
    'What AWS Emulator is, how autonomous agents built it, where its fidelity stops — shape is not behavior — and how to install it and compare it with LocalStack.',
  author: { '@type': 'Organization', name: 'Agent Tools' },
  publisher: { '@type': 'Organization', name: 'Agent Tools' },
  datePublished: '2026-11-12',
  dateModified: '2026-11-12',
};

export default function Page() {
  return (
    <div className="shell page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }} />
      <p className="eyebrow">Local AWS emulator · 12 Nov 2026</p>
      <h1>AWS Emulator: AWS on Your Laptop — With Limits You Must Know</h1>
      <p className="lead">
        On 11 November 2026 AWS released AWS Emulator — a free, CC0-licensed local copy of
        more than 200 AWS services that runs on your own machine, no AWS account required.
        The AWS CLI, SDKs and coding agents talk to it over a local HTTPS endpoint using the
        same APIs they use in the cloud. The headline is not just the tool: AWS says
        autonomous AI agents wrote every line of it, and no human on the team wrote or
        reviewed any of the code. This page covers what it does, where it stops, and how to
        install it — including the limits AWS states in its own documentation.
      </p>

      <div className="prose">
        <h2>What it is, and what it is not</h2>
        <p>
          AWS Emulator is a local program that serves AWS API endpoints. You start it, point
          the AWS CLI or an SDK at its endpoint through environment variables, and run your
          code as usual — requests never leave your machine. It is built from 438 AWS API
          models, the same Smithy models the AWS SDKs are built from, covering more than 200
          services with about 160 service crates in a Rust workspace. It has no graphical
          interface and no web console.
        </p>
        <ul>
          <li><strong>No account, no service fee.</strong> You do not need an AWS account. AWS Emulator has no additional service fee; you pay only for AWS resources when you deploy on AWS.</li>
          <li><strong>Local HTTPS endpoint.</strong> When run from source it serves HTTPS on <code>127.0.0.1:9297</code> with a self-signed certificate, so only your own computer can reach it. It generates its own credentials, a config file and a certificate on start, written to <code>~/.aws/emulator/9297/</code>.</li>
          <li><strong>In-memory state.</strong> Resources live in memory and are gone when the emulator stops. One emulator acts as a single account — run one per Region if you need separation.</li>
          <li><strong>CC0 public domain.</strong> The code is released under CC0-1.0, except the <code>vendor/</code> directory, which is Apache 2.0. The repository does not take pull requests; bugs and fidelity gaps go to GitHub Issues.</li>
          <li><strong>Not a cloud.</strong> It emulates API responses. It is not a deployment target, not a load-test rig, and not a security test — see the limits below.</li>
        </ul>
        <p>
          The launch landed hard: the announcement reached the Hacker News front page on
          launch day (646 points, 212 comments), and the repository — created 11 September
          2026 — passed 3,800 stars within about a day of launch (3,862 when checked on
          12 November; star counts move daily). The launch-day release was v1.0.322.
        </p>

        <h2>The agent-built story</h2>
        <p>
          The project started as a weekend experiment. Senior Principal Engineer Matt
          Goldberg gave Kiro a three-step prompt — write tests from the AWS CLI, iterate
          until they pass against real AWS, build an in-memory implementation those same
          tests pass against — and got a passable SQS emulator in about 15 minutes. His team
          was using it to test their own software by the Monday. Turning the prototype into
          a product meant building the guardrails that let agents work unsupervised.
        </p>
        <p>
          Three teams of agents build it, each with a bounded job:
        </p>
        <ul>
          <li><strong>Test writers</strong> devise fidelity tests — real-world AWS scenarios — from the public API models, verify each one against real AWS, and save tens of thousands of them in a shared repository.</li>
          <li><strong>Issue finders</strong> replay those tests against the emulator and file what fails into a <code>things-that-do-not-work</code> folder, next to a <code>things-that-now-work</code> folder for fixed issues.</li>
          <li><strong>Fixers</strong> take one issue each and send fixes through a merge gate — build, code review, security review and fidelity checks — before anything reaches mainline. AWS says thousands of issues are fixed every day as hundreds of agents work concurrently.</li>
        </ul>
        <p>
          The guardrail is the point. The merge gate includes several security agents doing
          adversarial reviews, plus deterministic checks that stop agents touching code they
          are not supposed to. Goldberg&rsquo;s own summary, from the About Amazon post:{' '}
          <em>&ldquo;The emulator was written entirely by autonomous agents. Our team
          hasn&rsquo;t written or reviewed any of the code.&rdquo;</em> That is AWS&rsquo;s
          claim about the emulator code — humans designed the specs, the tests and the gate
          around it. Do not repeat it as &ldquo;AWS built this with no human involvement.&rdquo;
        </p>

        <h2>Shape is not behavior</h2>
        <p>
          The most important sentence in the AWS announcement is a narrow one: because the
          emulator is built from the same API models the SDKs use, &ldquo;your requests and
          the errors you get back have the same shape as on AWS.&rdquo; Same shape is a claim
          about form. It is not a claim of behavioral equivalence, and it is not a
          certification that a passing local run predicts a passing production run.
        </p>
        <p>
          Three mechanisms keep the boundary honest, and you should use all of them before
          relying on the emulator:
        </p>
        <ol>
          <li><strong>HTTP 501, not silent success.</strong> An operation the emulator does not implement yet returns 501 Not Implemented, so tests fail right away instead of passing on a stub.</li>
          <li><strong>Fidelity scores per release.</strong> AWS publishes how closely each service matches real AWS with every release, measured against real AWS. Behavior is checked against <code>us-west-2</code> only, apart from global services.</li>
          <li><strong>A public gap folder.</strong> Individual gaps are tracked as files in the repository&rsquo;s <code>issues/things-that-do-not-work/</code> directory (6,545 tracked files when checked on 12 November 2026), and the fidelity test suite itself is public in the <code>aws-emulator-evaluation-suite</code> repository, including the tests that do not pass yet.</li>
        </ol>
        <p>
          Practical check before you adopt it for a project: find your services&rsquo;
          fidelity scores on the releases page, search{' '}
          <code>issues/things-that-do-not-work/</code> for the operations you call, then run
          your own suite and watch for 501s. If a service you depend on is thin, keep its
          tests on real AWS.
        </p>

        <h2>What it cannot do</h2>
        <ul>
          <li>
            <strong>No IAM evaluation.</strong> The emulator does not evaluate IAM policies
            or resource-based policies the way AWS does, so a request AWS would deny can
            succeed locally — and the reverse can happen too. Requests signed with the
            emulator&rsquo;s own keys are never denied. Do not use it to test whether your
            application is secure.
          </li>
          <li>
            <strong>No production use.</strong> The README is direct: &ldquo;AWS Emulator is
            for building and testing. Don&rsquo;t use it for production workloads or to test
            security.&rdquo; AWS has not tested it for long-running use.
          </li>
          <li>
            <strong>No failure simulation yet.</strong> At launch it does not simulate
            throttling, outages or per-Region availability differences — the things that
            matter most for resilience testing, per IDC analyst comment on the launch. Keep
            resilience tests on real AWS.
          </li>
          <li>
            <strong>Function code is not sandboxed.</strong> Code you hand the emulator runs
            with your user&rsquo;s permissions and can read and change your files. Treat it
            like running untrusted code on your own machine, not like a container.
          </li>
          <li>
            <strong>Watch your credentials.</strong> If <code>AWS_ENDPOINT_URL</code> is
            not set, your code calls real AWS with whatever credentials it finds — so a
            test that misses the emulator can spend real money or touch real resources. The
            emulator&rsquo;s own access key IDs start with <code>EMULATOR</code> so you can
            tell them apart from real keys.
          </li>
        </ul>

        <h2>Install</h2>
        <p>
          Pick the path for your platform. In all modes, point your tools at the local
          endpoint with environment variables — your application code stays unchanged:
        </p>
        <pre><code>AWS_ENDPOINT_URL=https://127.0.0.1:9297</code></pre>
        <ul>
          <li><strong>Linux:</strong> install the RPM or Debian package and run <code>aws-emulator</code>. Packages are published at <code>https://downloads.aws.com/aws-emulator/packages/aws-emulator/LTS/latest</code>.</li>
          <li><strong>macOS / Windows:</strong> run the emulator in a container built from a short Dockerfile (see the user guide&rsquo;s Docker page).</li>
          <li><strong>With an AI coding agent:</strong> install the <code>aws-emulator</code> skill, then ask your agent to set it up. This needs AWS CLI 2.35.0 or later: <code>aws agent-toolkit add-skill --skill-name aws-emulator --region us-east-1</code>.</li>
          <li><strong>Embedded mode (Rust tests):</strong> add the emulator as a dev-dependency and run it in-process, one isolated instance per test — no endpoint URL, certificate or environment variable to set.</li>
          <li><strong>From source:</strong> Linux x86_64 and aarch64 only. You need a Rust toolchain with Cargo, a C compiler, and at least 100 GB of free disk for <code>target/</code> — the workspace has one crate per service, so a cold full build is large. Then <code>cargo build -p aws-emulator-router</code> and <code>cargo run -p aws-emulator-router</code>.</li>
        </ul>
        <p>
          Before the first run, unset any real AWS credentials in the shell that starts your
          tests, and confirm the endpoint variable is set — otherwise your code talks to
          real AWS. A quick smoke test: <code>aws sqs create-queue --queue-name test</code>{' '}
          against the emulator, then list it back.
        </p>

        <h2>Telemetry: on by default, four ways to switch off</h2>
        <p>
          The README states the emulator collects usage data by default, with strict data
          minimization: records never include what is in your requests or responses, your
          code, your credentials, or personal data, and telemetry is not shared with third
          parties. Turn it off with <code>aws-emulator --telemetry off</code>,{' '}
          <code>EMULATOR_TELEMETRY=off</code>, a <code>[telemetry] enabled = false</code>{' '}
          entry in <code>~/.aws/emulator/config.toml</code>, or the embedded configuration
          API. If you ship a tool that embeds the emulator, the README asks you to tell
          your users about telemetry and give them a way to turn it off.
        </p>

        <h2>AWS Emulator vs LocalStack</h2>
        <p>
          LocalStack is the incumbent: a third-party Python project that has let developers
          test AWS applications locally since 2016. AWS Emulator is the official answer,
          built from AWS&rsquo;s own API models. The comparison that matters:
        </p>
        <table>
          <thead>
            <tr><th></th><th>AWS Emulator</th><th>LocalStack</th></tr>
          </thead>
          <tbody>
            <tr><td>Built by</td><td>AWS (official)</td><td>Third party</td></tr>
            <tr><td>Language</td><td>Rust, one crate per service</td><td>Python</td></tr>
            <tr><td>Started</td><td>Repo created 11 Sep 2026; GA 11 Nov 2026</td><td>Oct 2016</td></tr>
            <tr><td>GitHub stars</td><td>3,862 within ~1 day of launch (checked 12 Nov 2026)</td><td>~65,100 (checked 12 Nov 2026)</td></tr>
            <tr><td>License</td><td>CC0-1.0 (vendor/ Apache 2.0)</td><td>Apache 2.0</td></tr>
            <tr><td>Cost</td><td>Free, no tiers; pay only when you deploy to AWS</td><td>Free Hobby plan (non-commercial); paid Pro for more</td></tr>
            <tr><td>Install</td><td>Binary package or Docker; embedded Rust mode</td><td>Docker container via LocalStack CLI</td></tr>
            <tr><td>Fidelity disclosure</td><td>Per-service scores each release + public gap folder</td><td>Feature coverage page</td></tr>
            <tr><td>Status</td><td>Generally available, actively built by agents</td><td>Open-source repo archived; consolidating into one unified image</td></tr>
          </tbody>
        </table>
        <p>
          The timing is part of the story: AWS Emulator arrives as LocalStack&rsquo;s
          open-source repository is archived and read-only, with development consolidating
          into a single unified image. That does not make LocalStack obsolete — its coverage
          page and Pro features still cover services and workflows the emulator does not —
          but the official emulator is now the default first thing to try for a new project,
          and the gap folder is where you check whether it is ready for yours.
        </p>

        <h2>What this page does not claim</h2>
        <ul>
          <li>Same request and error shape is not behavioral equivalence. A passing local run does not predict a passing production run.</li>
          <li>&ldquo;Written entirely by agents&rdquo; is AWS&rsquo;s wording about the emulator code. Humans designed the specs, the fidelity tests and the merge gate — and the gate is what makes the claim trustworthy.</li>
          <li>Fidelity varies widely by service and by release. No single percentage describes the emulator; check the per-service scores for the services you use.</li>
          <li>Star counts move daily (3,862 for aws-emulator and ~65,100 for LocalStack, both checked 12 November 2026). Do not quote them as current after that date.</li>
          <li>The emulator does not simulate throttling, outages or regional differences at launch, and it does not evaluate IAM — those are the two gaps most likely to bite.</li>
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
          <li>AWS News Blog, &ldquo;Test your applications against AWS locally with AWS Emulator&rdquo; (11 November 2026): local HTTPS endpoint, no additional service fee, Rust, same request/error shape, 501 for unimplemented operations, IAM not evaluated, single account with no cross-account or cross-Region behavior, install paths. See <a href="https://aws.amazon.com/blogs/aws/test-your-applications-against-aws-locally-with-aws-emulator/" target="_blank" rel="noreferrer">aws.amazon.com</a>.</li>
          <li>All Things Distributed, Swami Sivasubramanian guest post, &ldquo;AWS Emulator and the engineer&rsquo;s job when agents write the code&rdquo; (11 November 2026): launch framing, &ldquo;more than 400 API models covering more than 200 AWS services&rdquo;, CC0, public commit history and issues, things-that-do-not-work folder, merge gate with security agents. See <a href="https://www.allthingsdistributed.com/2026/11/aws-emulator-and-the-engineers-job-when-agents-write-the-code.html" target="_blank" rel="noreferrer">allthingsdistributed.com</a>.</li>
          <li>About Amazon, Matthew Goldberg, &ldquo;AWS Emulator: a local emulator built 100% by autonomous AI agents&rdquo; (11 November 2026): &ldquo;Our team hasn&rsquo;t written or reviewed any of the code&rdquo;, three agent teams, 438 API models, tens of thousands of fidelity tests, issues/things-that-now-work and issues/things-that-do-not-work, thousands of issues fixed daily. See <a href="https://www.aboutamazon.com/news/aws/how-autonomous-ai-agents-built-aws-emulator" target="_blank" rel="noreferrer">aboutamazon.com</a>.</li>
          <li>GitHub, aws/aws-emulator README (read 12 November 2026): no AWS account needed, no additional service fee, HTTPS on 127.0.0.1:9297, &ldquo;for building and testing. Don&rsquo;t use it for production workloads or to test security&rdquo;, fidelity scores per release, issues/ gap folders, telemetry on by default with four opt-outs, no pull requests, CC0-1.0 except vendor/ Apache 2.0. Repo: 3,862 stars, 29,684 commits, created 11 September 2026. See <a href="https://github.com/aws/aws-emulator" target="_blank" rel="noreferrer">github.com/aws/aws-emulator</a>.</li>
          <li>GitHub, localstack/localstack (read 12 November 2026): created 25 October 2016, 65,118 stars, Python, Apache 2.0, repository archived and read-only as development consolidates into a single unified image, free Hobby plan for non-commercial use. See <a href="https://github.com/localstack/localstack" target="_blank" rel="noreferrer">github.com/localstack/localstack</a>.</li>
          <li>dev.to, AWS Builders, &ldquo;Will AWS Emulator Replace the AWS Blocks Mocks?&rdquo; (11 November 2026): independent hands-on read of both repositories, fidelity-score data, IAM gaps, 501 behavior — one user&rsquo;s reading, not an official AWS position. See <a href="https://dev.to/aws-builders/will-aws-emulator-replace-the-aws-blocks-mocks-what-running-both-revealed-about-a-third-testing-2h9c" target="_blank" rel="noreferrer">dev.to</a>.</li>
          <li>InfoWorld, &ldquo;AWS unveils local emulator service&rdquo; (11 November 2026): IDC analyst comment that the emulator does not yet simulate throttling, outages or regional differences. Note: this article also says unimplemented operations return HTTP 503 and the emulator supports 426 services — both conflict with the AWS News Blog (501) and AWS&rsquo;s own counts (438 API models, 200+ services); the primary source is used here. See <a href="https://www.infoworld.com/article/4247383/aws-unveils-local-emulator-service-to-help-enterprises-accelerate-app-development-and-testing.html" target="_blank" rel="noreferrer">infoworld.com</a>.</li>
          <li>Unconfirmed and deliberately not asserted here: per-service fidelity percentages as a single headline figure (they vary by service and release); any independent reproduction of the agent-built claim beyond AWS&rsquo;s own posts and the public repository; star counts after 12 November 2026.</li>
        </ul>
        <p><em>Data checked: 2026-11-12. This is a launch-week page: re-check the README, the releases page fidelity scores and the issues/things-that-do-not-work folder before relying on it.</em></p>

        <h2>Related tools</h2>
        <p>
          Before wiring a coding agent to a local cloud, read the{' '}
          <Link href="/ai-coding-agent-setup">AI coding agent setup checklist</Link>, and for
          keeping memory consistent across the agents that will use the emulator, read the{' '}
          <Link href="/beacon-agent-memory">Beacon agent memory guide</Link>.
        </p>
      </div>
    </div>
  );
}
