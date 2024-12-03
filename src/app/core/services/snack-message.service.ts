import { Injectable, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class SnackMessageService {
  private snackBar = inject(MatSnackBar);

  durationInMiliseconds = 15000; // For Snackbar

  success(message: string) {
    this.snackBar.open(message, "close", {
      duration: this.durationInMiliseconds,
      panelClass: ["success-snackbar"],
    });
  }

  error(message: string) {
    this.snackBar.open(message, "close", {
      duration: this.durationInMiliseconds,
      panelClass: ["error-snackbar"],
    });
  }
}
