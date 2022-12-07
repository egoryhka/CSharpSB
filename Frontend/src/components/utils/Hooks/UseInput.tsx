

/* TODO: Замороженный код, если диплом до конца доделаю, то вернусь сюда */

// import React, {useState} from 'react';
// import {TextField} from "@mui/material";
//
// interface UseInputProps {
//     validations: {[key: string] : string}
//     defaultValue?: string
// }
//
// export const UseInput: React.FC<UseInputProps> = ({defaultValue, validations}) => {
//     const [value, setValue] = useState(defaultValue && "");
//
//     const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const text = e.target.value;
//
//         setValue(e);
//     }
//
//     const input = <TextField
//                 fullWidth
//                 required
//                 id="outlined-multiline-flexible"
//                 label="Электронная почта"
//                 value={value}
//                 onChange={(e) => setNewEmail(e.target.value)}
//                 error={Boolean(correctEmail)}
//                 sx={{marginBottom: 2}}
//             />
//
//     return [value, input ,validations]
// };

export default {};
