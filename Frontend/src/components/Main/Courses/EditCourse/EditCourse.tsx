import {Autocomplete, Box, Button, Card, TextField, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import MDEditor from "@uiw/react-md-editor";
import {Link, Navigate, useParams} from 'react-router-dom';
import {useTypeSelector} from "../../../utils/Hooks/UseTypeSelector";
import {UnauthorizedPage} from "../../../utils/Hooks/UnathorizedPage";
import {Loader} from "../../../utils/Loader/Loader";

export default () => {
    const routeParams = useParams();
    const id = routeParams?.id;
    console.log(id);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        //Загрузка курса и редактирование уровней
    }, []);

    if (loading) {
        return <Loader text={"Подгружаем информацию по курсу"} />
    }

    return (
        <UnauthorizedPage>
            <Box>
                <Typography variant="h5" mb={1}>
                    Курс:
                </Typography>

                <Typography variant="h5" mb={1}>
                    Язык:
                </Typography>

                <div data-color-mode="light">
                    <MDEditor.Markdown source={"description"}/>
                </div>
            </Box>
        </UnauthorizedPage>

    );
};
