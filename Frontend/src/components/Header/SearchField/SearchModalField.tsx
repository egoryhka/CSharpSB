import React, {useRef} from 'react';
import {Avatar, Box, Divider, Paper, Typography, Link as MUILink, ClickAwayListener} from "@mui/material";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import {Link} from "react-router-dom";
import {SearchResponce} from "../../../api/Search/Search";
import {SearchItemContainer} from "./SearchField.styles";
import Portal from '@mui/material/Portal';

export interface SearchResponceProps {
    responce?: SearchResponce;
    closeDropDown: () => void;
}

export const SearchModalField: React.FC<SearchResponceProps> = ({responce, closeDropDown}) => {
    const responceConfs = responce?.data?.conferences?.items;
    const responceUsers = responce?.data?.users?.items;
    const paper = useRef(null);

    const confs = responceConfs?.length ? <Box>
        {responceConfs.map(conf => {
            return <SearchItem closeDropDown={closeDropDown} key={conf.link} link={conf.link} logo={conf.logo}
                               name={conf.name}/>
        })}
        <Typography sx={{marginLeft: 2}} variant={"body2"}>Всего
            совпадений: {responce?.data.conferences.total}</Typography>
    </Box> : <SearchNotFound text={"Конференции не найдены"}/>

    const users = responceUsers?.length ? <Box>{
        responceUsers.map(user => {
            return <SearchItem closeDropDown={closeDropDown} email={user.email} key={user.link} link={user.link}
                               logo={user.logo} name={user.name}/>
        })}
        <Typography padding={2} variant={"body2"}>Всего совпадений: {responce?.data.users.total}</Typography>
    </Box> : <SearchNotFound text={"Пользователи не найдены"}/>

    return (
        <ClickAwayListener onClickAway={closeDropDown}>
            <Paper ref={paper} elevation={3} sx={{
                width: '450px',
                position: 'absolute',
                zIndex: 100000,
            }}>
                <Typography padding={2} pb={0} variant={"h6"}>Результат
                    поиска: {responce?.searchText ?? ""}</Typography>
                <Divider/>
                {responce?.isEmpty ? <SearchNotFound text={"Поиск не дал результатов :("}/> :
                    <Box>
                        <Typography ml={2} variant={"body1"}>Пользователи</Typography>
                        {users}
                        <Divider/>
                        <Typography ml={2} variant={"body1"}>Конференции</Typography>
                        {confs}
                    </Box>}
                <Divider/>
                <Typography ml={2} variant={"body1"} fontSize={12}>*Реализовано с помощью кастомного <MUILink
                    target={"_blank"} href="https://www.elastic.co/">elasticSearch</MUILink></Typography>
            </Paper>
        </ClickAwayListener>
    );
};

const SearchItem = ({
                        logo,
                        name,
                        link,
                        email,
                        closeDropDown
                    }: { logo: string, name: string, link: string, email?: string, closeDropDown: () => void }) => {
    return (
        <SearchItemContainer key={link}>
            <Box to={`/${email ? "userprofile" : "conferencepage"}/${link}`} component={Link}
                 sx={{display: "flex", alignItems: "center"}}>
                <Avatar src={logo}/>
                <Typography ml={2} variant={"body2"}>{name} {Boolean(email) && email}</Typography>
            </Box>
        </SearchItemContainer>
    )
}

const SearchNotFound = ({text}: { text: string }) => <Typography
    sx={{display: "flex", alignItems: "center"}} padding={2}
    variant={"body2"}><SearchOffIcon sx={{mr: 2}}/>{text}</Typography>
