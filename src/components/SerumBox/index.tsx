import React, { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { Container } from './styles';
import SerumImg from '../../assets/items/serum.png';
import { SerumItemType } from '../../types';
import { useAppContext } from '../../context/AppContext';

type ComponentProps = {
    item: SerumItemType;
};

const SerumBox: React.FC<ComponentProps> = ({ item }): JSX.Element => {
    const [appState, setAppState] = useAppContext();

    const onItemselect = () => {
        let selectedId = [...appState.selectedSerumId];
        const index = selectedId.indexOf(item.id);
        if (index > -1) selectedId.splice(index, 1);
        else selectedId.push(item.id);

        if (selectedId.length <= 3) setAppState({ ...appState, selectedSerumId: selectedId });
    };

    return (
        <Container spacing={2} selected={appState.selectedSerumId.includes(item.id)} onClick={onItemselect}>
            <Image src={SerumImg} width={166} height={166} alt="" className="basketball_img" />
            <Stack spacing={1}>
                <Typography fontSize={16} fontWeight={700}>
                    {item.title}
                </Typography>
                <Typography fontSize={16} fontWeight={400}>
                    {item.desc}
                </Typography>
            </Stack>
        </Container>
    );
};

export default SerumBox;
