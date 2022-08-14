const start = (() => {
    function appendInputLine() {
        let cliWrapper = document.getElementById("cliWrapper");
        let prefix = document.createElement("span");
        let userInput = document.createElement("INPUT");
        userInput.attributes = "rows=1";
        prefix.textContent = "DWB:/";
        cliWrapper.appendChild(prefix);
        cliWrapper.appendChild(userInput);
        let lastChild = cliWrapper.lastChild;
        lastChild.focus();
        lastChild.select();
    }
    appendInputLine();
    document.addEventListener("Enter", appendInputLine);
})();