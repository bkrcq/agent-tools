import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Libghostty 1.0: Should You Embed It?',
  description:
    'libghostty-vt hit 1.0 on 6 November 2026 with a stable C ABI. What the release actually freezes, who already runs on it (JetBrains confirmed, Neovim pending), and when to embed it instead of libvterm or xterm.js.',
  alternates: { canonical: '/libghostty-1-0/' },
};

const faqs = [
  {
    q: 'Is libghostty-vt 1.0 the same as Ghostty 1.0?',
    a: 'No. The Ghostty terminal app reached 1.0 in December 2024 and is on its 1.4.x line as of late October 2026. The 1.0 released on 6 November 2026 is libghostty-vt, the terminal-emulation library extracted from the app\u2019s core, whose C interface is now promised to stay stable.',
  },
  {
    q: 'What does the stable ABI actually guarantee?',
    a: 'From 1.0, libghostty-vt follows semantic versioning with a strict ABI compatibility promise. Every object is an opaque handle, values move through a small set of enum-keyed getters and setters, and a program built against newer headers but linked to an older library gets GHOSTTY_UNSUPPORTED instead of a crash. CI enforces the policy with libabigail on Linux and golden type manifests on macOS and WebAssembly, and exported symbols are versioned on ELF platforms.',
  },
  {
    q: 'Does JetBrains really use libghostty?',
    a: 'Yes, and this one has a first-party source. JetBrains wrote on its Platform blog on 27 October 2026 that starting with 2026.3, the built-in terminal in its IDEs runs on libghostty, replacing JediTerm, the emulator it used for years. It is on by default in the 2026.3 EAP builds, and you can switch back to JediTerm with the Registry key terminal.use.ghostty.emulator. JetBrains says the switch was driven by AI coding agents such as Claude Code, Codex and Junie, which rely on modern keyboard and colour protocols.',
  },
  {
    q: 'Has Neovim switched to libghostty-vt?',
    a: 'Not yet. Neovim has an approved pull request (#39773) replacing libvterm with libghostty-vt, which would also close a 10-year-old issue about scrollback reflowing on resize. As of 7 November 2026 the pull request was still open: the maintainers were waiting on a tagged release so distributions can package the dependency separately, and 1.0 is the release they were waiting for. Treat it as approved and unblocked, not as shipped.',
  },
  {
    q: 'What do I need to build with it?',
    a: 'As a consumer you link a C library: packaged releases ship a shared and a static library with headers, pkg-config files and a CMake package config, so a normal C toolchain is enough. Building the library itself from source uses the Zig toolchain the project is written in, so check the version pinned in the repo\u2019s build docs at the time you build. At runtime the library needs nothing beyond libc, and a fully freestanding build is possible.',
  },
  {
    q: 'What does libghostty-vt NOT do?',
    a: 'It is the engine, not the car. It parses VT sequences and keeps terminal state \u2014 screen, cursor, scrollback, styles, modes, reflow on resize \u2014 but it does not render anything, spawn a PTY, or shape fonts. You feed it the bytes a program writes and read the state back; drawing pixels and managing the child process are your job. That split is the point: it is a component to embed, not a terminal app.',
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
  headline: 'Libghostty 1.0: Should You Embed It?',
  description:
    'What the 6 November 2026 libghostty-vt 1.0 release actually freezes, who already runs on it, and when to embed it instead of libvterm or xterm.js.',
  author: { '@type': 'Organization', name: 'Agent Tools' },
  publisher: { '@type': 'Organization', name: 'Agent Tools' },
  datePublished: '2026-11-10',
  dateModified: '2026-11-10',
};

export default function Page() {
  return (
    <div className="shell page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }} />
      <p className="eyebrow">Terminal library guide · 10 Nov 2026</p>
      <h1>Libghostty 1.0: A Stable Terminal Core You Can Link Against &mdash; and When to Wait</h1>
      <p className="lead">
        On 6 November 2026, Mitchell Hashimoto released libghostty-vt 1.0: the terminal-emulation
        core of the Ghostty terminal, packaged as a portable C library with a stable ABI. The
        news is not a new terminal. It is the moment the engine underneath one became a
        dependency you can adopt without expecting it to break under you &mdash; and JetBrains
        already has.
      </p>

      <div className="prose">
        <h2>First, the confusion to clear up: two different 1.0s</h2>
        <p>
          The Ghostty terminal <em>app</em> reached 1.0 in December 2024 and is on its 1.4.x line
          as of late October 2026. The 1.0 from 6 November 2026 is <code>libghostty-vt</code>, the
          library version of the same engine. Hashimoto&rsquo;s announcement puts it in one
          sentence: &ldquo;libghostty is a portable, high-performance C library for terminal
          emulation, extracted directly from the core of Ghostty. The 1.0 release means both the
          library itself and the C ABI are now stable.&rdquo;
        </p>
        <p>
          What the library does is deliberately narrow: you give it the bytes a program writes,
          and it processes and exposes terminal state &mdash; the screen, the cursor, the
          scrollback, styles and modes. The official docs list the use cases as terminal
          emulators and multiplexers, web terminals and remote sessions, session recording and
          playback, test harnesses for TUI apps, and &ldquo;agents and automation that read what a
          TUI is showing.&rdquo; That last one is why it belongs on this site: coding agents live
          inside terminals, and the terminal core they live in is now a stable component.
        </p>

        <h2>What 1.0 actually freezes</h2>
        <p>
          A stable ABI is a stronger claim than a stable API, and the announcement is precise
          about the machinery behind it:
        </p>
        <ul>
          <li><strong>Semantic versioning with a strict ABI promise</strong> &mdash; packagers can ship it through distribution tooling and developers can dynamically link against it without fearing the next upgrade.</li>
          <li><strong>Opaque handles everywhere.</strong> Every object is an opaque handle, and the hundreds of values you might read or write go through a small set of enum-keyed getters and setters, so new values can be added without a new symbol.</li>
          <li><strong>Newer headers on an older library fail gracefully.</strong> Programs built against newer headers but linked to an older libghostty get <code>GHOSTTY_UNSUPPORTED</code> results instead of crashes or undefined behaviour.</li>
          <li><strong>CI enforces the policy.</strong> Every change is checked with libabigail against a committed baseline on Linux, and against golden type manifests on macOS and WebAssembly. On ELF platforms every exported symbol is versioned, so the loader refuses a mismatched library by name.</li>
          <li><strong>Its own release cycle.</strong> libghostty-vt is versioned and released separately from the Ghostty app, with its own vt-prefixed tags. Each release ships a signed source tarball plus a companion dependencies tarball so distributions can build completely offline.</li>
        </ul>
        <p>
          One independent check supports the &ldquo;versioned and stable&rdquo; claim: a build test of
          the 1.0 release counted 209 exported functions, every one tagged{' '}
          <code>GHOSTTY_VT_1.0</code>, with soname <code>libghostty-vt.so.1</code>.
        </p>

        <h2>Who already runs on it</h2>
        <p>
          Adoption is the real story of this release, and the statuses are not all equal &mdash;
          so they are listed separately:
        </p>
        <ul>
          <li>
            <strong>Shipped: JetBrains IDEs.</strong> JetBrains wrote on its Platform blog on 27
            October 2026 that starting with 2026.3, the built-in terminal in IntelliJ, PyCharm,
            GoLand and the rest runs on libghostty, replacing JediTerm. It is on by default in
            the 2026.3 EAP builds, with a Registry key to switch back. Hashimoto cites
            JetBrains&rsquo; own report of over 12.5 million active users &mdash; that is
            JetBrains&rsquo; figure for its IDEs, not an independent count of libghostty users.
            JetBrains says the switch was driven by AI coding agents, and that the new engine
            handles nearly 50 control sequences JediTerm ignored or misread.
          </li>
          <li>
            <strong>Approved, not yet merged: Neovim.</strong> An approved pull request (#39773)
            replaces libvterm with libghostty-vt and would close a 10-year-old issue about
            scrollback reflowing on resize. As of 7 November 2026 it was still open, because
            the maintainers were waiting on a tagged release so distributions can package the
            dependency separately. 1.0 is that release.
          </li>
          <li>
            <strong>Experimenting: KDE.</strong> KDE developers are experimenting with a Konsole
            replacement built on libghostty-vt. That is an experiment, not a shipped product.
          </li>
          <li>
            <strong>Already building on it:</strong> Vercel&rsquo;s Turborepo renders task output in
            its TUI with it, devenv drives shells with it, Ghostel brings it to Emacs,
            ghostty-web is the WASM build with an Xterm.js-compatible API, OrbStack embeds it
            commercially, and a wave of new terminals and agentic coding tools such as herdr
            and cmux are built on it rather than writing another emulator. Community bindings
            exist for Rust, Go, JavaScript, Swift, Python, .NET, Elixir, Dart and Java, and
            the awesome-libghostty list tracks well over a hundred projects.
          </li>
        </ul>

        <h2>Should you adopt it? A decision check</h2>
        <ul>
          <li><strong>Adopt if:</strong> you are embedding a terminal into a desktop app, IDE, agent TUI or test harness and you want the engine JetBrains already ships, with a stability promise that lets you link it as a normal dependency. The MIT licence and the no-copyleft dependency tree also make it safe for commercial products.</li>
          <li><strong>Wait if:</strong> you need the higher-level <code>libghostty</code> app runtime API rather than the VT core. The 1.0 announcement covers <code>libghostty-vt</code> only; the full runtime API has no 1.0 stability announcement, so verify its current status in the repo before depending on it.</li>
          <li><strong>Try first if:</strong> you are choosing between terminal cores. Build the minimal example from the docs, feed it a real TUI session, and check the two behaviours that most often decide the choice: scrollback reflow on resize and Kitty keyboard protocol handling.</li>
        </ul>

        <h2>Alternatives at a glance</h2>
        <ul>
          <li><strong>libghostty-vt (this page):</strong> C library, SIMD VT parser plus full terminal state, reflow on resize, render-state API, input encoders and selection API. Stable C ABI from 1.0, MIT. Pick it when you want a native embeddable core with a compatibility promise.</li>
          <li><strong>libvterm:</strong> the C library Neovim uses today. The approved replacement exists precisely because libvterm lacks scrollback reflow on resize. Pick it only if you are already on it and reflow does not matter to you.</li>
          <li><strong>xterm.js (@xterm/headless):</strong> the JavaScript terminal engine behind VS Code&rsquo;s integrated terminal, usable headless in Node. No Kitty keyboard protocol support. Pick it when your terminal lives in a browser or a Node process and a JS engine is the natural fit.</li>
          <li><strong>alacritty_terminal:</strong> a Rust crate with a native VT parser, Kitty keyboard support and reflow. Pick it when your project is Rust and you would rather depend on a crate than cross a C FFI boundary.</li>
          <li><strong>ghostty-web (WASM):</strong> the WebAssembly build of the Ghostty parser, with an Xterm.js-compatible API, for browser embedding. Check the project&rsquo;s current release state before depending on it.</li>
        </ul>

        <h2>What it doesn&rsquo;t do</h2>
        <p>
          libghostty-vt is the engine, not the car. It does not render anything, spawn a PTY,
          or shape fonts &mdash; drawing pixels and managing the child process are the
          embedder&rsquo;s job. It also does not bundle a windowing system or a configuration
          language; those belong to the app you build around it. The library creates no threads
          and allocates only through an allocator you can customize, which is part of why the
          author reports running 10,000 active terminals with live shells on a 4-core, 8&nbsp;GB
          Linux server in his own test &mdash; his test, not an independent benchmark.
        </p>

        <h2>Build and packaging in practice</h2>
        <ul>
          <li><strong>Licence and runtime:</strong> MIT licensed, no copyleft code anywhere in the dependency tree. At runtime it needs nothing beyond libc, and a fully freestanding build is possible. Build-time dependencies are a small set of permissively licensed libraries (simdutf and Google Highway for SIMD, a compact Unicode table, Wuffs for Kitty graphics image decoding), each listed in a machine-readable manifest with version, SPDX licence and hash.</li>
          <li><strong>Platforms tested in CI:</strong> Linux (glibc, musl), macOS 13+, iOS 13+, FreeBSD, Windows, Android and WebAssembly, plus build-only targets including bare metal, WASI, Windows arm64, illumos and 32-bit x86. Per-platform artifacts are what you would expect: SONAME shared libraries with pkg-config and CMake files on Linux/FreeBSD, a dylib plus XCFramework on Apple platforms, a DLL with import library on Windows, and two WASM flavours &mdash; the small one under a megabyte with every feature enabled.</li>
          <li><strong>Distribution:</strong> each release publishes a signed source tarball and a companion dependencies tarball in Zig&rsquo;s cache layout, so a distribution can build offline. The build honours <code>--prefix</code>, <code>DESTDIR</code> and <code>lib64</code>; packaging rules live in <code>PACKAGING-LIBGHOSTTY.md</code> shipped with the tarball.</li>
          <li><strong>Docs:</strong> installing, a first-terminal tutorial, API conventions and the exact stability policy are at lib.ghostty.org. Hashimoto&rsquo;s claim is that you can create a terminal in roughly 1,500 lines of C on top of it &mdash; his estimate, with a minimal example in the repo.</li>
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
          <li>Mitchell Hashimoto, &ldquo;Libghostty 1.0&rdquo; (6 November 2026): the 1.0 release, the ABI stability policy, the portability table, packaging, licensing and the adopter list. See <a href="https://mitchellh.com/writing/libghostty-1-0" target="_blank" rel="noreferrer">mitchellh.com/writing/libghostty-1-0</a>.</li>
          <li>libghostty-vt documentation, lib.ghostty.org: &ldquo;The C ABI is stable from 1.0&rdquo;, use cases, the worked C example and the Stability page. See <a href="https://lib.ghostty.org" target="_blank" rel="noreferrer">lib.ghostty.org</a>.</li>
          <li>JetBrains Platform blog, &ldquo;The Terminal in JetBrains IDEs Now Runs on libghostty&rdquo; (27 October 2026): 2026.3 switch from JediTerm, EAP default, Registry rollback key, AI-agent motivation. See <a href="https://blog.jetbrains.com/platform/2026/10/jetbrains-terminal-now-uses-ghostty/" target="_blank" rel="noreferrer">blog.jetbrains.com</a>.</li>
          <li>Neovim pull request #39773 (approved, open as of 7 November 2026) and the 10-year-old scrollback reflow issue it closes, via the announcement and independent build-test coverage. See <a href="https://github.com/neovim/neovim/pull/39773" target="_blank" rel="noreferrer">github.com/neovim/neovim/pull/39773</a>.</li>
          <li>Alternatives: Termless backend capability matrix for xterm.js / libvterm / alacritty_terminal behaviour (Kitty keyboard, reflow), and the 2code research issue evaluating xterm.js alternatives for AI CLI hosting. See <a href="https://termless.dev/guide/backends.html" target="_blank" rel="noreferrer">termless.dev</a> and <a href="https://github.com/akarachen/2code/issues/145" target="_blank" rel="noreferrer">2code #145</a>.</li>
          <li>Ghostty terminal app 1.0 in December 2024 and the 1.4.x line in late October 2026 per the release coverage checked 10 November 2026; the app&rsquo;s repo is <a href="https://github.com/ghostty-org/ghostty" target="_blank" rel="noreferrer">github.com/ghostty-org/ghostty</a>. Note the project announced in April 2026 that it will leave GitHub, with no destination named at the time; the repo was still receiving pushes in early November 2026.</li>
          <li>Unconfirmed and deliberately not asserted here: any independent benchmark of libghostty-vt throughput or latency; the &ldquo;tens of millions of daily users&rdquo; and &ldquo;hundreds of products&rdquo; figures beyond the author&rsquo;s own estimates; the stability status of the higher-level libghostty runtime API; and a merge date for the Neovim pull request.</li>
        </ul>
        <p><em>Data checked: 2026-11-10. This is a fast-moving release page: re-verify the Neovim pull request status and the libghostty release tags before reusing it after November 2026.</em></p>

        <h2>Related tools</h2>
        <p>
          The JetBrains terminal change matters most inside coding agents: read the{' '}
          <Link href="/claude-code-to-pi">Claude Code to Pi switch guide</Link> for the harness
          side, the <Link href="/beacon-agent-memory">Beacon agent memory guide</Link> for what
          agents remember across tools, and the{' '}
          <Link href="/agents-md-guide">AGENTS.md guide</Link> for the context files those
          agents read.
        </p>
      </div>
    </div>
  );
}
