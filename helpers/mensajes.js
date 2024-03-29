require('colors');

const mostrarMenu = () => {

    return new Promise( resolve => {
        
        
        console.log(`${'1.'.green} Crear una tarea`)
        console.log(`${'2.'.green} Listar una tarea`)
        console.log(`${'3.'.green} Listar tareas completadas`)
        console.log(`${'4.'.green} Listar tareas pendientes `)
        console.log(`${'5.'.green} Completar una tarea`)
        console.log(`${'6.'.green} Borrar una tarea`)
        console.log(`${'0.'.green} Salir \n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Seleccione una opcion:', (opt)=>{
            readline.close();
            resolve(opt)
        });
        
    });

    
}

const pausa = () => {

    return new Promise(resolve => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione ${'ENTER'.green} para continuar\n`, (opt)=>{
            readline.close();
            resolve();
        })
    })
    
}

module.exports = {
    mostrarMenu,
    pausa
}