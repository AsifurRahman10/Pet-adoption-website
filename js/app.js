// category data getting from API
const getCategoryData = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then(res => res.json())
        .then(data => displayCategory(data.categories))
}

// display category btn

const displayCategory = (categories) => {
    categories.forEach(categoryD => {
        const categoryContainer = document.getElementById('category-container')
        const btn = document.createElement('button');
        btn.classList = 'btn flex items-center gap-4 border-2 rounded-[16px] h-24 justify-center';
        btn.innerHTML = `
             <img src="${categoryD.category_icon}" alt="" />
            <p class="text-2xl font-bold">${categoryD.category}</p>
           
        `
        categoryContainer.append(btn);
    });
}







// call category data
getCategoryData();