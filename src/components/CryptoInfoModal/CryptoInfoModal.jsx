/* eslint-disable react/prop-types */
import { Divider, Tag, Typography } from "antd";
import CoinInfo from "../CoinInfo/CoinInfo";

const CryptoInfoModal = (props) => {
    return (
        <>
            <CoinInfo coin={props.coin} withSimbol/>
            <Divider />
            <Typography.Paragraph>
                <Typography.Text>1 hour: </Typography.Text>
                <Tag color={props.coin.priceChange1h > 0 ? 'green' : 'red'}>
                    {props.coin.priceChange1h}%
                </Tag>
                <Typography.Text>1 day: </Typography.Text>
                <Tag color={props.coin.priceChange1h > 0 ? 'green' : 'red'}>
                    {props.coin.priceChange1d}%
                </Tag>
                <Typography.Text>1 week: </Typography.Text>
                <Tag color={props.coin.priceChange1h > 0 ? 'green' : 'red'}>
                    {props.coin.priceChange1w}%
                </Tag>
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text>Price: </Typography.Text>
                {props.coin.price.toFixed(4)}$
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text>Price BTC: </Typography.Text>
                {props.coin.priceBtc}
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text>Market Capitalization: </Typography.Text>
                {props.coin.marketCap}$
            </Typography.Paragraph>
            {props.coin.contractAddress && (
                <Typography.Paragraph>
                    <Typography.Text>Contract Address: </Typography.Text>
                    {props.coin.contractAddress}
                </Typography.Paragraph>
            )}

        </>

    );
}

export default CryptoInfoModal;