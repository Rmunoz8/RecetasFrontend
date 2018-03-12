import { Injectable } from '@angular/core';

@Injectable()
export class RecetaService {

  private recetas: Receta[]=[
    {
      usuario: "Rubén",
      nombre: "Tortilla de patatas",
      pasos: `Pela las patatas y pícalas en rodajas o gajos no muy delgados.
              Pica la cebolla en julianas.
              Caliente una sartén antiadherente grande, donde quepan todos tus ingredientes con abundante aceite de oliva.
              Echa las patatas y cocínalas a fuego medio durante 5 minutos.A continuación agrega las cebollas.Baja el fuego un poquito más y ponle la tapa.Cocina todo junto por media hora, revolviendo de vez en cuando, hasta que la patata esté suave y ligeramente dorada.
              La cebolla debería estar transparente, casi amarilla, pero no de color marrón.
              Saca la mezcla de patatas y cebolla y ponla en un recipiente plástico grande.
              En este momento vas a agregarle la sal a tu gusto y vas a revolver para que se distribuya uniformemente.
              Pica todos los huevos en otro recipiente plástico más pequeño y bátelos bien.
              A continuación echa los huevos junto a las patatas y la cebolla y revuelve todo.
              Ahora vas a terminar de hacer la tortilla.Lo que necesitas es que la mezcla cuaje y coja la apariencia correspondiente, mira las fotos.
              En la misma sartén que usaste para freír los ingredientes pon un chorro de aceite de oliva y echa la mezcla.Deja cocinar durante 1 minuto.
              A continuación voltea la tortilla.Ayúdate con la tapa de la sartén o con un plato grande, de manera que simplemente le des la vuelta a la sartén, sobre la tapa y luego empujes cuidadosamente la tortilla de vuelta al sartén para que se cocine por el otro lado.
              Deja que se cuaje la tortilla por 1 minuto más.
              Ahora simplemente apaga el fuego y retira con cuidado tu tortilla de patatas de la sartén.Puedes ponerla en un plato grande, en una bandeja o en una tabla de madera.`,
      img:"assets/img/tortilla.jpg",
    },
    {
      usuario: "Andrea",
      nombre: "Lentejas",
      pasos: `Fríe las rodajas de chorizo (sin aceite, ya soltará el chorizo grasa suficiente) a fuego medio en una cazuela durante unos minutos, hasta que se empiecen a dorar, pero ten cuidado de no quemarlo.
              Pela y pica la cebolla en dados pequeños. Agrégalo al chorizo y deja que se poche durante unos minutos, hasta que empiece a ablandarse.
              Pela y pica la zanahoria en dados pequeños e incorpórala también, remueve y deja que se poche otros 5 minutos.
              Pela y pica las patatas y el ajo, añádelos a la mezcla, junto con la guindilla y las hojas de laurel, deja que se poche todo 5 minutos más, removiendo de vez en cuando para que no se pegue.
              Agrega el caldo y el pimentón, y salpimenta la mezcla. Llévalo a ebullición, reduce el fuego y deja que cueza a fuego medio durante 20 minutos.
              Mientras tanto, escurre las lentejas y enjuágalas con abundante agua. Después de los 20 minutos, añádelas a la cazuela, remueve todo y deja que se cueza todo durante 5 minutos más.
              Apaga el fuego y deja que repose durante unos minutos. Sirve las lentejas en platos individuales con un as hojas de perejil picado por encima.`,
      img:"assets/img/lentejas.jpg",
    },
    {
      usuario: "Adrian",
      nombre: "Paella de Marisco",
      pasos: `Empezamos haciendo el sofrito. Para ello, freímos la cebolla bien picada en el aceite caliente. Removemos la cebolla con una cuchara de madera frecuentemente, para que no se queme, y lo dejamos hasta que comience a tomar color.

              En ese momento, añadimos el ajo bien picado y, antes de que empiece a tomar color, incorporamos los tomates también picados.

              Agregamos el azúcar (para neutralizar la acidez del tomate), sal a nuestro gusto, el pimentón y unas hebras de azafrán. Revolvemos todos los ingredientes y dejamos que se sofrían hasta que los tomates se reduzcan y comiencen a chisporrotear.

              Es el momento de cortar los calamares ya limpios. El cuerpo lo cortamos en aros y las patas las dejamos enteras. Añadimos el calamar y lo dejamos cocinar durante unos minutos.

              Incorporamos el arroz y lo distribuimos por toda la paellera para que los granos se adhieran a los ingredientes. Calentamos el caldo junto con el vino en un cazo aparte, y cuando esté caliente lo vertemos en la paella.

              Aumentamos la temperatura y añadimos más sal. Volvemos a remover todo para que el arroz quede bien cubierto por el caldo, y cuando llegue a ebullición, bajamos la temperatura y dejamos que se cueza todo a fuego lento de 18 a 20 minutos.

              Es importante que durante la cocción vayamos moviendo la paellera por toda la superficie de cocción, para que el arroz se cueza uniformemente.

              Tras 10 minutos de cocción, incorporamos las gambas cocidas por encima hasta que se pongan de color rosa, luego le damos la vuelta para que se hagan por el otro lado.

              Si vemos que se necesita porque está muy seco, vertemos un poco más de caldo hacia el final de la cocción. Tras los 20 minutos, probamos el arroz y si está bien hecho apagamos el fuego y cubrimos la paellera con un trapo o papel de aluminio para que repose.

              Cocemos los mejillones al vapor con un dedo de agua en una cazuela con la tapa puesta, y cuando se abran, los colocamos por encima de la paella (desechamos los que no se abran).`,
      img:"assets/img/paella.jpg",
    },
    {
      usuario: "Rubén",
      nombre: "Macarrones al Horno",
      pasos: `1
Para hacer este plato de macarrones al horno, empezaremos por cocinar la pasta. Para ello, ponemos agua a hervir en una cazuela, añadimos los macarrones y cocemos hasta que estén al dente, hechos pero no excesivamente blandos.

Los vertemos en un escurridor y reservamos.

2
Mientras tanto, cocinamos la masa de chorizo. En una sartén amplia ponemos dicha masa y la vamos friendo. No hace falta añadir aceite, será suficiente con la grasa que vaya soltando al calor.

La masa del chorizo la venden en algunos supermercados y también en algunas carnicerías. Si no la encontráis podéis comprar chorizo fresco, abrir la tripa y sacar la masa.

Truco: Si la masa del chorizo soltase demasiada grasa una vez frita la escurrimos y la volvemos a poner en la sartén.

3
Cuando la carne del chorizo esté hecha, añadimos los macarrones, removemos bien y vertemos el tomate frito.

En este punto sazonamos con un poco de pimienta y pimentón, rectificamos de sal a nuestro gusto y removemos bien. Mantenemos todo al fuego durante unos minutos más.

4
A continuación vertemos la mezcla de pasta con chorizo en una fuente apta para el horno, ponemos queso rallado repartido por toda la superficie e introducimos en el horno precalentado a 180 ºC hasta que el queso esté fundido.

5
Pasados unos 5 minutos ya estará listo este rico plato de macarrones gratinados con chorizo y ¡ya sólo queda disfrutar de este delicioso y sencillo plato de pasta!`,
      img: "assets/img/macarrones.jpg",
    }
  ]
  constructor() {
    console.log("Servicio listo");
    
   }

   getRecetas():Receta[]{
     return this.recetas;
   }

   getReceta(i:string){
     return this.recetas[i];
   }

}

export interface Receta{
  nombre:string;
  usuario:string;
  pasos:string;
  img:string;
}
