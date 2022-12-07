import React, {useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {Search, SearchIconWrapper, StyledInputBase} from "./SearchField.styles";
import {SearchModalField} from "./SearchModalField";
import {getSearchInfo, SearchResponce} from "../../../api/Search/Search";
import {useDebounce} from "../../utils/useDebounce";

export const SearchField = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");
    const [responceData, setResponceData] = useState<SearchResponce | undefined>(undefined);
    const debouncedSearch = useDebounce(search, 400);

    const setModalClose = () => {
        setTimeout(() => {
            setOpenModal(false);
        }, 50);
    }

    async function search(text: string) {
        const res = await getSearchInfo(text);
        setResponceData(res);
    }

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setOpenModal(true);
        const text = e.target.value;
        setValue(text);
        if (text !== "") {
            debouncedSearch(text);
        }
    }

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                value={value}
                onChange={onChange}
                placeholder="Поиск…"
            />
            {openModal && <SearchModalField responce={responceData} closeDropDown={setModalClose} />}
        </Search>
    );
};
