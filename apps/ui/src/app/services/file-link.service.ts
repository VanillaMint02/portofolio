import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {FileLinkMode} from "../utils/file-link.mode";
import {catchError, Observable} from "rxjs";
import {FileLink} from "../types/file-link";
import {environment} from "../environments/environment.development";
import {apiPaths} from "../utils/api.paths";
import {handleError} from "../utils/handle-error";

@Injectable()
export class FileLinkService {
  constructor(private httpClient: HttpClient) {
  }

  getImageGalleryOrLogoByPortfolioId(portfolioId: string, mode: FileLinkMode): Observable<FileLink | FileLink[]> {
    return this.httpClient.get<FileLink | FileLink[]>(`${environment}/${apiPaths.FILE_LINK_PORTFOLIO_ID}/${portfolioId}/${apiPaths.MODE}/${mode}`)
      .pipe(catchError(handleError));
  }

  postImage(fileLink: FileLink): Observable<FileLink> {
    return this.httpClient.post<FileLink>(`${environment}/${apiPaths.FILE_LINK}`, fileLink)
      .pipe(catchError(handleError));
  }

  deleteImage(objectKey: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment}/${apiPaths.FILE_LINK_OBJECT_KEY}/${objectKey}`)
      .pipe(catchError(handleError));
  }
}
