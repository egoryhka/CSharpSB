import React, {useEffect, useRef, useState} from 'react';
import arrow from './images/drop-arrow.svg';

type dropZoneType = {
    setImageSrc: React.Dispatch<React.SetStateAction<string>>;
    setImageFile: React.Dispatch<React.SetStateAction<File | undefined>>;
    title?: string;
}

export const DragNDrop: React.FC<dropZoneType> = ({setImageSrc, setImageFile, title}) => {
    const dropInput = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dropInput.current?.addEventListener('drop', handleDropZone)
        dropInput.current?.addEventListener('dragover', handleDrag)
        dropInput.current?.addEventListener('dragenter', handleDragIn)
        dropInput.current?.addEventListener('dragleave', handleDragOut)
    }, []);

    const [over, setOver] = useState<boolean>(false);


    const handleDragIn = () => {
        setOver(true);
    }

    const handleDragOut = () => {
        setOver(false);
    }


    const handleDrag = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
    };

    const handleDropZone = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        const imageFile = e.dataTransfer.files[0];
        if (imageFile && e.dataTransfer.files.length === 1) {
            const reader = new FileReader();
            reader.onload = ev => {
                if (ev.target) {
                    // @ts-ignore
                    setImageSrc(ev.target.result);
                }
            }
            reader.readAsDataURL(imageFile)
        }
    }

    const setImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = ev => {
                setImageFile(imageFile);
                if (ev.target) { // @ts-ignore
                    setImageSrc(ev.target.result);
                }
            }
            reader.readAsDataURL(imageFile)
        }
        setImageSrc('');
    }

    return (
        <div className={!over ? 'dropZone' : 'dropZone border-drop'} ref={dropInput}>
            <input name={"logo"} id="logo" type="file" accept={'image/*'} onChange={setImage}/>
            <div className={'drop-arrow'}>
                <img src={arrow} alt="стрелочка"/>
            </div>
            <p>{title}</p>
        </div>
    );
}
