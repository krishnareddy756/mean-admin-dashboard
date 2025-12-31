import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  cols: string[] = ['name', 'email', 'role', 'status', 'actions'];
  data!: MatTableDataSource<any>;
  loading = false;
  search = '';

  @ViewChild(MatPaginator) paginat!: MatPaginator;
  @ViewChild(MatSort) srt!: MatSort;

  constructor(private usrSvc: UserService) {}

  ngOnInit(): void {
    this.load();
  }

  // LOAD ALL USERS
  load(): void {
    this.loading = true;
    this.usrSvc.getAll().subscribe(
      (users) => {
        this.data = new MatTableDataSource(users);
        this.data.paginator = this.paginat;
        this.data.sort = this.srt;
        // FILTER PREDICATE
        this.data.filterPredicate = (row: any, filter: string) => {
          const str = (row.name + ' ' + row.email).toLowerCase();
          return str.includes(filter);
        };
        this.loading = false;
      },
      (err) => {
        console.error('Error:', err);
        this.loading = false;
      }
    );
  }

  // APPLY SEARCH FILTER
  filter(): void {
    if (this.data) {
      this.data.filter = this.search.trim().toLowerCase();
    }
  }

  // EDIT USER
  edit(usr: any): void {
    const nm = prompt('Name:', usr.name);
    if (!nm) return;
    
    const em = prompt('Email:', usr.email);
    if (!em) return;
    
    const rl = prompt('Role (Admin/User):', usr.role);
    if (!rl || !['Admin', 'User'].includes(rl)) return;

    this.usrSvc.update(usr._id, { name: nm, email: em, role: rl }).subscribe(
      () => {
        this.load();
        alert('Updated');
      },
      () => alert('Error updating user')
    );
  }

  // TOGGLE STATUS
  toggleStatus(usr: any): void {
    const st = usr.status === 'Active' ? 'Inactive' : 'Active';
    this.usrSvc.toggleStatus(usr._id, st).subscribe(
      () => {
        this.load();
        alert(`User ${st}`);
      },
      () => alert('Error updating')
    );
  }

  // DELETE USER
  delete(usr: any): void {
    if (confirm(`Delete ${usr.name}?`)) {
      this.usrSvc.delete(usr._id).subscribe(
        () => {
          this.load();
          alert('Deleted');
        },
        () => alert('Error deleting')
      );
    }
  }

  // EXPORT CSV
  exportCSV(): void {
    if (!this.data || !this.data.data.length) {
      alert('No users');
      return;
    }
    const csv = this.toCSV(this.data.filteredData || this.data.data);
    this.download(csv, 'users.csv');
  }

  // CONVERT TO CSV FORMAT
  private toCSV(rows: any[]): string {
    if (!rows || !rows.length) {
      return 'Name,Email,Role,Status\n';
    }
    const headers = ['Name', 'Email', 'Role', 'Status'];
    const mapped = rows.map((r) => [r.name || '', r.email || '', r.role || '', r.status || '']);
    return [headers, ...mapped].map((row) => row.map((c) => `"${c}"`).join(',')).join('\n');
  }

  // DOWNLOAD CSV FILE
  private download(content: string, fname: string): void {
    const blob = new Blob([content], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fname;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
