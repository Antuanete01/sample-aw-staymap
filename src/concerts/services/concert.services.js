import httpInstance from "../../shared/services/http.instance.js";
import { Concert } from '@/concerts/model/concert.entity';

export class ConcertService {
  resourceEndpoint = import.meta.env.VITE_CONCERTS_ENDPOINT_PATH || '/db.json';

  /**
   * Recupera todos los conciertos desde el archivo db.json
   * @returns {Promise<Array<Concert>>}
   */
  async getAll() {
    try {
      const response = await fetch(this.resourceEndpoint);
      const json = await response.json();

      if (!json.concerts || !Array.isArray(json.concerts.data)) {
        console.error('❌ Error: Estructura inválida en concerts.data');
        return [];
      }

      return json.concerts.data.map(c => new Concert(c));
    } catch (error) {
      console.error('❌ Error al obtener conciertos:', error);
      return [];
    }
  }

  /**
   * Recupera un concierto por ID desde el archivo local
   */
  async getById(id) {
    const concerts = await this.getAll();
    return concerts.find(c => c.id === id);
  }

  /**
   * Filtra conciertos por nombre del artista (lectura local)
   */
  async getByName(name) {
    const concerts = await this.getAll();
    return concerts.filter(c => c.artist?.[0]?.name.toLowerCase().includes(name.toLowerCase()));
  }
    /**
     * Creates a new category
     * @param {Object} resource - The category object to create
     * @param {string} resource.name - The name of the category
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to the created category
     */
    create(resource) {
        return httpInstance.post(this.resourceEndpoint, resource);
    }

    /**
     * Updates an existing category
     * @param {number|string} id - The ID of the category to update
     * @param {Object} resource - The updated category data
     * @param {string} resource.name - The updated name of the category
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to the updated category
     */
    update(id, resource) {
        return httpInstance.put(`${this.resourceEndpoint}/${id}`, resource);
    }

    /**
     * Deletes a category by its ID
     * @param {number|string} id - The ID of the category to delete
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves when the category is deleted
     */
    delete(id) {
        return httpInstance.delete(`${this.resourceEndpoint}/${id}`);
    }

    /**
     * Retrieves categories by name
     * @param {string} name - The name to search for
     * @returns {Promise<AxiosResponse<any>>} Promise that resolves to an array of matching categories
     */
  /*  getByName(name) {
        return httpInstance.get(`${this.resourceEndpoint}?name=${name}`);
    }*/
}
