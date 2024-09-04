import { NivelEducativo } from "src/app/interfaces/nivel-educativo";

export class MockNivelEducativo {
    lista = [
        { id: "I", nombre: "INFANTIL" },
        { id: "P", nombre: "PRIMARIA" },
        { id: "E", nombre: "E.S.O." },
        { id: "B", nombre: "BACHILLERATO" }
    ] as NivelEducativo[];
}
