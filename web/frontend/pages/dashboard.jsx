import React, {useCallback, useEffect, useState} from "react"
import "../css/dashboard.css"
import {Button} from 'antd';
import {useNavigate} from "react-router-dom";
import {createEmailTemplate, cloneEmailTemplate} from "../../my_api.js";


const Dashboard = () => {
    const [defaultTemplates, setDefaultTemplate] = useState([]);
    const [customTemplates, setCustomTemplate] = useState([]);

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
    const handleOnClick = (template) => {
        nagivate('/dashboard')
    }

    const handleNewTemplate = () => {
         createEmailTemplate()
            .then((data) => {
                nagivate('/editflow/' + data._id);
            });
    }

    return (
        <div className="dashboard">
            <div className="page-name" style={{margin: "20px 20px 0"}}>
                <h1 style={{fontSize: "30px", fontFamily: "sans-serif"}}>Dashboard</h1>
            </div>
            <div className="template-container">
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
                                     src="https://lh3.googleusercontent.com/fife/APg5EOaq5M0Dx8t6UvUERx5msUIOmpWvWVtk0ZMp4uX1e4ly5jN8I2HmdnI7BuMKnqu9u-E7pohR6FQsfXX-2dUj_I-3pf1rB4DfIVrGu8Wvbu40WjiSWXBPZ5PZK-jvX38Iy-Y38y_oDkMusWOVAuaVOWqvcWs72TVbvCRTLQvigeaaRhEgz3IWu5xpV6cGH42Iz6UOyRnPCF7lBVwxBNHrvndjAlG2LvKWggfy3m-xS_e-EtJlxq0fDBPoKqlm36IV47iaX495f0ObBGmQKIJcY6HBfoARYgH6W0O5FZd4Qs0hhAeZoNkyEosLKUot6crln8Zo4kgKLvPHz_hV1GCp9Wvzy3Q76lvQ34ONy4Q37b2lO_eBrCJYM6g1FEsPHMdquRPmnNAmoRDzdh5Oo0YT0bzGq_U_fgByWMGQtE57-HSSMLH8Sy9CRO6-SHoMvqWS22vWkLFlxdB07F1Hk56swoHc5WOJ8Sp-mPrVMyxThDt6ASty2wh01xE_zHZ7ok5WlK_OJu7sIDnXA2vuHcfKydNt5UhsMXiw2KvC-dRBKKIx6c6Er-kN5ttljBLf_hTPU1zvbvihT7FnCE1x_NX5JT5LOMX86CPoDggA_0ryHzKejIVS9gq_WfXXDd37UrEDvktSJ5dgEVB-ccnGr3KjOFp4Z0Yd_3OEnVotI3b0xF34YmByoUKEHzM9lCFyxyGANvk_g_7PEXDch-n7ZQjhJv-o9EzQp_mtLXvPvyzsWoGU6lOJcQhhNSnA8F5lSEPB6lV_5A3cwiraUiEOEvDhREzKc5JMxsMCBkq0xvln1DAcJ75qxESj1CQtTg6wQ6DxZI07W_AlGs_5xLo9S8PZNQgSWzqEx3rMxsdy8t0SOpLJOf9Hst7vov0s18TBV2nUkaRzkCAn9WgrHJO5eIg3OQxfRQJ3g_CMfPDlYzGqn23WQpl3twVR6z4JXk3Q_f7e97pOGesCgc6X6U3h5SkhVst2E-TgCjKk63f69nH-ho-3d4tnrrgKKfBROX3HEQ6uPrYDwC0JJBPDpdYGpEXBCXTgbuQ-4Zpyn76W18K3CiTo3dsvx2KZdIgvXd3LTB1dqaEQ7sW5QtoN0XIn1dctj15GKNEebiOp34f7xIlQxFKL0vIMiTdY38UExZ7DhMvghJ4HFx74RbUgSqB6DwARTMTthgo2YkSQkohWeIqKU7s1BYzKyDGPtvBF4u8OARsDSPyxhq9WCWfOM6gZBK2eH1jyYjQrTY1RUmfqk3EW5EqRi-iFCqGhdfvG4r1GhzvJGrO4UqF_tO_yNKRm87ZD74f-SQ1dSgJn3IYWKBxakrvZpvwNSI5SuSSqx6QdMNbvyZxH9cndTMP_gapSPiuxbVZJC-XIKnb75PW7bNMcRblukRYVeO0nfZg-ouBGux4UT92FNHz1vGxe0FpSAGU1474FeNmlL0SNqEVgTSWTL8E9w7A4etoFUh53WN5xn6wweObIAryLiy6g2myEjdH9-xojrqX4eah5_ir64fyUX2bxehoEGh-XusqZmx9ullifth9bgHFw=w1846-h919"/>
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
                <div className="my-template">
                    {customTemplates.map((template) => (
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
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard