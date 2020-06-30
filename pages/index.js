/* eslint-disable react/react-in-jsx-scope */
import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Simple Run Distance Tracker</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;500;900&display=swap" rel="stylesheet" />
      </Head>

      <main>
        <div className="flex">
          <h1 className="title">
            Simple Run Tracker
          </h1>
          <div className="flex-vertical">
            <p className="subhead">
              Target Distance
              <span>5 miles</span>
            </p>
            <p className="subhead">
              Progress
              <span>1.5 miles, 30%</span>
            </p>
          </div>
        </div>

        <div className="grid">
          <div className="card"><h3>0.25</h3></div>
          <div className="card"><h3>0.25</h3></div>
          <div className="card"><h3>0.25</h3></div>
          <div className="card"><h3>0.25</h3></div>

          <div className="card selected"><h3>0.25</h3></div>
          <div className="card selected"><h3>0.25</h3></div>
          <div className="card selected"><h3>0.25</h3></div>
          <div className="card"><h3>0.25</h3></div>

          <div className="card"><h3>0.25</h3></div>
          <div className="card"><h3>0.25</h3></div>
          <div className="card"><h3>0.25</h3></div>
          <div className="card"><h3>0.25</h3></div>

          <div className="card selected"><h3>0.25</h3></div>
          <div className="card selected"><h3>0.25</h3></div>
          <div className="card selected"><h3>0.25</h3></div>
          <div className="card"><h3>0.25</h3></div>

          <div className="card"><h3>0.25</h3></div>
          <div className="card"><h3>0.25</h3></div>
          <div className="card"><h3>0.25</h3></div>
          <div className="card"><h3>0.25</h3></div>
        </div>
      </main>

      <footer>
        <a
          href="https://github.com/allenhj"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by{' '}
          <span className="logo">@allenhj</span>
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .flex {
          max-width: 1140px;
          margin: 0 auto;
          display: flex;
          // height: 294px;
          align-items: flex-end;
          flex-wrap: wrap;
        }

        .flex > h1 {
          flex-basis: 66%;
        }

        .flex-vertical {
          height: 100%;
          display: flex;
          flex-direction: column;
          flex-basis: 33%;
          flex-shrink: 0;
          flex-grow: 1;
        }

        .flex-vertical > * {
          flex-basis: 50%;
          display: flex;
          align-items: flex-end;
          margin-bottom: 1.2rem;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer span {
          margin-left: 0.5rem;
          font-weight: 500;
          color: #00c444;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 8rem;
        }

        .subhead {
          line-height: 1.5;
          font-size: 1.5rem;
          font-weight: 500;
          margin: 0;
          display: flex;
          justify-content: space-between;
        }

        .subhead span {
          font-size: 1rem;
          font-weight: 300;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(50px, 400px));
          grid-gap: 1rem;
          max-width: 1140px;
          margin-top: 3rem;
        }

        .card {
          flex-basis: 45%;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 4px;
          transition: color 0.15s ease, border-color 0.15s ease;

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .selected {
          background: #00c444;
          color: white;
        }

        .card h3 {
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 1180px) {
          .container {
            padding: 0 2rem;
          }

          .flex {
            flex-direction: column;
            align-items: flex-start;
          }

          .flex > * {
            flex-basis: 100%;
            width: 100%;
          }

          .flex-vertical > p {
            width: calc(50% - 1rem);
          }

          .title {
            margin-bottom: 4.2rem;
            font-size: 6.2rem;
          }
        }

        @media (max-width: 600px) {
          main {
            padding: 2rem 0;
          }

          footer {
            height: 80px;
          }

          .title {
            font-size: 4rem;
          }

          .flex > h1 {
            flex-basis: 100%;
          }

          .flex-vertical > p {
            width: 100%;
          }

          .grid {
            width: 100%;
            grid-gap: 0.25rem;
          }

          .grid h3 {
            margin: 0.5rem;
          }

        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
