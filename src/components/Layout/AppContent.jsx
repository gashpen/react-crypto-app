import {Layout, Typography} from "antd";
import { useSelector } from "react-redux";
import PortfolioChart from "../PortfolioInfo/PortfolioChart";
import AssetsTable from "../PortfolioInfo/AssetsTable";
const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem'
};

const AppContent = () => {
    const userCrypto = useSelector(state => state.crypto.userCrypto);
    const allCrypto = useSelector(state => state.crypto.crypto);
    return (
        <Layout.Content style={contentStyle}>
            <Typography.Title level={3} style={{textAlign:'left',color:'#fff'}}>
                Portfolio: {userCrypto.map(elem=>{
                    const coin = allCrypto.find(c => c.id === elem.id)
                    return elem.amount * coin.price
                }).reduce((acc,value)=>(acc+=value),0).toFixed(2)}$
            </Typography.Title>
            <PortfolioChart/>
            <AssetsTable/>
        </Layout.Content>
    );
}

export default AppContent;