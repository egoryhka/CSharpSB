import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {HomePage} from './HomePage';
import {UnregisterRequest} from "../utils/Errors/ErrorPages/UnregisterRequest";
import {Loader} from "../utils/Loader/Loader";
import {NotFoundPage} from "../utils/Errors/ErrorPages/NotFoundPage";
import {Box} from "@mui/material";
import AddLevel from "./Courses/CoursePage/Level/AddLevel";
import {Forbidden} from "../utils/Errors/ErrorPages/Forbidden";
import {LevelPage} from "./Courses/CoursePage/Level/LevelPage";

export const Main: React.FC = () => {
    document.title = 'Главная';

    const MyProfile = React.lazy(() => import("./Profile/MyProfile/MyProfile"));
    const Registration = React.lazy(() => import("./RegistrationForm/Registration"));
    const SignIn = React.lazy(() => import("./Auth/SignIn"));
    const CreateCourse = React.lazy(() => import("./Courses/CreateCourse/CreateCourses"));
    const ViewCourse = React.lazy(() => import("./Courses/CoursePage/ViewCourse"));
    const AddLevel = React.lazy(() => import("./Courses/CoursePage/Level/AddLevel"));
    const EditCourse = React.lazy(() => import("./Courses/CoursePage/EditCourses"));

    return (
        <Box sx={{marginTop: "36px", marginBottom: "36px"}}>
            <React.Suspense fallback={<Loader text={"Подгружаем страничку"}/>}>
                <Routes>
                    <Route path='/' element={<HomePage />}/>
                    {/*  Account  */}
                    <Route path='/registration' element={<Registration />}/>
                    <Route path='/signin' element={<SignIn />}/>
                    {/*  //Профиль  */}
                    <Route path='/myprofile' element={<MyProfile />}/>
                    {/*  Все про курсы  */}
                    <Route path='/course/create' element={<CreateCourse />}/>
                    <Route path='/course/:id' element={<ViewCourse />}/>

                    <Route path='/course/:id/edit' element={<EditCourse />}/>
                    {/*  Все про уровни  */}
                    <Route path='/course/:id/level/add' element={<AddLevel />}/>
                    <Route path='/course/:courseId/level/:levelId' element={<LevelPage />}/>
                    {/*  // Error pages  */}
                    <Route path='/uregisterrequest' element={<UnregisterRequest />}/>
                    <Route path='/permissiondenied' element={<Forbidden />}/>
                    <Route path='/notfound' element={<NotFoundPage />}/>
                    <Route element={<NotFoundPage />}/>
                </Routes>
            </React.Suspense>
        </Box>
    );
};
