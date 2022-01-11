import { 
    checkAuth, 
    deleteBunny, 
    getFamilies, 
    logout,
} from '../fetch-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayFamilies() {
    // Fetch families from supabase
    const families = await getFamilies();
    // clear out the familiesEl
    while (familiesEl.firstChild) {
        familiesEl.firstChild.remove();
    }
    for (let family of families) {
        // create three elements for each family, one for the whole family, one to hold the name, and one to hold the bunnies
        const familyContainerEl = document.createElement('div');
        const familyNameEl = document.createElement('h3');
        const bunniesContainerEl = document.createElement('div');
        // add the bunnies css class to the bunnies el, and family css class to the family el

        bunniesContainerEl.classList.add('bunnies');
        familyContainerEl.classList.add('family');
        // put the family name in the name element
        familyNameEl.textContent = family.name;
        // for each of this family's bunnies
        for (let bunny of family.fuzzy_bunnies) {
            bunniesContainerEl.append(renderBunny(bunny)); 
        }
        familyContainerEl.append(familyNameEl, bunniesContainerEl);
        familiesEl.append(familyContainerEl);
    }
}

window.addEventListener('load', async() => {
    await displayFamilies();
});

export function renderBunny(bunny) {
    // make an element with the css class 'bunny', and put the bunny's name in the text content
    const bunnyNameEl = document.createElement('p');
    bunnyNameEl.classList.add('bunny');
    bunnyNameEl.textContent = bunny.name;
    
    // add an event listener to the bunny el. On click, delete the bunny, then refetch and redisplay all families.
    bunnyNameEl.addEventListener('click', async() => {
        await deleteBunny(bunny.id);
        await displayFamilies();
    });

    return bunnyNameEl;
}
