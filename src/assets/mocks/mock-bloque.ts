import { Bloque } from "src/app/interfaces/bloque";

export class MockBloque {
    lista = [
        {id: "N", nombre: "NÚMEROS"},
        {id: "M", nombre: "MEDIDA"},
        {id: "G", nombre: "GEOMETRÍA"},
        {id: "A", nombre: "ÁLGEBRA"},
        {id: "F", nombre: "FUNCIONES"},
        {id: "E", nombre: "ESTADÍSTICA"},
        {id: "L", nombre: "HABILIDADES LÓGICAS"},
        {id: "AD", nombre: "RECURSOS ADAPTADOS"}
    ] as Bloque[];
}
