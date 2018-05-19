export interface Receta{
    nombre:string,
    usuario:string,
    pasos:string,
    dificultad:string,
    img:string,
    ingredientes: Array<{}>,
    creado:Date
}