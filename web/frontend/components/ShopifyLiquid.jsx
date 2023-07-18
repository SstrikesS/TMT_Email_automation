export function setLiquid(data, rowIndex, columnIndex, contentIndex, value, liquid) {
    const regex = /\{\{([\w.]+?)\}\}/g;
    let match;
    while ((match = regex.exec(data))) {
        const [fullMatch, property] = match;
        const api = property.split('.')[0];
        const prop = property.split('.')[1]
        liquid.push({
            api,
            prop,
            rows: rowIndex,
            columns: columnIndex,
            contents: contentIndex,
            value: value,
        });
    }
    return liquid;
}

export function traverseBody(rows) {
    let liquid = [];
    rows.forEach((row, rowIndex) => {
        row.columns.forEach((column, columnIndex) => {
            column.contents.forEach((content, contentIndex) => {
                if (content.values && typeof content.values === 'object') {
                    if (content.values.text && typeof content.values.text === 'string') {
                        const {text} = content.values;
                        liquid = setLiquid(text, rowIndex, columnIndex, contentIndex, 'text', liquid);
                    }
                    if (content.values.html && typeof content.values.html === 'string') {
                        const {html} = content.values;
                        liquid = setLiquid(html, rowIndex, columnIndex, contentIndex, 'html', liquid);
                    }
                    if (content.values.anchor && typeof content.values.anchor === 'string') {
                        const {anchor} = content.values;
                        liquid = setLiquid(anchor, rowIndex, columnIndex, contentIndex, 'anchor', liquid);
                    }
                    if (content.values.src && typeof content.values.src === 'object') {
                        if (content.values.src.url && typeof content.values.src.url === 'string') {
                            const {url} = content.values.src;
                            liquid = setLiquid(url, rowIndex, columnIndex, contentIndex, 'src_url', liquid);
                        }
                    }
                    if (content.values.href && typeof content.values.href === 'object') {
                        if (content.values.href.values.href && typeof content.values.href.values.href === 'string') {
                            const {href} = content.values.href.values;
                            liquid = setLiquid(href, rowIndex, columnIndex, contentIndex, 'button_href', liquid);
                        }
                    }
                }
            });
        });
    });
    return liquid
}

export function replace_liquid(template, liquid, data) {
    let previewTemplate = structuredClone(template);
    for (const element of liquid) {
        if (data.hasOwnProperty(element.api) && data[element.api].hasOwnProperty(element.prop)) {
            const liquid_code = '{{' + element.api + '.' + element.prop + '}}';
            if (element.value === 'text') {
                previewTemplate.body.rows[element.rows].columns[element.columns].contents[element.contents].values.text =
                    previewTemplate.body.rows[element.rows].columns[element.columns].contents[element.contents].values.text.replace(liquid_code, data[element.api][element.prop]);
            } else if (element.value === 'html') {
                previewTemplate.body.rows[element.rows].columns[element.columns].contents[element.contents].values.html =
                    previewTemplate.body.rows[element.rows].columns[element.columns].contents[element.contents].values.html.replace(liquid_code, data[element.api][element.prop]);
            } else if (element.value === 'anchor') {
                previewTemplate.body.rows[element.rows].columns[element.columns].contents[element.contents].values.anchor =
                    previewTemplate.body.rows[element.rows].columns[element.columns].contents[element.contents].values.anchor.replace(liquid_code, data[element.api][element.prop]);
            } else if (element.value === 'button_href') {
                previewTemplate.body.rows[element.rows].columns[element.columns].contents[element.contents].values.href.values.href =
                    previewTemplate.body.rows[element.rows].columns[element.columns].contents[element.contents].values.href.values.href.replace(liquid_code, data[element.api][element.prop]);
            } else if (element.value === 'src_url') {
                previewTemplate.body.rows[element.rows].columns[element.columns].contents[element.contents].values.src.url =
                    previewTemplate.body.rows[element.rows].columns[element.columns].contents[element.contents].values.src.url.replace(liquid_code, data[element.api][element.prop]);
            }
        }
    }
    return previewTemplate;
}

