import { useReducer } from "react"
import "./style.css"
import Digitbutton from "./components/Digitbutton"
import OperationButton from "./components/OperationButton"

export const ACIONS ={
    ADD_DIGIT : 'add-digit',
    CHOOSE_OPERATION : 'choose-operation',
    CLEAR:'clear',
    DELETE_DIGIT:'delete-digit',
    EVALUATE:'evaluate'
}
function reducer (state, { type, payload }){
    switch(type){
        case ACIONS.ADD_DIGIT:
            if(state.overwrite){
                return{
                    ...state,
                    currentOperand:payload.digit,
                    overwrite:false,
                }
            }
            if(payload.digit === "0" && state.currentOperand === "0") {
                return state
            }
            if(payload.digit === "." && state.currentOperand.includes(".")){
                return state
            } 
                 return {
                     ...state,
                     currentOperand: `${state.currentOperand || ""}${payload.digit}`,
                 }
                 case ACIONS.CHOOSE_OPERATION:
                if(state.currentOperand == null && state.previousOperand == null){
                    return state
                }

                if(state.currentOperand == null){
                    return{
                        ...state,
                        operation: payload.operation,
                    }
                }

                if(state.previousOperand == null){
                    return {
                        ...state,
                        operation: payload.operation,
                        previousOperand: state.currentOperand,
                        currentOperand: null,
                    }
                }
                return{
                    ...state,
                    previousOperand: evauate(state),
                    operation: payload.operation,
                    currentOperand: null
                }
                 case ACIONS.CLEAR:
                     return {}
                     case ACIONS.DELETE_DIGIT:
                         if(state.overwrite){
                             return{
                                 ...state,
                                 overwrite:false,
                                 currentOperand:null
                             }

                             }
                             if(state.currentOperand == null) return state
                             if(state.currentOperand.length === 1){
                                 return {...state, currentOperand:null}
                             }

                             return{
                                 ...state,
                                 currentOperand:state.currentOperand.slice(0,-1)
                             }
                case ACIONS.EVALUATE:
                    if(state.operation == null || state.currentOperand == null || state.
                        previousOperand == null){
                            return state
                        }
                        return {
                            ...state,
                            overwrite:true,
                            previousOperand: null,
                            operation:null,
                            currentOperand:evauate(state),
                        }
            }
            
        }
function evauate({currentOperand,previousOperand,operation}){
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if(isNaN(prev) || isNaN(current)) return ""

    let computation = ""
    switch(operation){
        case "+":
            computation = prev + current
            break
        case "-":
            computation = prev - current
            break
        case "/":
            computation = prev / current
            break
        case "*":
            computation = prev * current
            break
    }
    return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us",{
    maximumFractionDigits:0,
})
function formatOperand(operand){
    if(operand == null) return
    const [integer, decimal] = operand.split('.')
    if (decimal == null) return INTEGER_FORMATTER.format(integer)
    return`${INTEGER_FORMATTER.format(integer)}.${decimal}`
}
    function App() {
        const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer,
            {})

        return (
            <div className="calculator-grid">
            <div className="output">
            <div className="previuos-operand">{formatOperand(previousOperand)}{operation}</div>
            <div className="current-operand">{formatOperand(currentOperand)}</div>
            </div>
            <button className="span-two" onClick={() => dispatch({type: ACIONS.CLEAR})} >AC</button>
            <button onClick={() => dispatch({type: ACIONS.DELETE_DIGIT})}>DEL</button>
            <OperationButton operation="/" dispatch={dispatch}/>
            <Digitbutton digit="1" dispatch={dispatch}/>
            <Digitbutton digit="2" dispatch={dispatch}/>
            <Digitbutton digit="3" dispatch={dispatch}/>
            <OperationButton operation="*" dispatch={dispatch}/>
            <Digitbutton digit="4" dispatch={dispatch}/>
            <Digitbutton digit="5" dispatch={dispatch}/>
            <Digitbutton digit="6" dispatch={dispatch}/>
            <OperationButton operation="+" dispatch={dispatch}/>
            <Digitbutton digit="7" dispatch={dispatch}/>
            <Digitbutton digit="8" dispatch={dispatch}/>
            <Digitbutton digit="9" dispatch={dispatch}/>
            <OperationButton operation="-" dispatch={dispatch}/>
            <Digitbutton digit="." dispatch={dispatch}/>
            <Digitbutton digit="0" dispatch={dispatch}/>
            <button className="span-two" onClick={() => dispatch({type: ACIONS.EVALUATE})} >=</button>
        </div>
    )
}
export default App