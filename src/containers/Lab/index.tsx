import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import Container from '../Container';
import CounterBox from '../../components/CounterBox';
import { CategoryBtn } from './styles';
import { useAppContext } from '../../context/AppContext';
import MutantBox from '../../components/MutantBox';
import BasketballBox from '../../components/BasketballBox';
import SerumBox from '../../components/SerumBox';
import WearableBox from '../../components/WearableBox';
import ProductDetails from './ProductDetails';
import { useWeb3React } from '@web3-react/core';
import BasketballHeadABI from '../../lib/ABI/BasketBallHead.json';
import SerumABI from '../../lib/ABI/Serum.json';

export enum Categories {
    ALL,
    MUTANTS,
    BASKETBALLS,
    SERUMS,
    WEARABLES,
}

const categoryButtonsList = ['ALL', 'MUTANTS', 'BASKETBALLS', 'SERUMS', 'WEARABLES'];

const LabPageContainer: React.FC = (): JSX.Element => {
    const [appState, setAppState] = useAppContext();
    const { active, account, library, activate } = useWeb3React();

    const [basketballBalance, setBasketballBalance] = useState<number>(0);
    const [serumBalance, setSerumBalance] = useState<number>(0);

    const [category, setCategory] = useState<Categories>(Categories.ALL);

    const [selectedProductId, setSelectedProductId] = useState<number>(-1);

    const onMutantItemSelect = (id: number) => {
        setSelectedProductId(id);
    };

    const onBasketballItemSelect = (id: number) => {
        setSelectedProductId(id);
    };

    const onSerumItemSelect = (id: number) => {
        setSelectedProductId(id);
    };

    const onWearableItemSelect = (id: number) => {
        setSelectedProductId(id);
    };

    React.useEffect(() => {
        async function updateAppState() {
            const nftContract = new library.eth.Contract(
                BasketballHeadABI,
                process.env.NEXT_PUBLIC_ENV == 'production'
                    ? '0x75615677d9cd50cb5D9660Ffb84eCd4d333E0B76'
                    : '0x22899ed83366ef867265A98413f1f332aD4Aa168'
            );

            const nftContract1 = new library.eth.Contract(
                SerumABI,
                process.env.NEXT_PUBLIC_ENV == 'production' ? '' : '0x0ec788eA9C07dB16374B4bddd4Fd586a8844B4dE'
            );

            const balance1 = await nftContract.methods.balanceOf(account, 1).call({ from: account });
            setBasketballBalance(parseInt(balance1));

            let balance2 = 0;
            for (let i = 1; i <= 11; i++) {
                const temp = await nftContract1.methods.balanceOf(account, i).call({ from: account });
                balance2 = balance2 + parseInt(temp);
            }
            setSerumBalance(balance2);
        }

        if (account) {
            updateAppState();
        }
    }, [account]);

    return (
        <>
            {selectedProductId === -1 ? (
                <Container sx={{ paddingY: 5, overflow: 'visible' }}>
                    <Stack spacing={5}>
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                            <CounterBox title="MY NF3 BASKETBALLS" value={basketballBalance} />
                            <CounterBox title="MY SERUMS" value={serumBalance} />
                            <CounterBox title="MUTANT BASKETBALLS" value={0} />
                        </Stack>
                        <Typography fontSize={48} fontWeight={700} color="white">
                            The Lab
                        </Typography>
                        <Stack
                            direction="row"
                            flexWrap="wrap"
                            justifyContent={{ xs: 'center', sm: 'flex-start' }}
                            columnGap={2}
                            rowGap={2}
                        >
                            {categoryButtonsList.map((item, index) => (
                                <CategoryBtn
                                    key={`category-btn-${index}`}
                                    selected={category === index}
                                    onClick={() => setCategory(index)}
                                >
                                    {item}
                                </CategoryBtn>
                            ))}
                        </Stack>
                        {(category === Categories.ALL || category === Categories.MUTANTS) && (
                            <Stack spacing={3}>
                                <Typography fontSize={32} fontWeight={700} color="white">
                                    Mutants
                                </Typography>
                                <Stack
                                    direction="row"
                                    flexWrap="wrap"
                                    justifyContent={{ xs: 'center', sm: 'flex-start' }}
                                    columnGap={4}
                                    rowGap={4}
                                >
                                    {appState.mutantsList.map((item, index) => (
                                        <MutantBox
                                            item={item}
                                            selected={selectedProductId === item.id}
                                            selectable
                                            onSelect={onMutantItemSelect}
                                            key={`mutant_box_${index}`}
                                        />
                                    ))}
                                </Stack>
                            </Stack>
                        )}
                        {(category === Categories.ALL || category === Categories.BASKETBALLS) && (
                            <Stack spacing={3}>
                                <Typography fontSize={32} fontWeight={700} color="white">
                                    Basketballs
                                </Typography>
                                <Stack
                                    direction="row"
                                    flexWrap="wrap"
                                    justifyContent={{ xs: 'center', sm: 'flex-start' }}
                                    columnGap={4}
                                    rowGap={4}
                                >
                                    {appState.basketballsList.map((item, index) => (
                                        <BasketballBox
                                            item={item}
                                            selected={selectedProductId === item.id}
                                            selectable
                                            onSelect={onBasketballItemSelect}
                                            key={`basketball_box_${index}`}
                                        />
                                    ))}
                                </Stack>
                            </Stack>
                        )}
                        {(category === Categories.ALL || category === Categories.SERUMS) && (
                            <Stack spacing={3}>
                                <Typography fontSize={32} fontWeight={700} color="white">
                                    Serums
                                </Typography>
                                <Stack
                                    direction="row"
                                    flexWrap="wrap"
                                    justifyContent={{ xs: 'center', sm: 'flex-start' }}
                                    columnGap={4}
                                    rowGap={4}
                                >
                                    {appState.serumsList.map((item, index) => (
                                        <SerumBox
                                            item={item}
                                            selected={selectedProductId === item.id}
                                            selectable
                                            onSelect={onSerumItemSelect}
                                            key={`serum_box_${index}`}
                                        />
                                    ))}
                                </Stack>
                            </Stack>
                        )}
                        {(category === Categories.ALL || category === Categories.WEARABLES) && (
                            <Stack spacing={3}>
                                <Typography fontSize={32} fontWeight={700} color="white">
                                    Wearables
                                </Typography>
                                <Stack
                                    direction="row"
                                    flexWrap="wrap"
                                    justifyContent={{ xs: 'center', sm: 'flex-start' }}
                                    columnGap={4}
                                    rowGap={4}
                                >
                                    {appState.wearablesList.map((item, index) => (
                                        <WearableBox
                                            item={item}
                                            selectable
                                            onSelect={onWearableItemSelect}
                                            key={`wearable_box_${index}`}
                                        />
                                    ))}
                                </Stack>
                            </Stack>
                        )}
                    </Stack>
                </Container>
            ) : (
                <ProductDetails id={selectedProductId} />
            )}
        </>
    );
};

export default LabPageContainer;
