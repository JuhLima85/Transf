import {
    AfterViewInit,
    Component,
    ElementRef,  
    Renderer2,
    ViewChild,
  } from "@angular/core";
  
  @Component({
    selector: "app-content-carousel",
    templateUrl: "./content-carousel.component.html",
    styleUrls: ["./content-carousel.component.scss"],
  })
  export class ContentCarouselComponent implements AfterViewInit {
    @ViewChild("wrapper") wrapper: ElementRef;
    @ViewChild("carousel") carousel: ElementRef;
    primeiroCardWidth: number;
    arrowBtns: NodeListOf<Element>;
    carouselChildrens: HTMLElement[];
  
    isDragging: boolean = false;
    isAutoPlay: boolean = true;
    xInicial: any;
    scrollLeftInicial: any;
    timeoutId: any;
  
    servicosSouCaixa = [
      {
        icon: "medical_services",
        titulo: "Atestados",
        desc: "Solicite o lançamento de seus atestados médicos e licenças",
      },
      {
        icon: "text_snippet",
        titulo: "IRPF",
        desc: "Consulte o seu comprovante de rendimentos",
      },
      {
        icon: "event_available",
        titulo: "APIP/LP",
        desc: "Consulte e converta em dinheiro seus APIP ou LP",
      },
      {
        icon: "payments",
        titulo: "Contracheque",
        desc: "Confira e baixe os seus últimos contracheques",
      },
      {
        icon: "currency_exchange",
        titulo: "Adiantamentos",
        desc: "Consulte os lançamentos que foram creditados",
      },
    ];
  
    constructor(private renderer: Renderer2) {}
  
  
    cardPorView: any;
    ngAfterViewInit() {
      this.primeiroCardWidth =
        this.carousel.nativeElement.querySelector(".card").offsetWidth;
      this.arrowBtns = this.wrapper.nativeElement.querySelectorAll("i");
      this.carouselChildrens = Array.from(this.carousel.nativeElement.children);
  
      // Pegar o numero de cards que se encaixam no carousel
      this.cardPorView = Math.round(
        this.carousel.nativeElement.offsetWidth / this.primeiroCardWidth
      );
  
      // Insert copies of the last few cards to beginning of carousel for infinite scrolling
      this.carouselChildrens
        .slice(-this.cardPorView)
        .reverse()
        .forEach((card) => {
          this.carousel.nativeElement.insertAdjacentHTML(
            "afterbegin",
            card.outerHTML
          );
        });
  
      // Insert copies of the first few cards to end of this.carousel.nativeElement for infinite scrolling
      this.carouselChildrens.slice(0, this.cardPorView).forEach((card) => {
        this.carousel.nativeElement.insertAdjacentHTML(
          "beforeend",
          card.outerHTML
        );
      });
  
      // Scroll the this.carousel.nativeElement at appropriate postition to hide first few duplicate cards on Firefox
      this.carousel.nativeElement.classList.add("no-transition");
      this.carousel.nativeElement.scrollLeft =
        this.carousel.nativeElement.offsetWidth;
      this.carousel.nativeElement.classList.remove("no-transition");
  
      this.autoPlay();
    }
  
    prev() {
      this.carousel.nativeElement.scrollLeft -= this.primeiroCardWidth;
    }
    next() {
      this.carousel.nativeElement.scrollLeft += this.primeiroCardWidth;
    }
  
    dragIniciado(evento: any) {
      this.isDragging = true;
      this.renderer.addClass(this.carousel.nativeElement, "dragging");
      this.xInicial = evento.pageX;
      this.scrollLeftInicial = this.carousel.nativeElement.scrollLeft;
    }
  
    dragging(evento: any) {
      if (!this.isDragging) return;
      this.carousel.nativeElement.scrollLeft =
        this.scrollLeftInicial - (evento.pageX - this.xInicial);
    }
  
    finalizarDrag(evento: any) {
      this.isDragging = false;
      this.renderer.removeClass(this.carousel.nativeElement, "dragging");
    }
  
    infiniteScroll() {
      const carousel = this.carousel.nativeElement;
      const wrapper = this.wrapper.nativeElement;
  
      if (carousel.scrollLeft === 0) {
        this.renderer.addClass(carousel, "no-transition");
        carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
        this.renderer.removeClass(carousel, "no-transition");
      } else if (
        Math.ceil(carousel.scrollLeft) ===
        carousel.scrollWidth - carousel.offsetWidth
      ) {
        this.renderer.addClass(carousel, "no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        this.renderer.removeClass(carousel, "no-transition");
      }
  
      clearTimeout(this.timeoutId);
      if (!wrapper.matches(":hover")) this.autoPlay();
    }
  
    autoPlay() {
      const carousel = this.carousel.nativeElement;
      if (window.innerWidth < 800 || !this.isAutoPlay) return;
  
      this.timeoutId = setTimeout(() => {
        carousel.scrollLeft += this.primeiroCardWidth;
      }, 2500);
    }
  
    clearTimeoutFunc() {
      clearTimeout(this.timeoutId); // Clear the timeout
    }
  }
  