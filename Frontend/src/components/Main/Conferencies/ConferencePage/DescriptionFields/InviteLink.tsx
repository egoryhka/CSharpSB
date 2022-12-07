import React, {useState} from 'react';
import {Box, Typography} from "@mui/material";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import {CustomTooltip} from "../../../../utils/CustomTooltip/CustomTooltip";
import AlertHint from "../../../../utils/Alert/AlertHint";

interface InviteLinkProps {
    link: string;
}

export const InviteLink: React.FC<InviteLinkProps> = ({link}) => {
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const fullLink = window.location.origin + "/accessLink/" + link
    const copyAccessLink = () => {
        setIsCopied(true);
        navigator.clipboard.writeText(fullLink);
    }

    return (
        <Box>
            <CustomTooltip text={"Нажмите, чтобы скопировать"}>
                <Box mt={2} mb={2} sx={{display: 'flex', alignItems: 'flex-end', cursor: "pointer"}}
                     onClick={copyAccessLink}>
                    <ContentCopyOutlinedIcon/>
                    <Typography ml={2} variant={"body2"}>Ссылка
                        приглашение: {fullLink}</Typography>
                </Box>
            </CustomTooltip>
            <AlertHint text={"Ссылка скопирована в буфер обмена"} collapse={isCopied} size={"medium"}
                       severity={"success"}/>
        </Box>

    );
};
