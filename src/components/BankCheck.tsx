import {useAuth} from "@/context/AuthProvider.tsx";
import {Outlet} from "react-router-dom";
import BlurOverlay from "@/components/BlurOverlay.tsx";

const BankCheck = () => {
    const { user } = useAuth()

    return (
        <>
            { !user.powens_token && <BlurOverlay />}
            <Outlet />
        </>
    )
}

export default BankCheck
