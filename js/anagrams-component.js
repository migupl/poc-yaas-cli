function setAnagramsComponent() {
    customElements.define('x-anagrams', class extends HTMLElement {
        constructor() {
            super();
            const template = document.querySelector('#anagrams-tpl');

            this.attachShadow({ mode: 'open' });
            this.shadowRoot.appendChild(template.content.cloneNode(true));

            this.render();
        }

        render() {
            // update attrs
            const elLength = this.shadowRoot.querySelector('.length');
            const elSize = this.shadowRoot.querySelector('.anagrams-size');
            const elAnagrams = this.shadowRoot.querySelector('.anagrams');

            const length = this.getAttribute('length');
            if (length) {
                elLength.textContent = length;
                elSize.textContent = this.getAttribute('anagrams-size');

                const elList = document.createElement("ul");
                this.getAttribute('anagrams').split(",").forEach(function (word) {
                    const elRow = document.createElement("li");
                    elRow.textContent = word;
                    elList.appendChild(elRow);
                });
                elAnagrams.appendChild(elList);
            }
        }
    });
}

function requestAnagrams(url, method, elResponse) {
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
                error.style.display = "block";
            }
        }
    };

    xhttp.open(method, url, true);
    xhttp.send();
}