import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import BasketballHeadABI from '../../lib/ABI/BasketBallHead.json';
import { Stack, Box, Grid, Typography } from '@mui/material';
import Container from '../Container';
import SupplyBox from '../../components/CurryShop/SupplyBox';
import CounterBox from '../../components/CounterBox';
import BasketballMintBox from '../../components/CurryShop/BasketballMintBox';
import SerumMintBox from '../../components/CurryShop/SerumMintBox';
import CurryFlowClaimBox from '../../components/CurryShop/CurryFlowClaimBox';
import { claimGCF, claimCommunityNFT } from '../../services/fetch';

const CurryShopPageContainer: React.FC = (): JSX.Element => {
    const { active, account, library, activate } = useWeb3React();
    const [balance, setBalance] = useState<number>(0);
    const [supplyLeft, setSupplyLeft] = useState<number>(0);

    const [gcfOwnedCount, setGCFOwnedCount] = useState<number>(0);
    const [hexProofForGCFClaim, setHexProofForGCFClaim] = React.useState<any[]>([]);

    const [hexProofForCommunityClaim, setHexProofForCommunityClaim] = React.useState<any[]>([]);

    React.useEffect(() => {
        async function updateAppState() {
            const nftContract = new library.eth.Contract(
                BasketballHeadABI,
                process.env.NEXT_PUBLIC_ENV == 'production'
                    ? '0xC57C94346b466bED19438c195ad78CAdC7D09473'
                    : '0xb627Cd8E908EDfde1494304168AF6f59ADcB410E'
            );

            const balance = await nftContract.methods.balanceOf(account, 1).call({ from: account });
            setBalance(parseInt(balance));

            const maxsupply = await nftContract.methods.maxsupply().call({ from: account });
            const totalsupply = await nftContract.methods.totalsupply().call({ from: account });

            setSupplyLeft(parseInt(maxsupply) - parseInt(totalsupply));
        }
        if (account) {
            updateAppState();

            claimGCF(account)
                .then((response: any) => {
                    // console.log('response:', response);
                    setGCFOwnedCount(response.quantity);
                    setHexProofForGCFClaim(response.hexProof);
                })
                .catch((error) => {
                    setGCFOwnedCount(0);
                    setHexProofForGCFClaim([]);
                });

            claimCommunityNFT(account)
                .then((response: any) => {
                    // console.log('response:', response);
                    setHexProofForCommunityClaim(response.hexProof);
                })
                .catch((error) => {
                    setHexProofForCommunityClaim([]);
                });
        }
    }, [account]);

    return (
        <>
            <Box sx={{ background: '#1B1C22' }}>
                <Container>
                    <Stack paddingY={5} spacing={2}>
                        <Typography fontSize={16} fontWeight={600} color="white">
                            Currently available
                        </Typography>
                        <Box>
                            <Grid container columnSpacing={2} maxWidth={540}>
                                <Grid item xs={6}>
                                    <SupplyBox amount={20000} label="Basketballs supply" headColor="#FFCA21" />
                                </Grid>
                                <Grid item xs={6}>
                                    <SupplyBox amount={60000} label="Serum supply" headColor="#B8FF97" />
                                </Grid>
                            </Grid>
                        </Box>
                    </Stack>
                </Container>
            </Box>
            <Container sx={{ marginY: 4 }}>
                <Stack direction="row" spacing={2}>
                    <CounterBox title="MY BASKETBALLS" value={balance} />
                    <CounterBox title="MY SERUMS" value={0} />
                </Stack>
                <Stack marginTop={4} spacing={3}>
                    <Typography fontSize={48} fontWeight={700} lineHeight={1} color="white">
                        Get a Basketball or Serum
                    </Typography>
                    <Stack>
                        <Typography fontSize={16} fontWeight={400} color="white">
                            ° Mint a Basketball or Serum, make sure you have a Metamask ready.
                        </Typography>
                        <Typography fontSize={16} fontWeight={400} color="white">
                            ° You can burn your Genesis Curry Flow NFT for a special Basketball.
                        </Typography>
                    </Stack>
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} alignItems="flex-start" spacing={4} marginTop={6}>
                    <BasketballMintBox
                        amountLeft={supplyLeft}
                        hexProofForGCFClaim={hexProofForGCFClaim}
                        hexProofForCommunityClaim={hexProofForCommunityClaim}
                    />
                    <SerumMintBox amountLeft={1000} disabled />
                    <CurryFlowClaimBox amountLeft={2974} gcfOwnedCount={gcfOwnedCount} />
                </Stack>
            </Container>
        </>
    );
};

export default CurryShopPageContainer;
