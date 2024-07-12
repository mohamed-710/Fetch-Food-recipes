const options = ['carrot', 'broccoli', 'asparagus', 'cauliflower', 'corn', 'cucumber', 'green pepper', 'lettuce', 'mushrooms', 'onion', 'potato', 'pumpkin', 'red pepper', 'tomato', 'beetroot', 'brussel sprouts', 'peas', 'zucchini', 'radish', 'sweet potato', 'artichoke', 'leek', 'cabbage', 'celery', 'chili', 'garlic', 'basil', 'coriander', 'parsley', 'dill', 'rosemary', 'oregano', 'cinnamon', 'saffron', 'green bean', 'bean', 'chickpea', 'lentil', 'apple', 'apricot', 'avocado', 'banana', 'blackberry', 'blackcurrant', 'blueberry', 'boysenberry', 'cherry', 'coconut', 'fig', 'grape', 'grapefruit', 'kiwifruit', 'lemon', 'lime', 'lychee', 'mandarin', 'mango', 'melon', 'nectarine', 'orange', 'papaya', 'passion fruit', 'peach', 'pear', 'pineapple', 'plum', 'pomegranate', 'quince', 'raspberry', 'strawberry', 'watermelon', 'salad', 'pizza', 'pasta', 'popcorn', 'lobster', 'steak', 'bbq', 'pudding', 'hamburger', 'pie', 'cake', 'sausage', 'tacos', 'kebab', 'poutine', 'seafood', 'chips', 'fries', 'masala', 'paella', 'som tam', 'chicken', 'toast', 'marzipan', 'tofu', 'ketchup', 'hummus', 'chili', 'maple syrup', 'parma ham', 'fajitas', 'champ', 'lasagna', 'poke', 'chocolate', 'croissant', 'arepas', 'bunny chow', 'pierogi', 'donuts', 'rendang', 'sushi', 'ice cream', 'duck', 'curry', 'beef', 'goat', 'lamb', 'turkey', 'pork', 'fish', 'crab', 'bacon', 'ham', 'pepperoni', 'salami', 'ribs'];
const controlMenu=document.querySelector('#control-menu');
const menu=document.querySelector('#menu');
const menuList = document.querySelector('.menu-list');
const resipesContainer = document.querySelector('#resipes-container');
controlMenu.addEventListener("click",  event =>
    {
        if(menu.style.left==='-100%')
        {
            menu.style.left='0';
            menu.classList.add('menu')
        }
        else{
            menu.style.left='-100%';
            menu.classList.add('menu');
        }
    });
  

for(let i=0;i<options.length;i++)
{
    const optionMen=document.createElement('li');
    optionMen.classList.add('py-3','ps-3','border-bottom','fs-3')
    optionMen.setAttribute('id',options[i])
    const a = document.createElement('a');
    a.href = '#resipes-container';
    a.className = 'btn text-left text-white-50';
    a.setAttribute('onclick', `getApi('${options[i]}')`);
    a.textContent = `${options[i]}`;
    optionMen.appendChild(a);
    menuList.appendChild(optionMen);
}
async function getApi(option) {
    try {
        const data = await getResipesData(option);
        displayResipes(data.recipes);
    } catch (error) {
        console.error(error);
    }
}

async function getResipesData(option) {
    const apiurl = `https://forkify-api.herokuapp.com/api/search?q=${option}`;
    const response = await fetch(apiurl);
    if (!response.ok) {
      throw new Error("Could Not Fetch resipes data");
    }
    return await response.json();
  } 
  function displayResipes(response) {
    resipesContainer.innerHTML = ''; 
    for (let i = 0; i < response.length; i++) {
        const recipe = response[i];
        const colDiv = document.createElement('div');
        colDiv.classList.add('col-md-4', 'mb-4');
        colDiv.id = recipe.recipe_id;

        const resipeBox = document.createElement('div');
        resipeBox.classList.add('resipe-box', 'make-pointer', 'bg-light', 'shadow-lg', 'border', 'rounded');

        const resipeImg = document.createElement('div');
        resipeImg.classList.add('resipe-img');
        const img = document.createElement('img');
        img.src = recipe.image_url;
        img.classList.add('w-100');
        img.alt = recipe.title;
        resipeImg.appendChild(img);

        const content = document.createElement('div');
        content.classList.add('content', 'px-2');
        const title = document.createElement('h3');
        title.classList.add('my-3');
        title.textContent = recipe.title;
        const publisher = document.createElement('p');
        publisher.textContent = recipe.publisher;

        content.appendChild(title);
        content.appendChild(publisher);

        resipeBox.appendChild(resipeImg);
        resipeBox.appendChild(content);

        colDiv.appendChild(resipeBox);
        resipesContainer.appendChild(colDiv);
    };
}
