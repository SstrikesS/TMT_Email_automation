import React, {useCallback, useEffect, useRef, useState} from "react"
import {Button, Layout, Icon, TextField} from '@shopify/polaris'
import EmailEditor from 'react-email-editor'
import '../css/editFlow.css'
import {Modal} from "antd";
import {updateEmailTemplate} from "../../my_api.js";
import {useParams} from "react-router-dom";
import {HtmlMirror} from "../components/index.js";
import {EditMajor} from '@shopify/polaris-icons';
import {traverseBody, replace_liquid} from "../components/index.js";
// import {useAuthenticatedFetch} from "../hooks/index.js";
import {ProductGrid, ProductInfo} from "../assets/index.js";
import {buttonCustom} from "../assets/ButtonCustom.jsx";
import {degistBlock} from "../assets/DegistBlock.jsx";
import {LogoBlock} from "../assets/LogoBlock.jsx";
import {ImageGallery} from "../assets/ImageGallery.jsx";

const EditFlow = () => {
    // const fetchShop = useAuthenticatedFetch();
    const [state, setState] = useState({
        template_name: '',
        htmlCode: '',
        editNameActive: false,
        active_session: true,
        saveTemplate: undefined,
        currentTemplate: undefined,
        previewTemplate: undefined,
        liquid: [],
        data_shop: undefined,
    })


    const [inputTemplateName, setInputTemplateName] = useState("");

    const [preview, setPreview] = useState(false);

    const {idTemplate} = useParams()

    const emailEditorRef = useRef(null)

    const HtmlCodeMirror = useRef(null);

    const handleCopyText = async () => {
        saveDesign();
        const {html} = await new Promise((resolve) => {
            emailEditorRef.current.editor.exportHtml((data) => {
                resolve(data);
            });
        });
        setState({
            ...state,
            htmlCode: html,
        });
       await navigator.clipboard.writeText(state.htmlCode).then();
        window.open("https://admin.shopify.com/store/tmt-email-automation/settings/notifications", "_blank");
    };

    const editNamePopup = () => {
        setState({
            ...state,
            editNameActive: true,
        });
    }

    const handleInputChange = useCallback((value) => setInputTemplateName(value), []);

    const handleNameOk = () => {
        setState({
            ...state,
            template_name: inputTemplateName,
            editNameActive: false,
        });
        const data = {
            template_name: inputTemplateName
        }
        updateEmailTemplate(idTemplate, data).then(
        )

    };

    const handleNameCancel = () => {
        setState({
            ...state,
            editNameActive: false,
        })
    }

    const displayModel = {
        display: {
            true: "none",
            false: "block"
        },
        none: {
            true: "block",
            false: "none"
        }
    }
    const fetchData = useCallback(async () => {
        fetch("http://127.0.0.1:3001/template/" + idTemplate)
            .then((response) => response.json())
            .then((data) => {
                setState({
                    ...state,
                    saveTemplate: data,
                    currentTemplate: data,
                    template_name: data.template_name
                });
            })
    }, []);

    // const fetchApi = useCallback(async () => {
    //     fetchShop("/api/shop/info").then((response) => response.json())
    //         .then((data) => {
    //             setState({
    //                 ...state,
    //                 data_shop: data[0]
    //             })
    //         })
    //         .then(() => {
    //             setState({
    //                 ...state,
    //                 liquid: traverseBody(state.saveTemplate.body.rows)
    //             });
    //             setState({
    //                 ...state,
    //                 previewTemplate: replace_liquid(state.previewTemplate, state.liquid, state.data_shop)
    //             })
    //         })
    // }, [])


    useEffect(() => {
        if (idTemplate !== undefined) {
            fetchData().then()
                .catch(console.error);
            // fetchApi().then()
            //     .catch(console.error);
        }
    }, [idTemplate])

    const saveDesign = () => {
        emailEditorRef.current?.editor?.saveDesign((design) => {
            updateEmailTemplate(idTemplate, design).then((data) => {
                console.log(data);
            });
            setState({
                ...state,
                saveTemplate: design,
                currentTemplate: design
            });
        });
    };

    const exportHtml =  () => {
        try {
            emailEditorRef.current.editor.exportHtml((data) => {
                setState({
                    ...state,
                    htmlCode: data.html,
                    currentTemplate: data.design,
                    saveTemplate: data.design,
                    active_session: false,
                });
                updateEmailTemplate(idTemplate, data.design).then();
            });
        } catch (error) {
            console.error(error);
        }
    };

    const onClickSave = () => {
        setState({
            ...state,
            active_session: true,
        });
    }
    const togglePreview = () => {
        if (preview) {
            setState({
                ...state,
                currentTemplate: state.saveTemplate,
            });
            setPreview(false);
            emailEditorRef.current?.editor?.hidePreview();
        } else {
            saveDesign();
            setState({
                ...state,
                liquid: traverseBody(state.currentTemplate.body.rows),
            });
            const tmp = replace_liquid(state.currentTemplate, state.liquid, state.data_shop);
            setState({
                ...state,
                previewTemplate: tmp,
                currentTemplate: tmp,
            });
            setPreview(true);
            emailEditorRef.current?.editor?.showPreview('desktop');
        }
    };

    const onReady = async () => {
        if (idTemplate === undefined || state.currentTemplate === undefined || state.currentTemplate === null) {
            emailEditorRef.current?.editor?.loadBlank(undefined);
        } else {

            emailEditorRef.current?.editor?.loadDesign(state.currentTemplate);
        }
    };

    return (
        <div>
            <Layout>
                <Layout.Section oneHalf>
                    <div id={"first_section_taskbar"}>
                        <p>{state.template_name}</p>
                        <Button id={"button2"} onClick={editNamePopup}><Icon source={EditMajor} color="base"/></Button>
                    </div>
                    <div id={"second_section_taskbar"}>
                        <Button id='button1' onClick={onClickSave}>Design</Button>
                        <Button id='button1' onClick={exportHtml}>HTML</Button>
                        <Button style={{flex: 1}} onClick={togglePreview}
                                id='button1'>{preview ? 'Hide' : 'Show'}Preview</Button>
                    </div>
                </Layout.Section>
                <Layout.Section >
                    <div id="third_section_taskbar" style={{marginTop:'50px',float:'right',marginRight:'40px'}}>
                        <Button style={{flex: 1, width: '1px'}} primary id='button1'
                                onClick={handleCopyText}> Export</Button>
                        <Button style={{flex: 1}} primary id='button1' onClick={saveDesign}>Save</Button>
                        <Button style={{flex: 1}} id='button1' destructive url='/dashboard'>Leave</Button>
                    </div>
                </Layout.Section>
            </Layout>
            <div style={{
                height: '100%',
                width: '100%',
                border: '1px solid',
                minHeight: '500px',
                display: displayModel.display[state.active_session]
            }}>
                <HtmlMirror ref={HtmlCodeMirror} Code={state.htmlCode}></HtmlMirror>
            </div>
            <Modal
                title="Edit Template Name"
                open={state.editNameActive}
                onOk={handleNameOk}
                onCancel={handleNameCancel}
            >
                <TextField label="Edit Template Name" autoComplete="off" type="text" placeholder={state.template_name}
                           value={inputTemplateName}
                           onChange={handleInputChange}></TextField>
            </Modal>

            <EmailEditor
                editorId={'editor'}
                projectId={169449}
                ref={emailEditorRef}
                minHeight={780}
                onReady={onReady}
                style={{display: displayModel.none[state.active_session]}}
                options={{
                    // amp: true,
                    appearance: {},
                    features: {
                        preview: false,
                        stockImages: true,
                        undoRedo: true
                    },
                    translations: {
                        en: {
                            "tools.tabs.images": "Stock Images"
                        }
                    },
                    tools: {
                        image: {
                            enabled: true
                        }
                    },
                    locale: "en-US",
                    customJS: [
                        `https://cdn.fromdoppler.com/unlayer-editor/static/main.f197c1ba9137ad9ff441.js`
                    ],
                    blocks: [
                        ...ProductGrid,
                        ...ProductInfo,
                        ...buttonCustom,
                        ...degistBlock,
                        ...LogoBlock,
                        ...ImageGallery,
                    ]
                }}
            />
        </div>
    );
};

export default EditFlow