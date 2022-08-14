const start = (() => {
    function appendLine() {
        let cliWrapper = document.getElementById("cliWrapper");
        let prefix = document.createElement("span");
        let userInput = document.createElement("INPUT");
        userInput.attributes = "rows=1";
        prefix.textContent = "DWB:/";
        cliWrapper.appendChild(prefix);
        cliWrapper.appendChild(userInput);
    }
    appendLine();
    document.addEventListener("Enter", appendLine);
})();