import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio encargado de gestionar el almacenamiento local de recursos favoritos, realizados y vistos por el usuario.
 * La clave (key) es el identificador del recurso, y el valor (value) puede ser:
 * - "fav": Marcado como favorito.
 * - "done": Marcado como realizado.
 * - "favdone": Marcado como favorito y realizado.
 * - "visto": Marcado como visto.
 */
export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  /**
   * Inicializa el almacenamiento local.
   */
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  /**
   * Marca un recurso como favorito. Si ya está marcado como realizado, se actualiza a "favdone".
   * @param {string} clave - La clave del recurso a marcar.
   * @returns {Promise<string[]>} Promesa que resuelve con la lista actualizada de recursos favoritos.
   */
  public async marcarFavorito(clave: string): Promise<string[]> {
    const valor = await this._storage.get(clave);
    if (valor == "done") {
      await this._storage?.set(clave, "favdone");
    } else {
      await this._storage?.set(clave, "fav");
    }
    return this.devuelveFavoritos();
  }

  /**
   * Marca un recurso como realizado. Si ya está marcado como favorito, se actualiza a "favdone".
   * @param {string} clave - La clave del recurso a marcar.
   * @returns {Promise<string[]>} Promesa que resuelve con la lista actualizada de recursos realizados.
   */
  public async marcarRealizado(clave: string): Promise<string[]> {
    const valor = await this._storage.get(clave);
    if (valor == "fav") {
      await this._storage?.set(clave, "favdone");
    } else {
      await this._storage?.set(clave, "done");
    }
    return this.devuelveHechos();
  }

  /**
   * Marca un recurso como visto.
   * @param {string} clave - La clave del recurso a marcar.
   * @returns {Promise<string[]>} Promesa que resuelve con la lista actualizada de recursos vistos.
   */
  public async marcarVisto(clave: string): Promise<string[]> {
    await this._storage?.set(clave, "visto");
    return this.devuelveVistos();
  }

  /**
   * Desmarca un recurso como favorito. Si está marcado como "favdone", se actualiza a "done".
   * @param {string} clave - La clave del recurso a desmarcar.
   * @returns {Promise<string[]>} Promesa que resuelve con la lista actualizada de recursos favoritos.
   */
  public async desmarcarFavorito(clave: string): Promise<string[]> {
    const valor = await this._storage.get(clave);
    if (valor == "fav") {
      await this._storage.remove(clave);
    } else {
      await this._storage?.set(clave, "done");
    }
    return this.devuelveFavoritos();
  }

  /**
   * Desmarca un recurso como realizado. Si está marcado como "favdone", se actualiza a "fav".
   * @param {string} clave - La clave del recurso a desmarcar.
   * @returns {Promise<string[]>} Promesa que resuelve con la lista actualizada de recursos realizados.
   */
  public async desmarcarRealizado(clave: string): Promise<string[]> {
    const valor = await this._storage.get(clave);
    if (valor == "done") {
      await this._storage.remove(clave);
    } else {
      await this._storage?.set(clave, "fav");
    }
    return this.devuelveHechos();
  }

  /**
   * Desmarca un recurso como visto.
   * @param {string} clave - La clave del recurso a desmarcar.
   * @returns {Promise<string[]>} Promesa que resuelve con la lista actualizada de recursos vistos.
   */
  public async desmarcarVisto(clave: string): Promise<string[]> {
    await this._storage.remove(clave);
    return this.devuelveVistos();
  }

  /**
   * Devuelve la lista de recursos marcados como favoritos.
   * @returns {Promise<string[]>} Promesa que resuelve con la lista de claves de los recursos favoritos.
   */
  public async devuelveFavoritos(): Promise<string[]> {
    let lista = [] as string[];
    if (this._storage != null) {
      await this._storage.forEach((value, key) => {
        if (value == "fav" || value == "favdone") {
          lista.push(key);
        }
      });
    }
    return lista;
  }

  /**
   * Devuelve la lista de recursos marcados como realizados.
   * @returns {Promise<string[]>} Promesa que resuelve con la lista de claves de los recursos realizados.
   */
  public async devuelveHechos(): Promise<string[]> {
    let lista = [] as string[];
    if (this._storage != null) {
      await this._storage.forEach((value, key) => {
        if (value == "done" || value == "favdone") {
          lista.push(key);
        }
      });
    }
    return lista;
  }

  /**
   * Devuelve la lista de todos los recursos vistos.
   * @returns {Promise<string[]>} Promesa que resuelve con la lista de claves de todos los recursos vistos.
   */
  public async devuelveVistos(): Promise<string[]> {
    let lista = [] as string[];
    if (this._storage != null) {
      lista = await this._storage.keys();
    }
    return lista;
  }

  /**
   * Devuelve la información almacenada de un recurso específico.
   * @param {string} clave - La clave del recurso.
   * @returns {Promise<string>} Promesa que resuelve con la información almacenada del recurso.
   */
  public async devuelveInfo(clave: string): Promise<string> {
    const valor = await this._storage.get(clave);
    return valor;
  }

}
