let productsCount;

fetch('/')
  .then(response => response.json())
  .then(data => {
    productsCount = data.count;
  });
console.log(productsCount);

const items = [
    {
      class: "item",
      dataId: "primary",
      scId: "school1",
      html: `
        <a href="more(1).html"><img src="https://picsum.photos/id/1015/400/300" alt="Фото товару"></a>
        <div class="item-details">
          <h2 class="item-title">Назва товару 1</h2>
          <p class="item-price">Ціна: $50</p>
          <p class="item-seller">Продавець: Ім'я Прізвище</p>
          <p class="item-contact">Контакт: телефон/email</p>
        </div>
      `,
    },
    {
      class: "item",
      dataId: "primary",
      scId: "school1",
      html: `
      <a href="more(1).html"><img src="https://picsum.photos/id/1015/400/300" alt="Фото товару"></a>
      <div class="item-details">
        <h2 class="item-title">Назва товару 25</h2>
        <p class="item-price">Ціна: $50</p>
        <p class="item-seller">Продавець: Ім'я Прізвище</p>
        <p class="item-contact">Контакт: телефон/email</p>
      </div>
      `,
    },
  
  ];
  
  // Додавання з масиву (Старе)
  function addBlock() {
    deleteCatalog();
    showHideElementS();
    hideElement();
  
    items.forEach((item) => {
  
    const newDiv = document.createElement("div");
    newDiv.classList.add(item.class);
    newDiv.setAttribute("data-id", item.dataId);
    newDiv.setAttribute("sc-id", item.scId);
    newDiv.setAttribute("onmouseover", item.onmouseover);
  
    newDiv.innerHTML = item.html;
  
    document.getElementById("container").appendChild(newDiv);
  });
  }
  //addBlock();
  
  // Кнопка "Показати більше"
  
  const newData = items.map((item, index) => ({
    class: item.class,
    dataId: item.dataId,
    scId: item.scId,
    html: item.html,
    index: index + 1 // додатковий параметр для зручності
  }));
  
  const container = document.querySelector('.container');
  const showMoreBtn = document.querySelector('#show-more');
  
  let startIndex = 0;
  let endIndex = 16;
  let itemsToShow = newData.slice(startIndex, endIndex);
  
  function renderItems() {
    itemsToShow.forEach((item) => {
      const div = document.createElement('div');
      div.className = item.class;
      div.setAttribute('data-id', item.dataId);
      div.setAttribute('sc-id', item.scId);
      div.innerHTML = item.html;
      document.getElementById("container").appendChild(div);
    });
  }
  
  renderItems();
  
  showMoreBtn.addEventListener('click', () => {
    startIndex += 16;
    endIndex += 16;
    itemsToShow = newData.slice(startIndex, endIndex);
    renderItems();
  });
  
  // Сортування (Тільки елементів div, треба переробити для сортування з масиву)
  const selectId = document.getElementById("select-id");
  const selectSc = document.getElementById("select-sc");
  
  // Додавання подій на зміну значення select елементів
  selectId.addEventListener("change", filterBlocks);
  selectSc.addEventListener("change", filterBlocks);
  
  function filterBlocks() {
    const selectedId = selectId.value;
    const selectedSc = selectSc.value;
  
    // Отримання масиву всіх блоків на сторінці
    const blocks = document.querySelectorAll(".item");
  
    // Використання методу filter для фільтрації блоків на сторінці
    const filteredBlocks = Array.from(blocks).filter(block => {
    // Перевірка, чи має блок потрібні id та школу
    if (selectedId !== "all" && selectedSc !== "all") {
    return (
      block.getAttribute("data-id") === selectedId &&
      block.getAttribute("sc-id") === selectedSc
      );
    } else if (selectedId !== "all") {
    return block.getAttribute("data-id") === selectedId;
    } else if (selectedSc !== "all") {
    return block.getAttribute("sc-id") === selectedSc;
    }
    // Якщо опції "all" вибрані, то відображаємо всі блоки на сторінці
    return true;
    });
  
    // Зміна стилів блоків відповідно до результатів фільтрації
    Array.from(blocks).forEach(block => {
    if (filteredBlocks.includes(block)) {
      block.style.display = "block";
      } else {
      block.style.display = "none";
      }
      });
  }
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

  function addCatalog() {
    deleteCatalog();
    showHideElement();
    hideElementS();
  
    fetch('/moskalevbyvchyy-motlokh/all/?main_photo=true&project_category_id=2')
      .then(response => response.json())
      .then(async (data) => {
        const { products, images, sellers } = data;
  
        const sellersById = {};
        for (const seller of sellers) {
          sellersById[seller.id] = seller;
        }
  
        const imagesByProductId = {};
        for (const image of images) {
          const productId = image.product_id;
          if (!imagesByProductId[productId]) {
            imagesByProductId[productId] = [];
          }
          imagesByProductId[productId].push(image);
        }
  
        for (const product of products) {
          const { id, name, price, seller_id } = product;
          const seller = sellersById[seller_id];
          const { name: sellerName, contact_info } = seller;
          const productImages = imagesByProductId[id] || [];
          const imagePaths = productImages.map(image => image.path);

          const items2 = [
            `<a href="more.html"><img src="${baseImageUrl}${imagePaths[0]}" alt="Фото товару"></a>`,
            `<div class="item-details">`,
            `<h2 class="item-title">${product.name}</h2>`,
            `<p class="item-price">Ціна: ${product.price}$</p>`,
            `<p class="item-seller">Продавець: ${seller.name}</p>`,
            `<p class="item-contact">Контакт: ${seller.contact_info}</p>`,
            `</div>`,
          ];
          // Створення нового елементу div
          const newDiv = document.createElement("div");
  
          // Додавання класу до нового елементу
          newDiv.classList.add("item");
  
          // Додавання HTML вмісту до нового елементу
          newDiv.innerHTML = items2.join("");
  
          // Додавання нового елементу до DOM
          document.getElementById("container").appendChild(newDiv);
        }
      })
      .catch(error => console.error("Помилка:", error));
  }
  
 /* function addCatalog() {
  
    deleteCatalog();
    showHideElement();
    hideElementS();
  
    
  const items2 = [
    {
      class: "item",
      dataId: "primary",
      scId: "school1",
      html: `
      <a href="more(2).html"><img src="http://russian.people.com.cn/mediafile/201311/29/F201311290909442978919052.jpg" alt="Фото товару"></a>
      <div class="item-details">
        <h2 class="item-title">Назва товару</h2>
        <p class="item-price">Ціна: $100</p>
        <p class="item-seller">Продавець: Ім'я Прізвище</p>
        <p class="item-contact">Контакт: телефон/email</p>
      </div>
      `,
    },
    {
      class: "item",
      dataId: "primary",
      scId: "school1",
      html: `
      <a href="more(2).html"><img src="https://thumbs.dreamstime.com/b/%D0%BC%D0%BE%D1%80%D1%81%D0%BA%D0%BE%D0%B9-%D0%BF%D0%B5%D0%B9%D0%B7%D0%B0%D0%B6-%D1%81-%D0%BA%D1%80%D0%B0%D1%81%D0%B8%D0%B2%D1%8B%D0%BC-%D0%B7%D0%B0%D0%BA%D0%B0%D1%82%D0%BE%D0%BC-%D1%83-%D0%BC%D0%BE%D1%80%D1%8F-165094320.jpg" alt="Фото товару"></a>
      <div class="item-details">
        <h2 class="item-title">Назва товару</h2>
        <p class="item-price">Ціна: $100</p>
        <p class="item-seller">Продавець: Ім'я Прізвище</p>
        <p class="item-contact">Контакт: телефон/email</p>
      </div>
      `,
    },
  ];
  
 
  items2.forEach((item) => {
    // Створення нового елементу div
    const newDiv = document.createElement("div");
  
    // Додавання класу до нового елементу
    newDiv.classList.add(item.class);
  
    // Додавання атрибуту "data-id" до нового елементу
    newDiv.setAttribute("data-id", item.dataId);
  
    // Додавання атрибуту "sc-id" до нового елементу
    newDiv.setAttribute("sc-id", item.scId);
  
    // Додавання обробника події "onmouseover" до нового елементу
    newDiv.setAttribute("onmouseover", item.onmouseover);
  
  // Додавання HTML вмісту до нового елементу
  newDiv.innerHTML = item.html;
  
  // Додавання нового елементу до DOM
  document.getElementById("container").appendChild(newDiv);
  
  });*/
  
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
  
  function reload() {
    deleteCatalog();
    renderItems();
    hideElement();
    showHideElementS();
  }