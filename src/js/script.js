let table; // Declarar la variable table en el alcance global

document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://siaweb-nodejs.carlos-reneren7.repl.co/productos";

    // Obtener los datos de la API
    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("No se pudo obtener los datos de la API.");
            }
            return response.json();
        })
        .then((data) => {
            // Inicializar DataTable
            table = $("#productos-table").DataTable({ // Asignar la variable table en el alcance global
                data: data,
                columns: [
                    { data: "nombre" },
                    { data: "descripcion" },
                    { data: "precio" },
                    {
                        data: null,
                        render: function (data, type, row) {
                            const editButton = '<button class="editar-btn" data-id="' + row.id + '">Editar</button>';
                            const deleteButton = '<button class="eliminar-btn" data-id="' + row.id + '">Eliminar</button>';
                            return editButton + ' ' + deleteButton;
                        }
                    }
                ]
            });

            // Resto del código...
        })
        .catch((error) => {
            console.error("Error al obtener datos de la API: " + error);
        });
});

// Agregar un manejador de eventos para el botón "Editar"
$("#productos-table").on("click", ".editar-btn", function () {
    const productId = $(this).data("id"); // Obtener el ID del producto a editar
    // Redirigir a la página de edición con el ID del producto en la URL
    window.location.href = "./editar_producto.html?id=" + productId;
});

