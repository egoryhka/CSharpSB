import {Avatar, Box, Fade, Modal, Stack, TextField, Tooltip, Typography} from '@mui/material';
import React, {useState} from 'react';
import {IParticipant} from "../../../../../../redux/types/conferencies/conference";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import {CustomTooltip} from "../../../../../utils/CustomTooltip/CustomTooltip";
import {participantsTypes} from "../../../../../../api/ConferenceActions/getConferencePage";
import {UserInConf} from "./Participant";

interface ConfParticipantsProps {
    title: string;
    helpText: string;
    participants: participantsTypes;
    isAdmin: boolean;
    confId: string;
}

export const RolesContainer: React.FC<ConfParticipantsProps> = ({participants, title, helpText, isAdmin, confId}) => {
    const [allUsers, setAllUsers] = useState<IParticipant[]>([...participants.admins, ...participants.moderators, ...participants.speakers, ...participants.listeners] ?? null);
    const [users, setUsers] = useState<IParticipant[]>([...participants.admins, ...participants.moderators, ...participants.speakers, ...participants.listeners] ?? null);

    if (participants === undefined) {
        return null;
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filterText = e.target.value.toLowerCase();
        if (filterText === "") {
            setUsers(allUsers);
        }
        setUsers(allUsers.filter(user => user.email.toLowerCase().includes(filterText) || user.firstName?.toLowerCase().includes(filterText) || user.lastName?.toLowerCase().includes(filterText)))
    }

    return (
        <Box mt={4} padding={2} paddingTop={1} sx={{
            borderRadius: 2,
            boxShadow: "0px 0px 15px 0px rgba(34, 60, 80, 0.15)",
            width: "100%",
            boxSizing: "border-box"
        }}>
            {isAdmin &&
            <CustomTooltip
                text={"Найди с помощью фильтра человека, которого хочешь наделить правами эксперта или администратора. Нажмите на аватарку участника и выбирите право, которым хотите наделить участника"}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Typography mr={2} variant="h6">Вы можете сделать другого участника экспертом/администратором
                    </Typography>
                    <HelpOutlineOutlinedIcon/>
                </Box>
            </CustomTooltip>
            }
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                    <PersonSearchIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <CustomTooltip text={"Начните вводить фамилию, имя или email"}>
                        <TextField
                            id="standard-basic"
                            label={title}
                            variant="standard"
                            size={"small"}
                            onChange={onChange}
                        />
                    </CustomTooltip>
                </Box>
                <Typography ml={4} variant="body2">Всего найдено: {allUsers.length}</Typography>
                <CustomTooltip text={helpText}>
                    <HelpOutlineOutlinedIcon/>
                </CustomTooltip>
            </Box>
            <Stack direction="row" spacing={2} mt={3}>
                {users.map(user => <UserInConf {...user} isAdmin={isAdmin} confId={confId} key={user.userid}/>)}
            </Stack>

        </Box>
    );
};
