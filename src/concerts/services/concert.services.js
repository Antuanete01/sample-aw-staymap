import { Concert } from '@/concerts/model/concert.entity';

export class ConcertService {
  /**
   * Recupera todos los conciertos desde el archivo local db.json
   * @returns {Promise<Array<Concert>>}
   */
  async getAll() {
    const response = await fetch('/src/assets/db.json');
    const json = await response.json();
    return json.concerts.data.map(c => new Concert(c));
  }

  /**
   * NO IMPLEMENTADO: Crear concierto (no funciona con archivo local)
   */
  create() {
    console.warn('create() no está disponible en modo estático (archivo JSON local).');
    return Promise.reject('Método no implementado.');
  }

  /**
   * NO IMPLEMENTADO: Actualizar concierto (no funciona con archivo local)
   */
  update() {
    console.warn('update() no está disponible en modo estático (archivo JSON local).');
    return Promise.reject('Método no implementado.');
  }

  /**
   * NO IMPLEMENTADO: Eliminar concierto (no funciona con archivo local)
   */
  delete() {
    console.warn('delete() no está disponible en modo estático (archivo JSON local).');
    return Promise.reject('Método no implementado.');
  }

  /**
   * Recuperar por ID (solo lectura local del JSON)
   */
  async getById(id) {
    const concerts = await this.getAll();
    return concerts.find(c => c.id === id);
  }

  /**
   * Filtrar por nombre
   */
  async getByName(name) {
    const concerts = await this.getAll();
    return concerts.filter(c => c.artistName.toLowerCase().includes(name.toLowerCase()));
  }
}
