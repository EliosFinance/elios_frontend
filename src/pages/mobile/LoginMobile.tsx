import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthProvider.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {PasswordInput} from "@/components/PasswordInput.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircle} from "lucide-react";

const LoginMobile = () => {
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

    return (
        <>
            <img src="/eliosLogo.png" alt="" className="max-w-[77px] max-h-[75px]"/>
            <h1>Mobile</h1>
        </>
    )
}

export default LoginMobile
