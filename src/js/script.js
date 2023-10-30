
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
            const table = $("#productos-table").DataTable({
                data: data,
                columns: [
                    { data: "nombre" },
                    { data: "descripcion" },
                    { data: "precio" },
                    {
                        data: null,
                        render: function (data, type, row) {
                            return '<button class="editar-btn">Editar</button> <button class="eliminar-btn">Eliminar</button>';
                        }
                    }
                ]
            });

            // Agregar evento para los botones
            $("#productos-table").on("click", ".editar-btn", function () {
                const data = table.row($(this).parents("tr")).data();
                alert("Editar producto: " + data.nombre);
            });

            $("#productos-table").on("click", ".eliminar-btn", function () {
                const data = table.row($(this).parents("tr")).data();
                alert("Eliminar producto: " + data.nombre);
            });
        })
        .catch((error) => {
            console.error("Error al obtener datos de la API: " + error);
        });
    });


