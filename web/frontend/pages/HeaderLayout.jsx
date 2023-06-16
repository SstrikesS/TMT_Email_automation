import {
    MenuFoldOutlined,
    BankOutlined,
    UserOutlined,
    VideoCameraOutlined,
    MenuUnfoldOutlined,
    QqOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
const { Header, Sider, Content } = Layout;
const HeaderLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout >
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ backgroundColor: 'white' }}>
                <div className="demo-logo-vertical">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/IMG_logo_%282017%29.svg" alt="Logo"
                         style={{  maxWidth: '80%', height: 'auto' ,margin:'15px 15px 15px 15px'}}/>
                </div>

                <Menu

                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'Dashboard',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'Template browser',
                        },
                        {
                            key: '3',
                            icon: <QqOutlined />,
                            label: 'Edit flow',
                        },
                    ]}
                />

            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                     <div style={{ marginLeft: 'auto',marginRight:'25px' ,fontSize:'25px'}}>
                         <BankOutlined /> shop_name
                     </div>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 400,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
};
export default HeaderLayout;