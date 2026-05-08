const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let certificates = [];

app.post("/generate", (req, res) => {

    const certificateId =
        `AMF2026-${certificates.length + 1}`;

    const certificate = {
        id: Date.now(),
        ...req.body,
        certificateId
    };

    certificates.push(certificate);

    res.json(certificate);
});

app.get("/certificates", (req, res) => {

    res.json(certificates);
});

app.delete("/delete/:id", (req, res) => {

    certificates =
        certificates.filter(
            item => item.id != req.params.id
        );

    res.json({
        message: "Deleted Successfully"
    });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server Running On Port ${PORT}`);

});