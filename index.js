const products = [
    {
    id: 1,
    name: "Rápido y Furioso 10",
    category: "Acción",
    price: 15,
    image:
        "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/VW6GWH7SPFG67A4SJP3E7KVBTI.jpeg",
    },
    {
    id: 2,
    name: "Guardianes de la Galaxia Vol. 3",
    category: "Ciencia ficción",
    price: 20,
    image:
        "https://pics.filmaffinity.com/Guardianes_de_la_galaxia_Vol_3-328540746-large.jpg",
    },
    {
    id: 3,
    name: "Super Mario Bros: La Pelicula",
    category: "Animación",
    price: 10,
    image: "https://es.web.img3.acsta.net/pictures/23/02/06/17/15/3568166.jpg",
    },
];


function mostrarProductos() {
    const productsList = document.querySelector("#productsList");
    productsList.innerHTML = "";

    products.forEach((product) => {
    const li = document.createElement("li");
    li.style.listStyleType = "none";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.style.width = "200px";
    li.appendChild(img);

    const name = document.createElement("span");
    name.textContent = `${product.name} - ${product.category} - $${product.price}`;
    li.appendChild(name);

    const addButton = document.createElement("button");
    addButton.textContent = "Agregar";
    addButton.addEventListener("click", () => {
        agregarAlCarrito(product);
    });
    li.appendChild(addButton);

    productsList.appendChild(li);
    });
}

function mostrarCarrito(carrito) {
    const cartList = document.querySelector("#cartList");

    if (!cartList) {
        console.error("El elemento con el ID 'cartList' no se encuentra en el documento.");
        return;
    }

    cartList.innerHTML = "";

    if (carrito.length === 0) {
    const p = document.createElement("p");
    p.textContent = "El carrito está vacío.";
    cartList.appendChild(p);
        } else {
        carrito.forEach((producto) => {
        const li = document.createElement("li");
        li.style.listStyleType = "none";

        const img = document.createElement("img");
        img.src = producto.image;
        img.alt = producto.name;
        img.style.width = "200px";
        li.appendChild(img);

        const name = document.createElement("span");
        name.textContent = `${producto.name} - ${producto.category} - $${producto.price} - Cantidad: ${producto.cantidad}`;
        li.appendChild(name);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", () => {
        eliminarDelCarrito(producto.id);
        });
        li.appendChild(deleteButton);

        cartList.appendChild(li);
    });
    }
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoExistente = carrito.find((item) => item.id === producto.id);

    if (productoExistente) {
    productoExistente.cantidad++;
    } else {
    carrito.push({
        id: producto.id,
        name: producto.name,
        category: producto.category,
        price: producto.price,
        image: producto.image,
        cantidad: 1,
    });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito(carrito);
}

function eliminarDelCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoIndex = carrito.findIndex((item) => item.id === id);

    if (productoIndex !== -1) {
    carrito.splice(productoIndex, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito(carrito);
    }
}

mostrarCarrito(JSON.parse(localStorage.getItem("carrito")) || []);
mostrarProductos();