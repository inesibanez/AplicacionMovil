import { Curso } from "src/app/interfaces/curso";

export class MockCurso {
    lista = [
        { id: "1", nombre: "1º" },
        { id: "2", nombre: "2º" },
        { id: "3", nombre: "3º" },
        { id: "4", nombre: "4º" },
        { id: "5", nombre: "5º" },
        { id: "6", nombre: "6º" },
        { id: "3A", nombre: "3 AÑOS" },
        { id: "4A", nombre: "4 AÑOS" },
        { id: "5A", nombre: "5 AÑOS" }
    ] as Curso[];
}
