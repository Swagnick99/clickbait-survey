// import Cookies from "\\package\\dist\\js.cookie.mjs"

const data = [
    {
        name: "Sagnik Basu",
        link1: "https://www.livescience.com/",
        link2: "https://www.codechef.com/",
        link3: "https://www.udemy.com/",
        text1: "Find something interesting every day at Live Science.",
        text2: "CodeChef - A Platform for Aspiring Programmers",
        text3: "Whether you want to learn or to share what you know, you've come to the right place. As a global destination for online learning, we connect people through knowledge."
    },
    {
        name: "Anik Chatterjee",
        link1: "https://classroom.google.com/u/0/h",
        link2: "https://github.com/",
        link3: "https://colab.research.google.com/?utm_source=scs-index",
        text1: "Making Google Classroom video meetings easier and more secure",
        text2: "Millions of developers and companies build, ship, and maintain their software on GitHub—the largest and most advanced development platform in the world.",
        text3: "If you're already familiar with Colab, check out this video to learn about interactive tables, the executed code history view, and the command palette"
    }
];

let user;
function show_links() {
    const name = document.querySelector(".form-control").value;

    for (let i = 0; i < data.length; i++) {
        if (data[i].name == name) {
            const head = document.querySelector(".survey h1");
            head.innerHTML = "Choose any 2 of the below links";

            const links = document.querySelectorAll(".survey-link");
            links[0].setAttribute("href", data[i].link1);
            links[0].innerHTML = data[i].text1;
            links[1].setAttribute("href", data[i].link2);
            links[1].innerHTML = data[i].text2;
            links[2].setAttribute("href", data[i].link3);
            links[2].innerHTML = data[i].text3;
        }
    }

    user = name;
}

function DownloadJSON(participant, link, reason) {
    //Build a JSON array containing Customer records.
    let participants = new Array();
    participants.push(["Name", "Link Clicked", "Reason for clicking"]);
    participants.push([participant, link, reason]);

    //Convert JSON Array to string.
    let json = JSON.stringify(participants);

    //Convert JSON string to BLOB.
    json = [json];
    const blob1 = new Blob(json, { type: "text/plain;charset=utf-8" });

    //Check the Browser.
    const isIE = false || !!document.documentMode;
    if (isIE) {
        window.navigator.msSaveBlob(blob1, "Participant.txt");
    } else {
        let url = window.URL || window.webkitURL;
        link = url.createObjectURL(blob1);
        let a = document.createElement("a");
        a.download = "Participant.txt";
        a.href = link;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

document.querySelectorAll(".survey-link").forEach(link => link.addEventListener('click', (event) => {
    let reason = prompt("What prompted you to click this link\n1) Is it motivating you?\n2) Is it making something easier for you?\n3) Both of these\n4) None of these");
    
    DownloadJSON(user, event.target.getAttribute("name"), reason);
}));