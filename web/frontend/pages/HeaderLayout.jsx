import {
    MenuFoldOutlined,
    BankOutlined,
    UserOutlined,
    VideoCameraOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import {shopApi} from "../../my_api.js";
import {Button, Layout, Menu, theme} from 'antd';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';

const {Header, Sider, Content} = Layout;

const HeaderLayout = () => {
    const navigate = useNavigate()
    const [menuCheck, setMenuCheck] = useState('1')
    const [collapsed, setCollapsed] = useState(false);
    let [shop_name, setShop_name] = useState('');
    const location = useLocation();
    useEffect(() => {
        if(location.pathname === '/dashboard'){
            setMenuCheck('1');
        } else if(location.pathname === '/templates') {
            setMenuCheck('2');
        }
    }, [location])
    const fetchData = async () => {
        let shop_api = await shopApi();
        setShop_name(shop_api['shop']['name']);
    };
    fetchData().then();
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    const handleMenuClick = (e) => {
        console.log(e.key)
        if (e.key === '1') {
            setMenuCheck(e.key)
            navigate('/dashboard')
        }
        if (e.key === '2') {
            setMenuCheck(e.key)
            navigate('/templates')
        }
    }
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{backgroundColor: 'white'}}>
                <div className="demo-logo-vertical">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/IMG_logo_%282017%29.svg" alt="Logo"
                         style={{maxWidth: '80%', height: 'auto', margin: '15px 15px 15px 15px'}}/>
                </div>

                <Menu
                    selectedKeys={[menuCheck]}
                    mode="inline"
                    onClick={handleMenuClick}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined/>,
                            label: 'Dashboard',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined/>,
                            label: 'Template browser',
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
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <div style={{marginLeft: 'auto', marginRight: '25px', fontSize: '25px'}}>
                            <BankOutlined/> {shop_name}
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