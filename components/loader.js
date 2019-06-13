window.loadComponent = ( function() {

        function fetchComponent(componentUrl) {
            return fetch(componentUrl)
                .then( ( response ) => {
                    return response.text();
                })
                .then( ( html ) => {
                    const parser = new DOMParser();
                    const document = parser.parseFromString(html, 'text/html');
                    const head = document.head;
                    const template = head.querySelector('template');
                    const style = head.querySelector('style');
                    const script = head.querySelector('script');

                    return {
                        template,
                        style,
                        script
                    }
                })
        }

        function registerWC({ template, style, script }) {
            return  eval(script.innerText)
        }

        function loadComponent(componentUrl) {
            return fetchComponent(componentUrl).then(registerWC)
        }

        return loadComponent;
    }()
);
