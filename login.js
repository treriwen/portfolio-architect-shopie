

async function main() {

    let get_work = await get_element()

    displayinfo(get_work)

    create_post(get_element())
}

function get_info_login() {
    const form = document.querySelector('#form_login')
    const element_login = []
    element_login.push(form.elements[0].value, form.elements[1].value)
    return element_login
}

function connect_api(info_login) {
    const apiUrl = 'http://localhost:5678/api/users/login';
    const jsonData = {
        email: info_login[0],
        password: info_login[1]
    };

    // Effectuez la requête GET avec les en-têtes appropriés et le corps en JSON
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('La requête a échoué.');
            }
            return response.json();
        })
        .then(data => {
            // Traitez les données renvoyées par l'API
            console.log(data);
        })
        .catch(error => {
            console.error('Erreur lors de la requête fetch:', error);
        });
}

function get_element() {
    const apiUrlElement = 'http://localhost:5678/api/works';


    // Effectuez la requête GET avec les en-têtes appropriés et le corps en JSON
    return fetch(apiUrlElement, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.error('Erreur lors de la requête fetch:', error);
        });
}

function create_post(all_works) {
    all_works.forEach(element => {
        console.log(element.title)
    });
}


function displayinfo(get_work) {

    let gallery = document.querySelector(".gallery");

    for (const info of get_work) {
        gallery.insertAdjacentHTML("beforeend",
            `
        <figure>
            <img src="${info.image}" alt="${info.title}">
            <figcaption>${info.title}</figcaption>
        </figure>
        `)
    }
}


main()

