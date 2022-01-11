import { 
    createBunny, 
    getFamilies, 
    checkAuth, 
    logout 
} from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');

form.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = data.get('bunny-name');
    const familyID = data.get('family-id');

    const bunny = {
        name: name,
        family_id: familyID
    };
    await createBunny(bunny);

    form.reset();
});

window.addEventListener('load', async() => {
    const dropdownEl = document.querySelector('select');
    
    const families = await getFamilies();

    for (let family of families) {
        const optionEl = document.createElement('option');
        optionEl.value = family.id;
        optionEl.textContent = family.name;
        dropdownEl.append(optionEl);
    }

});


checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
