import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Fondamentale per il form
import { Gruppo, MockDataService, MembroGruppo } from '../../../services/mock-data-service';

@Component({
  selector: 'app-gruppi-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gruppi-list.html',
  styleUrl: './gruppi-list.css',
})
export class GruppiList implements OnInit {
  groups: Gruppo[] = [];
  areas: string[] = [];
  filterArea: string = 'All';
  
  // Stati della visualizzazione
  selectedGroup: Gruppo | null = null;
  isCreateModalOpen: boolean = false;

  // Modello per il nuovo gruppo
  newGroup = {
    nome: '',
    area: 'Giochi',
    descrizione: '',
    immagine: 'https://picsum.photos/seed/newgroup/800/400'
  };

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.groups = this.mockDataService.gruppi;
    this.areas = ['All', ...new Set(this.groups.map((g) => g.area))];
  }

  get filteredGroups() {
    return this.filterArea === 'All' 
      ? this.groups 
      : this.groups.filter(g => g.area === this.filterArea);
  }

  joinGroup(event: Event, group: Gruppo) {
    event.stopPropagation(); // Evita di aprire il dettaglio al click sul tasto
    group.membri++;
    alert(`You have successfully joined ${group.nome}!`);
  }

  createGroup() {
    if (this.newGroup.nome && this.newGroup.descrizione) {
      const groupToAdd: Gruppo = {
        id: Date.now(),
        nome: this.newGroup.nome,
        area: this.newGroup.area,
        descrizione: this.newGroup.descrizione,
        membri: 1,
        immagine: this.newGroup.immagine,
        membri_lista: [{ id: 99, nome: 'You', avatar: 'https://i.pravatar.cc/150?img=11', ruolo: 'Admin' }]
      };

      this.groups.unshift(groupToAdd);
      this.closeModal();
    }
  }

  selectGroup(g: Gruppo) { this.selectedGroup = g; }
  backToList() { this.selectedGroup = null; }
  openModal() { this.isCreateModalOpen = true; }
  closeModal() { 
    this.isCreateModalOpen = false; 
    this.newGroup = { nome: '', area: 'Giochi', descrizione: '', immagine: 'https://picsum.photos/seed/newgroup/800/400' };
  }
}
