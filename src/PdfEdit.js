import { useState } from 'react'

function PdfEdit({ page, arr, setArr }) {

    function updateText({ target }, i) {
        const textCopy = Array.from(arr)
        textCopy[i].t = target.value
        setArr(textCopy);
        console.log(arr)
    }
    return (
        <div style={{ "height": "100%" }}>
            <textarea className='editText'
                value={arr[page - 1].t}
                onChange={(event) => updateText(event, page - 1)}
            >
            </textarea></div>
    )
}

export default PdfEdit