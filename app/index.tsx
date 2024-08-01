import { StyleSheet } from 'react-native'
import {
    GestureDetector,
    Gesture,
    GestureHandlerRootView,
} from 'react-native-gesture-handler'
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated'

const MyApp = () => {
    const position = useSharedValue(0)
    const panGesture = Gesture.Pan()
        .hitSlop({ right: -25 })
        .onBegin((e) => {
            console.log('onBegin X value: ', e.x)
            console.log(
                "BEGAN TRIGGERED, Gesture recognizer has started receiving touch stream but hasn't yet received enough data to either fail or activate."
            )
        })
        .onStart((e) => {
            console.log('onStart X value: ', e.x)
            console.log(
                'ACTIVE TRIGGERED,Recognizer has recognized a gesture. It will become and stay in the ACTIVE state until the gesture finishes (e.g. when user lifts the finger) or gets cancelled by the touch system. Under normal circumstances the state will then turn into END. In the case that a gesture is cancelled by the touch system, its state would then become CANCELLED. '
            )
        })
        .onUpdate((e) => {
            position.value += e.translationX / 20
            console.log('onUpdate X value: ', e.x)
            console.log('onUpdate TranslationX value: ', e.translationX)
            console.log(
                'UPDATE TRIGGERED, Is called every time a gesture is updated while it is in the ACTIVE state.'
            )
            console.log('positionValue: ', position.value)
        })
        .onEnd((e, success) => {
            console.log(
                'END TRIGGERED, Is called when a gesture transitions from the ACTIVE state to the END, FAILED, or CANCELLED state. If the gesture transitions to the END state, the success argument is set to true otherwise it is set to false.'
            )
            console.log('END SUCCESS:', success)
        })
        .onFinalize((e, success) => {
            console.log(
                'FINALIZE, Is called when a gesture transitions to the END, FAILED, or CANCELLED state. If the gesture transitions to the END state, the success argument is set to true otherwise it is set to false. If the gesture transitions from the ACTIVE state, it will be called after onEnd.'
            )
            console.log('FINALIZE SUCCESS:', success)
        })
        .withTestId('panGesture')
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: position.value }],
    }))
    return (
        <GestureHandlerRootView>
            <GestureDetector gesture={panGesture}>
                <Animated.View
                    style={[styles.box, animatedStyle]}
                    accessibilityLabel="blueBox"
                />
            </GestureDetector>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    box: { width: 100, height: 100, backgroundColor: 'blue' },
})

export default MyApp
