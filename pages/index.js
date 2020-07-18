/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
import Head from 'next/head'

import pastRuns from '../utils/pastRuns'

// helper functions
const getLatestIncrements = () => pastRuns[pastRuns.length - 1].increments
const formatDate = (isoString) => {
  const date = new Date(isoString)
  return `${date.getMonth()} / ${date.getDate()} / ${date.getFullYear()}`
}

// constants
const LENGTH_UNIT = 'miles'
const INCREMENT_LENGTH = 0.25
const TARGET_DISTANCE = 5
const COMPLETED_DISTANCE =  getLatestIncrements().reduce((a, b) => a + b) * INCREMENT_LENGTH
const PERCENT_COMPLETE = COMPLETED_DISTANCE / TARGET_DISTANCE * 100

export default function Home() {
  // EDIT mode
  const [editMode, setEditMode] = useState(false)
  const toggleEditMode = () => {
    if (!editMode) return setEditMode(true)
    resetEditIncrements()
    setEditMode(false)
  }

  const [editIncrements, setEditIncrements] = useState(getLatestIncrements())
  const resetEditIncrements = () => setEditIncrements(getLatestIncrements())
  const toggleIncrement = (idx) => {
    if (!editMode) return

    const updatedIncrements = [...editIncrements]
    updatedIncrements[idx] = Number(!editIncrements[idx])
    setEditIncrements(updatedIncrements)
  }

  // HISTORY playback mode
  const [historyMode, setHistoryMode] = useState(false)
  const toggleHistoryMode = () => {
    setHistoryMode(!historyMode)
  }

  const [historyIncrements, setHistoryIncrements] = useState(pastRuns[0].increments)
  const [historyDate, setHistoryDate] = useState(formatDate(pastRuns[0].date))
  useEffect(() => {
    if (historyMode) {
      // play history when historyMode has been toggled on
      let limit = pastRuns.length
      let count = 0
      const playHistory = async () => {
        while (count < limit) {
          setHistoryIncrements(pastRuns[count].increments)
          setHistoryDate(formatDate(pastRuns[count].date))
          await new Promise(resolve => setTimeout(resolve, 750))
          count += 1
        }
        // cleanup
        setHistoryMode(false)
        setHistoryIncrements(pastRuns[0].increments)
        setHistoryDate(formatDate(pastRuns[0].date))
      }
      playHistory()
    }
  }, [historyMode])

  // Select increments to display
  const getIncrements = () => {
    if (historyMode) return historyIncrements
    if (editMode) return editIncrements
    return getLatestIncrements()
  }
  const displayIncrements = getIncrements()

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
            if (editMode && increment) className += ' edit-selected'
            if (!editMode && increment) className += ' selected'
            if (historyMode && increment) className += ' history-selected'
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
            className={`${editMode ? 'button-active' : ''}` + `${historyMode ? ' button-shrink' : ''}`}
            onClick={toggleEditMode}
          >
            <h3>{`${editMode ? 'Exit ' : ''}Edit Mode`}</h3>
          </button>
          <div className="button-spacer" />
          <button
            type="button"
            className={`${historyMode ? 'button-active-secondary' : ''}`}
            disabled={historyMode}
            onClick={toggleHistoryMode}
          >
            <h3>{historyMode ? historyDate : 'History Mode'}</h3>
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
          cursor: default;
          -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
             -khtml-user-select: none; /* Konqueror HTML */
               -moz-user-select: none; /* Old versions of Firefox */
                -ms-user-select: none; /* Internet Explorer/Edge */
                    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
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

        .edit-selected {
          background: #99e7b4;
          color: rgba(0,0,0,0.5);
        }

        .edit {
          color: rgba(0,0,0,0.5);
          cursor: pointer;
        }

        .history-selected {
          background: #fcbf49;
          color: #000000;
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
          // width: 380px;
          width: calc(50% - 0.5rem);
          flex-shrink: 0;
          cursor: pointer;
          transition: all 250ms ease-in-out;
          overflow: hidden;
        }

        .button-active {
          background: #00c444;
          color: #fff;
        }

        .button-active-secondary {
          background: #fcbf49;
          color: #000000;
        }

        .button-shrink {
          width: 0;
          height: 0;
          padding: 0;
          border: none;
        }

        .button-spacer {
          width: 1rem;
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

          .container {
            padding: 0 1rem;
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
            font-size: 1.25rem;
          }

          button h3 {
            margin: 0.5rem;
          }

          .button-container {
            flex-direction: column;
          }

          button {
            width: 100%;
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
