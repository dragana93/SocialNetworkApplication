import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account.service';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);

  return accountService.currentUser$.pipe(
    map(user => {
      if(!user) return false; 
      if(user.roles.includes('Admin') || user.roles.includes('Moderator')){
        return true;
      }else{
        toastr.error("You cannot enter this area");
        return false;
      }
     
    })
  )
};

