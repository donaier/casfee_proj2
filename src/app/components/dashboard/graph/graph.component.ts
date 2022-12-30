import { AfterViewInit, Component, ElementRef, Inject, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { fluxDispatcherToken } from 'src/app/shared/helpers/flux.configuration';
import { FluxStore } from 'src/app/shared/services/flux-store';
import { Account } from 'src/app/shared/types/account';
import { FluxAction } from 'src/app/shared/types/actions.type';
import { Category, CategoryGroup } from 'src/app/shared/types/category';
import { ListTransaction } from 'src/app/shared/types/transaction';
import { GraphService } from 'src/app/shared/helpers/graph.service';

import * as echarts from 'echarts';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() accounts: Account[] = []
  @Input() selectedTimes: string[] = []

  @ViewChild('graph') graphElement!: ElementRef

  private subscriptions: Subscription[] = [];

  allTransactions: ListTransaction[] = []
  allCategories: Category[] = []
  allCategoryGroups: CategoryGroup[] = []

  graph: echarts.ECharts | null = null

  activeMonths: Set<string> = new Set

  constructor(
    @Inject(fluxDispatcherToken) private dispatcher: Subject<FluxAction>,
    public store: FluxStore,
    private graphService: GraphService
  ) {}

  ngOnInit() {
    this.subscriptions.push(this.store.Categories.subscribe((data) => {
      if (data.length) {
        this.allCategories = data
      }
    }))
    this.subscriptions.push(this.store.CategoryGroups.subscribe((data) => {
      if (data.length) {
        this.allCategoryGroups = data
      }
    }))
  }

  ngAfterViewInit() {
    this.graph = echarts.init(this.graphElement.nativeElement)
  }

  ngOnChanges() {
    let chartOptions = this.graphService.composeOptions(this.allTransactions)

    this.graph?.setOption(chartOptions)
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {subscription.unsubscribe()})
  }
}
