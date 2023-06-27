let productsCount;
const categoryOne = 1;
const categoryTwo = 2;
let selectedCategoryId;
let deleteButton;

  /*Видалення*/
  
  function deleteCatalog() {
      const container = document.querySelector('.container'); // знаходимо елемент з класом container
      const items = container.querySelectorAll('.item'); // знаходимо всі елементи з класом item, що знаходяться всередині container
      items.forEach(item => item.remove()); // видаляємо кожен знайдений елемент з класом item
  }
  
  /*Поява*/
  
  function showHideElement() {
    let element = document.getElementById("element-to-hide");
    if (element.classList.contains("form_m")) {
      element.classList.remove("form_m");
    } else {
      element.classList.add("form_m");
    }
  }
  function showHideElementS() {
    let element = document.getElementById("element-to-hide-s");
    if (element.classList.contains("form_sc")) {
      element.classList.remove("form_sc");
    } else {
      element.classList.add("form_sc");
    }
  }
  
  function hideElementS() {
    let element = document.getElementById("element-to-hide-s");
    element.classList.add("form_sc");
  }
  
  function hideElement() {
    let element = document.getElementById("element-to-hide");
    element.classList.add("form_m");
  }

  const baseImageUrl = 'http://localhost:4000';
  function addBlock() {
    deleteCatalog();
    showHideElement();
    hideElementS();
  
    /*fetch('/more-about/:id')
    .then(response => response.json())*/

    fetch('/shkilni-auktsiony/all/?mainPhoto=true&projectCategoryId=1')
      .then(response => response.json())
      .then(async (data) => {
        const { products, images, sellers } = data;
  
        const sellersById = {};
        for (const seller of sellers) {
          sellersById[seller.id] = seller;
        }
  
        const imagesByProductId = {};
        for (const image of images) {
          const productId = image.productId;
          if (!imagesByProductId[productId]) {
            imagesByProductId[productId] = [];
          }
          imagesByProductId[productId].push(image);
        }
  
        for (const product of products) {
          const { id, name, price, sellerId, deadline } = product;
          const seller = sellersById[sellerId];
          const { name: sellerName, contact_info } = seller;
          const productImages = imagesByProductId[id] || [];
          const imagePaths = productImages.map(image => image.path);

          const items = [
            `<a href="${baseImageUrl}/more-about/${product.id}"><img src="${baseImageUrl}${imagePaths[0]}" alt="Фото товару"></a>`,
            `<div class="item-details">`,
            `<h2 class="item-title">${product.name}</h2>`,
            `<p class="item-price">Ціна: ${product.price}$</p>`,
            `<p class="item-seller">Продавець: ${seller.name}</p>`,
            `<p class="item-contact">Контакт: ${seller.contact_info}</p>`,
            `<p class="item-deadline">До завершення аукціону: ${product.deadline}</p>`,
            `<button class="delete-button-items" onclick="handleDeleteCard(${product.id})">
            <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="25px" height="25px" viewBox="0 0 482.428 482.429" xml:space="preserve">
              <g>
                <g>
                  <path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098
                    c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117
                    h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828
                    C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879
                    C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096
                    c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266
                    c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979
                    V115.744z"/>
                  <path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07
                    c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"/>
                  <path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07
                    c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"/>
                  <path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07
                    c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"/>
                </g>
              </g>
            </svg>
          </button>`,
            `</div>`,
          ];
          const deadlineIndex = items.findIndex(item => item.includes('item-deadline'));

          if (deadlineIndex !== -1) {
            const currentTime = new Date();
            const beginningTime = new Date(product.beginning);
            const deadline = new Date(product.deadline);
          
            if (currentTime < beginningTime) {
              const formattedBeginningTime = formatDate(beginningTime);
              items[deadlineIndex] = `<p class="item-deadline">Аукціон починається ${formattedBeginningTime}</p>`;
            } else if (currentTime > deadline) {
              items[deadlineIndex] = `<p class="item-deadline" style="color: red;">Аукціон завершений!</p>`;
            } else {
              const timeDiff = deadline - currentTime;
              const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
              const minutesLeft = Math.floor((timeDiff / (1000 * 60)) % 60);
              const secondsLeft = Math.floor((timeDiff / 1000) % 60);
              const remainingTime = formatRemainingTime(hoursLeft, minutesLeft, secondsLeft);
              items[deadlineIndex] = `<p class="item-deadline">До завершення аукціону: ${remainingTime}</p>`;
            }
          }
          
          // Функція для відмінювання числівників
          function formatRemainingTime(hours, minutes, seconds) {
            const formatNumber = (number, wordForms) => {
              const cases = [2, 0, 1, 1, 1, 2];
              return number + ' ' + wordForms[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
            };
          
            const formattedHours = formatNumber(hours, ['година', 'години', 'годин']);
            const formattedMinutes = formatNumber(minutes, ['хвилина', 'хвилини', 'хвилин']);
            const formattedSeconds = formatNumber(seconds, ['секунда', 'секунди', 'секунд']);
          
            return `${formattedHours} ${formattedMinutes} ${formattedSeconds}`;
          }
          
          function formatDate(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
            return date.toLocaleDateString(undefined, options);
          }
          
          // Створення нового елементу div
          const newDiv = document.createElement("div");
  
          // Додавання класу до нового елементу
          newDiv.classList.add("item");
  
          // Додавання HTML вмісту до нового елементу
          newDiv.innerHTML = items.join("");

          deleteButton = newDiv.querySelector(".delete-button-items");
          deleteButton.style.display = "none"; // Початково прихована
          newDiv.appendChild(deleteButton);
          // Додавання нового елементу до DOM
          document.getElementById("container").appendChild(newDiv);
        }
      })
      .catch(error => console.error("Помилка:", error));
  }

  addBlock();
  
  /*СОРТУВАННЯ*/
  function sortItems() {
    const selectPrice = document.getElementById("select-price");
    const container = document.getElementById("container");
    const items = Array.from(container.getElementsByClassName("item"));
    const sortedItems = items.sort((a, b) => {
      const priceA = Number(a.querySelector(".item-price").textContent.replace(/\D/g,''));
      const priceB = Number(b.querySelector(".item-price").textContent.replace(/\D/g,''));
      if (selectPrice.value === "growing") {
        return priceA - priceB;
      } else if (selectPrice.value === "falling") {
        return priceB - priceA;
      } else {
        return 0;
      }
    });
    container.innerHTML = "";
    sortedItems.forEach(item => container.appendChild(item));
  }
  const selectPrice = document.getElementById("select-price");
  selectPrice.addEventListener("change", sortItems);
    
  // Функція порівняння для зростання ціни

  function addCatalog() {
    deleteCatalog();
    showHideElement();
    hideElementS();
  
    fetch('/moskalevbyvchyy-motlokh/all/?mainPhoto=true&projectCategoryId=2')
      .then(response => response.json())
      .then(async (data) => {
        const { products, images, sellers } = data;
  
        const sellersById = {};
        for (const seller of sellers) {
          sellersById[seller.id] = seller;
        }
  
        const imagesByProductId = {};
        for (const image of images) {
          const productId = image.productId;
          if (!imagesByProductId[productId]) {
            imagesByProductId[productId] = [];
          }
          imagesByProductId[productId].push(image);
        }
  
        for (const product of products) {
          const { id, name, price, sellerId } = product;
          const seller = sellersById[sellerId];
          const { name: sellerName, contact_info } = seller;
          const productImages = imagesByProductId[id] || [];
          const imagePaths = productImages.map(image => image.path);

          const items2 = [
            `<a href="${baseImageUrl}/more-about/${product.id}"><img src="${baseImageUrl}${imagePaths[0]}" alt="Фото товару"></a>`,
            `<div class="item-details">`,
            `<h2 class="item-title">${product.name}</h2>`,
            `<p class="item-price">Ціна: ${product.price}$</p>`,
            `<p class="item-seller">Продавець: ${seller.name}</p>`,
            `<p class="item-contact">Контакт: ${seller.contact_info}</p>`,
            `<button class="delete-button-items2" onclick="handleDeleteCard(${product.id})">
              <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="25px" height="25px" viewBox="0 0 482.428 482.429" xml:space="preserve">
                <g>
                  <g>
                    <path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098
                      c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117
                      h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828
                      C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879
                      C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096
                      c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266
                      c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979
                      V115.744z"/>
                    <path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07
                      c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"/>
                    <path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07
                      c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"/>
                    <path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07
                      c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"/>
                  </g>
                </g>
              </svg>
            </button>`,
            `</div>`,
          ];
          // Створення нового елементу div
          const newDiv = document.createElement("div");
  
          // Додавання класу до нового елементу
          newDiv.classList.add("item");
  
          // Додавання HTML вмісту до нового елементу
          newDiv.innerHTML = items2.join("");

          deleteButton = newDiv.querySelector(".delete-button-items2");
          deleteButton.style.display = "none"; // Початково прихована
          newDiv.appendChild(deleteButton);
          // Додавання нового елементу до DOM
          document.getElementById("container").appendChild(newDiv);
        }
      })
      .catch(error => console.error("Помилка:", error));
  }
  
  const myButton1 = document.getElementById('sc');
  
  myButton1.disabled = true;
  myButton1.addEventListener('click', function() {
    const h2 = document.querySelector('.picnav h2.text1');
    h2.innerHTML = 'Шкільні благодійні аукціони';
    myButton1.disabled = true;
    myButton2.disabled = false;
  });
  
  const myButton2 = document.getElementById('mm');
  myButton2.addEventListener('click', function() {
    const h2 = document.querySelector('.picnav h2.text1');
    h2.innerHTML = 'Москалевбивчий мотлох';
    myButton2.disabled = true;
    myButton1.disabled = false;
  });
  
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('run_script') === 'true') {
    deleteCatalog();
    addCatalog();
    const h2 = document.querySelector('.picnav h2.text1');
    h2.innerHTML = 'Москалевбивчий мотлох';
    let myButton2 = document.getElementById('mm');
    myButton2.disabled = true;
    let myButton1 = document.getElementById('sc');
    myButton1.disabled = false;
  }

  function showAdmin() {
    const password = prompt("Введіть пароль:");
    // Відправка запиту на бекенд для перевірки пароля
    fetch('/check-password', {
      method: 'POST',
      body: JSON.stringify({ password: password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.authenticated) {
          // Якщо пароль вірний, виконуємо функціонал адмін панелі
          console.log("Відкриття адмін панелі");
  
          // Решта коду для створення блоку та обробки події
          const newItem = document.createElement("div");
          newItem.classList.add("item");
  
          const plusLink = document.createElement("a");
          plusLink.href = "#";
          newItem.appendChild(plusLink);
  
          const plusImage = document.createElement("img");
          plusImage.src = "data:image/svg+xml;charset=utf-8,%3Csvg%20enable-background%3D%22new%200%200%2050%2050%22%20height%3D%2250px%22%20id%3D%22Layer_1%22%20version%3D%221.1%22%20viewBox%3D%220%200%2050%2050%22%20width%3D%2250px%22%20xml%3Aspace%3D%22preserve%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%3Crect%20fill%3D%22none%22%20height%3D%2250%22%20width%3D%2250%22%2F%3E%3Cline%20fill%3D%22none%22%20stroke%3D%22%23000000%22%20stroke-miterlimit%3D%2210%22%20stroke-width%3D%224%22%20x1%3D%229%22%20x2%3D%2241%22%20y1%3D%2225%22%20y2%3D%2225%22%2F%3E%3Cline%20fill%3D%22none%22%20stroke%3D%22%23000000%22%20stroke-miterlimit%3D%2210%22%20stroke-width%3D%224%22%20x1%3D%2225%22%20x2%3D%2225%22%20y1%3D%229%22%20y2%3D%2241%22%2F%3E%3C%2Fsvg%3E";
          plusImage.alt = "Плюсик";
          plusLink.appendChild(plusImage);
  
          const container = document.getElementById("container");
          container.appendChild(newItem);
            
          newItem.addEventListener("click", showForm);
        } else {
          // Якщо пароль невірний, виводимо повідомлення про помилку
          alert("Невірний пароль. Доступ заборонено.");
        }
      })
      .catch(error => {
        console.error("Помилка при перевірці пароля:", error);
      });
      showDeleteButton();
  }

  function showDeleteButton() {
    const deleteButtonsItems2 = document.querySelectorAll('.delete-button-items2:not(.plus-button)');
    deleteButtonsItems2.forEach((button) => {
      button.style.display = 'block';
    });

    const deleteButtonsItems = document.querySelectorAll('.delete-button-items:not(.plus-button)');
    deleteButtonsItems.forEach((button) => {
      button.style.display = 'block';
    });
  }
  
  function showForm() {
    // Створення контейнера для вікна форми
    const formWindow = document.createElement("div");
    formWindow.classList.add("form-window");

    // Створення форми для заповнення даних
    const form = document.createElement("form");
    form.classList.add("form");

    // Отримання випадаючого списку категорій проектів з бекенду
    fetch('/project_categories/all')
        .then(response => response.json())
        .then(categories => {
            // Створення випадаючого списку з отриманих категорій
            const select = document.createElement("select");
            select.id = "selector"
            select.name = "category";
            select.required = true;

            // Додавання елементів випадаючого списку
            categories.forEach(category => {
              const option = document.createElement("option");
              option.value = category.id;
              option.text = category.name;
              option.setAttribute("data-id", category.id); // Додайте атрибут data-id зі значенням id
              select.appendChild(option);
          });
          

            // Додавання випадаючого списку до форми
            form.appendChild(select);
            form.innerHTML += `
                <input type="text" id="title" placeholder="Заголовок" value="Малюнок олівцями" required>
                <input type="text" id="description" placeholder="Опис" value="Якісний та гарний" required>
                <input type="text" id="contact" placeholder="Контакти" value="+380965514231" required>
                <input type="text" id="date-start" class="start" placeholder="Початок аукціону" required>
                <input type="text" id="date-end" class="end" placeholder="Кінець аукціону" required>
                <input type="text" id="price" placeholder="Ціна" value="350" required>
                <input type="text" id="seller" placeholder="Продавець" value="Школа №1" required>
                <input type="text" id="address" placeholder="Адреса" value="Сєдова, 48" required>
                <input type="file" title="Вставте головне фото" id="productMainPhotoForSend" class="main" placeholder="Головне фото" required>
                <input type="file" title="Вставте інші фото" id="productPhotosForSend" placeholder="Інші фото" required multiple>
                <div class="form-buttons">
                    <button type="button" onclick="submitSave()">Зберегти</button>
                    <button type="button" onclick="closeForm()">Ні</button>
                </div>
            `;
            //
            
           let selectorElement = document.getElementById("selector");
           const dateStartInput = document.getElementById("date-start");
           const dateEndInput = document.getElementById("date-end");
           
           flatpickr(dateStartInput, {
             enableTime: true,
             dateFormat: "Y-m-d H:i:S"
           });
           
           flatpickr(dateEndInput, {
             enableTime: true,
             dateFormat: "Y-m-d H:i:S"
           });

           selectorElement.addEventListener("input", () => {
           selectedCategoryId = selectorElement.value;

            if (selectedCategoryId === '1') {
                // Якщо категорія має id = 1, відобразити поля "Початок аукціону" і "Кінець аукціону"
                document.querySelector('#date-start').style.display = 'block';
                document.querySelector('#date-end').style.display = 'block';
                
            }
            if (selectedCategoryId === '2') {
                // Якщо категорія має id = 2, приховати поля "Початок аукціону" і "Кінець аукціону"
                document.querySelector('#date-start').style.display = 'none';
                document.querySelector('#date-end').style.display = 'none';
            } 
        });  
         
        })
        .catch(error => {
            console.error("Помилка при отриманні категорій проектів:", error);
        });

       

    // Додавання форми до вікна форми
    formWindow.appendChild(form);

    // Додавання вікна форми до DOM
    document.body.appendChild(formWindow);

    // Заборона прокрутки заднього вмісту під вікном форми
    document.body.style.overflow = "hidden";
}

function submitSave() {
  const name = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const productCategoryId = 1;
  const sellerId = 1;
  const selectorElement = document.getElementById("selector");
  const selectedCategoryId = selectorElement.value;
  const projectCategoryId = selectedCategoryId;
  //parseInt(selectedCategoryId, 10);
  const dateStartInput = document.getElementById("date-start");
  const dateEndInput = document.getElementById("date-end");
  let deadline;
  let beginning;
  
  if (projectCategoryId === '1') {
    const dateStart = new Date(dateStartInput.value);
    const dateEnd = new Date(dateEndInput.value);
    dateStart.setHours(dateStart.getHours() + 3);
    beginning = dateStart.toISOString();
    dateEnd.setHours(dateEnd.getHours() + 3);
    deadline = dateEnd.toISOString();
  }
  
  if (projectCategoryId === '2') {
    deadline = new Date();
    beginning = new Date();
  }
  const mainPhotoInput = document.getElementById('productMainPhotoForSend');
  const photoInputs = document.getElementById('productPhotosForSend').files;

  const formData = new FormData();

  formData.append('name', name);
  formData.append('description', description);
  formData.append('price', price);
  formData.append('projectCategoryId', projectCategoryId);
  formData.append('productCategoryId', productCategoryId);
  formData.append('sellerId', sellerId);
  formData.append('deadline', deadline);
  formData.append('beginning', beginning);

  if (mainPhotoInput.files && mainPhotoInput.files[0]) {
    const mainPhotoFile = mainPhotoInput.files[0];
    formData.append('mainPhoto', mainPhotoFile);
  }

  if (photoInputs.length > 0) {
    for (const photoFile of photoInputs) {
      formData.append('photos', photoFile);
    }
  }

  fetch('/new-items', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      alert(result.message);
    })
    /*.catch(error => {
      console.error('Error:', error);
      alert('Помилка при збереженні продукту та зображень');
    });*/
    // Виклик функції оновлення сторінки двічі з проміжком в 0,5 секунди
    setTimeout(() => {
      dispatchRefreshEvent();
    }, 500);
}
  function closeForm() {
    // Видалення вікна форми з DOM
    const formWindow = document.querySelector(".form-window");
    formWindow.parentNode.removeChild(formWindow);
  
    // Відновлення прокрутки заднього вмісту
    document.body.style.overflow = "auto";
  }
  
    /*видалення з БД*/
    // Видалення картки зі сторінки
    function removeCardFromPage(cardId) {
      const cardElement = document.querySelector(`.item[data-card-id="${cardId}"]`);
      if (cardElement) {
        cardElement.remove();
        console.log(`Картку з ідентифікатором ${cardId} видалено зі сторінки.`);
      } else {
        console.log(`Картку з ідентифікатором ${cardId} не знайдено на сторінці.`);
      }
    }

    // Підтвердження видалення
    function handleDeleteCard(cardId) {
      const confirmation = confirm("Ви впевнені, що бажаєте видалити цю картку?");

      if (confirmation) {
        const permanentDeletion = confirm("Видалити назавжди?");

        // Виклик серверного маршруту для видалення картки
        deleteCard(cardId, permanentDeletion);
      }
    }

    // Видалення картки зі сторінки та бази даних
    function deleteCard(cardId, permanent) {
      // Виклик серверного маршруту для видалення картки
      fetch(`/delete/products/${cardId}`, {
        method: 'DELETE',
        body: JSON.stringify({ permanent }), // Відправка параметра permanent
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          // Видалення картки зі сторінки
          removeCardFromPage(cardId);
          return response.json();
        } else {
          throw new Error('Помилка сервера');
        }
      })
      .then(data => {
        console.log(data.message);
      })
      .catch(error => {
        console.error(error);
      });
      dispatchRefreshEvent();
    }


  function reload() {
    deleteCatalog();
    renderItems();
    hideElement();
    showHideElementS();
  }

  function dispatchRefreshEvent() {
    const refreshEvent = new CustomEvent('refreshPage');
    document.dispatchEvent(refreshEvent);
  }
  document.addEventListener('refreshPage', () => {
    location.reload();
  });
    