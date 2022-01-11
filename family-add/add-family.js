import { 
    createFamily,
    checkAuth,
    logout,
} from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const form = document.querySelector('.new-family-form');

form.addEventListener('submit', async(e) => {
    e.preventDefault();
    const data = new FormData(form);
    const familyName = data.get('family-name');

    await createFamily(familyName);

    form.reset();
});

logoutButton.addEventListener('click', () => {
    logout();
});

