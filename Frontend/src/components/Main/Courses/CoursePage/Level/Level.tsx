import {CourseLevelInfo, getBGColorByStatus, LevelStatus, Roles} from "../../utils";
import {Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface LevelProps extends CourseLevelInfo {
    courseId?: string;
    userRole?: Roles;
}

export const Level = ({id, name, description, helpText, order, courseId, userRole, status}: LevelProps) => {
    const navigate = useNavigate();

    const goToLevel = async () => {
        navigate('/course/' + courseId + "/level/" + id);
    }

    const {defaultColor, hover} = getBGColorByStatus(status);

    return (
        <Grid item lg={12} xs={12} onClick={goToLevel} sx={{
            margin: 2,
            marginBottom: 0.5,
            marginTop: 0.5,
            border: `3px solid ${hover}`,
            borderRadius: "16px",
            cursor: status === LevelStatus.Closed ? "inherit" : "pointer",
            padding: 2,
            transition: "all .5s ease",
            backgroundColor: defaultColor,
            ":hover": {
                backgroundColor: status === LevelStatus.Closed ? defaultColor : hover,
            }
        }}>
            <Typography variant={"h6"}>{order + ". " + name}</Typography>
        </Grid>
    );
};
