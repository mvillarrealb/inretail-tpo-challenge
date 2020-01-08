import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Client } from '../interfaces/client';
import { UpdateClientDto } from '../interfaces/update-client-dto';

@Injectable({
    providedIn: 'root'
})
export class ClientsService {
    constructor(private firestore: AngularFirestore) {}

    // crear cliente
    create(data: Client) {
        return this.firestore.collection('clients').add(data);
    }

    // Obtiene un cliente
    find(clientId: string) {
        return this.firestore
            .collection('clients')
            .doc(clientId)
            .snapshotChanges();
    }

    // Obtiene todos los cliente
    all() {
        return this.firestore
            .collection('clients')
            .snapshotChanges()
            .map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data();
                    const id = a.payload.doc.id;
                    return { id, ...data } as Client;
                });
            });
    }

    // Actualiza un cliente
    update(clientId: string, data: UpdateClientDto) {
        return this.firestore
            .collection('clients')
            .doc(clientId)
            .set(data);
    }

    // Actualiza un cliente
    delete(clientId: string) {
        return this.firestore
            .collection('clients')
            .doc(clientId)
            .delete();
    }
}
