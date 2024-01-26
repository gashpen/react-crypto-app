import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { fakeFetchCrypto, fetchAssets } from "../api"
import { differencePercent } from "../components/utils/utils";

export const fetchAssetsUser = createAsyncThunk(
    'crypto/fetchAssetsUser',
    async function () {
        const assets = await fetchAssets();
        return assets;
    }
);
export const fakeFetchCryptoServer = createAsyncThunk(
    'crypto/fakeFetchCryptoServer',
    async function () {
        const { result } = await fakeFetchCrypto();
        return result;
    }
);

const mapAsset = (elem, crypto) => {
    return elem.map((elem) => {
        const coin = crypto.find(c => c.id === elem.id);
        return {
            ...elem,
            grow: elem.price < coin.price,
            growPercent: differencePercent(elem.price, coin.price),
            totalAmount: elem.amount * coin.price,
            totalProfit: elem.amount * coin.price - elem.amount * elem.price,
        }
    })
}
const cryptoAppSlide = createSlice({
    name: 'crypto',
    initialState: {
        crypto: [],
        userCrypto: [],
        loading: true,
        coin: [],
        status: null,
        addFormCrypto: []
    },
    reducers: {
        addCrypto(state, action) {
            state.addFormCrypto.push(action.payload);
            state.userCrypto = state.userCrypto.concat(mapAsset(current(state.addFormCrypto), state.crypto)); 
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchAssetsUser.pending, (state) => {
            state.status = 'loading'
        }),
            builder.addCase(fetchAssetsUser.fulfilled, (state, action) => {
                state.status = 'resolved'
                state.loading = false
                state.userCrypto = mapAsset(action.payload, state.crypto)
                state.loading = false;
            }),
            builder.addCase(fakeFetchCryptoServer.fulfilled, (state, action) => {
                state.crypto = action.payload;
            })
    }
})

export const { addCrypto } = cryptoAppSlide.actions;

export default cryptoAppSlide.reducer