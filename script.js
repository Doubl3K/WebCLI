const start = (() => {

    navigator.sayswho = (function() {
        var ua = navigator.userAgent;
        var tem;
        var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        p = document.createElement("p");
        p.textContent = "Running on " + M.join(' ');
        document.getElementById("header").appendChild(p);
    })();

    //decleration outside of function to not reset on call
    let commandCounter = 0;
    let getCounter = 0;
    let arr = [];
    function saveCommand(lastChild){
        arr[commandCounter] = lastChild;
        console.log(arr[commandCounter]);
        getCounter = commandCounter;
        commandCounter++;
    }
    
    function getCommandUp(){
        if (arr[getCounter] == undefined) {
            //do nothing
        }
        else{
        let cliWrapper = document.getElementById("cliWrapper");
        cliWrapper.lastChild.value = arr[getCounter];
        getCounter--;
        }
    }

    function getCommandDown(){
        if (getCounter < arr.length -1) {
            getCounter++;
            cliWrapper.lastChild.value = arr[getCounter];

        }
    }


    function appendInputLine() {
        let cliWrapper = document.getElementById("cliWrapper");
        let prefix = document.createElement("span");
        let userInput = document.createElement("INPUT");
        prefix.textContent = "DWB:/";
        cliWrapper.appendChild(prefix);
        cliWrapper.appendChild(userInput);
        let lastChild = cliWrapper.lastChild;
        //Place cursor in last line and listen for Return press
        lastChild.focus();
        lastChild.select();
        lastChild.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                spellchecker(lastChild.value);
                saveCommand(lastChild.value);
            }
            if (key === "ArrowUp") {
                getCommandUp();
            }
            if (key === "ArrowDown") {
                getCommandDown();
            }
        })
    }

    function spellchecker(lastChild) {
        let cliWrapper = document.getElementById("cliWrapper");
        div = document.createElement("div");
        div.setAttribute("style", "white-space:pre;");
        if (lastChild.substr(0, 2) == "op") {
            if (lastChild.length < 3) {
                div.textContent = "op command can only be use with project name variable"
            } else {
                projectOpener(lastChild);
            }
        } else {
            switch (lastChild) {
                case "help":
                    div.textContent = "help         - list of commands\r\ncontact      - opens deafault mail programm\r\nprj          - list of projects\r\nop <value>   - opens selected project in new tab\r\nhub          - opens GitHub profile in a new Tab\r\nbrd          - if you are bored\r\nclear        - reset cli\r\nexit         - close tab";
                    break;
                case "contact":
                    div.textContent = "Opening default Mail Program!"
                    window.location.href = "mailto:jobs@kevinkinner.de?subject=First Contact&body= Hello Mr.Kinner";
                    break;
                case "prj":
                    div.textContent = "op to open a project of your choice type op name of project\r\n\r\ncalc     - Browserbased Calculator\r\nrps      - Rock Paper Scissor\r\nssm      - speaker registration form\r\nmg       - login form\r\nlb       - personal library\r\neas      - Etch a Sketch"
                    break;
                case "hub":
                    window.open("https://github.com/Doubl3K", "_blank").focus();
                    break;
                case "brd":
                    window.open("https://www.youtube.com/watch?v=DEqXNfs_HhY", "_blank");
                    break;
                case "clear":
                    window.location.reload();
                    break;
                case "exit":
                    window.close();
                    break;
                default:
                    div.textContent = lastChild + " is not a recognized command"
                    break;
            }
        }
        cliWrapper.appendChild(div);

        function projectOpener(lastChild) {
            let prid = lastChild.substr(3, 10);
            switch (prid) {
                case "calc":
                    window.open("https://doubl3k.github.io/calc/", "_blank").focus();
                    break;
                case "rps":
                    window.open("https://doubl3k.github.io/R-P-S/", "_blank").focus();
                    break;
                case "ssm":
                    window.open("https://doubl3k.github.io/SSM-SpeakerSubmision/", "_blank").focus();
                    break;
                case "mg":
                    window.open("https://doubl3k.github.io/MonkeyGaming/", "_blank").focus();
                    break;
                case "lb":
                    window.open("https://doubl3k.github.io/Library/", "_blank").focus();
                    break;
                case "eas":
                    window.open("https://doubl3k.github.io/EtchASketch/", "_blank").focus();
                    break;
                default:
                    let cliWrapper = document.getElementById("cliWrapper");
                    div = document.createElement("div");
                    div.textContent = prid + " is not a recognized project variable";
                    break;
            }
        }
        appendInputLine();
    }
    appendInputLine();
})();