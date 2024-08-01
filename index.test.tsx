import { render, screen } from '@testing-library/react-native'
import MyApp from './app/index'
import {
    fireGestureHandler,
    getByGestureTestId,
} from 'react-native-gesture-handler/jest-utils'
import { PanGesture } from 'react-native-gesture-handler'

describe('index', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.runOnlyPendingTimers()
        jest.useRealTimers()
    })
    it('should drag the view 50 units to the right in the X axis, with a pan slow factor of 20', () => {
        const UNITS = 50
        const PAN_SLOW_FACTOR = 20
        render(<MyApp />)
        const blueBox = screen.getByLabelText('blueBox')
        expect(blueBox).toHaveAnimatedStyle({
            transform: [{ translateX: 0 }],
        })
        const panGesture = getByGestureTestId('panGesture')
        fireGestureHandler<PanGesture>(panGesture, [
            { x: 1, y: 1 },
            { translationX: UNITS },
        ])
        jest.advanceTimersByTime(100)
        expect(blueBox).toHaveAnimatedStyle({
            transform: [{ translateX: UNITS / PAN_SLOW_FACTOR }],
        })
    })
})
