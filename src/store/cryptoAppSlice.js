import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { fakeFetchCrypto, fetchAssets } from "../api"
import { differencePercent } from "../components/utils/utils";

export const fetchAssetsUser = createAsyncThunk(
    'crypto/fetchAssetsUser',
    async function(){
        const assets = await fetchAssets();
        return assets;
    }
);
export const fakeFetchCryptoServer = createAsyncThunk(
    'crypto/fakeFetchCryptoServer',
    async function(){
        const { result } = await fakeFetchCrypto();
        return result;
    }
);
const cryptoAppSlide = createSlice({
    name:'crypto',
    initialState:{
        crypto: [],
        userCrypto:[],
        loading: true,
        coin:[],
        status:null,
    },
    reducers: {
    },
    extraReducers: builder=> {
        builder.addCase(fetchAssetsUser.pending, (state)=>{
            state.status = 'loading'
        }),
        builder.addCase(fetchAssetsUser.fulfilled,(state ,action)=>{
            state.status = 'resolved'
            state.loading = false
            state.userCrypto = action.payload.map(elem=>{
                state.coin = state.crypto.find(c => c.id === elem.id);
                return {
                    ...elem,
                    grow: elem.price < state.coin.price,
                    growPercent: differencePercent(elem.price, state.coin.price),
                    totalAmount: elem.amount * state.coin.price,
                    totalProfit: elem.amount * state.coin.price - elem.amount * elem.price,
                }
            });
            state.loading = false;
        }),
        builder.addCase(fakeFetchCryptoServer.fulfilled,(state ,action)=>{
            state.crypto = action.payload;
        })
    }
})

export const {addCrypto, setLoading} = cryptoAppSlide.actions;

export default cryptoAppSlide.reducer