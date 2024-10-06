// category data getting from API
const getCategoryData = () => {
    fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
        .then(res => res.json())
        .then(data => {
            displayCategory(data.categories)
            // console.log(data);
        })
}

// fetch all pets
const getAllPetData = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
        .then(res => res.json())
        .then(data => displayPets(data.pets))
}
// show category wise pets
const showCategoryWisePets = (petName) => {

    fetch(`https://openapi.programming-hero.com/api/peddy/category/${petName}`)
        .then(res => res.json())
        .then(data => {
            if (data.data.length > 0 && Array.isArray(data.data)) {
                displayPets(data.data);
            }
            else {
                noPetFound();
            }

        })
}

// display not category pet available
const noPetFound = () => {
    const petCardContainer = document.getElementById('pet-card-container');
    petCardContainer.classList.remove('lg:grid-cols-3');
    // petCardContainer.innerHTML = ""
    const div = document.createElement('div');
    div.classList = 'font-[inter] flex flex-col gap-y-4 justify-center items-center px-5 py-20 bg-[#f8f8f8] rounded-3xl text-center';
    div.innerHTML = `
     <img src="./images/error.webp" alt="" />
            <h2 class="text-4xl font-bold">No Information Available</h2>
            <p class="text-base text-[#5a5a5a]">
              Sorry, No pet found in this category.
            </p>
    `
    petCardContainer.append(div);


}

// display pets

const displayPets = (pets) => {
    pets.forEach(pet => {
        const petCardContainer = document.getElementById('pet-card-container');
        petCardContainer.classList.add('lg:grid-cols-3');
        const div = document.createElement('div');
        div.classList = "card border-2 p-5 space-y-4";
        div.innerHTML = `
        <figure>
              <img
                src="${pet.image}"
                alt="Shoes" class= "w-full"
              />
            </figure>
            <div class="">
              <h2 class="font-[inter] text-xl font-bold">${pet?.pet_name ? pet.pet_name : "N/A"}</h2>
              <p class="flex items-center gap-2">
                <img src="./images/bread.png" alt="" />
                <span class="text-lg text-[#5a5a5a] font-[lato]"
                  >Breed: ${pet?.breed ? pet.breed : "N/A"}</span
                >
              </p>
              <p class="flex items-center gap-2">
                <img src="./images/birth.png" alt="" />
                <span class="text-lg text-[#5a5a5a] font-[lato]"
                  >Birth: ${pet?.date_of_birth ? new Date(pet.date_of_birth).getFullYear() : "N/A"}</span
                >
              </p>
              <p class="flex items-center gap-2">
                <img src="./images/gender.png" alt="" />
                <span class="text-lg text-[#5a5a5a] font-[lato]"
                  >Gender: ${pet?.gender ? pet.gender : "N/A"}</span
                >
              </p>
              <p class="flex items-center gap-2">
                <img src="./images/price.png" alt="" />
                <span class="text-lg text-[#5a5a5a] font-[lato]"
                  >Price : ${pet?.price ? pet.price : "N/A"}</span
                >
              </p>
              <div class="flex justify-between mt-5 font-[lato]">
                <button class="btn bg-white px-8 border-[#dbebec]">
                  <i class="fa-regular fa-thumbs-up text-lg"></i>
                </button>
                <button
                  class="btn border-[#dbebec] px-8 bg-white font-bold text-xl text-[#0E7A81]"
                >
                  Adopt
                </button>
                <button
                  class="btn bg-white px-8 border-[#dbebec] font-bold text-xl text-[#0E7A81]"
                >
                  Details
                </button>
              </div>
            </div>
        
        `
        petCardContainer.append(div);
    });
}

// display category btn

const displayCategory = (categories) => {
    categories.forEach(categoryD => {
        const categoryContainer = document.getElementById('category-container')
        const btn = document.createElement('button');
        btn.classList = 'btn flex items-center gap-4 border-2 rounded-[16px] h-24 justify-center font-[inter]';
        btn.innerHTML = `
             <img src="${categoryD.category_icon}" alt="" />
            <p class="text-2xl font-bold">${categoryD.category}</p>
           
        `
        btn.onclick = function () {
            showCategoryPets(categoryD.category);
        };
        categoryContainer.append(btn);
    });
}

const showCategoryPets = (petCategoryDisplay) => {
    const petCardContainer = document.getElementById('pet-card-container');
    petCardContainer.innerHTML = "";
    showCategoryWisePets(petCategoryDisplay)
}

// no pets found

// call category data
getCategoryData();

// get all pet
getAllPetData();