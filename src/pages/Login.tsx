import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthProvider.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {PasswordInput} from "@/components/PasswordInput.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircle} from "lucide-react";
import {GoogleLogin} from "react-google-login";
import {gapi} from "gapi-script";

const Login = ({ VITE_GOOGLE_CLIENT_ID }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate()
    const { login } = useAuth()

    const handleSubmit = async () => {
        setErrorMsg("")
        if (!username || !password) {
            setErrorMsg("Please fill in the fields");
            return;
        }

        try {
            const success = await login(username, password);
            if (success) {
                navigate('/')
            } else {
                setErrorMsg("Incorrect username or password")
            }
        } catch (error) {
            setErrorMsg("An error occured")
        }
    }

    const onSuccessGoogle = (response) => {
        console.log(response)
    }
    const onFailureGoogle = (response) => {
        console.log(response)
    }

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: VITE_GOOGLE_CLIENT_ID,
                scope: ""
            })
        }
        gapi.load('client:auth2', start)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className='w-[100%] sm:w-[100%] flex flex-col justify-center border-solid border-[1px] border-gray-200 rounded-lg p-4 shadow-md'>
                <div className="mx-auto w-full text-left gap-4 flex flex-col">
                    <Label htmlFor="email" className="ml-2">Enter your email below:</Label>
                    <Input
                        type="email"
                        placeholder="Your email:"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        id="email"
                    />
                    <Label htmlFor="password" className="ml-2">Enter your password below:</Label>
                    <PasswordInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                    />
                    <Button onClick={handleSubmit}>Sign in</Button>
                    {errorMsg && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {errorMsg}
                            </AlertDescription>
                        </Alert>
                    )}
                    {/*<div className="w-100 mt-2">*/}
                    {/*    New user? <Link to={"/register"}>Register</Link>*/}
                    {/*</div>*/}

                    <GoogleLogin 
                        clientId={VITE_GOOGLE_CLIENT_ID}
                        buttonText="Login"
                        onSuccess={onSuccessGoogle}
                        onFailure={onFailureGoogle}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    />
                </div>
            </div>
        </>
    )
}

export default Login
