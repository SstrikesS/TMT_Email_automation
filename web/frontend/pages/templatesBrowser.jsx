import React, {useCallback, useEffect, useState} from "react";
import '../css/templatesBrowser.css'
import {LegacyCard, Scrollable} from '@shopify/polaris';
import {Button} from 'antd';
import {useNavigate} from "react-router-dom";
import {cloneEmailTemplate} from "../../my_api.js";
const TemplatesBrowser = () => {
    const [defaultTemplates, setDefaultTemplate] = useState([]);

    const fetchData = useCallback(async () => {
        await fetch('http://127.0.0.1:3001/templates?type=Shopify&limit=100&page=1')
            .then((response) => response.json())
            .then((data) => {
                setDefaultTemplate(data.templates)
            });
    }, []);

    useEffect(() => {
        fetchData().then(() => {
            }
        );
    }, [])
    const nagivate = useNavigate()



    return (
        <div className="templates-browser">
            <div className="page-name">
                <h1 style={{fontSize: "30px", fontFamily: "sans-serif"}}>Templates Browser</h1>
            </div>
            <div className="list-content">
                <LegacyCard title="All Templates" sectioned>
                    <Scrollable shadow style={{height: '600px', backgroundColor:"#E9E9E9", borderRadius:"5px"}}>
                        <div className="templates-num">Showing {defaultTemplates.length} templates</div>
                        <div className="templates-list">
                            {defaultTemplates.map((template) => (
                                <a className="template-container" onClick={() => {
                                    cloneEmailTemplate(template)
                                        .then((data) => {
                                        nagivate('/editflow/' + data._id);
                                    });
                                }}>
                                    <div className="template-thumbnail">
                                        <img className="template-thumbnail" alt={template.template_name}
                                            src= {template.thumbnails}/>
                                        </div>                 
                                    <div className="template-name">{template.template_name}</div>
                                    <Button className="open-button" type="primary">Open</Button>
                                </a>
                            ))}
                        </div>
                    </Scrollable>
                </LegacyCard>
            </div>
        </div>
    )
}

export default TemplatesBrowser