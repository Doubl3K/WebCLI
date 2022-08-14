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
        return M.join(' ');
    })();

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
            }
        })
    }

    function spellchecker(lastChild) {
        let cliWrapper = document.getElementById("cliWrapper");
        div = document.createElement("div");
        div.setAttribute("style", "white-space:pre;");
        switch (lastChild) {
            case "help":
                div.textContent = "help         - list of commands\r\ncontact      - opens deafault mail programm\r\nprj          - list of projects\r\nop <value>   - opens selected project in new tab\r\nhub          - opens GitHub profile in a new Tab\r\nbrd          - if you are bored\r\nclear        - reset cli\r\nexit         - close tab";
                break;

            default:
                div.textContent = lastChild + " is not a recognized command"
                break;
        }
        cliWrapper.appendChild(div);




        appendInputLine();
    }



    p = document.createElement("p");
    p.textContent = "Running on " + navigator.sayswho;
    document.getElementById("header").appendChild(p);

    appendInputLine();
})();