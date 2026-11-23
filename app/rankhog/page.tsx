import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Rankhog: Let Claude Code Do Reddit Marketing',
  description:
    'Rankhog finds people on Reddit asking for what you sell, drafts replies that help first, and posts them at a human pace — or lets Claude Code run it via MCP. Pricing, setup, and the ban risk.',
  alternates: { canonical: '/rankhog/' },
};

const faqs = [
  {
    q: 'What is Rankhog?',
    a: 'Rankhog is a Reddit marketing tool built by solo maker Anthony. Its Radar watches the subreddits your buyers use, finds people asking for what you sell, reads each subreddit’s rules, and drafts a reply that helps first and names your product only when it fits. You approve each reply, or let autopilot post it from your own Reddit account at a human pace through a real browser session. It also warms up new Reddit accounts and can run from Claude Code, Codex, ChatGPT, Cursor, Grok or OpenClaw through MCP.',
  },
  {
    q: 'How much does Rankhog cost?',
    a: 'Each product costs $99/month on the current launch price; the standard price is $200/month, per Rankhog’s own pricing page. Every product gets 100 credits a month: one credit per draft, 0.5 credits per rewrite, and 25 credits for a 28-day account warm-up. Sending, posting, commenting and upvoting are free. Extra credit packs run $49 for 50 credits up to $599 for 1,000. A 7-day free trial needs a card; the Reddit audit before it is free and needs no card. A managed service, with the Rankhog team running your weekly strategy, starts at $1,000/month.',
  },
  {
    q: 'How do I connect Rankhog to Claude Code?',
    a: 'Run `claude mcp add --transport http --scope user rankhog https://api.rankhog.com/mcp`, then sign in to Rankhog (sign-up is free). Ask your AI to set up your product and it builds a free Reddit SEO report in the chat, then start the 7-day trial from the link it gives you — a card is needed. After that you can ask for today’s best threads and a draft reply for each, and Rankhog shows you the drafts before anything is sent.',
  },
  {
    q: 'Does Rankhog work with Codex, ChatGPT and Cursor too?',
    a: 'Yes. Codex uses `codex mcp add rankhog --url https://api.rankhog.com/mcp` (the CLI, IDE extension or desktop app — Codex Cloud tasks cannot use custom servers). ChatGPT connects through the MCP connector on the desktop app or claude.ai-style plugin flow, Cursor adds it in one click from Settings → MCP, and Grok and OpenClaw have their own one-command setup. Every client gets the same Radar, drafting, rules checks and pacing as the app.',
  },
  {
    q: 'Will my Reddit account get banned?',
    a: 'Rankhog says it helps you not get banned, and is explicit that nobody can promise it never happens. It reads each subreddit’s rules before writing, checks every comment like a strict moderator, posts at a human pace from a real browser instead of automation shortcuts, and if a comment gets removed that account stops and waits. But automated replies, coordinated posting and vote manipulation can still break Reddit’s spam rules, and the risk — including a banned account — stays with you. Keep approval on until you trust the drafts, and never use it to post where a subreddit’s rules say no.',
  },
  {
    q: 'What is account warm-up and what does it cost?',
    a: 'Warm-up grows a fresh Reddit account with real, helpful comments, a little more each day, until it is ready to promote. A 28-day warm-up costs 25 credits; you can pick anything from 7 to 60 days (15 to 42 credits). The account is one your organization owns or controls, and you keep it — Rankhog says never buy an old account, because bought accounts get caught.',
  },
  {
    q: 'What does Rankhog not do?',
    a: 'It is not a spam bot, by its own description: no mass comments, no bought accounts, and no posting where the rules say no. It does not promise rankings — its Discovery feature works you into threads that already rank on Google and in AI answers, but Rankhog says nobody can promise a ranking. And it does not work with every product: the maker says if a product is not ready, Rankhog may turn it down.',
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
  headline: 'Rankhog: Let Claude Code Do Your Reddit Marketing',
  description:
    'What Rankhog does, how Radar and the MCP setup work, what it costs, and the Reddit ban risk you keep.',
  author: { '@type': 'Organization', name: 'Agent Tools' },
  publisher: { '@type': 'Organization', name: 'Agent Tools' },
  datePublished: '2026-11-23',
  dateModified: '2026-11-23',
};

export default function Page() {
  return (
    <div className="shell page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }} />
      <p className="eyebrow">Rankhog · 23 Nov 2026</p>
      <h1>Rankhog: Let Claude Code Find Your Reddit Customers</h1>
      <p className="lead">
        People ask Reddit what to buy all day — &ldquo;what do you use for X?&rdquo; is a
        customer raising their hand in public. Rankhog watches the subreddits your buyers
        hang out in, finds those threads while they are still fresh, and writes a reply
        that helps first and mentions your product only when it fits. It topped Product
        Hunt on 23 November 2026, and it runs from Claude Code, Codex, ChatGPT, Cursor
        and other MCP clients — so your coding agent can do the outreach while you
        approve what goes out.
      </p>

      <div className="prose">
        <h2>What Rankhog does</h2>
        <p>
          Rankhog is a Reddit marketing tool from solo maker Anthony, who says he built
          it to do the boring parts of Reddit marketing for himself. It has four moving
          parts: <strong>Radar</strong> watches the rooms your buyers use, all day and
          all night, looking for your keywords and your competitors&rsquo; names; it reads
          each post, skips rants and launch announcements, and scores the people who
          actually want what you sell. <strong>Replies</strong> are drafted in each
          subreddit&rsquo;s style after reading that room&rsquo;s rules, then checked like a
          strict moderator would — for rules, AI-sounding language, relevance and salesy
          wording — and rewritten or flagged if a check fails. <strong>Posting</strong>{' '}
          happens from your own Reddit account, at a human pace, through a real browser
          session; you approve each reply, or turn on autopilot and check the log later.
          And <strong>Discovery</strong> finds the threads that already rank on Google
          and in AI answers, so you can show up where buyers are already searching.
        </p>
        <p>
          If you have no Reddit account, Rankhog makes a fresh one in a minute and warms
          it up with real, helpful comments — a little more each day — until it is ready
          to promote. You own the account, not Rankhog. A 28-day warm-up costs 25
          credits, and you can pick anything from 7 to 60 days. Rankhog is blunt about
          one thing: never buy an old account, because bought accounts get caught.
        </p>

        <h2>Run it from Claude Code (or Codex, ChatGPT, Cursor)</h2>
        <p>
          The MCP setup takes about a minute and a free Rankhog sign-in. For Claude Code:
        </p>
        <pre><code>{`claude mcp add --transport http --scope user rankhog https://api.rankhog.com/mcp`}</code></pre>
        <p>
          For Codex:
        </p>
        <pre><code>{`codex mcp add rankhog --url https://api.rankhog.com/mcp`}</code></pre>
        <p>
          Then ask your AI to set up your product — it builds a free Reddit SEO report
          right in the chat — and start the 7-day trial from the link it gives you. A
          card is needed for the trial. Once you have a plan, a prompt like{' '}
          <em>&ldquo;Find today&rsquo;s best Reddit threads for my product and draft replies
          for the top three. Show me before anything is sent.&rdquo;</em> brings back the
          threads Radar found, best first, with a draft for each and the cost stated
          before it drafts. Your AI cannot buy credits, and it can spend at most 100 a
          month unless you raise the limit. Cursor adds Rankhog in one click from
          Settings → MCP; Grok connects it as a custom connector, and OpenClaw with{' '}
          <code>openclaw mcp add rankhog --url https://api.rankhog.com/mcp --transport streamable-http --auth oauth</code>.
          One limit to know: Codex Cloud tasks cannot use custom servers, so use the
          Codex CLI, IDE extension or desktop app.
        </p>

        <h2>What it costs</h2>
        <table>
          <thead>
            <tr><th>Item</th><th>Price</th></tr>
          </thead>
          <tbody>
            <tr><td>Growth plan, per product (launch price)</td><td>$99/month</td></tr>
            <tr><td>Growth plan, standard price</td><td>$200/month</td></tr>
            <tr><td>Credits included per product</td><td>100/month</td></tr>
            <tr><td>One draft (written, humanized, rules-checked)</td><td>1 credit</td></tr>
            <tr><td>One rewrite</td><td>0.5 credits</td></tr>
            <tr><td>28-day account warm-up</td><td>25 credits (7–60 days: 15–42 credits)</td></tr>
            <tr><td>Posting, commenting, replying, upvoting, research</td><td>Free (0 credits)</td></tr>
            <tr><td>Credit packs</td><td>$49 / 50 credits, $199 / 250, $349 / 500, $599 / 1,000 — bought credits never expire</td></tr>
            <tr><td>Managed Reddit Growth (team runs it for you)</td><td>From $1,000/month</td></tr>
          </tbody>
        </table>
        <p>
          The 7-day free trial needs a card, but the Reddit audit that runs first is
          free and needs no card — you see where your buyers are before anything is
          posted, and nothing is posted until you explicitly start Rankhog. One plan
          covers one product, with its own strategy, accounts and 100 credits; teammates
          are free, and you can run as many Reddit accounts per product as you want.
          Monthly credits reset each billing period; bought credits go into a shared
          organization bank and never expire.
        </p>

        <h2>The ban risk stays with you</h2>
        <p>
          This is the part to read before paying. Reddit loves banning marketers, and
          Rankhog&rsquo;s own site says nobody can promise your account never gets banned.
          What it does to lower the odds: it reads each room&rsquo;s rules before writing,
          checks every comment like a strict moderator, posts at a human pace from a
          real browser instead of automation shortcuts, and if a comment gets removed,
          that account stops and waits. It also refuses to work with products it judges
          not ready.
        </p>
        <p>
          Even so, automated replies and coordinated posting can break Reddit&rsquo;s spam
          rules, and a banned account is your loss, not the tool&rsquo;s. Keep manual
          approval on until you trust the drafts, keep the volume human, and never let
          it post where a subreddit&rsquo;s rules say no. If your product lives or dies on
          one Reddit account, this is not a risk to take on autopilot.
        </p>

        <h2>Rankhog vs the listen-only tools</h2>
        <p>
          The Reddit marketing shelf is getting crowded, and the split that matters is
          whether the tool posts for you or just hands you a list. Rankhog posts from
          your account after your approval, or on autopilot. The closest listen-only
          rival is <strong>Pulse</strong>: it scans Reddit around the clock, scores
          threads by buying intent, and drafts replies — but below its Enterprise plan
          you write or approve and post every reply yourself. Its Starter plan was
          $49/month in Rankhog&rsquo;s own 31 October 2026 comparison (other listings now
          show $29/month — check the vendor&rsquo;s page before paying). Other names in the
          space include RedditGrow, Redreach and Bazzly. Pick Rankhog when you want the
          posting done; pick a listen-only tool when you want to keep every send in
          your own hands.
        </p>
        <p>
          One more honest note: paid validation is still thin. TrustMRR listed about
          five paying subscribers at the end of October 2026, and the Product Hunt
          launch on 23 November 2026 was the product&rsquo;s debut on that stage — the
          product itself predates the launch, with its Reddit MCP documentation already
          live in early November. An independent review from Vetteroo is also out.
          Treat Rankhog as a promising new tool with a real launch-day signal, not as
          a proven channel yet.
        </p>

        <h2>Who should try it</h2>
        <ul>
          <li><strong>Founders and indie hackers</strong> whose buyers ask for recommendations on Reddit, and who would otherwise spend hours a day in subreddits.</li>
          <li><strong>Agencies</strong> running Reddit for several clients — one organization per client, as many accounts as needed, teammates at no extra cost.</li>
          <li><strong>Agent-first teams</strong> already living in Claude Code or Codex, who want outreach inside the same terminal they code in.</li>
          <li><strong>Not for:</strong> anyone whose product is not ready to be talked about, anyone who needs a guaranteed channel, or anyone unwilling to risk a Reddit account.</li>
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
          <li>Rankhog homepage (rankhog.com, read 23 November 2026): Radar, replies, warm-up, Discovery, autopilot, real-browser posting, ban-risk wording, free audit, 500+ founders audit claim (vendor claim).</li>
          <li>Rankhog pricing page (rankhog.com/pricing, read 23 November 2026): $99/month launch price, $200/month standard price, 7-day trial with card, 100 credits a month, credit costs and packs, managed service from $1,000/month.</li>
          <li>Rankhog Reddit MCP docs (rankhog.com/reddit-mcp, /reddit-mcp/claude-code, /reddit-mcp/codex, /reddit-mcp/cursor, /reddit-mcp/openclaw; last updated 17 days before 23 November 2026): MCP commands, trial flow, 100-credit monthly cap, Codex Cloud limitation.</li>
          <li>Product Hunt, “Rankhog: Get customers from Reddit on autopilot” (producthunt.com/products/rankhog): maker post by Anthony, $99/month with 7-day trial, free audit and free tools (shadowban checker, post checker, best time to post). Product listing published 19 November 2026; launch day 23 November 2026.</li>
          <li>Hunted.space live Product Hunt leaderboard, 23 November 2026: Rankhog #1 on launch day (226 upvotes at 11:33 AM PT, 244 at 1:31 PM PT), ahead of Yoroll.</li>
          <li>Rankhog, “Pulse alternative” comparison, reviewed 31 October 2026 (rankhog.com/alternatives/pulse): Pulse Starter $49/month, drafts and alerts but no posting below Enterprise. Other listings show $29/month — price unverified here, check before paying.</li>
          <li>TrustMRR paid-subscriber count (about 5, end of October 2026) and the Vetteroo independent review, as reported in the 23 November 2026 keyword-mining roundup; not separately re-verified here.</li>
          <li>Unconfirmed and deliberately not asserted here: the maker’s May 2026 founding date for Rankhog (reported in the mining roundup, not verified against a primary source); any final end-of-day Product Hunt vote total; Pulse’s current price.</li>
        </ul>
        <p><em>Data checked: 2026-11-23. Prices are launch prices and move — re-check rankhog.com/pricing before paying.</em></p>

        <h2>Related tools</h2>
        <p>
          If you want a personal agent that runs on your own machine, read the{' '}
          <Link href="/nod-by-n8n">Nod by n8n setup guide</Link> — a private VM, 200+
          connections, and the costs you still pay. For another self-hosted agent that
          topped Product Hunt, read the <Link href="/rakazo">Rakazo guide</Link> — open
          source, self-hosted, and Product Hunt #1 on 15 November 2026.
        </p>
      </div>
    </div>
  );
}
