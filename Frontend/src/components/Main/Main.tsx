import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {HomePage} from './HomePage';
import {AllConferences} from "./Conferencies/MainPage/AllConferences";
import {UnregisterRequest} from "../utils/Errors/ErrorPages/UnregisterRequest";
import {OtherUserProfileContainer} from "./Profile/OtherUserProfileContainer";
import {Loader} from "../utils/Loader/Loader";
import {NotFoundPage} from "../utils/Errors/ErrorPages/NotFoundPage";
import {Box} from "@mui/material";
import {RedirectAfterAction} from "./Conferencies/RedirectAfterAction/RedirectAfterAction";

export const Main: React.FC = () => {
    document.title = 'Главная';

    const MyProfile = React.lazy(() => import("./Profile/MyProfile"));
    const CreateConference = React.lazy(() => import("./CreateConference/CreateConference"));
    const Registration = React.lazy(() => import("./RegistrationForm/Registration"));
    const SignIn = React.lazy(() => import("./Auth/SignIn"));
    const ConferencePage = React.lazy(() => import("./Conferencies/ConferencePage/ConferencePage"));
    const InvitePage = React.lazy(() => import("./InvitePage/InvitePage"));

    return (
        <Box sx={{marginTop: "36px", marginBottom: "36px"}}>
            <React.Suspense fallback={<Loader text={"Подгружаем страничку"}/>}>
                <Routes>
                    <Route path='/' element={<HomePage />}/>
                    <Route path='/registration' element={<Registration />}/>
                    <Route path='/createConf' element={<CreateConference />}/>
                    <Route path='/allconfs' element={<AllConferences />}/>
                    <Route path='/signin' element={<SignIn />}/>
                    {/*  //TODO DEBUG  */}
                    <Route path='/myprofile' element={<MyProfile />}/>
                    {/*  //TODO DEBUG  */}
                    <Route path='/uregisterrequest' element={<UnregisterRequest />}/>
                    <Route path='/notfound' element={<NotFoundPage />}/>
                    <Route path="/userprofile/:userId" element={<OtherUserProfileContainer />}/>
                    <Route path="/conferencepage/:confId" element={<ConferencePage />}/>
                    <Route path="/invitetoconference/:inviteId" element={<InvitePage />}/>
                    <Route path="/conference/:action/:confId" element={<RedirectAfterAction />}/>
                    <Route element={<NotFoundPage />}/>
                </Routes>
            </React.Suspense>
        </Box>
    );
};
