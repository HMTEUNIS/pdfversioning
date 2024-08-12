import { useState, useEffect, version } from 'react'
import pdfToText from 'react-pdftotext'
import Popup from 'reactjs-popup';
import PdfEdit from './PdfEdit';
import emailjs from '@emailjs/browser';
function Editer({ pdf, setmode }) {
    const [page, setPage] = useState(1)
    const [length, setLength] = useState(5)
    const [arr, setArr] = useState([])
    emailjs.init({
        publicKey: 'AHBkhOErAFk4Ao6F_',
        blockHeadless: true,
        blockList: {
            list: ['foo@emailjs.com', 'bar@emailjs.com'],
            watchVariable: 'userEmail',
        },
        limitRate: {
            id: 'app',
            throttle: 10000,
        },
    });
    useEffect(() => {
        extractText()
    }, [])
    async function extractText() {
        const file = await fetch(pdf.pdf)
            .then(res => res.blob())
            .catch(error => console.error(error))

        pdfToText(file)
            .then(t => setArr(buildArr(t)))
            .catch(error => console.error("Failed to extract text from pdf"))


    }
    function buildArr(s) {
        const arr = [];
        let tmp = 0;
        for (let i = 1; i < s.length; i++) {
            if (/^[A-Z]*$/.test(s[i]) && s[i - 1] != " ") {
                const p = s.slice(tmp, i)
                arr.push({ t: p, l: p.length });
                tmp = i
            }
            if (i + 1 === s.length) {
                const p = s.slice(tmp)
                arr.push({ t: p, l: p.length });
            }
        }
        setLength(arr.length);
        return arr
    }

    function handleSubmit() {
        const formatted = validate(arr)
        if (formatted.length > 1) {
            var templateParams = {
                'zine_name': pdf.title,
                'message': formatted
            };
            emailjs.send('service_tfem7t5', 'template_cjqdgna', templateParams).then(
                (response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    setmode(false)
                    alert("Thank you for sending us suggestions")

                },
                (error) => {
                    console.log('FAILED...', error);
                    alert("there was an error submitting these")

                },
            );
        }
        else { alert("you didn't change anything") }
    }

    function validate(arr) {
        const html = []
        for (let i = 0; i < arr.length; i++) {
            arr[i].t.length == arr[i].l ? html.push(`<p>${arr[i].t}</p><br><br><br>`) : html.push(`<p style="font-weight: bold">${arr[i].t}</p><br><br><br>`)
        }
        return html.join(" ").indexOf("font-weight: bold") === -1 ? "" : html.join(" ")
    }



    function pageControl(dir) {
        if (dir === 1 && page < length) {
            setPage(page + 1)
        }
        if (dir === 0 && page > 1) {
            setPage(page - 1)
        }

    }

    return (
        <div>
            <div className='pdfEditControls'>
                <Popup
                    arrow="false"
                    trigger=
                    {<span className='button' >Send Us an Edit</span>}
                    position="bottom center"
                    close="true"
                >
                    <PdfEdit setArr={setArr} arr={arr} page={page} />
                    <div style={{ "position": "relative", "top": "-40px" }}>
                        <span className='button' onClick={() => handleSubmit()}>Submit</span>
                        <span className='button' onClick={() => setmode(false)}>Cancel</span>
                        <span className='button' onClick={() => pageControl(0)}>⬅️</span>
                        <span>{page} / {length}</span>
                        <span className='button' onClick={() => pageControl(1)} >➡️</span>
                        <span>{pdf.title} Version {pdf.version}</span>
                    </div>


                </Popup>
            </div>
        </div>
    )
}

export default Editer