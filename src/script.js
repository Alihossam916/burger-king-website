let menuItems = document.querySelector("#menu-items");

// Filter buttons
let mealsFilter = document.getElementById("meals-button");
let burgersFilter = document.getElementById("beef-burgers-button");
let chickenFilter = document.getElementById("chicken-fish-button");
let sidesFilter = document.getElementById("sides-button");
let drinksFilter = document.getElementById("drinks-button");
let sweetsFilter = document.getElementById("sweets-button");

let filterState = "meals"; // Default filter state

function setFilterState(state) {
  filterState = state; // Update the filter state
}

// Data object to hold the fetched menu data
let data = {};

const loadData = async () => {
  try {
    // 1. Fetching the file
    const response = await fetch("../burger-king-menu.json");

    // 2. Parsing the JSON data
    data = await response.json();    

    // 3. Using the data
    displayMenuItems();
  } catch (error) {
    console.error("Error fetching menu data:", error);
  }
};

if(menuItems) {
    loadData();
}

function displayMenuItems() {
  menuItems.innerHTML = ""; // Clear existing items
  console.log(data);
  let menuData = {};

  switch (filterState) {
    case "meals":
      menuData = data.meals;
      break;
    case "burgers":
      menuData = data.burgers;
      break;
    case "chicken and fish":
      menuData = data.chicken_and_fish;
      break;
    case "sides":
      menuData = data.sides;
      break;
    case "drinks":
      menuData = data.drinks;
      break;
    case "sweets":
      menuData = data.sweets;
      break;
    default:
      console.warn("Unknown filter state:", filterState);
      return; // Exit if the filter state is unknown
  }

  menuData.forEach((item) => {

    const menuItem = document.createElement("a");
    menuItem.href = `#`; // Link to item details
    menuItem.className = "menu-item rounded-lg shadow-md p-4 flex flex-col items-canter justify-between hover:shadow-lg transition-shadow duration-300";
    menuItem.innerHTML = `
            <img class="w-52 mx-auto rounded-t-lg" src="${item.image}" alt="${item.name}">
            <h3 class="text-lg text-bg-secondary font-normal font-custom-regular mt-2 mx-auto">${item.name}</h3>
            <p class="text-gray-600 mx-auto font-custom-regular">$${item.price}</p>
        `;
    menuItems.appendChild(menuItem);
  });
}

// Event listeners for filter buttons
if(mealsFilter) {
    mealsFilter.addEventListener("click", () => {
        setFilterState("meals");    
        displayMenuItems();
    });
}
if(burgersFilter) {
    burgersFilter.addEventListener("click", () => {
        setFilterState("burgers");    
        displayMenuItems();
    });
}
if(chickenFilter) {
    chickenFilter.addEventListener("click", () => {
        setFilterState("chicken and fish");    
        displayMenuItems();
    });
}
if(sidesFilter) {
    sidesFilter.addEventListener("click", () => {
        setFilterState("sides");    
        displayMenuItems();
    });
}
if(drinksFilter) {
    drinksFilter.addEventListener("click", () => {
        setFilterState("drinks");    
        displayMenuItems();
    });
}
if(sweetsFilter) {
    sweetsFilter.addEventListener("click", () => {
        setFilterState("sweets");    
        displayMenuItems();
    });
}


// --- Sign Up and Login Functionality ---
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const signupMessage = document.getElementById('signup-message');
    const loginMessage = document.getElementById('login-message');

    // Handle Sign Up
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('signup-username').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const password = document.getElementById('signup-password').value.trim();

            if (!username || !email || !password) {
                signupMessage.textContent = 'All fields are required.';
                signupMessage.style.color = 'red';
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.find(user => user.email === email);

            if (userExists) {
                signupMessage.textContent = 'User with this email already exists.';
                signupMessage.style.color = 'red';
            } else {
                const newUser = { username, email, password };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                signupMessage.textContent = 'Sign up successful! You can now log in.';
                signupMessage.style.color = 'green';
                signupForm.reset();
            }
        });
    }

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value.trim();

            if (!email || !password) {
                loginMessage.textContent = 'All fields are required.';
                loginMessage.style.color = 'red';
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                loginMessage.textContent = 'Login successful! Redirecting...';
                loginMessage.style.color = 'green';
                // Store session info
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                // Redirect to home page after a short delay
                setTimeout(() => {
                    window.location.href = './index.html';
                }, 1500);
            } else {
                loginMessage.textContent = 'Invalid email or password.';
                loginMessage.style.color = 'red';
            }
        });
    }
});
