import { ACIONS } from "../App"


export default function OperationButton({ dispatch, operation }) {
    
    return (
    <button 
    onClick={() => 
        dispatch({ type:ACIONS.CHOOSE_OPERATION, payload: { operation } })
    }
    >
        {operation}
        </button>
    )
}