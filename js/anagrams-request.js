window.requestAnagrams = ( function() {
        function requestAnagrams(url, method, elResponse, elError, elSpinner) {
            let xhttp = new XMLHttpRequest();
            xhttp.onload = function() {
                if (this.status === HttpCodes.SUCCESS) {

                    const jsonArrayResponse = JSON.parse(this.responseText);
                    jsonArrayResponse.forEach(function(anagrams) {
                        const elAnagram = document.createElement("x-anagrams");
                        elAnagram.setAttribute("length", anagrams.length);
                        elAnagram.setAttribute("anagrams-size", anagrams.words.length);
                        elAnagram.setAttribute("anagrams", anagrams.words);

                        elResponse.appendChild(elAnagram);
                        elAnagram.render();
                    })
                }

                if (this.status === HttpCodes.NOT_FOUND) {
                    elError.style.display = "block";
                }

                elSpinner.style.display = "none";
            };

            xhttp.open(method, url, true);
            elSpinner.style.display = "block";

            xhttp.send();
        }

        return requestAnagrams;
    }()
);

