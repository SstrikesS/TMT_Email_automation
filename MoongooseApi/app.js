import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({origin: '*'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
    .connect("mongodb://localhost:27017/GR1-email-template", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
    });

const templateSchema = new mongoose.Schema({
    template_name: String,
    counters: Object,
    body: Object,
    schemaVersion: Number,
    type: String,
});

const Template = mongoose.model("Template", templateSchema);

app.get("/templates", async (req, res) => {
    try {
        let type = ""
        let limit = 4;
        let page = 1;

        if (req.query.type) {
            type = req.query.type
        }
        if (req.query.limit) {
            limit = req.query.limit
        }
        if (req.query.page) {
            page = req.query.page
        }

        const templates = await Template.find({
                type: {
                    $regex: '.*' + type + '.*'
                }
            }
        ).limit(limit).skip((page - 1) * limit).exec();

        const count = await Template.find({
            type: {
                $regex: '.*' + type + '.*'
            }
        }).count();

        res.json({
            templates,
            currentPage: parseInt(page),
            totalPage: Math.ceil(count / limit),
            total: count,
        });
    } catch (error) {
        console.error("Error fetching templates:", error);
        res.status(500).json({error: "Internal server error"});
    }
});


app.get("/template/:id", async (req, res) => {
    try {
        const template = await Template.findById(req.params.id);

        if (!template) {
            return res.status(404).json({error: "Template not found"});
        }

        res.json(template);
    } catch (error) {
        console.error("Error fetching template:", error);
        res.status(500).json({error: "Internal server error"});
    }
});

app.put("/update/template/:id", async (req, res) => {
    try {
        const {id} = req.params;

        const template = await Template.findById(id);

        if (!template) {
            return res.status(404).json({error: "Template_id not found"});
        }

        if (req.body.counters) {
            template.counters = req.body.counters;
        }
        if (req.body.body) {
            template.body = req.body.body;
        }
        if (req.body.schemaVersion) {
            template.schemaVersion = req.body.schemaVersion;
        }
        if (req.body.template_name) {
            template.template_name = req.body.template_name;
        }

        await template.save();

        res.json({message: "Template updated successfullly"});
    } catch (error) {
        console.error("Error updating template:", error);
        res.status(500).json({error: "Internal server error"})
    }
});

app.post("/add/template", async (req, res) => {
    const newTemplate = new Template({
      template_name: req.body.template_name,
      body: req.body.body,
      counters: req.body.counters,
      schemaVersion: req.body.schemaVersion,
      type: "Custom"
    })
    await newTemplate.save()
        .then((document) => {
            res.status(201).json(document);
        })
        .catch((error) => {
            res.status(500).json({error: error.message});
        });
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
