import { ApiService } from './../../services/api.service';
import { MatDialogRef, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';

export interface Tool {
  id: number;
  name: string;
  price: number;
  type: {
    id: number;
    type: string;
  }
}

@Component({
  selector: 'app-dialog-tools',
  templateUrl: './dialog-tools.component.html',
  styleUrls: ['./dialog-tools.component.sass']
})
export class DialogToolsComponent implements OnInit {

  tools: MatTableDataSource<Tool>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dialogRef: MatDialogRef<DialogToolsComponent>,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.getTools();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getTools(): void {
    this.api.getTools().subscribe(response => {
      this.tools = new MatTableDataSource(response);
      this.tools.paginator = this.paginator;
      this.tools.sortingDataAccessor = (item, property): string | number => {
        switch (property) {
          case "type": {
            return item.type.type;
          }
          default: {
            return item[property];
          }
        }
      }
      this.tools.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    this.tools.filter = filterValue.trim().toLowerCase();

    if (this.tools.paginator) {
      this.tools.paginator.firstPage();
    }
  }
}
