import { catchError, Observable } from 'rxjs';
import { PortfolioEntry } from '../types/portfolio-entry';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { apiPaths } from '../utils/api.paths';
import { handleError } from '../utils/handle-error';

@Injectable({
  providedIn: 'root',
})
export class PortfolioEntryService {
  constructor(private httpClient: HttpClient) {}

  getOneById(id: string): Observable<PortfolioEntry> {
    return this.httpClient
      .get<PortfolioEntry>(
        `${environment.apiUrl}${apiPaths.PORTFOLIO_ENTRY_ID}/${id}`,
      )
      .pipe(catchError(handleError));
  }

  getAllPublished(): Observable<PortfolioEntry[]> {
    return this.httpClient
      .get<PortfolioEntry[]>(
        `${environment.apiUrl}${apiPaths.PORTFOLIO_ENTRY_PUBLISHED}`,
      )
      .pipe(catchError(handleError));
  }

  getAll(): Observable<PortfolioEntry[]> {
    return this.httpClient
      .get<PortfolioEntry[]>(`${environment.apiUrl}${apiPaths.PORTFOLIO_ENTRY}`)
      .pipe(catchError(handleError));
  }

  createPortfolioEntry(
    portfolioEntry: PortfolioEntry,
  ): Observable<PortfolioEntry> {
    return this.httpClient
      .post<PortfolioEntry>(
        `${environment.apiUrl}${apiPaths.PORTFOLIO_ENTRY}`,
        portfolioEntry,
      )
      .pipe(catchError(handleError));
  }

  putPortfolioEntry(
    portfolioEntry: PortfolioEntry,
  ): Observable<PortfolioEntry> {
    return this.httpClient
      .put<PortfolioEntry>(
        `${environment.apiUrl}${apiPaths.PORTFOLIO_ENTRY}`,
        portfolioEntry,
      )
      .pipe(catchError(handleError));
  }

  delete(id: string): Observable<void> {
    return this.httpClient
      .delete<void>(
        `${environment.apiUrl}${apiPaths.PORTFOLIO_ENTRY_PUBLISHED}`,
      )
      .pipe(catchError(handleError));
  }
}
