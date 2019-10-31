import { ApiService } from './../../services/api.service';
import { MatDialogRef, MatTableDataSource, MatPaginator, MatSort, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

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

  displayColumns: string[] = ['select', 'id', 'name', 'price', 'type'];

  tools: MatTableDataSource<Tool>;
  selection: SelectionModel<any> = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dialogRef: MatDialogRef<DialogToolsComponent>,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) private data: Tool[]
  ) { }

  ngOnInit(): void {
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

  applyFilter(filterValue: string): void {
    this.tools.filter = filterValue.trim().toLowerCase();

    if (this.tools.paginator) {
      this.tools.paginator.firstPage();
    }
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.tools.data.length;
    return numSelected === numRows;
  }

  toggle(): void {
    this.isAllSelected() ? this.selection.clear() : this.tools.data.forEach(response => this.selection.select(response));
  }

}
