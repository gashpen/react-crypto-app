import { useState, useRef } from "react";
import { Select, Space, Divider, Form, InputNumber, Button, DatePicker, Result } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CoinInfo from "../CoinInfo/CoinInfo";
import { addCrypto } from "../../store/cryptoAppSlice";
const AddCryptoForm = (props) => {
    const dispath = useDispatch();
    const [coin, setCoin] = useState();
    const [form] = Form.useForm();
    const assets = useSelector(state => state.crypto.crypto);
    
    const [submit, setSubmit] = useState(false);
    const assetRef = useRef();
    const validateMessages = {
        required: '${label} is required!',
        types: {
            number: '${label} is not number'
        },
        number: {
            range: '${label} must be between ${min} and ${max}'
        }
    };
    const handleAmountChange = (value) => {
        const price = form.getFieldValue('price')
        form.setFieldsValue({
            total: +(value * price).toFixed(2)
        })
    }
    const handlePriceChange = (value) => {
        const amount = form.getFieldValue('amount')
        form.setFieldsValue({
            total: +(amount * value).toFixed(2)
        })
    }
    const onFinish = (values) => {
        setSubmit(true);
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date()
        }
        dispath(addCrypto(newAsset))
        assetRef.current = newAsset;
    }
    if (submit) {
        return (
            <Result
                status="success"
                title="New asset added!"
                subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
                extra={[
                    <Button onClick={props.onClose} type="primary" key="console">
                        Close
                    </Button>,
                ]}
            />
        )
    }
    if (!coin) {
        return (
            <Select
                style={{
                    width: '100%',
                }}
                onSelect={(value) => setCoin(assets.find(c => c.id === value))}
                placeholder='select coin'
                options={assets.map(elem => ({
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
        )
    }
   
    return (
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ price: +coin.price.toFixed(2) }}
            onFinish={onFinish}
            validateMessages={validateMessages}
        >
           <CoinInfo coin={coin}/>
            <Divider />
            <Form.Item
                label="Amount"
                name="amount"
                rules={[{ required: true, min: 0, type: 'number' }]}>
                <InputNumber
                    style={{ width: '100%' }}
                    onChange={handleAmountChange}
                />
            </Form.Item>
            <Form.Item
                label="Price"
                name="price">
                <InputNumber style={{ width: '100%' }}
                    onChange={handlePriceChange}
                />
            </Form.Item>
            <Form.Item
                label="Total"
                name="total">
                <InputNumber disabled style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                label="Date & time"
                name="date">
                <DatePicker showTime />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Add asset
                </Button>
            </Form.Item>
        </Form>
    );
}

export default AddCryptoForm;