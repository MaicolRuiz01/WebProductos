// eliminarProducto.js

document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://siaweb-nodejs.carlos-reneren7.repl.co/productos";

    // Función para eliminar un producto por descripción
    function eliminarProductoPorDescripcion(descripcion) {
        // Buscar el producto por descripción
        fetch(apiUrl + `?descripcion=${encodeURIComponent(descripcion)}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo encontrar el producto.");
                }
                return response.json();
            })
            .then((data) => {
                if (data.length > 0) {
                    const productId = data[0].id;
                    // Una vez encontrado, eliminar el producto por ID
                    eliminarProducto(productId);
                } else {
                    console.error("No se encontró ningún producto con la descripción proporcionada.");
                }
            })
            .catch((error) => {
                console.error("Error al buscar el producto: " + error);
            });
    }

    // Función para eliminar un producto por ID
    function eliminarProducto(id) {
        fetch(apiUrl + "/" + id, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo eliminar el producto.");
                }
                return response.json();
            })
            .then((data) => {
                // Actualizar la tabla después de eliminar el producto
                const filaEliminada = $(this).parents("tr"); // Obtener la fila del botón eliminado
                table.row(filaEliminada).remove().draw(false);
            })
            .catch((error) => {
                console.error("Error al eliminar el producto: " + error);
            });
    }

    // Agregar evento para los botones
    $("#productos-table").on("click", ".eliminar-btn", function () {
        const data = table.row($(this).parents("tr")).data();
        const descripcion = data.descripcion; // Obtener la descripción del producto
        if (confirm("¿Seguro que quieres eliminar este producto?")) {
            eliminarProductoPorDescripcion(descripcion);
        }
    });
});
