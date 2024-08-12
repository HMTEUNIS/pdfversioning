import { useEffect, useState } from "react";
import PdfCard from './PdfCard'
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://ztuclzijtfduvbphmuti.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0dWNsemlqdGZkdXZicGhtdXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyOTc5ODcsImV4cCI6MjAzNzg3Mzk4N30.caGfyNPqeZLaKRvbd9LXSlBU7xl1WV3D_0BVfAApAgk");
function Lib() {
    const [pdfs, setPdfs] = useState([])
    useEffect(() => {
        getPdfs();
    }, []);

    async function getPdfs() {
        const { data } = await supabase.from("public_archive").select();
        setPdfs(data);
    }
    return (
        <div>
            <div>{pdfs.map(pdf => <PdfCard key={pdf.title} pdf={pdf} />)} </div>

        </div>
    )
}

export default Lib