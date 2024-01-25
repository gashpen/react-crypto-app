import Layout from "antd/es/layout/layout";
import Card from "antd/es/card/Card";
import Statistic from "antd/es/statistic/Statistic";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { List, Typography, Tag, Spin } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fakeFetchCryptoServer, fetchAssetsUser } from "../../store/cryptoAppSlice";

const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem',

};

const AppSider = () => {
    const dispatch = useDispatch();
    const assets = useSelector(state => state.crypto.userCrypto);
   
    useEffect(()=>{
        dispatch(fetchAssetsUser())
        dispatch(fakeFetchCryptoServer())

    },[dispatch])

    const loading = useSelector(state => state.crypto.loading);
    
    if (loading) {
        return (
            <Spin fullscreen />
        )
    } 
    return (
        <Layout.Sider width="25%" style={siderStyle}>
            {assets.map(elem => {
                return (
                    <Card key={elem.id} title="Default size card" style={{ width: 300, marginBottom: '1rem' }}>
                        <Statistic
                            title={elem.id}
                            value={elem.totalAmount}
                            precision={2}
                            valueStyle={{ color: elem.grow ? '#3f8600' : '#cf1322' }}
                            prefix={elem.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                            suffix="$"
                        />
                        <List
                            size="small"
                            bordered
                            dataSource={[
                                { title: 'TotalProfit', value: elem.totalProfit, withTag: true },
                                { title: 'AssetAmount', value: elem.amount, isPlain: true },
                            ]}
                            renderItem={(item) => (
                                <List.Item>
                                    <span>{item.title}</span>
                                    <span>
                                        {item.withTag && <Tag
                                            color={elem.grow ? 'green' : 'red'}>{elem.growPercent}%</Tag>}
                                        {item.isPlain && item.value}
                                        {!item.isPlain && <Typography.Text type={elem.grow ? 'success' : 'danger'}>
                                            {item.value.toFixed(2)}$
                                        </Typography.Text>}
                                    </span>
                                </List.Item>
                            )}
                        />
                    </Card>
                )
            })}
        </Layout.Sider>
    );
}

export default AppSider;