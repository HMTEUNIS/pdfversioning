import { useState } from 'react'
import Editer from './Editer'
function PdfCard({ pdf }) {
  const [editMode, setEditMode] = useState(false)

  function dlPdf(x) {
    window.location.href = x.pdf
  }

  return (
    <div className='pdfCardCont'>
      <div className='pdfCard'>
        <div className='pdfCardInfo'>
          <span className='zineTitle'>{pdf.title}</span>
          <span className='zineDescription'>{pdf.description}</span>
        </div>
        <div className='pdfCardControls'>
          <span className='button' onClick={() => dlPdf(pdf)}>Download Pdf</span>
          <span className='button' onClick={() => setEditMode(!editMode)}>Collaborate</span>
        </div>
      </div>
      {editMode ? <Editer pdf={pdf} setmode={setEditMode} /> : null}
      <div>
      </div>
    </div>
  )
}

export default PdfCard