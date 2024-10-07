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
  petCardContainer.classList.remove('md:grid-cols-2');
  // petCardContainer.innerHTML = ""
  const div = document.createElement('div');
  div.classList = 'font-[inter] flex flex-col gap-y-4 justify-center items-center w-full px-5 py-20 bg-[#f8f8f8] rounded-3xl text-center';
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
  const petCardContainer = document.getElementById('pet-card-container');
  petCardContainer.classList.remove('lg:grid-cols-3')
  petCardContainer.classList.remove('md:grid-cols-2')
  petCardContainer.classList.add('text-center');
  petCardContainer.innerHTML = "";

  const spinner = document.createElement('div');
  spinner.id = id = "spinnerId";
  spinner.innerHTML = `
   <span class="loading loading-bars loading-xs"></span>
  `
  petCardContainer.append(spinner);
  setTimeout(() => {
    petCardContainer.classList.add('lg:grid-cols-3')
    petCardContainer.classList.add('md:grid-cols-2')
    document.getElementById('spinnerId').classList.add('hidden')
    pets.forEach(pet => {
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
                <p class="flex items-center gap-2 border-b-2 pb-2">
                  <img src="./images/price.png" alt="" />
                  <span class="text-lg text-[#5a5a5a] font-[lato]"
                    >Price : ${pet?.price ? pet.price : "N/A"}</span
                  >
                </p>
  
                <div class="flex justify-between mt-5 font-[lato]">
                  <button onclick=likeBtn(${pet.petId}) class="btn bg-white px-6 border-[#dbebec]">
                    <i class="fa-regular fa-thumbs-up text-lg"></i>
                  </button>
                  <button onclick = "adpot('adpot${pet.petId}')" id ="adpot${pet.petId}"
                    class="btn border-[#dbebec] lg:px-4 bg-white font-bold text-xl text-[#0E7A81]"
                  >
                    Adopt
                  </button>
                  <button onclick=showModalBtn(${pet.petId})
                    class="btn bg-white lg:px-4 border-[#dbebec] font-bold text-xl text-[#0E7A81]"
                  >
                    Details
                  </button>
                </div>
              </div>
          
          `
      petCardContainer.append(div);
    });
  }, 2000);

}

// adpot btn
const adpot = (id) => {
  const countDisplay = document.getElementById('countdown-value');
  countDisplay.innerText = '3';
  let count = 3;
  const countdown = setInterval(() => {
    if (count > 1) {
      countDisplay.innerText = count;
      count--;
    }
    else {
      clearInterval(countdown);
      countDisplay.innerText = '1';
    }
  }, 1000);

  const modal2 = document.getElementById('my_modal_2');
  modal2.showModal();
  setTimeout(() => {
    modal2.close();
    document.getElementById(id).innerText = 'Adopted'
    document.getElementById(id).disabled = true;
  }, 3000);

}


// like btn
const likeBtn = (petId) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then(res => res.json())
    .then(data => {
      likeImageDisplay(data.petData);
    })
}
// show modal and like btn

const showModalBtn = (petId) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then(res => res.json())
    .then(data => {
      showModal(data.petData);
    })
}

// show Modal 
const showModal = (petDetails) => {
  console.log(petDetails);
  const ModalInfo = document.getElementById('modal-info');
  console.log(petDetails);
  ModalInfo.innerHTML = `
              <img class ="w-full object-cover mb-4 lg:h-[600px] rounded-lg" src="${petDetails.image ? petDetails.image : 'N/A'}" alt="" />
              <h2 class="font-bold text-2xl mb-4">${petDetails.pet_name ? petDetails.pet_name : 'N/A'}</h2>
              <div class="grid grid-cols-2">
                <div class="flex items-start lg:items-center gap-2">
                  <img  src="./images/bread.png" alt="" />
                  <p class="text-lg text-[#5a5a5a] font-[lato]">
                    Breed: ${petDetails.breed ? petDetails.breed : 'N/A'}
                  </p>
                </div>
                <div class="flex items-center gap-2">
                  <img src="./images/birth.png" alt="" />
                  <p class="text-lg text-[#5a5a5a] font-[lato]">
                    Birth: ${petDetails?.date_of_birth ? new Date(petDetails.date_of_birth).getFullYear() : "N/A"}
                  </p>
                </div>
                <div class="flex items-center gap-2">
                  <img src="./images/gender.png" alt="" />
                  <p class="text-lg text-[#5a5a5a] font-[lato]">
                    Gender: ${petDetails.gender ? petDetails.gender : 'N/A'}
                  </p>
                </div>
                <div class="flex items-center gap-2">
                  <img src="./images/price.png" alt="" />
                  <p class="text-lg text-[#5a5a5a] font-[lato]">
                    Price: ${petDetails.price ? petDetails.price : 'N/A'}
                  </p>
                </div>
                <div class="flex items-start lg:items-center gap-2">
                  <img src="./images/vacine.png" alt="" />
                  <p class="text-lg text-[#5a5a5a] font-[lato]">
                    Vaccinated status: ${petDetails.vaccinated_status ? petDetails.vaccinated_status : 'N/A'}
                  </p>
                </div>
              </div>
              <h3 class="font-semibold mt-6">Details Information</h3>
              <div>
                <p class="text-[#5a5a5a]">
                ${petDetails.pet_details ? petDetails.pet_details : 'N/A'}
                </p>
                <ul class="list-disc list-inside pl-4">
                  <li>
                    The point of using is that it has a more-or-less normal
                    distribution of letters, as opposed to using.
                  </li>
                </ul>
                <div class="modal-action border-2l">
                        <form method="dialog" class="inline-block w-full">
                        <div>
                        <button class="btn bg-[#e7f2f2] border-2 border-[#bcdadb] inline-block w-full  font-bold[#0E7A81]">Cancel</button>
                        </div>

                        </form>
                  
              </div>

  `
  document.getElementById('my_modal_5').showModal();
}

// like btn image display
const likeImageDisplay = (petInfo) => {
  const imageFrame = document.getElementById('image-frame');
  const imageD = document.createElement('img');
  imageD.src = petInfo.image;
  imageD.classList.add('w-full', 'h-full', 'object-cover', 'rounded-xl');
  imageFrame.appendChild(imageD);
}


// display category btn

const displayCategory = (categories) => {
  categories.forEach(categoryD => {
    const categoryContainer = document.getElementById('category-container')
    const btn = document.createElement('button');
    btn.classList = 'btn flex items-center gap-4 border-2 h-24 rounded-[16px] justify-center font-[inter]';
    btn.id = 'category-btn'
    btn.innerHTML = `
    <img src = "${categoryD.category_icon}" alt = "" />
      <p class="text-2xl font-bold">${categoryD.category}</p>

  `
    btn.onclick = function () {
      showCategoryPets(categoryD.category, btn);
    };
    categoryContainer.append(btn);
  });
}

const showCategoryPets = (petCategoryDisplay, clickedBtn) => {
  console.log(clickedBtn);
  const getAllButtons = document.querySelectorAll('#category-container button');
  getAllButtons.forEach(btn => {
    btn.classList.remove("rounded-[120px]", "bg-[#e7f2f2]");
    btn.classList.add('rounded-[16px]');
  });
  clickedBtn.classList.remove('rounded-[16px]');
  clickedBtn.classList.add("rounded-[120px]", "bg-[#e7f2f2]");

  const petCardContainer = document.getElementById('pet-card-container');
  petCardContainer.innerHTML = "";
  showCategoryWisePets(petCategoryDisplay)
}

// no pets found

// call category data
getCategoryData();

// get all pet
getAllPetData();