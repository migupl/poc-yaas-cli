window.requestAnagrams = ( function() {
        function requestAnagrams(url, method, elResponse, elError) {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4) {
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
                }
            };

            xhttp.open(method, url, true);
            xhttp.send();
        }

        return requestAnagrams;
    }()
);

