document.addEventListener('DOMContentLoaded', () => {
    const mostrarCrearClienteFormBtn = document.getElementById('mostrarCrearClienteFormBtn');
    const crearClienteForm = document.getElementById('crearClienteForm');
    const editarClienteForm = document.getElementById('editarClienteForm');
    const listarClientesBtn = document.getElementById('listarClientesBtn');
    const listaClientes = document.getElementById('listaClientes');

    // Mostrar u ocultar el formulario de creación de cliente
    mostrarCrearClienteFormBtn.addEventListener('click', () => {
        crearClienteForm.classList.toggle('hidden');
    });

    // Crear un nuevo cliente
    crearClienteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(crearClienteForm);
        const data = {
            email: formData.get('email'),
            nombre: formData.get('nombre'),
            telefono: formData.get('telefono')
        };

        try {
            const response = await fetch('/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Error al crear el cliente');
            }

            const result = await response.json();
            alert('Cliente creado con éxito');
            crearClienteForm.reset();
            crearClienteForm.classList.add('hidden');
            listarClientes();
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Editar cliente
    editarClienteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(editarClienteForm);
        const clienteId = formData.get('editClienteId');
        const data = {
            email: formData.get('editEmail'),
            nombre: formData.get('editNombre'),
            telefono: formData.get('editTelefono')
        };

        try {
            const response = await fetch(`/clientes/${clienteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el cliente');
            }

            const result = await response.json();
            alert('Cliente editado con éxito');
            editarClienteForm.reset();
            editarClienteForm.classList.add('hidden');
            listarClientes();
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Listar todos los clientes
    listarClientesBtn.addEventListener('click', listarClientes);

    async function listarClientes() {
        try {
            const response = await fetch('/clientes');
            if (!response.ok) {
                throw new Error('Error al obtener la lista de clientes');
            }

            const clientes = await response.json();
            listaClientes.innerHTML = ''; // Limpiar la lista de clientes

            clientes.forEach(cliente => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>ID: ${cliente.cliente_id}, Nombre: ${cliente.nombre}, Email: ${cliente.email}, Teléfono: ${cliente.telefono}</span>
                    <div class="actions">
                        <button class="update" data-cliente-id="${cliente.cliente_id}" data-email="${cliente.email}" data-nombre="${cliente.nombre}" data-telefono="${cliente.telefono}">Actualizar</button>
                        <button class="delete" data-cliente-id="${cliente.cliente_id}">Eliminar</button>
                    </div>
                `;
                listaClientes.appendChild(li);
            });

            // Configurar eventos para botones de actualizar y eliminar
            document.querySelectorAll('.update').forEach(button => {
                button.addEventListener('click', (e) => {
                    const clienteId = e.target.getAttribute('data-cliente-id');
                    const email = e.target.getAttribute('data-email');
                    const nombre = e.target.getAttribute('data-nombre');
                    const telefono = e.target.getAttribute('data-telefono');

                    document.getElementById('editClienteId').value = clienteId;
                    document.getElementById('editEmail').value = email;
                    document.getElementById('editNombre').value = nombre;
                    document.getElementById('editTelefono').value = telefono;

                    editarClienteForm.classList.remove('hidden');
                });
            });

            document.querySelectorAll('.delete').forEach(button => {
                button.addEventListener('click', async (e) => {
                    const clienteId = e.target.getAttribute('data-cliente-id');

                    try {
                        const response = await fetch(`/clientes/${clienteId}`, {
                            method: 'DELETE'
                        });

                        if (!response.ok) {
                            throw new Error('Error al eliminar el cliente');
                        }

                        const result = await response.json();
                        alert('Cliente eliminado con éxito');
                        listarClientes();
                    } catch (error) {
                        console.error('Error:', error);
                    }
                });
            });

        } catch (error) {
            console.error('Error:', error);
        }
    }
});
