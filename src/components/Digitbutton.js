import { ACIONS } from "../App"


export default function DigitButton({ dispatch, digit }) {
    
    return (
    <button 
    onClick={() => dispatch({ type:ACIONS.ADD_DIGIT, payload: { digit } })}
    >
        {digit}
        </button>
    )
}