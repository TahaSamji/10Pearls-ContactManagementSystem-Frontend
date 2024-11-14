import { useSelector } from "react-redux";
import ContactPage from "./ContactPage";
import ProfilePage from "./ProfilePage";


export default function MainPage() {
    const Pagetype = useSelector((state) => state.user.initialPage);

    return (
        Pagetype === 'contactPage' ? <ContactPage /> : <ProfilePage />
    );
}
