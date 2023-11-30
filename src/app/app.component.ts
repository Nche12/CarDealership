import { Component, OnDestroy, computed, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'CarDealership';

  collapsed = signal(false);

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');

  public subscription!: Subscription;
  public isMobile: boolean = false;
  public isTablet: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.subscription = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe((result: any) => {
        console.log("Result => ", result)
        let mobilePotriate = '(max-width: 599.98px) and (orientation: portrait)';
        let mobileLandscape = '(max-width: 959.98px) and (orientation: landscape)';
        let tabletPotriate = '(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)';
        let tabletLandscape = '(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)';

        this.isMobile = result.breakpoints[mobilePotriate] || result.breakpoints[mobileLandscape];
        this.isTablet = result.breakpoints[tabletPotriate] || result.breakpoints[tabletLandscape];
        this.collapsed = signal(result.matches);
        this.sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');
        console.log("is Mobile => ", this.isMobile)
        console.log("is Tablet => ", this.isTablet)
      })

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
