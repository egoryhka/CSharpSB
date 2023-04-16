import React, {useMemo} from 'react';
import {ConfData} from "../../../../api/ConferenceActions/getConferencePage";
import {Navigate} from "react-router-dom";
import {Avatar, Grid, Typography} from "@mui/material";
import {ViewItem} from "./DescriptionFields/ViewItem";
import {FullDescription} from "./DescriptionFields/FullDescription";
import {DateTimeItem} from "./DescriptionFields/DateTimeItem";
import {ConferenceStatus} from './DescriptionFields/ConferenceStatus';
import {RolesContainer} from "./DescriptionFields/ParticipantsContainer/RolesContainer";
import {InviteLink} from "./DescriptionFields/InviteLink";
import ConferenceTitle from "./DescriptionFields/ConferenceTitle";
import {ReportsMenu} from "./ReportMenu/ReportsMenu";
import {roles} from "../../../utils/LinkTextFromRole/LinkTextFromRole";
import {stringToColor} from "../../../utils/StringToColor/StringToColor";
import {ICourse} from "../../../../api/ConferenceTimeLine/getConferencesTimeLine";

interface CourseInfo {
    course: ICourse | undefined;
}

export const CoursePageView: React.FC<CourseInfo> = ({course}) => {
    document.title = course?.name ?? "Конференция";
    const role = useMemo<roles>(() => {
        // if (conf?.roles !== undefined) {
        //     const roles = atob(conf?.roles);
        //     return {
        //         isAdmin: roles.includes("1") || roles.includes("2"),
        //         isGuest: roles === "",
        //         isExpert: roles.includes("5"),
        //         isSpeaker: roles.includes("6"),
        //         isListener: roles.includes("4")
        //     }
        // }
        return {
            isAdmin: false,
            isGuest: true,
            isExpert: false,
            isSpeaker: false,
            isListener: false,
        }
    }, []);

    const getStatusFromRole = () => {
        if (role.isGuest) {
            return "Гость";
        } else if (role.isAdmin) {
            return "Администратор";
        } else if (role.isExpert) {
            return "Эксперт";
        } else if (role.isSpeaker) {
            return "Докладчик";
        } else if (role.isListener) {
            return "Слушатель";
        } else {
            return "Не понятно :(";
        }
    }

    if (course) {
        return (
            <Grid container spacing={1}>
                <ConferenceTitle title={course.name} userRoles={role} courseId={course.id.toString()}/>
                {/*<Grid item lg={3} xs={12}>*/}
                {/*    <Avatar src={conf.logo} sx={{height: "250px", width: "250px", bgcolor: stringToColor(conf.name)}}/>*/}
                {/*</Grid>*/}
                {/*<Grid item lg={4} xs={6}>*/}
                {/*    <ViewItem title={"Место проведения"} info={conf.offlineConnectionPlacement}/>*/}
                {/*    <DateTimeItem title={"Дата начала"} date={conf.startDate}/>*/}
                {/*    <DateTimeItem title={"Дата окончания"} date={conf.endDate}/>*/}
                {/*</Grid>*/}
                {/*<Grid item lg={4} xs={6}>*/}
                {/*    <ViewItem title={"Ссылка на онлайн встречу"} info={conf.onlineConnectionLink}/>*/}
                {/*    <ViewItem title={"Заявлено слушателей"} info={conf.members.listenersCount.toString()}/>*/}
                {/*    <ViewItem title={"Всего участников"} info={conf.members.totalUsers.toString()}/>*/}
                {/*</Grid>*/}
                {/*<Typography variant={"h6"}>Cтатус: {getStatusFromRole()}</Typography>*/}
                {/*<ConferenceStatus startDate={conf.startDate} endDate={conf.endDate}/>*/}

                {/*{conf.inviteLink && (role?.isAdmin) &&*/}
                {/*<InviteLink link={conf.inviteLink}/>}*/}

                <FullDescription description={course.description}/>

                {/*<RolesContainer*/}
                {/*    helpText={"Участники - все кто участвует в конференции, администраторы, эксперты, докладчикик и обычные слушатели"}*/}
                {/*    title={"Участники"} participants={conf.members} isAdmin={role.isAdmin} confId={conf.pageLink}/>*/}
                {/*{!role.isGuest && <ReportsMenu confId={conf.pageLink} roles={role}/>}*/}

                {/* Написать кодец вот сюда */}
            </Grid>
        );
    }
    // if (conf && (!conf.isFounded || conf.errorMessage)) {
    //     return <Navigate to={"/notfound"}/>
    // }
    return <></>;
};
