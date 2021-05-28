import React from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import * as Fathom from 'fathom-client';
import { DefaultSeo } from 'next-seo';

import { domain, websiteUrl, siteName } from '@/config';

import 'katex/dist/katex.min.css';

import { bundleResources } from '@/lib/resource';

function MyApp({ Component, pageProps }: AppProps) {
  bundleResources();

  const router = useRouter();
  React.useEffect(() => {
    Fathom.load('PCSQWUMO', {
      includedDomains: [domain],
      url: 'https://tahr.rasen.dev/script.js',
    });
    router.events.on('routeChangeComplete', Fathom.trackPageview);
    return () => {
      router.events.off('routeChangeComplete', Fathom.trackPageview);
    };
  }, []);

  return (
    <div className="root">
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: websiteUrl,
          site_name: siteName,
        }}
      />
      <Component {...pageProps} />

      <style jsx>{`
        .root {
          position: relative;
          display: flex;
          flex-direction: column;

          font-size: 16px;
          line-height: 1.6;

          max-width: 700px;
          height: 100%;
          margin: 0 auto;
          padding: 24px 16px 80px;

          // Allow breaking words if text overflows (very long words
          // or links)
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
      `}</style>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: 'Libre Baskerville', serif;
        }

        code {
          font-family: 'Source Code Pro', monospace;
        }

        html {
          box-sizing: border-box;
          font-size: 16px;
        }

        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }

        body,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        ul,
        ol,
        dl {
          margin: 0;
          padding: 0;
          font-weight: normal;
        }

        ul,
        ol {
          padding-left: 24px;
        }
        ul,
        ol,
        dl {
          margin-top: 4px;
        }
        li::marker,
        dt::marker {
          font-size: 14px;
        }
        ul {
          list-style: disc;
        }
        ol {
          list-style: decimal;
        }

        img {
          max-width: 100%;
          height: auto;
        }

        code.inline-code {
          background-color: #f0f0f0;
          color: #721045;
        }
        code.inline-verbatim {
          background-color: #f0f0f0;
          color: #61284f;
        }

        .todo-keyword {
          font-family: 'Source Code Pro', monospace;
        }
        .todo-keyword.TODO {
          color: #1111ee;
        }
        .todo-keyword.DONE {
          color: #505050;
        }
        .priority {
          color: #721045;
        }
        .tags {
          color: #541f4f;
        }
        .timestamp {
          color: #30517f;
          white-space: nowrap;
        }

        pre {
          overflow: auto;
          line-height: 1.3;
          /* background-color: #f0f0f0; */
        }

        blockquote,
        pre.verse,
        .block {
          display: block;
          font-family: 'Libre Baskerville', serif;
          font-style: italic;
          /* background-color: #f8f8f8; */
          background-color: #f2eff3;
          padding: 8px;
          border-left: 4px solid #222;
          padding-left: 12px;
        }
        blockquote > :last-child,
        .block > :last-child {
          margin-bottom: 0;
        }
        @media (min-width: 900px) {
          div > blockquote,
          div > pre.verse,
          div > .block {
            margin-left: -16px;
            margin-right: -32px;
          }
        }

        .center {
          text-align: center;
          margin-left: auto;
          margin-right: auto;
        }

        @media (min-width: 900px) {
          div > ul,
          div > ol,
          div > dl > dt,
          div > dl > dd,
          section > ul,
          section > ol,
          section > dl > dt,
          section > dl > dd {
            margin-left: 0px;
            padding-left: 0px;
          }
        }
        h1 {
          font-size: 20px;
          font-weight: 700;
          margin-top: 8px;
          margin-bottom: 16px;
        }
        h2 {
          font-size: 18px;
          font-weight: 700;
          margin-top: 40px;
          margin-bottom: 8px;
        }
        h3 {
          font-size: 14px;
          font-weight: 700;
          margin-top: 16px;
          margin-bottom: 8px;
        }
        h4 {
          font-size: 12px;
          font-weight: 700;
          margin-top: 16px;
          margin-bottom: 8px;
        }
        p,
        ul,
        ol,
        dl,
        table,
        blockquote,
        pre.verse,
        .block,
        .math-display {
          margin: 0 0 16px 0;
        }
        table {
          margin-bottom: 24px;
        }
        dt {
          float: left;
          display: list-item;
          list-style-type: disc;
          font-weight: 700;
        }
        dt::after {
          content: ':';
          margin-right: 4px;
        }
        dt,
        dd {
          margin-left: 24px;
        }
        dd > p:first-child::before {
          // Add zero-width space to dd, so that dd always occupies
          // some vertical space. Otherwise, the next dt will collapse
          // into the previous one if dd has no text.
          content: '${'\u200b'}';
        }
        // For dd, use larger padding if first child is not the only
        // child. So that next element is properly wrapped to the next
        // line and is not affected by dt's float:left. (Happens when
        // tag contains a list.)
        dd > p:only-child,
        dd > p:not(:first-child),
        dd > ul,
        dd > ol,
        dd > dl,
        dd > table,
        dd > blockquote,
        dd > .block,
        dd > pre,
        li > p,
        li > ul,
        li > ol,
        li > dl,
        li > table,
        li > blockquote,
        li > .block,
        li > pre {
          margin-bottom: 8px;
        }
        li {
          margin-top: 4px;
        }
        p + ul,
        p + ol,
        p + dl {
          margin-top: -8px;
        }
        li > p + ul,
        li > p + ol,
        li > p + dl {
          margin-top: 0px;
        }
        .wide li {
          margin-top: 8px;
        }
        .footnotes {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}

export default MyApp;
