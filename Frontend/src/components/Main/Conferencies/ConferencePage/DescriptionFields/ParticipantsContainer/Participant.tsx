import React, {useState} from "react";
import {IParticipant} from "../../../../../../redux/types/conferencies/conference";
import {CustomTooltip} from "../../../../../utils/CustomTooltip/CustomTooltip";
import {Link} from "react-router-dom";
import {Avatar, Box, Button, Modal, Stack, Typography} from "@mui/material";
import {setUserRole} from "../../../../../../api/ConferenceActions/submitRole";
import {IResponceStatuses} from "../../../../../utils/ResponceStatuses/ReaponceIntertface";
import AlertHint from "../../../../../utils/Alert/AlertHint";
import {stringToColor} from "../../../../../utils/StringToColor/StringToColor";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface UserInConfProps extends IParticipant {
    isAdmin: boolean;
    confId: string;
}

export const UserInConf: React.FC<UserInConfProps> = ({isAdmin, userid, firstName, lastName, logo, confId, email}) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [respStatus, setRespStatus] = useState<IResponceStatuses>({});

    const openModalHandler = () => {
        setOpenModal(true);
    }

    const closeModalHandler = () => {
        setOpenModal(false);
    }

    const setRoleHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const data = await setUserRole({userId: userid, confId, role: e.currentTarget.name})
        setRespStatus(data);
    }

    return (
        <>
            <CustomTooltip text={email} key={userid}>
                <Avatar sx={{width: 40, height: 40, bgcolor: stringToColor(email), cursor: "pointer"}} alt={email} src={logo} onClick={openModalHandler}/>
            </CustomTooltip>
            <Modal
                open={openModal}
                onClose={closeModalHandler}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Avatar sx={{width: 240, height: 240, margin: "0 auto", bgcolor: stringToColor(email)}} src={logo}/>
                    <Stack spacing={2} direction="column">
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Электронная почта: {email}
                        </Typography>
                        {(firstName && lastName) && <Typography id="modal-modal-description" sx={{mt: 2}}>
                            {firstName + "" + lastName}
                        </Typography>}
                        <Link to={`/userprofile/${userid}`}>Перейти в профиль</Link>
                        {isAdmin && <Box>
                            <Typography id="modal-modal-title" variant="body2">Наделить правами: </Typography>
                            <Stack spacing={2} direction="row">
                                <Button name={"admin"} onClick={setRoleHandler}
                                        variant={"contained"}>Администратора</Button>
                                <Button name={"expert"} onClick={setRoleHandler} variant={"contained"}>Эксперта</Button>
                            </Stack>
                            <Button sx={{marginTop: 2}} name={"kick"} onClick={setRoleHandler}
                                    variant={"contained"}>Выгнать</Button>
                        </Box>}
                        {respStatus.info &&
                        <AlertHint collapse={Boolean(respStatus.info)} severity={respStatus.isError ? "error" : "success"}
                                   size={"small"}
                                   text={respStatus.info}/>}
                    </Stack>

                </Box>
            </Modal>
        </>
    )
}
