import React, {useReducer} from 'react'
import './style.css'

const reducer = (state, action) => {
    if(action.type === "INCR"){
       state = state+1;
    }
    if(state>0 && action.type === "DECR"){
        state = state-1;
    }
    return state;
}

const UseReducer = () => {
  
    // const initialData = 15;
    // const[myNum, setMyNum]= useState(0);


    const initialData = 15;
    const[state, dispatch] = useReducer(reducer, initialData);




  return (
   <>
    <div className="center-div">
      <p>{state}</p>
        <div class="button2" onClick={() => dispatch({type: "INCR"})}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
           INCR
            </div>
        <div class="button2" onClick={() => dispatch({type: "DECR"})}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
           DECR
            </div>
    </div>
   </>
  )
}

export default UseReducer
