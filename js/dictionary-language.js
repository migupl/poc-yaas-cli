window.setDictinaryLanguage = ( function() {
        function setDictinaryLanguage(elFlag) {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4) {
                    if (this.status === HttpCodes.SUCCESS) {

                        const jsonResponse = JSON.parse(this.responseText);

                        elFlag.classList.add("flag-icon-" + (jsonResponse.language || "en"));
                        elFlag.classList.add("flag-icon-squared");
                    }
                }
            };

            const url = elFlag.getAttribute("data-url");
            xhttp.open("GET", url, true);
            xhttp.send();
        }

        return setDictinaryLanguage;
    }()
);
