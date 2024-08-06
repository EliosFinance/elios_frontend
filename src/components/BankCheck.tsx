import {useAuth} from "@/context/AuthProvider.tsx";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import BlurOverlay from "@/components/BlurOverlay.tsx";

const BankCheck = () => {
    const { user } = useAuth()
    const location = useLocation()

    return (
        <>
            { !user.powens_token && <BlurOverlay />}
            <Outlet />
        </>
    )
}

export default BankCheck
