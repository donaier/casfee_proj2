import { AfterViewInit, Component, ElementRef, Inject, Input, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { fluxDispatcherToken } from 'src/app/shared/helpers/flux.configuration';
import { FluxStore } from 'src/app/shared/services/flux-store';
import { Account } from 'src/app/shared/types/account';
import { FluxAction } from 'src/app/shared/types/actions.type';
import { GraphService } from 'src/app/shared/helpers/graph.service';

import * as echarts from 'echarts';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() accounts: Account[] = []
  @Input() selectedTimes: string[] = []

  @ViewChild('graph') graphElement!: ElementRef
  @ViewChild('inout') inoutElement!: ElementRef

  private subscriptions: Subscription[] = [];

  graph: echarts.ECharts | null = null
  inout: echarts.ECharts | null = null

  activeMonths: Set<string> = new Set

  constructor(
    @Inject(fluxDispatcherToken) private dispatcher: Subject<FluxAction>,
    public store: FluxStore,
    private graphService: GraphService
  ) {}

  ngAfterViewInit() {
    this.graph = echarts.init(this.graphElement.nativeElement)
    this.inout = echarts.init(this.inoutElement.nativeElement)
  }

  ngOnChanges() {
    let graphOptions = this.graphService.composeOptionsTotal(this.accounts, this.selectedTimes)
    let inoutOptions = this.graphService.composeOptionsInOut(this.accounts, this.selectedTimes)

    this.graph?.setOption(graphOptions, true)
    this.inout?.setOption(inoutOptions, true)
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {subscription.unsubscribe()})
  }
}