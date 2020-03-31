import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faQuestion, faTrashAlt, faHistory, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Types } from 'src/model/types.enum';
import { Movie } from 'src/model/movie';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss',
              './movies.alt.component.scss',
              './movies.medium.component.scss']
})
export class MoviesComponent implements OnInit {

  public Types = Types;

  @Input() public type: Types;
  @Input() public movies: Movie[];

  @Output() public movieMoved = new EventEmitter<{ idMovie: number, newType: Types }>();

  public titleLabel: string;
  public minimal: boolean;

  // Icons
  public unsetIcon = faQuestion;
  public ignoredIcon = faTrashAlt;
  public toseeIcon = faHistory;
  public seenIcon = faCheck;

  public selectedId: number | null;

  constructor() { }

  ngOnInit(): void {
    // Minimal
    this.minimal = this.type == Types.IGNORED || this.type == Types.SEEN;
    
    // TitleLabel
    switch (this.type) {
      case Types.UNSET: this.titleLabel = 'non classés'; break;
      case Types.IGNORED: this.titleLabel = 'ignorés'; break;
      case Types.TOSEE: this.titleLabel = 'à voir'; break;
      case Types.SEEN: this.titleLabel = 'vus'; break;
    }
  }

  public moveMovie(id: number, type: Types) {
    this.movies.splice(this.movies.findIndex(m => m.id === id), 1);
    this.movieMoved.emit({ idMovie: id, newType: type });
  }

  public toggle(id: number) {
    if (this.selectedId == id) {
      this.selectedId = null;
    } else {
      this.selectedId = id;
    }
  }

}
