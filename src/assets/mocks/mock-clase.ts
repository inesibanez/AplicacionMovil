import { Clase } from "src/app/interfaces/clase";

export class MockClase {
    lista = [
        { id: "1BCN", nombre: "1º de Bachiller de Ciencias", nivelEducativo: { id: "B", nombre: "Bachillerato" }, curso: { id: "1", nombre: "1º" }, modalidad: { id: "CN", nombre: "CIENCIAS NATURALES" } },
        { id: "1BCS", nombre: "1º de Bachiller de Ciencias Sociales", nivelEducativo: { id: "B", nombre: "Bachillerato" }, curso: { id: "1", nombre: "1º" }, modalidad: { id: "CS", nombre: "CIENCIAS SOCIALES" } },
        { id: "1E", nombre: "1º de E.S.O.", nivelEducativo: { id: "E", nombre: "E.S.O." }, curso: { id: "1", nombre: "1º" }, modalidad: { id: "O", nombre: "ORDINARIAS" } },
        { id: "1I", nombre: "1º de Infantil", nivelEducativo: { id: "I", nombre: "Infantil" }, curso: { id: "3A", nombre: "3 AÑOS" }, modalidad: { id: "O", nombre: "ORDINARIAS" } },
        { id: "1P", nombre: "1º de Primaria", nivelEducativo: { id: "P", nombre: "Primaria" }, curso: { id: "1", nombre: "1º" }, modalidad: { id: "O", nombre: "ORDINARIAS" } },
        { id: "2BCN", nombre: "2º de Bachiller de Ciencias", nivelEducativo: { id: "B", nombre: "Bachillerato" }, curso: { id: "2", nombre: "2º" }, modalidad: { id: "CN", nombre: "CIENCIAS NATURALES" } },
        { id: "2BCS", nombre: "2º de Bachiller de Ciencias Sociales", nivelEducativo: { id: "B", nombre: "Bachillerato" }, curso:{ id: "2", nombre: "2º" }, modalidad: { id: "CS", nombre: "CIENCIAS SOCIALES" } },
        { id: "2E", nombre: "2º de E.S.O.", nivelEducativo: { id: "E", nombre: "E.S.O." }, curso: { id: "2", nombre: "2º" }, modalidad: { id: "O", nombre: "ORDINARIAS" } },
        { id: "2I", nombre: "2º de Infantil", nivelEducativo: { id: "I", nombre: "Infantil" }, curso: { id: "4A", nombre: "4 AÑOS" }, modalidad: { id: "O", nombre: "ORDINARIAS" } },
        { id: "2P", nombre: "2º de Primaria", nivelEducativo: { id: "P", nombre: "Primaria" }, curso: { id: "2", nombre: "2º" }, modalidad: { id: "O", nombre: "ORDINARIAS" } },
        { id: "3EAC", nombre: "3º de E.S.O. (Académicas)", nivelEducativo: { id: "E", nombre: "E.S.O." }, curso: { id: "3", nombre: "3º" }, modalidad: { id: "AC", nombre: "ACADÉMICAS" } },
        { id: "3EAP", nombre: "3º de E.S.O. (Aplicadas)", nivelEducativo: { id: "E", nombre: "E.S.O." }, curso: { id: "3", nombre: "3º" }, modalidad: { id: "AP", nombre: "APLICADAS" } },
        { id: "3I", nombre: "3º de Infantil", nivelEducativo: { id: "I", nombre: "Infantil" }, curso: { id: "5A", nombre: "5 AÑOS" }, modalidad: { id: "O", nombre: "ORDINARIAS" } },
        { id: "3P", nombre: "3º de Primaria", nivelEducativo: { id: "P", nombre: "Primaria" }, curso: { id: "3", nombre: "3º" }, modalidad: { id: "O", nombre: "ORDINARIAS" } },
        { id: "4EAC", nombre: "4º de E.S.O. (Académicas)", nivelEducativo: { id: "E", nombre: "E.S.O." }, curso: { id: "4", nombre: "4º" }, modalidad: { id: "AC", nombre: "ACADÉMICAS" } },
        { id: "4EAP", nombre: "4º de E.S.O. (Aplicadas)", nivelEducativo: { id: "E", nombre: "E.S.O." }, curso: { id: "4", nombre: "4º" }, modalidad: { id: "AP", nombre: "APLICADAS" } },
        { id: "4P", nombre: "4º de Primaria", nivelEducativo: { id: "P", nombre: "Primaria" }, curso: { id: "4", nombre: "4º" }, modalidad: { id: "O", nombre: "ORDINARIAS" } },
        { id: "5P", nombre: "5º de Primaria", nivelEducativo: { id: "P", nombre: "Primaria" }, curso: { id: "5", nombre: "5º" }, modalidad: { id: "O", nombre: "ORDINARIAS" } },
        { id: "6P", nombre: "6º de Primaria", nivelEducativo: { id: "P", nombre: "Primaria" }, curso: { id: "6", nombre: "6º" }, modalidad: { id: "O", nombre: "ORDINARIAS" } }
    ] as Clase[];
}
