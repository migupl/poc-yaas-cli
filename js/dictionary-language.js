window.setDictinaryLanguage = ( function() {
        function setDictinaryLanguage(elFlag) {
            let xhttp = new XMLHttpRequest();
            xhttp.onload = function() {
                let language = "en";
                if (this.status === HttpCodes.SUCCESS) {

                    const jsonResponse = JSON.parse(this.responseText);
                    language = jsonResponse.language || language;
                }

                elFlag.className = "";
                elFlag.classList.add("flag-icon");
                elFlag.classList.add("flag-icon-" + language);
                elFlag.classList.add("flag-icon-squared");
            };

            const url = elFlag.getAttribute("data-url");
            xhttp.open("GET", url, true);
            xhttp.send();
        }

        return setDictinaryLanguage;
    }()
);
