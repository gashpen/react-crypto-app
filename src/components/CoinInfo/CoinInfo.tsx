import { Flex, Typography } from "antd";
import React from "react";

const CoinInfo = ({coin, withSimbol}) => {
    return ( 
        <Flex align="center">
        <img src={coin.icon} alt={coin.name} style={{ width: 40, marginRight: 15 }} />
        <Typography.Title level={2} style={{ margin: 0 }}>
            {withSimbol && <span>({coin.symbol})</span>}{coin.name}
        </Typography.Title>
        </Flex>
     );
}
 
export default CoinInfo;