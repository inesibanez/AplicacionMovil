import { Modalidad } from "src/app/interfaces/modalidad";

export class MockModalidad {
    lista = [
        { id: "AC", nombre: "ACADÉMICAS" },
        { id: "AP", nombre: "APLICADAS" },
        { id: "CN", nombre: "CIENCIAS NATURALES" },
        { id: "CS", nombre: "CIENCIAS SOCIALES" },
        { id: "O", nombre: "ORDINARIAS" }
    ] as Modalidad[];
}
