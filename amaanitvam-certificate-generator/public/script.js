async function generateCertificate(){

    const name =
        document.getElementById("name").value;

    const role =
        document.getElementById("role").value;

    const event =
        document.getElementById("event").value;

    const date =
        document.getElementById("date").value;

    const response = await fetch("/generate", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name,
            role,
            event,
            date
        })
    });

    const data = await response.json();

    document.getElementById("certName")
    .innerText = data.name;

    document.getElementById("certEvent")
    .innerText = data.event;

    document.getElementById("certRole")
    .innerText = `Role: ${data.role}`;

    document.getElementById("certDate")
    .innerText = `Date: ${data.date}`;

    document.getElementById("certId")
    .innerText =
    `Certificate ID: ${data.certificateId}`;
}

async function downloadPDF(){

    const certificate =
        document.getElementById("certificate");

    const canvas =
        await html2canvas(certificate);

    const image =
        canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;

    const pdf =
        new jsPDF("landscape");

    pdf.addImage(image, "PNG", 10, 10, 270, 150);

    pdf.save("certificate.pdf");
}

function logout(){

    localStorage.removeItem("loggedIn");

    window.location.href = "/login.html";
}