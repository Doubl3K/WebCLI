const start = (() => {
    let cliWrapper = document.getElementById("cliWrapper");

    function appendInputLine() {
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
                help();
                lastChild.replaceWith(lastChild);
            }
        })
    }

    function help() {
        p = document.createElement("p");
        p.textContent = "contact - list possible contact"
        cliWrapper.appendChild(p);
    }



    appendInputLine();

})();