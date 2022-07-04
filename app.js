const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

const main = async () => {
  let opt = "";
  const tareas = new Tareas(); //Instancia de las tareas

  const tareasDB = leerDB();

  if (tareasDB) {
    // TODO: Cargar tareas
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    // Impirmir menu
    opt = await inquirerMenu();
    console.log({ opt });

    switch (opt) {
      case "1":
        // Crear opcion
        const desc = await leerInput("Descripcion: ");
        tareas.crearTarea(desc);
        break;

      case "2":
        tareas.listadoCompleto();
        break;

      case "3": //Listar completadas
        tareas.listarPendientesCompletadas(true);
        break;

      case "4": //Listar pendientes
        tareas.listarPendientesCompletadas(false);
        break;
        
      case "5": //Completado | Pendiente
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;


      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);

        if (id === "0") {
          const ok = await confirmar("Estas seguro?");

          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada");
          }
        }

        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");
};

main();
