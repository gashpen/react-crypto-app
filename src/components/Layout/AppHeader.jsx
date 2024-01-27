import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CryptoInfoModal from "../CryptoInfoModal/CryptoInfoModal";
import AddCryptoForm from "../CryptoInfoModal/AddCryptoForm";
const headerStyle = {
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const AppHeader = () => {
    const [select, setSelect] = useState(false);
    const [modal, setModal] = useState();
    const [coin, setCoin] = useState();
    const [drawer, setDrawer] = useState(false);

    const assets = useSelector(state => state.crypto.crypto);
    const handleSelect = (value) => {
        setCoin(assets.find(c => c.id === value))
        setModal(true)
    }
    useEffect(() => {
        const keypress = event => {
            if (event.key === '/') {
                setSelect((prev) => !prev)
            }
        }
        document.addEventListener('keypress', keypress);
        return () => removeEventListener('keypress', keypress);
    }, [])
    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{
                    width: '300px',
                }}
                open={select}
                onSelect={handleSelect}
                onClick={() => setSelect((prev) => !prev)}
                value='press / to open'
                options={assets?.map(elem => ({
                    label: elem.name,
                    value: elem.id,
                    icon: elem.icon
                }))}
                optionRender={(options) => (
                    <Space>
                        <img style={{ width: 20 }} src={options.data.icon} alt={options.data.label} />
                        {options.data.label}
                    </Space>
                )}
            />
            <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
                <CryptoInfoModal coin={coin} />
            </Modal>
            <Drawer destroyOnClose={true} title="Add Crypto" width={600} onClose={()=>setDrawer(false)}  open={drawer}>
                    <AddCryptoForm onClose={()=>setDrawer(false)}/>
            </Drawer>
            <Button onClick={()=>setDrawer(true)} type="primary">Add Asset</Button>
        </Layout.Header>);
}

export default AppHeader;