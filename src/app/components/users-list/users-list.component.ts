import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { UserVO } from '../../model/user-vo';
import { ServerconnectorService } from '../../service/serverconnector.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-users-list',
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    CommonModule],
  providers: [DatePipe]
})
export class UsersListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'ppsNumber', 'dob', 'mobile'];
  dataSource = new MatTableDataSource<UserVO>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private serverconnector: ServerconnectorService) {
    this.serverconnector.get('getAll').subscribe((data: UserVO[]) => {
      if (data?.length > 0) {
        this.dataSource = new MatTableDataSource<UserVO>(data);
      }

    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
