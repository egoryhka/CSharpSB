import React, {useState} from 'react';
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export const UseSaveMeCheckBox = () => {
    const [saveMe, setSaveMe] = useState<boolean>(false);

    const saveMeCheckbox = <FormControlLabel
            control={<Checkbox onChange={() => setSaveMe(prev => !prev)} value={saveMe} color="primary"/>}
            label="Запомнить меня"
        />

    return {saveMe, saveMeCheckbox}
};
