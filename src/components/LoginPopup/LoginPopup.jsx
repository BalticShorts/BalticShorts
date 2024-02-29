import { useContext, useEffect, useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import { GlobalContext } from "../../App";
import { createUserProfile } from "../../graphql/mutations";
import { API } from "aws-amplify";
import { checkPersonExists } from "../../custom-queries/queries";


export const LoginPopup = () => {
    const context = useContext(GlobalContext)

    const [showModal, setShowModal] = useState(context.loggedInModal);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [piekrituTicked, setPiekrituTicked] = useState(false);
    const [fastLogin, setFastLogin] = useState(false);
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [error, setError] = useState({})
    const [page, setPage] = useState('login');
    const [confirmationStage, setConfirmationStage] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState('');
    const [forgetEmail, setForgetEmail] = useState('');
    const [restorePassword, setRestorePassword] = useState(false);

    const Auth = context.auth

    useEffect(() => {
        setShowModal(context.loggedInModal);
    }, [context.loggedInModal])
    
    const logIn = async () => {
        try {
            await Auth.signIn(email, password);
            context.setLoggedIn(true);
            setShowModal(false);
            resetModal();
        } catch (error) {
            setError({"code":error.code, "message": error.message})
        }
    }

    async function handleSignUp() {
        try {
            if(name === "" || surname === ""){
                throw new Error("Vārds un uzvārds nevar būt tukši!")
            }
            await Auth.signUp({
                username: email,
                password: password,

                attributes: {
                    given_name : name,
                    family_name: surname
                },
                autoSignIn: true
            });

          setConfirmationStage(true);

        } catch (error) {
          console.log('error signing up:', error.code);
          setError({"code":error.code, "message": error.message})
        }
    }

    async function handleCodeConfirmatation(){
        // console.log(confirmationCode)
        try {
            const username = email;
            const code = confirmationCode;
            await Auth.confirmSignUp(username, code)
            setShowModal(false);
            setError({});
            setConfirmationStage(false);
            await logIn();
            createProfile();
        } catch (error) {
            
        }
    }

    async function resendCode(){
        try {
            const username = email;
            await Auth.resendSignUp(username);
        } catch (error) {
            
        }
    }

    async function handleForgetPassword(){
        try {
            const username = forgetEmail;
            await Auth.forgotPassword(username);
            setRestorePassword(true);
            setConfirmationCode('');
        } catch (error) {
            setError({"code":error.code, "message": error.message})
        }
    }

    async function handleNewPassword(){
        try {
            const username = forgetEmail;
            const code = confirmationCode;
            const newPassword = password;
            const checkNewPassword = checkPassword;
            if (newPassword !== checkNewPassword)
                throw new Error("Paroles nesakrīt")
            await Auth.forgotPasswordSubmit(username, code, newPassword);
            setRestorePassword(false);
            setPage('login');
            setError({"code":'PasswordChange', "message": 'Parole nomainīta'})
        } catch (error) {
            setError({"code":error.code, "message": error.message})
        }
    }

    async function createProfile() {
        try {
            const name = Auth.user.attributes.given_name;
            const surname = Auth.user.attributes.family_name;
            const email = Auth.user.attributes.email;
            const id = Auth.user.username;
            // console.log(id)
            // need to add a new field for login username or id !!!
            const exists = await API.graphql({
                query: checkPersonExists,
                variables : {
                    email: email
                },
                authMode: 'AWS_IAM'
            });
            if(exists.data.listUserProfiles.items.length === 0){
                await API.graphql({
                    query : createUserProfile,
                    variables : {
                    input : {
                        name: name,
                        surname: surname,
                        email: email,
                        user_id: id,
                        is_member: false,
                        is_admin: false,
                    }},
                    authMode: 'AWS_IAM'
                });
            }
        } catch (error) {
            console.log("error creating profile", error)
        }
    }

    function changePage(page){
        setEmail('');
        setPassword('');
        setPage(page);
    }

    function resetModal(){
        setShowModal(false);
        setError({});
        setConfirmationCode('');
        setConfirmationStage(false);
        setRestorePassword(false);
        setForgetEmail('');
        setPiekrituTicked(false);
        context.setLoggedInModal(false);
        setPage('login');
    }

    useEffect(() => {
        if(context.showModal){
            setError({});
            createProfile();
        }
    }, [page])


    return(
        <>
            {showModal && (
            <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-md bg-opacity-50 z-10 overscroll-auto">
                <div className="w-[470px] h-[500px] px-5 pt-5 bg-beige border border-black flex-col justify-start inline-flex">
                    <div className="w-full h-fit relative flex items-left justify-between mb-5">
                        <img src={require("./static/BS_small_logo.png")} alt="logo" />
                        <div className="flex items-end">
                            <CloseIcon className="cursor-pointer" onClick={() => resetModal()} />
                        </div>
                    </div>



                    {page === 'login' && (
                    <>
                    <div className="w-full h-fit flex items-center justify-center mb-5">
                        <img className="w-[80px] h-[100px]" src={require("./static/Login_placeholder.png")} alt="login_photo" />
                    </div>
                    <div className="pb-2 self-stretch flex-col justify-start items-center inline-flex">
                        <div className="w-full justify-center items-center flex flex-col text-lg mb-2 text-red-700">{error.message}</div>
                        <div className="w-full justify-center items-center flex flex-col text-lg mb-10">
                            <input id="email" type="email" placeholder="E-pasts" className="bg-beige text-center border-none outline-none" onChange={e => setEmail(e.target.value)} ></input>
                            <div className="w-full h-px relative border border-black"></div>
                        </div>
                        <div className="w-full justify-center items-center flex flex-col text-lg">
                            <input id="password" type="password" placeholder="Parole" className="bg-beige text-center border-none outline-none" onChange={e => setPassword(e.target.value)}></input>
                            <div className="w-full h-px relative border border-black"></div>
                        </div>
                        <div className="Frame102 w-96 h-5 pt-2.5 justify-between items-center inline-flex py-10">
                            <div className="text-center text-black text-xs font-normal font-['Arial'] tracking-wide ">
                                <span id="rememberMe" className="cursor-pointer" onClick={() => setFastLogin(!fastLogin)}>{fastLogin ? <>[&#x2713;] </> : <>[  ] </>}</span>
                                Atcerēties mani
                            </div>

                            <div className="AizmirsiParoli text-center text-black text-xs font-normal font-['Arial'] tracking-wide cursor-pointer" onClick={() => setPage('forget')}>Aizmirsi paroli?</div>
                        </div>
                        <div className="Frame137 pt-6 flex-col justify-start items-start flex">
                            <div className="Button h-7 px-2.5 pt-1 pb-0.5 bg-beige border border-black justify-center items-center gap-2.5 inline-flex">
                                <div type="submit" className="cursor-pointer grow shrink basis-0 text-center text-black text-base font-normal font-['SchoolBook']" onClick={() => logIn()}>Ieiet</div>
                            </div>
                        </div>
                    </div>
                    </>
                    )}
                    {page === 'register' && (
                        <>
                        {confirmationStage ? (
                        <div className="pb-2 self-stretch flex-col justify-start items-center inline-flex">
                            <div className="w-full justify-center items-center flex flex-col text-lg mb-1 text-red-700">{error.message}</div>
                            <div className="w-full justify-center items-center flex flex-col text-lg mb-1 text-red-700"> Kods nosūtīts uz epastu!</div>
                            <div className="w-full justify-center items-center flex flex-col text-lg border border-black">
                                <input id="code" type="text" placeholder="Code" className="bg-beige text-center border-none outline-none" onChange={e => setConfirmationCode(e.target.value)} ></input>
                            </div>
                            <div className="Frame137 pt-6 justify-start items-start flex flex-row gap-6">
                                <div className="Button h-7 px-2.5 pt-1 pb-0.5 bg-beige border border-black justify-center items-center gap-2.5 inline-flex">
                                    <div type="submit" className="cursor-pointer grow shrink basis-0 text-center text-black text-base font-normal font-['SchoolBook']" onClick={() => handleCodeConfirmatation()}>Reģistrēties</div>
                                </div>
                                <div className="Button h-7 px-2.5 pt-1 pb-0.5 bg-beige border border-black justify-center items-center gap-2.5 inline-flex">
                                    <div className="cursor-pointer grow shrink basis-0 text-center text-black text-sm font-normal font-['SchoolBook']" onClick={() => resendCode()}>Pārsūtīt kodu</div>
                                </div>
                            </div>
                        </div>
                        ):(
                        <>
                        <div className="w-full h-fit flex items-center justify-center">
                            <img className="w-[80px] h-[100px]" src={require("./static/Login_placeholder.png")} alt="login_photo" />
                        </div>

                        <div className="pb-2 self-stretch flex-col justify-start items-center inline-flex">
                            <div className="w-full justify-center items-center flex flex-col text-lg mb-1 text-red-700">{error.message}</div>
                            <div className="w-full justify-center items-center flex flex-row text-lg mb-0 border border-black">
                                <input id="name" type="text" placeholder="Vārds" className="bg-beige text-center border-none outline-none" onChange={e => setName(e.target.value)} ></input>
                                <div className="h-full w-0 border-r border-black "></div>
                                <input id="surname" type="text" placeholder="Uzvards" className="bg-beige text-center border-none outline-none" onChange={e => setSurname(e.target.value)} ></input>
                            </div>
                            <div className="w-full justify-center items-center flex flex-col text-lg border-x border-black">
                                <input id="email" type="email" placeholder="E-pasts" className="bg-beige text-center border-none outline-none" onChange={e => setEmail(e.target.value)} ></input>
                            </div>
                            <div className="w-full justify-center items-center flex flex-col text-lg border border-black">
                                <input id="password" type="password" placeholder="Parole" className="bg-beige text-center border-none outline-none" onChange={e => setPassword(e.target.value)}></input>
                            </div>
                            <div className="w-96 h-5 pt-2.5 justify-between items-center inline-row py-10">
                                <div className="text-center text-black text-xs font-normal font-['Arial'] tracking-wide "><span id="acceptRules" className="cursor-pointer" onClick={() => setPiekrituTicked(!piekrituTicked)}>{piekrituTicked ? <>[&#x2713;]</> : <>[  ]</>}</span>Piekrītu <span className="text-center flex-row font-bold cursor-pointer">noteikumiem</span></div>
                            </div>
                            <div className="Frame137 pt-6 flex-col justify-start items-start flex">
                                <div className="Button h-7 px-2.5 pt-1 pb-0.5 bg-beige border border-black justify-center items-center gap-2.5 inline-flex">
                                    <div type="submit" className="cursor-pointer grow shrink basis-0 text-center text-black text-base font-normal font-['SchoolBook']" onClick={() => {piekrituTicked ? handleSignUp() : setError({"code":'AcceptRules', "message": 'Jāpiekrīt noteikumiem!'})}}>Reģistrēties</div>
                                </div>
                            </div>
                        </div>
                        </>
                        )}
                    </>)
                    }
                    {page === 'forget' && (
                        <>
                        {restorePassword ?
                            <div className="pb-2 self-stretch flex-col justify-start items-center inline-flex">
                                <div className="flex-col justify-center items-center gap-2.5 flex">
                                    <div className="w-96 text-center text-black text-xl font-normal font-['SchoolBook']">
                                        Ievadiet kodu un jauno paroli.
                                    </div>
                                </div>
                                <div className="w-full justify-center items-center flex flex-col text-lg mb-1 text-red-700">{error.message}</div>
                                <div className="w-full justify-center items-center flex flex-col text-lg my-4">
                                    <input id="forgetEmail" type="text" placeholder="Email" className="bg-beige text-center border-none outline-none" readOnly value={forgetEmail}></input>
                                    <div className="w-full h-px relative border border-black"></div>
                                </div>
                                <div className="w-full justify-center items-center flex flex-col text-lg mb-4">
                                    <input id="forgetCode" type="text" placeholder="Kods" className="bg-beige text-center border-none outline-none" onChange={e => setConfirmationCode(e.target.value)} value={confirmationCode} ></input>
                                    <div className="w-full h-px relative border border-black"></div>
                                </div>
                                <div className="w-full justify-center items-center flex flex-col text-lg mb-4">
                                    <input id="password" type="password" placeholder="Parole" className="bg-beige text-center border-none outline-none" onChange={e => setPassword(e.target.value)}></input>
                                    <div className="w-full h-px relative border border-black"></div>
                                </div>
                                <div className="w-full justify-center items-center flex flex-col text-lg mb-4">
                                    <input id="checkPassword" type="password" placeholder="Parole atkārtoti" className="bg-beige text-center border-none outline-none" onChange={e => setCheckPassword(e.target.value)}></input>
                                    <div className="w-full h-px relative border border-black"></div>
                                </div>
                                <div className="Frame137 pt-6 justify-start items-start flex flex-row gap-6">
                                    <div className="Button h-7 px-2.5 pt-1 pb-0.5 bg-beige border border-black justify-center items-center gap-2.5 inline-flex">
                                        <div type="submit" className="cursor-pointer grow shrink basis-0 text-center text-black text-base font-normal font-['SchoolBook']" onClick={() => handleNewPassword()}>Nomainīt</div>
                                    </div>
                                </div>
                            </div>
                            : 
                            <div className="pb-2 self-stretch flex-col justify-start items-center inline-flex mt-5">
                                <div className="pb-7 flex-col justify-center items-center flex">
                                    <div className="Frame103 flex-col justify-start items-start flex">
                                        <div className="Frame95 w-96 h-10 pb-1.5 flex-col justify-center items-center flex">
                                            <div className="w-96 h-6 text-center text-black text-lg font-normal font-['SchoolBook']">Aizmirsi paroli?</div>
                                        </div>
                                    </div>
                                    <div className="flex-col justify-center items-center gap-2.5 flex">
                                        <div className="w-96 text-center text-black text-base font-normal font-['SchoolBook']">
                                            Ievadi zemāk e-pastu ar kuru reģistrējies. <br/>Uz to nosūtīsim kodu, lai atjaunotu paroli.
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full justify-center items-center flex flex-col text-lg mb-5 text-red-700">{error.message}</div>

                                <div className="w-full justify-center items-center flex flex-col text-lg">
                                    <input id="email" type="email" placeholder="E-pasts" className="bg-beige text-center border-none outline-none" onChange={e => setForgetEmail(e.target.value)} ></input>
                                    <div className="w-full h-px relative border border-black"></div>
                                </div>
                                <div className="Frame137 pt-6 justify-start items-start flex flex-row gap-6">
                                    <div className="Button h-7 px-2.5 pt-1 pb-0.5 bg-beige border border-black justify-center items-center gap-2.5 inline-flex">
                                        <div type="submit" className="cursor-pointer grow shrink basis-0 text-center text-black text-base font-normal font-['SchoolBook']" onClick={() => handleForgetPassword()}>Sūtīt</div>
                                    </div>
                                </div>
                            </div>
                        }
                        </>
                    )}
                    <div className="w-full h-fit max-h-[18px] flex mt-auto felx-row mb-5">
                        <img className="bottom-0" src={require("./static/Info_button.png")} alt="info" />
                        <div className="w-full justify-center items-center inline-flex text-base">
                            <div className="inline-flex items-center cursor-pointer" onClick={() => {page !== 'login' ? changePage('login') : changePage('register')}}>
                                {page !== 'login' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="10" viewBox="0 0 7 10" fill="none">
                                        <path d="M5.36661e-08 4.99965L7 0.500069L7 9.50007L5.36661e-08 4.99965Z" fill="black"/>
                                    </svg>
                                )}
                                <div className="m-1 h-fit text-center text-black text-sm font-normal font-['SchoolBook']">{page !== 'login' ? 'Pieslēgties' : 'Reģistrēties'}</div>
                                {page === 'login' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="10" viewBox="0 0 8 10" fill="none">
                                        <path d="M7.5 5.00035L0.5 9.49993L0.5 0.499931L7.5 5.00035Z" fill="black"/>
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    )
}