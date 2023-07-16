import React, {useCallback, useEffect, useState} from "react"
import "../css/dashboard.css"
import {Button, Modal, Pagination} from 'antd';
import {useNavigate} from "react-router-dom";
import {createEmailTemplate, cloneEmailTemplate, deleteEmailTemplate} from "../../my_api.js";
import {ExclamationCircleFilled} from "@ant-design/icons";

const Dashboard = () => {
    const [defaultTemplates, setDefaultTemplate] = useState([]);
    const [customTemplates, setCustomTemplate] = useState([]);
    const { confirm } = Modal;
    const [current, setCurrent] = useState(1);

    const fetchData = useCallback(async () => {
        await fetch('http://127.0.0.1:3001/templates?type=Shopify&limit=3&page=1')
            .then((response) => response.json())
            .then((data) => {
                setDefaultTemplate(data.templates)
            });
        await fetch('http://127.0.0.1:3001/templates?type=Custom&limit=10&page=1')
            .then((response) => response.json())
            .then((data) => {
                setCustomTemplate(data.templates)
            });
    }, []);

    useEffect(() => {
        fetchData().then(() => {
            }
        );
    }, [])

    const nagivate = useNavigate()
    const handleOnClick = () => {
        nagivate('/templates')
    }
    const handleNewTemplate = () => {
         createEmailTemplate()
            .then((data) => {
                nagivate('/editflow/' + data._id);
            });
    }
    const showDeleteConfirm = (delete_id) => {
        confirm({
            title: 'Are you sure delete this task?',
            icon: <ExclamationCircleFilled />,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('Delete successful');
                deleteEmailTemplate(delete_id)
                    .then(() => fetchData());
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const itemsPerPage = 3;
    const startIndex = (current - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedItems = Object.values(customTemplates).slice(startIndex, endIndex);
    const onChange  = (page) => {
        console.log(page);
        setCurrent(page);
    };


    return (
        <div className="dashboard">
            <div className="page-name" style={{margin: "20px 20px 0"}}>
                <h1 style={{fontSize: "30px", fontFamily: "sans-serif"}}>Dashboard</h1>
            </div>
            <div className="templates-container">
                <h2 style={{fontWeight: "bold", fontSize: "18px", marginLeft: "20px", paddingTop: "10px"}}>Recommend
                    templates</h2>
                <div onClick={handleOnClick}
                     style={{float: "right", color: "#136CAC", marginRight: "20px", fontSize: "16px", cursor: "pointer"}}>Show all
                </div>
                <br/>
                <div className="templates">
                    <div className="new-template" onClick={handleNewTemplate}>
                        <div style={{display: "flex", justifyContent: "center"}} >
                            <img style={{width: "80%"}}
                                 src="https://lh3.googleusercontent.com/fife/APg5EOa25oiDaF_F5J2eRhZJDIa4dNCy-FvU3kc-HDq774rN9E-pyRRnCgeGE6S_Ygy6CHFt94edkl1NEyjMSYl4ERxkTGr3tcc0rIuaGJWsJFTDHBBRFjclJNVxmEWs7LxASZmRnLXsJRNbn6lDVLl3qb_4JoQPE-BNrIL4hJNNH4sdR8DGuyYVU4HOenOD3FJVsbW6Ns8N5tIu1Qbz9R7Bw5l-1WVw54OYJHrRrEnPCqNZPHxSA0umZb-ZrNp542T7iHteA3tJtmOVUe9m3SF4C4vBFYYbH_xrL1r9NcGre14KGJoGFSnTUXePd1pUdr0G8HPQDR6e97VnStQkmmXN2wrkn9ylg8byKroKn7utYhOjqodS4X8YYFGOO_N-2cJRzExLan3CViOVnoLN3PUVKZaZrUc__555licbPuIb4slNkc1kfd8FIXOwNZMYxcHOOFXeSB9uv4H-fPjiPD7Gy2nKctFoTyrBGaOSKevxhzY-rlMPPd9da6wSkBe1-bZQ17TMdqxJ1MqUwXg5-Y-Dqv2iAT0tJb9DXPvWCTVh9TnBI2fW9ghQGBOnqge74VhznT-aJRoGI8iWv8hk2pvOmsHytQMAbUNUo6HjEUTDG1u3Xa4gFXoFgkTDt-3exKQ-kDBNe6t7tN5Y47n_vopx3gFgN5jFmEmIad-O43c8JhpdOqVhLOb8EAZ97gYXhFD_sHg_2uQGcJuT0flwItd-nO9lC0IRC5H6Y3HXiMuMEFN5CQyyeaJiB5BOseaFgBiowOowrs6mE5mMPkafh-e1vsl6aiYh6o14z92avJuNuyZhKQHKimnCyZ1L1VZa0ijCByQ3dQXO2MCEeMeMU3BCqzkAIES3f6mBR4y08FrrthxW-F5f-a3e8gOQ25lC2AAnR35FF0ZbR19XuYafvW8Oiq8VPbjNA3wQEnlcNeO436NnX6BLJwjk5Z4rn7psS1EnnOytW7BZtIrMsz3IFGDbPI6EDrWm6C9QmiRim8rNidF9gZGlB-CiJAyx4vYuFI8k3cyp3ikvS7wvhB3KZHe5dlsHqv3I_V1nqMjGXCI1CYWdfqKgA7yBs1tWGMIX5FDBcL-AlDNuCymSK6dlqaPVnYtma_JTJ0R5o9gHCEFAZRUAmbd_6O4iKWLPzwjMWlej3Q6jpY-KHxIAbsG_fCA1qn_e86VZq6PK9quVvy5YCWFBM5t5CHtjqxQG4UppapeiJGHAA16gvJODrjkz0-epFhqxRO49pGgoBhojRXIEwliKI7KyCCdU4sRY1UcOlID--8RwNxQiRIGqluoaog56Cw0iqxx9y_4Sc41s74T-NqtwrLNbmY1e0L_Vu5gq9XMj2ZLe4J8mwyehDv2Hk7jO2T0qZ4c3mhkdBQ9wwfmp1h46yYxTL3gD5Hapv280lHi72kaBqd_c1rXO6Me3G_GqrJqURDEg8XDljSUfKpeMQPKihrivPX8I1SKPMLzea_txDb2zXdbvtLvIFRS7VTbkKrz-Yxly5a9bfixcNlv9QGciyCrVYgDKnEmxCXURnpp5C2trAGFg=w1846-h980"
                                 alt="new template"/>
                        </div>
                    </div>
                    {defaultTemplates.map((template) => (
                        <div className="template-content" onClick={() => {
                            cloneEmailTemplate(template)
                                .then((data) => {
                                    nagivate('/editflow/' + data._id);
                                });
                        }}>
                            <div>
                                <img className="template-image" alt={template.template_name}
                                     src= {template.thumbnails} />
                                <h3 style={{
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                    textAlign: "center",
                                    color: "black",
                                }}>{template.template_name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="my-template-container">
                <div style={{margin: "20px 20px 0"}}>
                    <h1 style={{fontSize: "24px", fontFamily: "sans-serif"}}>My email templates</h1>
                </div>
                <div className="my-template" style={{maxHeight:"350px"}}>
                    {displayedItems.map((template) => (
                        <div className="my-template content">
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <img className="my-template content img"
                                     src="https://lh3.googleusercontent.com/fife/APg5EObtl5QUOfO3xAhIwqgMSkXPJbWH9VuiiqBgR8Yi0CM6GRzQ2hhy3hMXXoikPFtPsnGuy6tVHVNmL-InNV4CBIWZw_0A5BCv3ZbL1QqQ9i6UEFaKhRMwghi_M_p46VdYubZy4oeBFlyjFiWwVVLh0BY2Tsarvmhs7491uUtDZA_KNBaE5eaE0aVrFY9BKgQtLoazCOTualC1qV4xKtvYiPVLaN7vnDjGlkPzLydbxwUYZMot2KDJnjBL9JH2qFvcNkac_CLoxoonU-L_OYMWmXlaS7A6c05b6gJxIiF63C8PKLoQB9NqjzaJR23KdBtrCSLOJdAwBDOvO52tREsktIt9t6-dHXI5d5wEex4Uz3Awg8-SvOnEgyO3JPm02eWtyn8JTqt39POMU8hEV-zlBAV2gdhbqwo5UbZg8umVezyj5Tzgga78mthvf3JeMl0TsPuM0eZh23phlSvzgSQ5s8wGzZH-pROVIlEkBwKHvHP16LPxHbUxjTdE9Q4KoqviuWzw50JOIvYEa5JLDAbwVT2qkAaAYFZJiQNYBzEMTd9yJlNoMt7CfzYLDbQlTT_WfjocIn8p9_UOUCbv59wooxp23Aoa0TlunCl1XZF56F9chpRK4UzCzaoNmWdxS6MYb-0WWAGShaF_l_RTzuB2rC0wds9eJSn6DSRYBm5KZPLzkK2QN7l5YgHInJGs3nkcwh_E8c5QK2hnswwnDHLakEb52bK6ZumuVr9MiXscC2zhs35eBoo0m18LJBkamewFSkfxHMcpFsmdWqUTKsn7sSY1ycwZTgw4xnuAJmPdUMfFbmiqraJzfKRME3uNY2ISwZshDacV42dq3cAlg0MnCypZwL67Hz8dZcBJHuwoMFQQzod3GXbDxke4mG1PJlI0GPLuhSnTpLuSC7dNsqr9NECnrUYVUt6_OrCHskjhDnEfXtkJEkrGFgtUiqqoT6qOZJkWkQdiTfAXsu4lgQyx2KgPBA5xAJlZ8wgs2YKeYGLelwHu4k0hqaYkMpQ31OJK-klTFwqqS0Z940Y8d7vB_RBBwpFbqby5CNWxCLaXKuSUYRlvftfJFMW8V5ABUVygLaW1p9PGXld6L-zvunhPg57XZnYbE9NWbOdHW4i1ZZ_N_-JbcqrtjCCcQ-IEiCebsNsA-sg2c7qKoF3GAH_uoXSSzXUay1eWpl_P0PO5qIG_Hi7IHOUeP1dnDG25_RR3kEQNmJYqn6mWgdHUnEVEWJqZjfKNwR2ikoUjsgF4ZTy7F_8zppBO9_eRPs68hEBtkRHhdxkNfBaqucAdxO7Q1TGUhJCpG-CtaqK-K5uPrFTWs8dJNsO20_kjpe6go978sTD5VQ0rwb9wsTHsoFlic-6AjZeY15uL-CnW_2HvjhFJ4rFfIf-Oa2DtTvOkFgnpH1A5FOZfRLQpQADQNXTyVycmA02be8zKFtb1pAX7P47438xz030RvOwO5rNsdb-CdR9DcvnTJxHJLQiJmaoUsl62P39qE1IkFQ-ZXWQxBOChgMwHrfPzGjt3fYTPK8afgyeK_UPx=w1846-h919"
                                     alt=""/>
                            </div>
                            <div style={{
                                textAlign: "center",
                                fontSize: "18px",
                                width: "100%",
                                marginTop: "10px",
                                marginBottom: "10px",
                                cursor: "pointer",
                            }}>{template.template_name}
                            </div>
                            <Button onClick={ () => nagivate('/editflow/' + template._id)} type="primary">Edit</Button>
                            <Button onClick={ () => showDeleteConfirm(template._id)} type="dashed" style={{width:"80px", marginLeft:"10px"}} >Delete</Button>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ marginTop: '50px', minHeight: '100px', display: 'flex' }}>
                <div style={{ marginLeft: 'auto' }}>
                    <Pagination
                        simple
                        current={current}
                        onChange={onChange}
                        total={Object.values(customTemplates).length}
                        pageSize={itemsPerPage}
                        style={{ marginTop: '10px', marginRight: '40px' }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Dashboard