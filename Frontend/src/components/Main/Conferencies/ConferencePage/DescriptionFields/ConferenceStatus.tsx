import React from 'react';
import AlertHint from "../../../../utils/Alert/AlertHint";
import {formatDayName} from "../../../../utils/dateParser/getDayForm";

interface ConferenceStatusProps {
    startDate?: string;
    endDate?: string;
}

export const ConferenceStatus: React.FC<ConferenceStatusProps> = ({startDate, endDate}) => {
    if (startDate && endDate) {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (now < start && now < end) {
            const formatDays = formatDayName(start, now);
            return (
                <AlertHint
                    severity={"info"}
                    size={"medium"}
                    collapse={true}
                    text={`Конференция начнется через ${formatDays}`}/>
            );
        } else if (now >= start && now <= end) {
            return (
                <AlertHint
                    severity={"success"}
                    size={"medium"}
                    collapse={true}
                    text={`Конференция уже началась!`}/>
            );
        } else {
            return (
                <AlertHint
                    severity={"warning"}
                    size={"medium"}
                    collapse={true}
                    text={`Конференция уже закончилась!`}/>
            );
        }
    }
    return null;
};
