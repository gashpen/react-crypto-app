import Layout from "antd/es/layout/layout";

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem'
};


const AppContent = () => {
    return (
        <Layout.Content style={contentStyle}>
            Content
        </Layout.Content>
    );
}

export default AppContent;