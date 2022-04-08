import React, { useState } from 'react';
import { Stack, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { AmountInputWrapper, AmountInputTextField, MaxBtn, MintBtn, ReserveBtn } from '../styles';
import InfoIcon from '../../../assets/curryshop/info.svg';
import BasketballImg from '../../../assets/curryshop/basketball.png';

type ComponentProps = {
    amountLeft: number;
    disabled?: boolean;
};

const MAX_VAL = 3;

const BasketballMintBox: React.FC<ComponentProps> = ({ amountLeft, disabled = false }): JSX.Element => {
    const [mintAmount, setMintAmount] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (!isNaN(Number(value)) && Number(value) <= MAX_VAL) setMintAmount(value);
    };

    return (
        <Stack width="100%" padding={2} borderRadius={2} sx={{ background: '#1B1C22' }}>
            <Box>
                <Image src={BasketballImg} layout="responsive" alt="" />
            </Box>
            <Stack direction="row" justifyContent="space-between" marginTop={2}>
                <Typography fontSize={16} fontWeight={700} color="white">
                    Mint or Reserve a Basketball
                    {disabled && (
                        <Typography fontSize={16} fontWeight={700} color="#FFCA21" display="inline">
                            {` (Coming Soon)`}
                        </Typography>
                    )}
                </Typography>
                <Box>
                    <Typography fontSize={16} fontWeight={700} color="white">
                        {`${amountLeft.toLocaleString()} left`}
                    </Typography>
                </Box>
            </Stack>
            <Stack spacing={1} marginTop={3}>
                <Typography fontSize={14} fontWeight={400} color="white">
                    # of Basketball Heads (Max 3)
                </Typography>
                <AmountInputWrapper sx={{ width: 184 }}>
                    <AmountInputTextField value={mintAmount} onChange={handleInputChange} />
                    <MaxBtn onClick={() => setMintAmount(MAX_VAL.toString())}>Max</MaxBtn>
                </AmountInputWrapper>
            </Stack>
            <Stack spacing={1} marginTop={2}>
                <Typography fontSize={16} fontWeight={700} color="white">
                    {disabled ? 'Currently Unavailable' : 'You have 10/10 reserve mints'}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <MintBtn disabled={disabled}>Mint</MintBtn>
                        <ReserveBtn disabled={disabled}>Reserve</ReserveBtn>
                    </Stack>
                    <InfoIcon />
                </Stack>
            </Stack>
        </Stack>
    );
};

export default BasketballMintBox;
