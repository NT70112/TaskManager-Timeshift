import { useCallback, useEffect, useRef, useState } from 'react'
import './Time.css'

const PHASE_DURATION_MS = 10 * 1000
const PHASE_DURATION_MS__TIMEOUT = 5 * 1000

function formatTime(milliseconds) {
    const totalSeconds = Math.ceil(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function Timer({ resetToken, start, updateStartTimer }) {
    const [workRemainingMs, setWorkRemainingMs] = useState(PHASE_DURATION_MS)
    const [breakRemainingMs, setBreakRemainingMs] = useState(PHASE_DURATION_MS__TIMEOUT)
    const phaseRef = useRef('work')
    const remainingRef = useRef(PHASE_DURATION_MS)
    const deadlineRef = useRef(null)
    const lastResetTokenRef = useRef(resetToken)

    const updateTimer = useCallback(() => {
        let deadline = deadlineRef.current
        if (deadline === null) return

        const now = Date.now()
        while (now >= deadline) {
            if (phaseRef.current === 'work') {
                phaseRef.current = 'break'
                remainingRef.current = PHASE_DURATION_MS__TIMEOUT
                setWorkRemainingMs(0)
                setBreakRemainingMs(PHASE_DURATION_MS__TIMEOUT)
                deadline += PHASE_DURATION_MS__TIMEOUT
            } else {
                phaseRef.current = 'work'
                remainingRef.current = PHASE_DURATION_MS
                setBreakRemainingMs(0)
                setWorkRemainingMs(PHASE_DURATION_MS)
                deadline += PHASE_DURATION_MS
            }
        }

        const remaining = deadline - now
        remainingRef.current = remaining
        deadlineRef.current = deadline
        if (phaseRef.current === 'work') {
            setWorkRemainingMs(remaining)
        } else {
            setBreakRemainingMs(remaining)
        }
    }, [])

    const startTimerFromScratch = useCallback(() => {
        phaseRef.current = 'work'
        remainingRef.current = PHASE_DURATION_MS
        deadlineRef.current = Date.now() + PHASE_DURATION_MS
        setWorkRemainingMs(PHASE_DURATION_MS)
        setBreakRemainingMs(PHASE_DURATION_MS__TIMEOUT)
        updateStartTimer(true)
    }, [updateStartTimer])

    useEffect(() => {
        if (resetToken === lastResetTokenRef.current) return
        lastResetTokenRef.current = resetToken
        startTimerFromScratch()
    }, [resetToken, startTimerFromScratch])

    useEffect(() => {
        if (!start) return
        if (deadlineRef.current === null) {
            deadlineRef.current = Date.now() + remainingRef.current
        }
        updateTimer()
        const intervalId = setInterval(updateTimer, 250)
        return () => clearInterval(intervalId)
    }, [start, updateTimer])

    function pauseTimer() {
        updateTimer()
        deadlineRef.current = null
        updateStartTimer(false)
    }

    function resetTimer() {
        phaseRef.current = 'work'
        remainingRef.current = PHASE_DURATION_MS
        deadlineRef.current = null
        setWorkRemainingMs(PHASE_DURATION_MS)
        setBreakRemainingMs(PHASE_DURATION_MS__TIMEOUT)
    }

    return (
        <>
            <div className="timer-title">timer</div>
            <div className="timer">{formatTime(workRemainingMs)}</div>
            <div className="timeout-container">
                <div className="timeout-title">timeout: <span>{formatTime(breakRemainingMs)}</span></div>
            </div>
            <div className="timer__button-container">
                {start
                    ? <button className="stop-button reset-button" onClick={pauseTimer}>Stop</button>
                    : <button className="start-button conf-button" onClick={() => updateStartTimer(true)}>Start</button>}
                {!start && <button className="reset-button" onClick={resetTimer}>Reset</button>}
            </div>
        </>
    )
}

export default Timer
