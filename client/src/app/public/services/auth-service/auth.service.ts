import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthRes } from 'src/app/models/auth-res.interface';
import { User } from 'src/app/models/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  login(user: User): Observable<AuthRes> {
    return this.http.post<AuthRes>(`${environment.baseUrl}/auth/signin`, user).pipe(
      tap((res: AuthRes) => localStorage.setItem('token', res.accessToken)),
      tap(() => this.snackBar.open(`Login Successfully`, 'close',{
        duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
      }),
      catchError(e => {
        this.snackBar.open(`Pleas Check Your Credentials`, 'Close', {
          duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
        })
        return throwError(e);
      })
    ));
  }
}
