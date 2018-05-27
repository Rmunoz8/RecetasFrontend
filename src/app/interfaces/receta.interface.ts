export interface Receta{
    _id:string,
    nombre:string,
    usuario:string,
    pasos:string,
    dificultad:string,
    img:string,
    ingredientes: Array<{}>,
    creado:Date,
    nick:string
}