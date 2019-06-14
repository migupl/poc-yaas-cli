window.searchForAnagrams = ( function() {
        function cleanError(error) {
            error.style.display = "none";
        }

        function removeAnagramList(elList) {
            let child = elList.lastElementChild;
            while (child) {
                elList.removeChild(child);
                child = elList.lastElementChild;
            }
        }

        function searchForAnagrams(form) {
            const elError = document.querySelector("#error");
            cleanError(elError);

            const elAnagramResponse = document.querySelector('#anagrams-response');
            removeAnagramList(elAnagramResponse);

            const searchText = encodeURIComponent(form.text.value);
            if (searchText) {
                const url = form.action + searchText;

                requestAnagrams(url, form.method, elAnagramResponse, elError)
            }
        }

        return searchForAnagrams;
    }()
);
