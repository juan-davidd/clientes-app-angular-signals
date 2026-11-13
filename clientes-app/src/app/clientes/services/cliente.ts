import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cliente } from '../model/cliente';
import { Region } from '../model/region';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/cliente-service/clientes';
  private _clientes = signal<Cliente[]>([]);
  readonly clientes = this._clientes.asReadonly();
  readonly totalClientes = computed(() => this._clientes().length);

  cargarClientes(): void {
    this.http.get<Cliente[]>(this.apiUrl)
      .subscribe(clientes => this._clientes.set(clientes));
  }

  getCliente(id: number) {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  createCliente(cliente: Cliente) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Cliente>(this.apiUrl, cliente, { headers });
  }

  updateCliente(cliente: Cliente) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Cliente>(`${this.apiUrl}/${cliente.id}`, cliente, { headers });
  }

  deleteCliente(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getRegiones() {
    return this.http.get<Region[]>(`${this.apiUrl}/regiones`);
  }
}