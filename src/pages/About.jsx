import { Footer } from "../modified-ui-components/Footer";

const About = () => {
    return(
        <>
        <div className="ParBalticShorts w-full h-fit relative bg-amber-50">
                <div className="LogoContainer w-full h-fit flex flex-col items-center justify-center">
                    <div className="Logo w-80 h-48 relative flex flex-col items-center mt-10 mb-24">
                        <img className="w-full h-full" src={require("./static/Logo.png")} alt="Baltic shorts logo" />
                    </div>
                </div>
            
            
            <div className="ParProjektu items-center flex flex-col py-10">
                <div className="mb-10 w-full h-5 relative text-center text-black text-xl font-bold font-['Arial'] uppercase tracking-wide">PAR PROJEKTU</div>
                <div className="w-1/2 relative text-justify text-black text-lg font-normal font-['SchoolBook']">
                    <p>Baltic Shorts ir digitāla straumēšanas platforma, kas fokusējas uz Baltijas valstīs (Latvija, Lietuva, Igaunija) radītu īsfilmu izrādīšanu.
                    Projekta mērķis ir radīt un uzturēt ērti lietojamu plaša satura mājaslapu, kas attīsta īsfilmu formas pieejamību un to autoru atpazīstamību plašākā tirgū.</p>
                    <br/>
                    <p>Daļa darbu tiek augšupielādēti no pašas platformas uzturētāju puses, sadarbībā Baltijas filmu producēšanas studijām un filmu augstskolām.
                        Savukārt platformas dalībniekiem tiek piedāvāta iespēja pašiem augšupielādēt savus darbus, tādējādi radot plašu īsfilmu katalogu.
                        Platformas darbību veicina tās kurators, regulāri izceļot un veidojot filmu izlases ar jauniem un senāk radītiem darbiem.</p>
                    </div>
            </div>

            <div className="Atbildiba items-center flex flex-col py-10">
                <div className="mb-10 w-full h-5 relative text-center text-black text-xl font-bold font-['Arial'] uppercase tracking-wide">ATBILDĪBA</div>
                <div className="mb-10 relative justify-start items-start gap-6 inline-flex">
                    <div className="w-96 text-center">
                        <span className="text-black text-sm font-normal font-['SchoolBook']">PROJEKTA VADĪTĀJS<br/></span>
                        <span className="text-black text-base font-bold font-['SchoolBook']">Emīls Alps</span>
                    </div>
                    <div className="w-96 text-center">
                        <span className="text-black text-sm font-normal font-['SchoolBook']">GALVENAIS KURATORS<br/></span>
                        <span className="text-black text-base font-bold font-['SchoolBook']">Rūdolfs Deinats</span>
                    </div>
                    <div className="w-96 text-center">
                        <span className="text-black text-sm font-normal font-['SchoolBook']">DIZAINS<br/></span>
                        <span className="text-black text-base font-bold font-['SchoolBook']">Dans Jirgensons</span>
                    	</div>
                </div>
                <div className="relative justify-start items-start gap-6 inline-flex">
                    <div className="w-96 text-center">
                        <span className="text-black text-sm font-normal font-['SchoolBook']">LAPAS IZSTRĀDE<br/></span>
                        <span className="text-black text-base font-bold font-['SchoolBook']">Dāvis Jankevics</span>
                    </div>
                </div>
            </div>

            <div className="Atbalstitaji items-center flex flex-col mt-10 py-10">
                <div className="mb-10 w-full h-5 relative text-center text-black text-xl font-bold font-['Arial'] uppercase tracking-wide">ATBALSTĪTĀJI</div>
                <div className="mb-10 relative justify-start items-start gap-6 inline-flex">
                    <div className="w-96 text-center">
                        <span className="text-black text-base font-bold font-['SchoolBook']">Latvijas Valsts Kultūrkapitālfonds<br/></span>
                    </div>
                    <div className="w-96 text-center">
                        <span className="text-black text-base font-bold font-['SchoolBook']">Latvijas Kultūras Akadēmija</span>
                    </div>
                    <div className="w-96 text-center">
                        <span className="text-black text-base font-bold font-['SchoolBook']">Latvijas Mākslas Akadēmija</span>
                    	</div>
                </div>
                <div className="relative justify-start items-start gap-6 inline-flex">
                    <div className="w-96 text-center">
                        <span className="text-black text-base font-bold font-['SchoolBook']">Citas Baltijas filmu skolas</span>
                    </div>
                </div>

            </div>

            <div id="contact" className="w-full h-64 py-20 my-10 relative text-center text-black text-xl font-bold font-['Arial'] uppercase tracking-wide">info@balticshorts.com</div>
            <Footer/>
        </div>
        </>
    );
}


export default About;