import { Concert } from '@/concerts/model/concert.entity';

export class ConcertService {
  // En producción, debe ser '/db.json'
  resourceEndpoint = import.meta.env.VITE_CONCERTS_ENDPOINT_PATH || '/db.json';

  async getAll() {
    try {
      const response = await fetch(this.resourceEndpoint);

      if (!response.ok) {
        throw new Error(`❌ No se pudo cargar el archivo JSON: ${response.status}`);
      }

      const json = await response.json();

      if (!json.concerts || !Array.isArray(json.concerts.data)) {
        console.error('❌ Estructura inválida: json.concerts.data');
        return [];
      }

      return json.concerts.data.map(c => new Concert(c));
    } catch (error) {
      console.error('❌ Error al cargar conciertos:', error);
      return [];
    }
  }

  async getById(id) {
    const concerts = await this.getAll();
    return concerts.find(c => c.id === id);
  }

  async getByName(name) {
    const concerts = await this.getAll();
    return concerts.filter(c =>
      c.artist?.[0]?.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  create() {
    console.warn('⚠️ Método no implementado para archivo JSON local.');
    return Promise.reject('Método no implementado.');
  }

  update() {
    console.warn('⚠️ Método no implementado para archivo JSON local.');
    return Promise.reject('Método no implementado.');
  }

  delete() {
    console.warn('⚠️ Método no implementado para archivo JSON local.');
    return Promise.reject('Método no implementado.');
  }
}
