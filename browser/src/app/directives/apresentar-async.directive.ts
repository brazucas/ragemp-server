import { ChangeDetectorRef, Directive, Host, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { shareLast } from '../../util/rx';
import { IncluindoStatus, incluirStatus } from './incluir-status';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';

/**
 * Monitora um Observable, para apresentar seus vários estados possíveis.
 *
 * @example
 * ```html
 *  <ng-container [apresentarAsync]="observable">
 *    <div *casoResultado="let resultado">{{resultado}}</div>
 *    <div *casoCarregando>Carregando...</div>
 *    <div *casoErro="let erro">Erro!</div>
 *  </ng-container>
 * ```
 */
@Directive({
  selector: '[apresentarAsync]',
})
export class ApresentarAsyncDirective<T> {
  input$ = new BehaviorSubject<Observable<T> | undefined>(undefined);
  /** Valores do Observable de entrada, com informação de status */
  comStatus = this.input$.pipe(
    switchMap(obs => obs ? obs.pipe(incluirStatus()) : of<IncluindoStatus<T>>({carregando: false})),
    shareLast(),
  );

  @Input() set apresentarAsync(observable: Observable<T>) {
    this.input$.next(observable);
  }
}

/**
 * Bloco apresentado quando o Observable emitiu ao menos um `next()`.
 *
 * É possível saber se o Observable ainda não terminou de carregar através da
 * variável `carregando`.
 *
 * @example
 * ```html
 *  <ng-container [apresentarAsync]="infoAsync">
 *    <ng-container *casoConteudo="let info, carregando = carregando">
 *      <h1>
 *        Info
 *        <ion-spinner *ngIf="carregando"></ion-spinner>
 *      </h1>
 *      {{info|json}}
 *    </ng-container>
 *    ...
 *  </ng-container>
 * ```
 */
@Directive({
  selector: '[casoResultado]',
})
export class CasoResultadoDirective<T> {
  private subscription: Subscription;
  private context?: CasoResultadoContext<T>;

  constructor(
    @Host() private apresentarAsync: ApresentarAsyncDirective<T>,
    private cd: ChangeDetectorRef,
    private templateRef: TemplateRef<CasoResultadoContext<T>>,
    private viewContainer: ViewContainerRef,
  ) {}

  ngOnInit() {
    this.subscription = this.apresentarAsync.comStatus.pipe(
      distinctUntilChanged((x: any, y: any) => x.resultado === y.resultado && x.carregando === y.carregando),
    ).subscribe(x => {
      if (x.resultado === undefined && this.context) {
        this.viewContainer.clear();
        this.context = undefined;
      } else if (x.resultado !== undefined) {

        if (!this.context) {
          this.context = {
            $implicit: x.resultado,
            carregando: x.carregando,
          };
          this.viewContainer.createEmbeddedView(this.templateRef, this.context);
        } else {
          this.context.$implicit = x.resultado;
          this.context.carregando = x.carregando;
        }

        this.cd.markForCheck();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

interface CasoResultadoContext<T> {
  /** Valor emitido pelo `next()` */
  $implicit: T;
  /** `true` caso o Observable ainda não tenha notificado `complete()` */
  carregando: boolean;
}


/**
 * Bloco apresentado quando o Observable ainda não emitiu nada.
 */
@Directive({
  selector: '[casoCarregando]',
})
export class CasoCarregandoDirective {
  private subscription: Subscription;

  constructor(
    @Host() private apresentarAsync: ApresentarAsyncDirective<any>,
    private templateRef: TemplateRef<void>,
    private viewContainer: ViewContainerRef,
  ) {}

  ngOnInit() {
    this.subscription = this.apresentarAsync.comStatus.pipe(
      map((x: any) => x.carregando && x.resultado === undefined),
      distinctUntilChanged(),
    ).subscribe(carregando => {
      this.viewContainer.clear();

      if (carregando) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}


/**
 * Bloco apresentado quando o Observable emite uma notificação `error()`.
 *
 * A função `repetir()` pode ser usada para repetir a assinatura do Observable.
 *
 * @example
 * ```html
 *  <ng-container [apresentarAsync]="infoAsync">
 *    ...
 *    <ng-container *casoErro="let erro, repetir = repetir">
 *      <h1>Erro</h1>
 *      <p>{{erro}}</p>
 *      <button (click)="repetir()">Tentar novamente</button>
 *    </ng-container>
 *  </ng-container>
 * ```
 */
@Directive({
  selector: '[casoErro]',
})
export class CasoErroDirective {
  private subscription: Subscription;

  constructor(
    @Host() private apresentarAsync: ApresentarAsyncDirective<any>,
    private templateRef: TemplateRef<CasoErroContext>,
    private viewContainer: ViewContainerRef,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.subscription = this.apresentarAsync.comStatus.pipe(
      map((x: any) => x.erro),
      distinctUntilChanged(),
    ).subscribe(erro => {
      this.viewContainer.clear();

      if (erro !== undefined) {
        this.viewContainer.createEmbeddedView(this.templateRef, {
          $implicit: erro,
          repetir: () => {
            let observableEntrada = this.apresentarAsync.input$;
            observableEntrada.next(observableEntrada.value);
          },
        });
      }

      this.cd.markForCheck();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

interface CasoErroContext {
  /** Erro resultante do Observable */
  $implicit: any;
  /** Função para tentar consumir o Observable novamente */
  repetir: () => void;
}
