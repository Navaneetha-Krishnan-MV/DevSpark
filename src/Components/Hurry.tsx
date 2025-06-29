import DeadLine from "./DeadLine.tsx"
import CountDownTimer from "./CountDownTimer.tsx"
import { useMediaQuery } from 'react-responsive'

const Hurry = () => {
    const isMobile = useMediaQuery({ maxWidth: 800 })
    
    return (
        <div>
            {!isMobile && <DeadLine />}
            <CountDownTimer />
        </div>
    )
}

export default Hurry