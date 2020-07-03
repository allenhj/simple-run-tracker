/* eslint-disable react/react-in-jsx-scope */
import Head from 'next/head'
import { useState } from 'react'

const LENGTH_UNIT = 'miles'
const INCREMENT_LENGTH = 0.25
const TARGET_DISTANCE = 5
const RUN_INCREMENTS = [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0]
const COMPLETED_DISTANCE =  RUN_INCREMENTS.reduce((a, b) => a + b) * INCREMENT_LENGTH
const PERCENT_COMPLETE = COMPLETED_DISTANCE / TARGET_DISTANCE

export default function Home() {


  const [editMode, setEditMode] = useState(false)
  const [editIncrements, setEditIncrements] = useState(RUN_INCREMENTS)

  const resetEditIncrements = () => setEditIncrements(RUN_INCREMENTS)
  const toggleIncrement = (idx) => {
    if (!editMode) return

    const updatedIncrements = [...editIncrements]
    updatedIncrements[idx] = Number(!editIncrements[idx])
    setEditIncrements(updatedIncrements)
  }

  const toggleEditMode = () => {
    if (!editMode) return setEditMode(true)
    resetEditIncrements()
    setEditMode(false)
  }

  const displayIncrements = editMode ? editIncrements : RUN_INCREMENTS

  return (
    <div className="container">
      <Head>
        <title>Simple Run Distance Tracker</title>
        <link rel="icon" href="/favicons/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;500;900&display=swap" rel="stylesheet" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="theme-color" content="#00c444" />
      </Head>

      <main>
        <div className="flex">
          <h1 className="title">
            Simple Run Tracker
          </h1>
          <div className="flex-vertical">
            <p className="subhead">
              Target Distance
              <span>{`${TARGET_DISTANCE} ${LENGTH_UNIT}`}</span>
            </p>
            <p className="subhead">
              Progress
              <span>{`${COMPLETED_DISTANCE} ${LENGTH_UNIT}, ${PERCENT_COMPLETE}%`}</span>
            </p>
          </div>
        </div>

        <div className="grid">
          {displayIncrements.map((increment, idx) => {
            const toggleSelf = () => toggleIncrement(idx)
            let className = 'card'
            if (editMode) className += ' edit'
            if (editMode && increment) className += ' selected-edit'
            if (!editMode && increment) className += ' selected'
            return (
              <div
                className={className}
                key={idx}
                onClick={toggleSelf}
              >
                <h3>0.25</h3>
              </div>
            )
          })}
        </div>
        <div className="button-container">
          <button
            type="button"
            className={`edit-button${editMode ? ' edit-button-active' : ''}`}
            onClick={toggleEditMode}
          >
            <h3>{`${editMode ? 'Exit ' : ''}Edit Mode`}</h3>
          </button>
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
          flex-basis: calc(75% + 1rem);
        }

        .flex-vertical {
          height: 100%;
          display: flex;
          flex-direction: column;
          // flex-basis: 25%;
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

          transition: all 150ms ease-in-out;
        }

        .card h3 {
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .selected {
          background: #00c444;
          color: white;
        }

        .selected-edit {
          background: #99e7b4;
          color: rbga(0,0,0,0.5)
        }

        .edit {
          color: rbga(0,0,0,0.5)
        }

        .button-container {
          margin-top: 3rem;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        button {
          font-size: 1.25rem;
          line-height: 1.5;
          border-radius: 4px;
          border: 1px solid #eaeaea;
          padding: 0 3rem;
          flex-basis: 380px;
          flex-shrink: 0;
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
            width: 100%;
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

          button {
            flex-basis: 100%;
            margin: 0.5rem;
          }
        }
      `}
      </style>

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
      `}
      </style>
    </div>
  )
}
